import clsx from "clsx";
import NextImage from "next/image";
import Badge from "@web/components/atoms/badge";
import { useImageContext } from "../context";

import s from "./view.module.css";
import { Picture } from "@web/store/models/picture";

interface ViewProps {
  picture?: Picture;
  preview?: boolean;
}

export default function View({ preview, picture: propsPicture }: ViewProps) {
  const { hovered, picture } = useImageContext();

  const { src, alt, comment, date, loading } = picture ?? propsPicture;

  const pictureComment = comment || date;

  return (
    <>
      <NextImage
        src={src}
        alt={alt}
        width="800"
        height={200}
        className={clsx(
          s.image,
          hovered && s.darkened,
          loading && s.opaque,
          preview && s.preview
        )}
        style={{ width: "auto" }}
      />
      {pictureComment && <Badge className={s.badge}>{pictureComment}</Badge>}
    </>
  );
}
