"use client";

import clsx from "clsx";
import { useImageContext } from "../context";
import s from "./loader.module.css";
import Heading from "@web/components/atoms/heading/heading";
import Text from "@web/components/atoms/text/text";
import { useImageKeeperStore } from "@web/store";
import { useMemo } from "react";
import { convertBytesToKb } from "@web/lib/utils";

export default function Loader() {
  const {
    picture: { id },
  } = useImageContext();

  const { getLoadQueueImage } = useImageKeeperStore();

  const picture = getLoadQueueImage(id!);

  const { loading, loadProgress, size } = picture ?? {};

  const kbSize = useMemo(() => convertBytesToKb(size!), [size]);

  return loading ? (
    <>
      <div className={clsx(s.position, s.container)}>
        <Heading level="h2">Uploading</Heading>
        <Text>
          {convertBytesToKb(loadProgress ?? 0)}kb of {kbSize}kb
        </Text>
      </div>
      <div
        className={clsx(s.position, s.loader)}
        style={{
          transform: `scaleX(${
            (loadProgress ?? 1) < (size ?? 1)
              ? (loadProgress ?? 1) / (size ?? 1)
              : 1
          })`,
        }}
      ></div>
    </>
  ) : null;
}
