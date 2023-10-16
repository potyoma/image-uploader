import axios from "axios";
import { PICTURES_URL } from "./consts";
import { Picture } from "@web/store/models/picture";
import { inRange } from "lodash";

export async function loadImages(take: number, skip?: number) {
  try {
    const { status, data } = await axios.get(
      `${PICTURES_URL}?take=${take}&skip=${skip ?? 0}`
    );

    if (!inRange(status, 200, 400)) return [];

    return data as Picture[];
  } catch {
    return [];
  }
}
