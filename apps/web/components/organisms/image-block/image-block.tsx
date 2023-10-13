import ImageHeading from "@web/components/molecules/image-heading";
import Image from "../image";
import s from "./image-block.module.css";
import { Picture } from "@web/store/models/picture";

interface ImageBlockProps {
  date: string;
  pics: Picture[];
}

export default function ImageBlock({ date, pics }: ImageBlockProps) {
  const count = pics?.length ?? 0;

  return (
    <div>
      <ImageHeading date={date} count={count} />
      <div className={s.images}>
        {pics.map(pic => (
          <Image key={pic.id!} picture={pic} />
        ))}
      </div>
    </div>
  );
}
