import type { Picture } from "@web/store/models/picture";
import axios from "axios";
import { PICTURE_URL } from "./consts";
import { inRange } from "lodash";
import { Notification } from "@web/store/models/notification";

export async function deleteImage(
  picture: Picture,
  onFinish: (notification: Notification) => void
) {
  try {
    const { status } = await axios.delete(`${PICTURE_URL}/${picture.id}`);

    if (!inRange(status, 200, 300)) throw "Delete error";

    onFinish({
      status: "success",
      heading: "Cool",
      message: `Successfully deleted image ${picture.name}`,
    });
  } catch {
    onFinish({
      status: "error",
      heading: "Sorry, but",
      message: `Could not delete image ${picture.name}`,
    });
  }
}
