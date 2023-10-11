"use client";
import { useImageKeeperStore } from "@web/store/context";
import Text from "../text/text";

export default function Counter() {
  const { countPictures } = useImageKeeperStore();

  return <Text>{countPictures} images stored in keeper</Text>;
}
