import type { Picture } from "@web/store/models/picture";
import type { Notification } from "@web/store/models/notification";
import axios from "axios";
import { PICTURE_URL } from "./consts";
import { inRange } from "lodash";

export async function updateComment(
  picture: Picture,
  onFinish: (notification: Notification, picture?: Picture) => void
) {
  const { id, name, comment } = picture;
  try {
    const { data, status } = await axios.patch(`${PICTURE_URL}/${id}/comment`, {
      comment,
    });

    console.log(data);
    console.log(status);

    if (!inRange(status, 200, 300)) throw "Update error";

    onFinish(
      {
        status: "success",
        heading: "Cool",
        message: `Updated the comment for ${name}`,
      },
      data
    );
  } catch {
    onFinish({
      status: "error",
      heading: "Sorry, but",
      message: `Could not update the comment for ${name}`,
    });
  }
}
