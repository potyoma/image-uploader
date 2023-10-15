import DeleteBubbles from "@web/components/organisms/delete-bubbles/delete-bubbles";
import EditModal from "@web/components/organisms/edit-modal/edit-modal";
import Notifications from "@web/components/organisms/notifications";
import { ImageBlocksSkeleton } from "@web/components/pages/image-blocks";
import ImageBlocks from "@web/components/pages/image-blocks/image-blocks";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Suspense fallback={<ImageBlocksSkeleton />}>
        <ImageBlocks />
      </Suspense>
      <DeleteBubbles />
      <Notifications />
      <EditModal />
    </>
  );
}
