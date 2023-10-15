"use client";

import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon";
import s from "./upload-menu.module.css";
import Heading from "@web/components/atoms/heading";
import Text from "@web/components/atoms/text";
import Input from "@web/components/atoms/input";
import { ReactNode, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useImageKeeperStore } from "@web/store";
import { Picture } from "@web/store/models/picture";
import moment from "moment";
import type { HeadingLevel } from "@web/components/atoms/heading/heading";

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
  heading?: string;
  headingLevel?: HeadingLevel;
  message?: string;
  icon?: ReactNode;
  renderButton?: (onClick: () => void) => ReactNode;
}

const DEFAULT_HEADING = "Upload file";
const DEFAULT_MESSAGE = "Drop your file(s) here or click to start uploading";

export default function UploadMenu({
  onStartLoad,
  heading = DEFAULT_HEADING,
  message = DEFAULT_MESSAGE,
  headingLevel = "h2",
  icon,
  renderButton,
}: UploadMenuProps) {
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

  const Wrapper = renderButton ? "div" : Button;
  const WrapperProps = renderButton ? {} : { transparent: true, onClick: open };

  return (
    <div {...getRootProps()}>
      <Input {...getInputProps()} />
      <Wrapper className={s.button} {...WrapperProps}>
        {icon || <Icon color="green" icon="cloud" className={s.icon} />}
        <Heading level={headingLevel}>{heading}</Heading>
        <Text className={s.text}>{message}</Text>
        {renderButton?.(open)}
      </Wrapper>
    </div>
  );
}
