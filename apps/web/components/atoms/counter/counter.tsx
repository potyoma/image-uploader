"use client";
import { useImageKeeperStore } from "@web/store";
import Text from "../text";
import s from "./counter.module.css";
import { plural } from "@web/lib/utils";

export default function Counter() {
  const { pictures } = useImageKeeperStore();

  const countPictures = pictures.length;

  return (
    <Text className={s.text}>
      {countPictures} {plural("image", countPictures)} stored in keeper
    </Text>
  );
}
