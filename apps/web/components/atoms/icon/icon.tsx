import s from "./icon.module.css";
import Cloud from "@web/assets/icons/cloud.svg";
import Close from "@web/assets/icons/close.svg";
import Download from "@web/assets/icons/download.svg";
import Edit from "@web/assets/icons/edit.svg";
import Trash from "@web/assets/icons/trash.svg";
import Check from "@web/assets/icons/check.svg";
import clsx from "clsx";

export type IconName =
  | "close"
  | "cloud"
  | "download"
  | "edit"
  | "trash"
  | "check";
type IconColor = "yellow" | "black" | "gray" | "green";

interface IconProps {
  color?: IconColor;
  icon: IconName;
  className?: string;
}

const ICONS: Record<IconName, any> = {
  cloud: Cloud,
  close: Close,
  download: Download,
  edit: Edit,
  trash: Trash,
  check: Check,
};

export default function Icon({ color, icon, className }: IconProps) {
  const Icon = ICONS[icon];

  return <Icon className={clsx(s[color ?? ""], className)} />;
}
