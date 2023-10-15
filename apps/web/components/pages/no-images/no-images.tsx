"use client";
import { useImageKeeperStore } from "@web/store";
import s from "./no-images.module.css";
import Modal from "@web/components/organisms/modal";
import Logo from "@web/components/atoms/logo/logo";
import Heading from "@web/components/atoms/heading";
import Text from "@web/components/atoms/text";
import UploadMenu from "@web/components/organisms/upload-menu/upload-menu";
import Button from "@web/components/atoms/button/button";
import Icon from "@web/components/atoms/icon/icon";

export default function NoImages() {
  const { noImages } = useImageKeeperStore();

  return (
    <Modal solid open={noImages}>
      <UploadMenu
        icon={<Logo />}
        headingLevel="h1"
        heading="No images uploaded yet"
        message="Upload your first image by drag and dropping the file on the screen or
        click the button below"
        renderButton={onClick => (
          <Button onClick={onClick}>
            <Icon icon="cloud" color="black" />
            Upload image
          </Button>
        )}
      />
    </Modal>
  );
}
