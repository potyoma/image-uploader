import { create } from "zustand";
import type { Picture } from "./models/picture";
import { loadImages } from "@web/lib/service";
import { immer } from "zustand/middleware/immer";
import type { Notification } from "./models/notification";
import { ImageKeeperStore } from "./store";
import {
  addNotification,
  deletePicture,
  saveEdited,
  uploadImages,
} from "./actions";
import { findIndexById, sortPictures } from "./store.utils";

export const useImageKeeperStore = create(
  immer<ImageKeeperStore>((set, get) => ({
    pictures: [],
    loadQueue: [],
    deleteQueue: [],
    notifications: [],
    uploadImages: uploadImages(set),
    addNotification: (notification: Notification) =>
      set(addNotification(notification, set)),
    getImages: () => sortPictures(get().pictures),
    getLoadQueueImage: (id: string) =>
      get().loadQueue?.find(lq => lq.id === id),
    fetchPictures: async () => {
      const pictures = await loadImages();
      set(state => {
        state.pictures = pictures;
      });
    },
    deletePicture: (id: string) => {
      set(deletePicture(id, set));
    },
    cancelDelete: () => {
      set(state => {
        const picture = state.deleteQueue?.shift();
        clearTimeout(picture?.deleteTimeout);
        const picIndex = findIndexById(state.pictures, picture!.id!);
        state.pictures[picIndex].markDelete = false;
      });
    },
    editPicture: (picture: Picture) => {
      set(state => {
        state.editingPicture = { ...picture };
      });
    },
    cancelEdit: () => {
      set(state => {
        state.editingPicture = undefined;
      });
    },
    saveEdited: comment => {
      set(saveEdited(comment, set));
    },
  }))
);
