import ImageBlock from "@web/components/organisms/image-block";
import { loadImages } from "@web/lib/service";
import { useImageKeeperStore } from "@web/store";
import { sortPictures } from "@web/store/store.utils";

export default async function ImageBlocks() {
  const pictures = await loadImages();

  useImageKeeperStore.setState(state => {
    state.pictures = pictures;
  });

  const picsToRender = sortPictures(pictures);

  return (
    <>
      {Object.entries(picsToRender).map(([chunkDate, pics]) => (
        <ImageBlock key={chunkDate} date={chunkDate} pics={pics} />
      ))}
    </>
  );
}
