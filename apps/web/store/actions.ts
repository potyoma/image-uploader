import type { Picture, Pictures } from "./models/picture";
import type { Notification } from "./models/notification";
import { ImageKeeperStore } from "./store";
import { findIndexById } from "./store.utils";
import { deleteImage, updateComment, uploadImage } from "@web/lib/service";
import { DELETE_TIMEOUT } from "@web/consts";
import { nanoid } from "nanoid";

type SetFunction = (fn: (state: ImageKeeperStore) => void) => void;

export function deletePicture(id: string, set: SetFunction) {
  return function (state: ImageKeeperStore) {
    const picIndex = findIndexById(state.pictures, id);
    const picture = state.pictures[picIndex];
    picture.markDelete = true;
    const timeout = setTimeout(
      () =>
        deleteImage(
          picture,
          notification =>
            set(state => {
              state.addNotification(notification);
              state.deleteQueue?.shift();
              state.pictures.splice(picIndex, 1);
            }),
          notification =>
            set(state => {
              state.addNotification(notification);
              state.deleteQueue?.shift();
              state.pictures[picIndex].markDelete = false;
            })
        ),
      DELETE_TIMEOUT
    );
    state.deleteQueue.push({ ...picture, deleteTimeout: timeout });
  };
}

export function addNotification(notification: Notification, set: SetFunction) {
  return function (state: ImageKeeperStore) {
    state.notifications.push(notification);
    setTimeout(
      () =>
        set(state => {
          state.notifications?.shift();
        }),
      3000
    );
  };
}

export function saveEdited(comment: string | undefined, set: SetFunction) {
  return function (state: ImageKeeperStore) {
    state.editingPicture!.comment = comment;
    updateComment(state.editingPicture!, (notification, picture) => {
      set(state => {
        state.addNotification(notification);

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
  index: number,
  result?: Picture
) {
  return function (state: ImageKeeperStore) {
    state.addNotification(notification);
    const [picture] = state.loadQueue!.splice(index, 1);

    const pictureIndex = findIndexById(state.pictures, picture.id!);

    if (!result) state.pictures.splice(pictureIndex, 1);

    const pic = state.pictures[pictureIndex];
    pic.loading = false;
    pic.id = result!.id ?? pic.id;
    pic.src = result!.src;
  };
}

export function uploadImages(set: SetFunction) {
  return function (images: Picture[]) {
    images.forEach(im => {
      im.id = nanoid();
      im.loading = true;
      let index: number;

      set(state => {
        state.pictures.push(im);
        index = state.loadQueue.push(im);

        uploadImage(
          im,
          kb =>
            set(state => {
              state.loadQueue![index].loadProgress = kb;
            }),
          (notification, result) =>
            set(finishLoadingImage(notification, index, result))
        );
      });
    });
  };
}
