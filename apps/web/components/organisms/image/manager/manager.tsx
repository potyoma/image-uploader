import Button from "@web/components/atoms/button";
import { useImageContext } from "../context";
import s from "./manager.module.css";
import Icon, { IconName } from "@web/components/atoms/icon";
import { ReactNode } from "react";
import { useImageKeeperStore } from "@web/store";

function ManagerButton({
  icon,
  children,
  onClick,
  href,
}: {
  icon: IconName;
  children: ReactNode;
  onClick?: () => void;
  href?: string;
}) {
  return (
    <Button transparent onClick={onClick} href={href}>
      <Icon color="yellow" icon={icon} />
      {children}
    </Button>
  );
}

export default function Manager() {
  const { hovered, picture } = useImageContext();

  const { loading, src } = picture;

  const { deletePicture, editPicture } = useImageKeeperStore();

  return hovered && !loading ? (
    <div className={s.manager}>
      <div className={s.buttons}>
        <ManagerButton icon="download" href={src}>
          Download
        </ManagerButton>
        <ManagerButton icon="edit" onClick={() => editPicture(picture)}>
          Edit label
        </ManagerButton>
        <ManagerButton icon="trash" onClick={() => deletePicture(picture)}>
          Delete
        </ManagerButton>
      </div>
    </div>
  ) : null;
}
