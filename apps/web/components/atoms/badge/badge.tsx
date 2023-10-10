import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import s from "./badge.module.css";

type BadgeProps = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;

export default function Badge({ className, children, ...rest }: BadgeProps) {
  return (
    <span className={clsx(s.badge, className)} {...rest}>
      {children}
    </span>
  );
}
