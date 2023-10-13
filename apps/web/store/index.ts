import { create } from "zustand";
import type { Picture, Pictures } from "./models/picture";
import { nanoid } from "nanoid";
import { loadImages, uploadImage } from "@web/lib/service";
import { immer } from "zustand/middleware/immer";
import moment from "moment";
import { DATE_FORMAT, DELETE_TIMEOT as DELETE_TIMEOUT } from "@web/consts";
import type { Notification } from "./models/notification";
import { deleteImage } from "@web/lib/service/delete-image";

interface ImageKeeperState {
  pictures: Picture[];
  notifications?: Notification[];
  loadQueue?: Picture[];
  deleteQueue?: Picture[];
}

interface ImageKeeperActions {
  uploadImages: (images: Picture[]) => void;
  addNotification: (notification: Notification) => void;
  getImages: () => Pictures;
  getLoadQueueImage: (id: string) => Picture | undefined;
  fetchPictures: () => Promise<void>;
  deletePicture: (picture: Picture) => void;
  cancelDelete: (picture: Picture) => void;
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
    state.addNotification(notification);
    const [loadQueueIndex, picturesIndex] = [
      findIndexById(state.loadQueue!, imageId),
      findIndexById(state.pictures, imageId),
    ];
    state.loadQueue!.splice(loadQueueIndex, 1);

    if (!result) state.pictures.splice(picturesIndex, 1);

    const pic = state.pictures[picturesIndex];
    pic.loading = false;
    pic.id = result!.id ?? pic.id;
    pic.src = result!.src;
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
        setTimeout(
          () =>
            set(state => {
              state.notifications?.shift();
            }),
          2000
        );
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
    deletePicture: (picture: Picture) => {
      set(state => {
        const picIndex = findIndexById(state.pictures, picture.id!);
        state.pictures.splice(picIndex, 1);
        const timeout = setTimeout(
          () =>
            deleteImage(
              picture,
              notification =>
                set(state => {
                  state.addNotification(notification);
                  const delQueueIndex = findIndexById(
                    state.deleteQueue!,
                    picture.id!
                  );
                  state.deleteQueue?.splice(delQueueIndex, 1);
                }),
              notification =>
                set(state => {
                  state.addNotification(notification);
                  const delQueueIndex = findIndexById(
                    state.deleteQueue!,
                    picture.id!
                  );
                  state.deleteQueue?.splice(delQueueIndex, 1);
                  state.pictures.push(picture);
                })
            ),
          DELETE_TIMEOUT
        );
        picture.deleteTimeout = timeout;
        (state.deleteQueue ??= []).push(picture);
      });
    },
    cancelDelete: (picture: Picture) => {
      set(state => {
        const delQueueIndex = findIndexById(state.deleteQueue!, picture.id!);
        clearTimeout(state.deleteQueue![delQueueIndex].deleteTimeout);
        state.deleteQueue?.splice(delQueueIndex, 1);
        state.pictures.push(picture);
      });
    },
  }))
);
