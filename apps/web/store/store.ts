import type { Picture, Pictures } from "./models/picture";
import type { Notification } from "./models/notification";

export interface ImageKeeperState {
  pictures: Picture[];
  notifications: Notification[];
  loadQueue: Picture[];
  deleteQueue: Picture[];
  editingPicture?: Picture;
}

export interface ImageKeeperActions {
  uploadImages: (images: Picture[]) => void;
  addNotification: (notification: Notification) => void;
  getImages: () => Pictures;
  getLoadQueueImage: (id: string) => Picture | undefined;
  fetchPictures: () => Promise<void>;
  deletePicture: (id: string) => void;
  cancelDelete: () => void;
  editPicture: (picture: Picture) => void;
  cancelEdit: () => void;
  saveEdited: (comment?: string) => void;
}

export type ImageKeeperStore = ImageKeeperState & ImageKeeperActions;
