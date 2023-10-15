import DeleteBubbles from "@web/components/organisms/delete-bubbles/delete-bubbles";
import EditModal from "@web/components/organisms/edit-modal/edit-modal";
import Notifications from "@web/components/organisms/notifications";
import ImageBlocks from "@web/components/pages/image-blocks/image-blocks";
import NoImages from "@web/components/pages/no-images/no-images";

export default function Home() {
  return (
    <>
      <ImageBlocks />
      <DeleteBubbles />
      <Notifications />
      <EditModal />
      <NoImages />
    </>
  );
}
