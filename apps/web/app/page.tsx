"use client";
import ImageBlock from "@web/components/organisms/image-block/image-block";
import { useImageKeeperStore } from "@web/store";
import { useEffect } from "react";

export default function Home() {
  const { getImages, fetchPictures } = useImageKeeperStore();

  const pictures = getImages();

  useEffect(() => {
    fetchPictures();
  }, []);

  return (
    <>
      {Object.entries(pictures).map(([chunkDate, pics]) => (
        <ImageBlock key={chunkDate} date={chunkDate} pics={pics} />
      ))}
    </>
  );
}
