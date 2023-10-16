"use client";

import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon/icon";
import { useCallback, useState } from "react";
import Modal from "../modal/modal";
import UploadMenu from "../upload-menu";
import { useImageKeeperStore } from "@web/store";

export default function UploadButton() {
  const { count } = useImageKeeperStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(curr => !curr), []);

  return (
    <>
      <Button disabled={count < 1} onClick={toggle}>
        <Icon icon="cloud" color="black" />
        Upload Image
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <UploadMenu onStartLoad={toggle} />
      </Modal>
    </>
  );
}
