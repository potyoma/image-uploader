import { create } from "zustand";
import type { Picture, Pictures } from "./models/picture";
import { nanoid } from "nanoid";
import { loadImages, uploadImage } from "@web/lib/service";
import { immer } from "zustand/middleware/immer";
import moment from "moment";
import { DATE_FORMAT } from "@web/consts";
import type { Notification } from "./models/notification";

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
  fetchPictures: () => Promise<void>;
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

const finishLoadingImage =
  (notification: Notification, imageId: string, result?: Picture) =>
  (state: StateType) => {
    console.log(notification);
    console.log(result);
    console.log(imageId);
    (state.notifications ??= []).push(notification);
    const [loadQueueIndex, picturesIndex] = [
      findIndexById(state.loadQueue!, imageId),
      findIndexById(state.pictures, imageId),
    ];
    state.loadQueue!.splice(loadQueueIndex, 1);

    if (!result) state.pictures.splice(picturesIndex, 1);

    const pic = state.pictures[picturesIndex];
    pic.loading = false;
    pic.id = result?.id ?? pic.id;
  };

export const useImageKeeperStore = create(
  immer<StateType>((set, get) => ({
    pictures: [],
    uploadImages: images => {
      images.forEach(im => {
        im.id = nanoid();
        im.loading = true;

        set(state => {
          state.pictures.push(im);
          (state.loadQueue ??= []).push(im);
        });

        uploadImage(
          im,
          kb => set(updateImage(im.id!, "loadProgress", kb as never)),
          (notification, result) =>
            set(finishLoadingImage(notification, im.id!, result))
        );
      });
    },
    addNotification: (notification: Notification) =>
      set(state => {
        (state.notifications ??= []).push(notification);
      }),
    getImages: () => sortPictures(get().pictures),
    getLoadQueueImage: (id: string) =>
      get().loadQueue?.find(lq => lq.id === id),
    fetchPictures: async () => {
      const pictures = await loadImages();
      set(state => {
        state.pictures = pictures;
      });
    },
  }))
);
