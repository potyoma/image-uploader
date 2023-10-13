"use client";

import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon";
import s from "./upload-menu.module.css";
import Heading from "@web/components/atoms/heading";
import Text from "@web/components/atoms/text";
import Input from "@web/components/atoms/input";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useImageKeeperStore } from "@web/store";
import { Picture } from "@web/store/models/picture";
import moment from "moment";

function fileToPicture(file: File): Picture {
  return {
    src: URL.createObjectURL(file),
    alt: "preview uploading image",
    date: moment().format("DD.MM.YYYY"),
    size: file.size,
  } as Picture;
}

interface UploadMenuProps {
  onStartLoad?: () => void;
}

export default function UploadMenu({ onStartLoad }: UploadMenuProps) {
  const { uploadImages } = useImageKeeperStore();

  const handleDrop = useCallback(
    (files: File[]) => {
      onStartLoad?.();
      const picturesWithMeta = files.map(f => ({
        ...fileToPicture(f),
        blob: f,
      }));
      uploadImages(picturesWithMeta);
    },
    [onStartLoad, uploadImages]
  );

  const { getInputProps, getRootProps, open } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/*": [],
    },
    noClick: true,
    noKeyboard: true,
  });

  return (
    <div {...getRootProps()}>
      <Input {...getInputProps()} />
      <Button transparent className={s.button} onClick={open}>
        <Icon color="green" icon="cloud" className={s.icon} />
        <Text>
          <Heading level="h2">Upload file</Heading>
          Drop your file(s) here or click to start uploading
        </Text>
      </Button>
    </div>
  );
}
