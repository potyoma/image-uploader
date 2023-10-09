import s from "./icon.module.css";

type IconName = "close" | "cloud" | "download" | "edit" | "trash";
type IconColor = "yellow" | "black" | "gray";

interface IconProps {
  color?: IconColor;
  icon: IconName;
}

export default async function Icon({ color, icon }: IconProps) {
  const Icon = await import(`@web/assets/icons/${icon}.svg`).then(
    icon => icon.default
  );
  return <Icon className={s[color]} />;
}
