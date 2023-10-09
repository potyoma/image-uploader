import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";
import s from "./button.module.css";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  className,
  children,
  ...restProps
}: ButtonProps) {
  return (
    <button className={clsx(s.button, className)} {...restProps}>
      {children}
    </button>
  );
}
