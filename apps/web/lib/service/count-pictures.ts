import axios from "axios";
import { PICTURES_URL } from "./consts";
import { inRange } from "lodash";

export async function countPictures() {
  try {
    let url = `${PICTURES_URL}/count`;
    if (typeof window === "undefined") url = `${process.env.SERVER_PATH}${url}`;

    const { data, status } = await axios.get(url);

    if (!inRange(status, 200, 300)) throw "Count error";

    return data.count as number;
  } catch {
    return 0;
  }
}
