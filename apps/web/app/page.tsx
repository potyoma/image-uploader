"use client";
import ImageBlock from "@web/components/organisms/image-block/image-block";
import { useImageKeeperStore } from "@web/store/context";
import moment from "moment";

export default function Home() {
  const { pictures } = useImageKeeperStore();

  return (
    <>
      {pictures.map(p => (
        <ImageBlock
          key={`${p.year}_${p.month}`}
          date={`${moment()
            .month(p.month - 1)
            .format("MMMM")} '${p.year.toString().slice(2)}`}
          pics={p.pictures}
        />
      ))}
    </>
  );
}
