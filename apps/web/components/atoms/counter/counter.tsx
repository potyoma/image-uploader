"use client";
import { useImageKeeperStore } from "@web/store/context";
import Text from "../text";
import s from "./counter.module.css";

export default function Counter() {
  const { countPictures } = useImageKeeperStore();

  return (
    <Text className={s.text}>{countPictures} images stored in keeper</Text>
  );
}
