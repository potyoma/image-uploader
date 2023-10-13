"use client";
import ImageBlock from "@web/components/organisms/image-block/image-block";
import { useImageKeeperStore } from "@web/store";

export default function Home() {
  const { getImages } = useImageKeeperStore();

  const pictures = getImages();

  return (
    <>
      {Object.entries(pictures).map(([chunkDate, pics]) => (
        <ImageBlock key={chunkDate} date={chunkDate} pics={pics} />
      ))}
    </>
  );
}
