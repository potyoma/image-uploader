"use client";

import { ReactNode } from "react";
import s from "./modal.module.css";
import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon";
import { useScrollToggle } from "@web/hooks";

interface ModalProps {
  open?: boolean;
  children: ReactNode;
  onClose: () => void;
  cancelCaption?: string;
}

export default function Modal({
  children,
  onClose,
  open,
  cancelCaption = "Close",
}: ModalProps) {
  useScrollToggle(open ?? false);

  return open ? (
    <div className={s.modal}>
      <div className={s.controls}>
        <Button onClick={onClose}>
          <Icon color="black" icon="close" />
          {cancelCaption}
        </Button>
      </div>
      <div className={s.content}>{children}</div>
    </div>
  ) : null;
}
