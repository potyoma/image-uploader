"use client";

import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon/icon";
import { useCallback, useState } from "react";
import Modal from "../modal/modal";
import Logo from "@web/components/atoms/logo/logo";
import Heading from "@web/components/atoms/heading/heading";
import UploadMenu from "../upload-menu/upload-menu";

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
        <UploadMenu />
      </Modal>
    </>
  );
}
