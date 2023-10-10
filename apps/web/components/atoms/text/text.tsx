import { DetailedHTMLProps, HTMLAttributes } from "react";
import s from "./text.module.css";
import clsx from "clsx";

type TextProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

export default function Text({ className, children, ...rest }: TextProps) {
  return (
    <p className={clsx(s.text, className)} {...rest}>
      {children}
    </p>
  );
}
