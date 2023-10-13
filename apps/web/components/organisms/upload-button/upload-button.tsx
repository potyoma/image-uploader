"use client";

import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon/icon";
import { useCallback, useState } from "react";
import Modal from "../modal/modal";
import UploadMenu from "../upload-menu";

interface UploadButtonProps {
  disabled?: boolean;
}

export default function UploadButton({ disabled }: UploadButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen(curr => !curr), []);

  return (
    <>
      <Button disabled={disabled} onClick={toggle}>
        <Icon icon="cloud" color="black" />
        Upload Image
      </Button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)}>
        <UploadMenu onStartLoad={toggle} />
      </Modal>
    </>
  );
}
