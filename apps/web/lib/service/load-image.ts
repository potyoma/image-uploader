import { Picture } from "@web/store/models/picture";
import { delay } from "../utils";

export async function loadImage(
  meta: Picture,
  callback: (loadedKb: number) => void,
  onFinish: () => void
) {
  if (!meta.size) return await delay(5000);

  for (let i = 0; i < meta.size; i += Math.floor(meta.size / 10)) {
    await delay(1000);
    console.log(i);
    callback(i);
  }

  onFinish?.();
}
