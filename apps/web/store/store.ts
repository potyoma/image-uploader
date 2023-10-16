import type { Picture } from "./models/picture";
import type { Notification } from "./models/notification";

export interface ImageKeeperState {
  count: number;
  pictures: Picture[];
  notifications: Notification[];
  loadQueue: Picture[];
  deleteQueue: Picture[];
  editingPicture?: Picture;
  noImages?: boolean;
  hasMoreImages: boolean;
  limitImages: number;
  shownImages: number;
}

export interface ImageKeeperActions {
  uploadImages: (images: Picture[]) => void;
  getImages: () => Promise<Record<string, Picture[]>>;
  getLoadQueueImage: (id: string) => Picture | undefined;
  deletePicture: (id: string) => void;
  cancelDelete: (id: string) => void;
  editPicture: (picture: Picture) => void;
  cancelEdit: () => void;
  saveEdited: (comment?: string) => void;
  countPictures: () => Promise<void>;
  deletePermanently: (id: string) => void;
  removeNotification: () => void;
}

export type ImageKeeperStore = ImageKeeperState & ImageKeeperActions;
