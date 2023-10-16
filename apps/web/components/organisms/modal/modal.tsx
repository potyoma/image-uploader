"use client";

import { ReactNode } from "react";
import s from "./modal.module.css";
import Button from "@web/components/atoms/button";
import Icon from "@web/components/atoms/icon";
import { useScrollToggle } from "@web/hooks";
import clsx from "clsx";
import { useKey } from "@web/hooks/use-key";

interface ModalProps {
  open?: boolean;
  children: ReactNode;
  onClose?: () => void;
  cancelCaption?: string;
  solid?: boolean;
}

export default function Modal({
  children,
  onClose,
  open,
  cancelCaption = "Close",
  solid,
}: ModalProps) {
  useScrollToggle(open ?? false);

  useKey("Escape", onClose);

  return open ? (
    <div className={clsx(s.modal, solid ? s.solid : s.transparent)}>
      <div className={s.controls}>
        {onClose && (
          <Button onClick={onClose}>
            <Icon color="black" icon="close" />
            {cancelCaption}
          </Button>
        )}
      </div>
      <div className={s.content}>{children}</div>
    </div>
  ) : null;
}
