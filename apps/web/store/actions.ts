import type { Picture } from "./models/picture";
import type { Notification } from "./models/notification";
import { ImageKeeperStore } from "./store";
import { findIndexById, removeFromArrayById } from "./store.utils";
import { deleteImage, updateComment, uploadImage } from "@web/lib/service";
import { nanoid } from "nanoid";

type SetFunction = (fn: (state: ImageKeeperStore) => void) => void;

export function cancelDelete(id: string) {
  return function (state: ImageKeeperStore) {
    removeFromArrayById(state.deleteQueue, id);
    const picIndex = findIndexById(state.pictures, id);
    state.pictures[picIndex].markDelete = false;
  };
}

export function deletePicture(id: string) {
  return function (state: ImageKeeperStore) {
    const picIndex = findIndexById(state.pictures, id);
    const picture = state.pictures[picIndex];
    picture.markDelete = true;
    state.deleteQueue.push(picture);
  };
}

export function deletePermanently(id: string, set: SetFunction) {
  return function (state: ImageKeeperStore) {
    const picIndex = findIndexById(state.pictures, id);
    const picture = state.pictures[picIndex];
    deleteImage({ ...picture }, notification =>
      set(state => {
        state.notifications.push(notification);
        removeFromArrayById(state.deleteQueue, id);

        if (notification.status === "success")
          state.pictures.splice(picIndex, 1);
        else state.pictures[picIndex].markDelete = false;

        state.countPictures();
      })
    );
  };
}

export function saveEdited(comment: string | undefined, set: SetFunction) {
  return function (state: ImageKeeperStore) {
    state.editingPicture!.comment = comment;
    updateComment(state.editingPicture!, (notification, picture) => {
      set(state => {
        state.notifications.push(notification);

        if (picture) {
          const picIndex = findIndexById(state.pictures, picture.id!);
          state.pictures[picIndex].comment = picture.comment;
          state.editingPicture = undefined;
        }
      });
    });
  };
}

function finishLoadingImage(
  notification: Notification,
  id: string,
  result?: Picture
) {
  return function (state: ImageKeeperStore) {
    state.notifications.push(notification);
    removeFromArrayById(state.loadQueue, id);

    const pictureIndex = findIndexById(state.pictures, id);

    if (!result) {
      state.pictures.splice(pictureIndex, 1);
      return;
    }

    const pic = state.pictures[pictureIndex];
    pic.loading = false;
    pic.id = result!.id ?? pic.id;
    pic.src = result!.src;
    state.countPictures();
  };
}

export function uploadImages(set: SetFunction) {
  return function (images: Picture[]) {
    set(state => {
      state.noImages = false;
    });
    images.forEach(im => {
      im.id = nanoid();
      im.loading = true;

      set(state => {
        state.pictures.unshift(im);
        state.noImages = false;
        state.loadQueue.push(im);

        uploadImage(
          im,
          kb =>
            set(state => {
              const index = findIndexById(state.loadQueue, im.id!);
              state.loadQueue[index].loadProgress = kb;
            }),
          (notification, result) =>
            set(finishLoadingImage(notification, im.id!, result))
        );
      });
    });
  };
}
