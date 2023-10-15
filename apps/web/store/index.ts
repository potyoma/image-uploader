import { StateCreator, create } from "zustand";
import type { Picture } from "./models/picture";
import { loadImages } from "@web/lib/service";
import { immer } from "zustand/middleware/immer";
import type { Notification } from "./models/notification";
import { ImageKeeperStore } from "./store";
import {
  addNotification,
  cancelDelete,
  deletePermanently,
  deletePicture,
  saveEdited,
  uploadImages,
} from "./actions";
import { sortPictures } from "./store.utils";
import { persist } from "zustand/middleware";
import { countPictures } from "@web/lib/service/count-pictures";

const middlewares = (
  initializer: StateCreator<ImageKeeperStore, [["zustand/immer", never]], []>
) =>
  persist(immer<ImageKeeperStore>(initializer), { name: "image-keeper-store" });

export const useImageKeeperStore = create(
  middlewares((set, get) => ({
    count: 0,
    pictures: [],
    loadQueue: [],
    deleteQueue: [],
    notifications: [],
    uploadImages: uploadImages(set),
    addNotification: (notification: Notification) =>
      set(addNotification(notification, set)),
    getImages: async () => {
      let pictures = get().pictures;

      if (pictures.length < 1) {
        pictures = await loadImages();
        set(state => {
          state.pictures = pictures;
        });
      }

      return sortPictures(pictures);
    },
    countPictures: async () => {
      const picturesNumber = await countPictures();
      set(state => {
        state.count = picturesNumber;
        state.noImages = picturesNumber === 0;
      });
    },
    getLoadQueueImage: (id: string) =>
      get().loadQueue?.find(lq => lq.id === id),
    deletePicture: (id: string) => {
      set(deletePicture(id));
    },
    cancelDelete: (id: string) => {
      set(cancelDelete(id));
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
    deletePermanently: (id: string) => {
      set(deletePermanently(id, set));
    },
  }))
);
