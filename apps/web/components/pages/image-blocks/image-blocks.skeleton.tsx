import { nanoid } from "nanoid";
import s from "./image-blocks.module.css";
import clsx from "clsx";

export default function ImageBlocksSkeleton() {
  const blocksList = Array.from({ length: 5 }, () => nanoid());

  return (
    <div className={s.skeleton}>
      <div className={clsx(s.heading, "rounded")}></div>
      <ul className={s.imageList}>
        {blocksList.map(b => (
          <li key={b}>
            <div className={clsx(s.image, "rounded")}></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
