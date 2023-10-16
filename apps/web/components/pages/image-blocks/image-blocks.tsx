"use client";

import ImageBlock from "@web/components/organisms/image-block";
import { useImageKeeperStore } from "@web/store";
import { chunkPictures } from "@web/store/store.utils";
import { useEffect, useState } from "react";
import { ImageBlocksSkeleton } from ".";
import InfiniteScroll from "react-infinite-scroll-component";
import { useShallow } from "zustand/react/shallow";
import LoadBlock from "@web/components/organisms/load-block/load-block";

export default function ImageBlocks() {
  const [loading, setLoading] = useState(true);

  const pictures = useImageKeeperStore(useShallow(state => state.pictures));

  const { getImages, hasMoreImages } = useImageKeeperStore();

  useEffect(() => {
    getImages().then(() => setLoading(false));
  }, []);

  const picsToRender = chunkPictures(pictures);

  return (
    <LoadBlock fallback={<ImageBlocksSkeleton />} loading={loading}>
      <InfiniteScroll
        dataLength={pictures.length}
        next={getImages}
        hasMore={hasMoreImages}
        loader={<h4>Loading...</h4>}
      >
        {Object.entries(picsToRender).map(([chunkDate, pics]) => (
          <ImageBlock key={chunkDate} date={chunkDate} pics={pics} />
        ))}
      </InfiniteScroll>
    </LoadBlock>
  );
}
