import Text from "../text";
import s from "./counter.module.css";
import { plural } from "@web/lib/utils";
import { countPictures } from "@web/lib/service/count-pictures";

export default async function Counter() {
  const count = await countPictures();

  return (
    <Text className={s.text}>
      {count} {plural("image", count)} stored in keeper
    </Text>
  );
}
