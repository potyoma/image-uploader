import { Picture } from "@web/store/models/picture";
import axios, { AxiosProgressEvent, AxiosRequestConfig } from "axios";
import { PICTURE_URL } from "./consts";
import { inRange } from "lodash";
import { Notification } from "@web/store/models/notification";
import { failed, success } from "../utils";

export async function uploadImage(
  image: Picture,
  onProgress: (loadedKb: number) => void,
  onFinish: (notification: Notification, result?: Picture) => void
) {
  try {
    const form = new FormData();

    form.append("picture", image.blob!);

    const options: AxiosRequestConfig = {
      onUploadProgress: (prgEvent: AxiosProgressEvent) => {
        const { loaded } = prgEvent;
        onProgress(loaded);
      },
    };

    const { data, status } = await axios.post(PICTURE_URL, form, options);

    if (!inRange(status, 200, 300)) throw "Load Error";

    onFinish?.(success("Uploaded successfully"), data as Picture);
  } catch {
    onFinish?.(
      failed(
        "Something really bad happened while uploading your image, please try again "
      )
    );
  }
}
