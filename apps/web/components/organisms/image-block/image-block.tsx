import ImageHeading from "@web/components/molecules/image-heading";
import { Pic } from "@web/stab/pics";
import Image from "../image";
import s from "./image-block.module.css";

interface ImageBlockProps {
  date: string;
  pics: Pic[];
}

export default function ImageBlock({ date, pics }: ImageBlockProps) {
  const count = pics?.length ?? 0;

  return (
    <div>
      <ImageHeading date={date} count={count} />
      <div className={s.images}>
        {pics.map(pic => (
          <Image
            key={(date + pic.date + pic.alt).replace(" ", "_").toLowerCase()}
            date={pic.date}
            alt={pic.alt}
            comment={pic.comment}
            src={pic.src}
          />
        ))}
      </div>
    </div>
  );
}
