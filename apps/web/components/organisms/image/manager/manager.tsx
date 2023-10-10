import Button from "@web/components/atoms/button/button";
import { useImageContext } from "../context";
import s from "./manager.module.css";
import Icon, { IconName } from "@web/components/atoms/icon/icon";
import { ReactNode } from "react";

function ManagerButton({
  icon,
  children,
}: {
  icon: IconName;
  children: ReactNode;
}) {
  return (
    <Button transparent>
      <Icon color="yellow" icon={icon} />
      {children}
    </Button>
  );
}

export default function Manager() {
  const { hovered } = useImageContext();

  return hovered ? (
    <div className={s.manager}>
      <div className={s.buttons}>
        <ManagerButton icon="download">Download</ManagerButton>
        <ManagerButton icon="edit">Edit label</ManagerButton>
        <ManagerButton icon="trash">Delete</ManagerButton>
      </div>
    </div>
  ) : null;
}
