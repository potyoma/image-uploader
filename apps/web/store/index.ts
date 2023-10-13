import { create } from "zustand";
import { Picture } from "./models/picture";
import { nanoid } from "nanoid";
import { loadImage } from "@web/lib/service";
import { immer } from "zustand/middleware/immer";
import moment from "moment";
import { DATE_FORMAT } from "@web/consts";

const STAB_SEED: Picture[] = [
  ...[200, 300, 400, 500, 200].map(width => ({
    id: nanoid(),
    src: `https://picsum.photos/${width}/200`,
    alt: "Picsum pic",
    comment: width === 200 ? undefined : `width: ${width}`,
    date: `${width === 200 ? "08" : "13"}.08.2023`,
  })),
  ...[200, 300, 800, 200].map(width => ({
    id: nanoid(),
    src: `https://picsum.photos/${width}/200`,
    alt: "Picsum pic",
    comment: width === 200 ? undefined : `width: ${width}`,
    date: `${width === 200 ? "07" : "14"}.07.2023`,
  })),
];

type Pictures = Record<string, Picture[]>;

interface ImageKeeperState {
  pictures: Picture[];
  notifications?: Notification[];
  loadQueue?: Picture[];
}

interface ImageKeeperActions {
  uploadImages: (images: Picture[]) => void;
  addNotification: (notification: Notification) => void;
  getImages: () => Pictures;
  getLoadQueueImage: (id: string) => Picture | undefined;
}

type StateType = ImageKeeperState & ImageKeeperActions;

const updateImage =
  (id: string, property: keyof Picture, value: never) => (state: StateType) => {
    const picIndex = state.loadQueue?.findIndex(pic => pic.id === id) ?? -1;
    if (picIndex < 0 || !state.loadQueue?.[picIndex]) return;
    state.loadQueue[picIndex][property] = value;
  };

const sortPictures = (pictures: Picture[]): Pictures => {
  const sorted = [...pictures].sort((a, b) =>
    moment(a.date, DATE_FORMAT).isBefore(moment(b.date, DATE_FORMAT)) ? 1 : -1
  );
  const chunked = sorted.reduce((acc, next) => {
    const date = moment(next.date, DATE_FORMAT);
    const codedDate = `${date.month()}.${date.year()}`;

    (acc[codedDate] ??= []).push(next);
    return acc;
  }, {} as Pictures);
  return chunked;
};

const findIndexById = (arr: Picture[], id: string) =>
  arr.findIndex(pic => pic.id === id);

const finishLoadingImage = (imageId: string) => (state: StateType) => {
  const [loadQueueIndex, picturesIndex] = [
    findIndexById(state.loadQueue!, imageId),
    findIndexById(state.pictures, imageId),
  ];
  state.loadQueue!.splice(loadQueueIndex, 1);
  state.pictures[picturesIndex].loading = false;
};

export const useImageKeeperStore = create(
  immer<StateType>((set, get) => ({
    pictures: STAB_SEED,
    uploadImages: images => {
      images.forEach(im => {
        im.id = nanoid();
        im.loading = true;
      });
      set(state => {
        state.pictures.push(...images);
        (state.loadQueue ??= []).push(...images);
      });
      images.forEach(im =>
        loadImage(
          im,
          kb => set(updateImage(im.id!, "loadProgress", kb as never)),
          () => set(finishLoadingImage(im.id!))
        )
      );
    },
    addNotification: (notification: Notification) =>
      set(state => {
        (state.notifications ??= []).push(notification);
      }),
    getImages: () => sortPictures(get().pictures),
    getLoadQueueImage: (id: string) =>
      get().loadQueue?.find(lq => lq.id === id),
  }))
);
