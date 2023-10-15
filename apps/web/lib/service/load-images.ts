import axios from "axios";
import { PICTURES_URL } from "./consts";
import { Picture } from "@web/store/models/picture";
import { inRange } from "lodash";

export async function loadImages() {
  try {
    let url = PICTURES_URL;
    if (typeof window === "undefined") url = `${process.env.SERVER_PATH}${url}`;

    const { status, data } = await axios.get(url);

    if (!inRange(status, 200, 400)) return [];

    return data as Picture[];
  } catch {
    return [];
  }
}
