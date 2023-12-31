import { StateCreator, create } from "zustand";
import type { Picture } from "./models/picture";
import { loadImages } from "@web/lib/service";
import { immer } from "zustand/middleware/immer";
import { ImageKeeperStore } from "./store";
import {
  cancelDelete,
  deletePermanently,
  deletePicture,
  saveEdited,
  uploadImages,
} from "./actions";
import { chunkPictures } from "./store.utils";
import { countPictures } from "@web/lib/service/count-pictures";

const middlewares = (
  initializer: StateCreator<ImageKeeperStore, [["zustand/immer", never]], []>
) => immer<ImageKeeperStore>(initializer);

export const useImageKeeperStore = create(
  middlewares((set, get) => ({
    count: 0,
    pictures: [],
    loadQueue: [],
    deleteQueue: [],
    notifications: [],
    hasMoreImages: false,
    limitImages: 50,
    shownImages: 0,
    uploadImages: uploadImages(set),
    getImages: async () => {
      const { limitImages, shownImages } = get();
      const pictures = await loadImages(limitImages, shownImages);

      set(state => {
        state.shownImages += pictures.length;
        state.pictures = pictures;
        state.hasMoreImages = state.count - state.shownImages > 0;
      });

      return chunkPictures(pictures);
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
    removeNotification: () =>
      set(state => {
        state.notifications.shift();
      }),
  }))
);
