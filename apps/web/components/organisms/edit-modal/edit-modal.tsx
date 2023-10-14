import { useImageKeeperStore } from "@web/store";
import Modal from "../modal/modal";
import Form from "@web/components/atoms/form";
import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon";
import View from "../image/view";
import { Picture } from "@web/store/models/picture";
import Input from "@web/components/atoms/input";
import s from "./edit-modal.module.css";
import Heading from "@web/components/atoms/heading";
import { useState } from "react";

export default function EditModal() {
  const { editingPicture, cancelEdit, saveEdited } = useImageKeeperStore();

  const [comment, setComment] = useState(editingPicture?.comment);

  if (!editingPicture) return null;

  const picturePreview = {
    src: editingPicture.src,
    alt: editingPicture.alt,
  } as Picture;

  return (
    <Modal
      open={!!editingPicture}
      onClose={cancelEdit}
      cancelCaption={"Close editor"}
    >
      <Form className={s.form}>
        <Heading>Set custom label</Heading>
        <View picture={picturePreview} preview />
        <Input
          value={comment}
          onChange={({ target: { value } }) => setComment(value)}
          placeholder="Enter custom label"
          label={"100 chars max"}
        />
        <Button type="submit">
          <Icon icon="check" />
          Save
        </Button>
      </Form>
    </Modal>
  );
}
