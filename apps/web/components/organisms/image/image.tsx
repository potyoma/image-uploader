"use client";

import { ImageProvider } from "./context/image-context";
import s from "./image.module.css";
import Manager from "./manager/manager";
import View from "./view/view";

interface ImageProps {
  src: string;
  date: string;
  comment?: string;
  alt: string;
}

export default function Image({ src, date, comment, alt }: ImageProps) {
  return (
    <ImageProvider className={s.container}>
      <View alt={alt} src={src} comment={comment} date={date} />
      <Manager />
    </ImageProvider>
  );
}
