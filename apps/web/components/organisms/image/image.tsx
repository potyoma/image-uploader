"use client";

import { ImageProvider } from "./context/image-context";
import s from "./image.module.css";
import Manager from "./manager";
import View from "./view";
import Loader from "./loader/loader";
import { Picture } from "@web/store/models/picture";
import clsx from "clsx";

interface ImageProps {
  picture: Picture;
}

export default function Image({ picture }: ImageProps) {
  const { markDelete } = picture;

  return markDelete ? null : (
    <ImageProvider className={clsx(s.container, "rounded")} picture={picture}>
      <View />
      <Manager />
      <Loader />
    </ImageProvider>
  );
}
