"use client";

import Button from "@web/components/atoms/button/button";
import Icon from "@web/components/atoms/icon/icon";
import s from "./upload-menu.module.css";
import Heading from "@web/components/atoms/heading/heading";
import Text from "@web/components/atoms/text/text";
import Input from "@web/components/atoms/input/input";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function UploadMenu() {
  const handleDrop = useCallback(files => {
    console.log(files);
  }, []);

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
