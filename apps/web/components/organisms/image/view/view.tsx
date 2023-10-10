import clsx from "clsx";
import NextImage from "next/image";
import Badge from "@web/components/atoms/badge";
import { useImageContext } from "../context";

import s from "./view.module.css";

interface ViewProps {
  src: string;
  alt: string;
  comment?: string;
  date: string;
}

export default function View({ src, alt, comment, date }: ViewProps) {
  const { hovered } = useImageContext();

  return (
    <>
      <NextImage
        src={src}
        alt={alt}
        width="800"
        height={200}
        className={clsx(s.image, hovered && s.darkened)}
        style={{ width: "auto" }}
      />
      <Badge className={s.badge}>{comment || date}</Badge>
    </>
  );
}
