"use client";

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
import { ChangeEvent, useState } from "react";

interface EditModalProps {
  picture: Picture;
  onClose: () => void;
  onSave: (comment: string) => void;
}

function EditModalComponent({ picture, onSave, onClose }: EditModalProps) {
  const [comment, setComment] = useState(picture!.comment ?? "");

  const picturePreview = {
    src: picture.src,
    alt: picture.alt,
  } as Picture;

  const handleSubmit = () => {
    onSave(comment);
  };

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    value?.length <= 100 && setComment(value);
  };

  return (
    <Modal open={!!picture} onClose={onClose} cancelCaption={"Close editor"}>
      <Form onSubmit={handleSubmit} className={s.form}>
        <Heading>Set custom label</Heading>
        <View picture={picturePreview} preview />
        <Input
          value={comment}
          type="string"
          onChange={handleChange}
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

export default function EditModal() {
  const { editingPicture, cancelEdit, saveEdited } = useImageKeeperStore();

  if (!editingPicture) return null;

  return (
    <EditModalComponent
      picture={editingPicture}
      onSave={saveEdited}
      onClose={cancelEdit}
    />
  );
}
