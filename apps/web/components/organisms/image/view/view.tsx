import clsx from "clsx";
import NextImage from "next/image";
import Badge from "@web/components/atoms/badge";
import { useImageContext } from "../context";

import s from "./view.module.css";

export default function View() {
  const {
    hovered,
    picture: { src, alt, comment, date, loading },
  } = useImageContext();

  return (
    <>
      <NextImage
        src={src}
        alt={alt}
        width="800"
        height={200}
        className={clsx(s.image, hovered && s.darkened, loading && s.opaque)}
        style={{ width: "auto" }}
      />
      <Badge className={s.badge}>{comment || date}</Badge>
    </>
  );
}
