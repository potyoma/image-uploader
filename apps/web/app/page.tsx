"use client";
import DeleteBubbles from "@web/components/organisms/delete-bubbles/delete-bubbles";
import EditModal from "@web/components/organisms/edit-modal/edit-modal";
import ImageBlock from "@web/components/organisms/image-block/image-block";
import Notifications from "@web/components/organisms/notifications";
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
      <DeleteBubbles />
      <Notifications />
      <EditModal />
    </>
  );
}
