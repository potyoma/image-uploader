import axios from "axios";
import { PICTURES_URL } from "./consts";
import { inRange } from "lodash";

export async function countPictures() {
  try {
    const { data, status } = await axios.get(`${PICTURES_URL}/count`);

    if (!inRange(status, 200, 300)) throw "Count error";

    return data.count as number;
  } catch {
    return 0;
  }
}
