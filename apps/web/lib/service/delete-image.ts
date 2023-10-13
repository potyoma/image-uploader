import type { Picture } from "@web/store/models/picture";
import axios from "axios";
import { PICTURE_URL } from "./consts";
import { inRange } from "lodash";
import { Notification } from "@web/store/models/notification";

export async function deleteImage(
  picture: Picture,
  onSuccess: (notification: Notification) => void,
  onError: (notification: Notification) => void
) {
  try {
    const { status } = await axios.delete(`${PICTURE_URL}/${picture.id}`);

    if (!inRange(status, 200, 300)) throw "Delete error";

    onSuccess({
      status: "success",
      heading: "Cool",
      message: `Successfully deleted image ${picture.name}`,
    });
  } catch {
    onError({
      status: "error",
      heading: "Sorry, but",
      message: `Could not delete image ${picture.name}`,
    });
  }
}
