import s from "./icon.module.css";
import Cloud from "@web/assets/icons/cloud.svg";
import Close from "@web/assets/icons/close.svg";
import Download from "@web/assets/icons/download.svg";
import Edit from "@web/assets/icons/edit.svg";
import Trash from "@web/assets/icons/trash.svg";

type IconName = "close" | "cloud" | "download" | "edit" | "trash";
type IconColor = "yellow" | "black" | "gray";

interface IconProps {
  color?: IconColor;
  icon: IconName;
}

const ICONS: Record<IconName, any> = {
  cloud: Cloud,
  close: Close,
  download: Download,
  edit: Edit,
  trash: Trash,
};

export default function Icon({ color, icon }: IconProps) {
  const Icon = ICONS[icon];

  return <Icon className={s[color ?? ""]} />;
}
