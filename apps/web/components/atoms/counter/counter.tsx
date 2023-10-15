"use client";

import Text from "../text";
import s from "./counter.module.css";
import { plural } from "@web/lib/utils";
import { useEffect } from "react";
import { useImageKeeperStore } from "@web/store";

export default function Counter() {
  if (typeof window === "undefined") {
    throw Error("Counter should only render on the client.");
  }

  const { count, countPictures } = useImageKeeperStore();

  useEffect(() => {
    countPictures();
  }, []);

  return (
    <Text className={s.text}>
      {count} {plural("image", count)} stored in keeper
    </Text>
  );
}
