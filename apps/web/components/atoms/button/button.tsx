import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";
import clsx from "clsx";
import s from "./button.module.css";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {
    transparent?: boolean;
  };

export default function Button({
  className,
  children,
  transparent,
  ...restProps
}: ButtonProps) {
  const { href } = restProps;
  const Component = href ? "a" : "button";

  return (
    <Component
      className={clsx(
        s.button,
        "rounded",
        transparent ? s.transparent : s.buttonBg,
        className
      )}
      {...restProps}
    >
      {children}
    </Component>
  );
}
