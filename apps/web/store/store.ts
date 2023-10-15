import type { Picture, Pictures } from "./models/picture";
import type { Notification } from "./models/notification";

export interface ImageKeeperState {
  count: number;
  pictures: Picture[];
  notifications: Notification[];
  loadQueue: Picture[];
  deleteQueue: Picture[];
  editingPicture?: Picture;
}

export interface ImageKeeperActions {
  uploadImages: (images: Picture[]) => void;
  addNotification: (notification: Notification) => void;
  getImages: () => Promise<Record<string, Picture[]>>;
  getLoadQueueImage: (id: string) => Picture | undefined;
  deletePicture: (id: string) => void;
  cancelDelete: () => void;
  editPicture: (picture: Picture) => void;
  cancelEdit: () => void;
  saveEdited: (comment?: string) => void;
}

export type ImageKeeperStore = ImageKeeperState & ImageKeeperActions;
