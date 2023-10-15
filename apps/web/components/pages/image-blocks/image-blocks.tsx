"use client";

import ImageBlock from "@web/components/organisms/image-block";
import { useImageKeeperStore } from "@web/store";
import { sortPictures } from "@web/store/store.utils";
import { Suspense, useEffect } from "react";
import { ImageBlocksSkeleton } from ".";
import { useShallow } from "zustand/react/shallow";

function ImageBlocksInt() {
  const pictures = useImageKeeperStore(useShallow(state => state.pictures));

  const { getImages } = useImageKeeperStore();

  useEffect(() => {
    getImages();
  }, []);

  const picsToRender = sortPictures(pictures);

  return (
    <>
      {Object.entries(picsToRender).map(([chunkDate, pics]) => (
        <ImageBlock key={chunkDate} date={chunkDate} pics={pics} />
      ))}
    </>
  );
}

export default function ImageBlocks() {
  return (
    <Suspense fallback={<ImageBlocksSkeleton />}>
      <ImageBlocksInt />
    </Suspense>
  );
}
