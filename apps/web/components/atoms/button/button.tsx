import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";
import s from "./button.module.css";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  transparent?: boolean;
};

export default function Button({
  className,
  children,
  transparent,
  ...restProps
}: ButtonProps) {
  return (
    <button
      className={clsx(
        s.button,
        transparent ? s.transparent : s.buttonBg,
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
}
