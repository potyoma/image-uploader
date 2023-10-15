import clsx from "clsx";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import s from "./heading.module.css";

export type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  level?: HeadingLevel;
};

export default function Heading({
  level = "h3",
  className,
  children,
  ...rest
}: HeadingProps) {
  const Component = level;
  return (
    <Component className={clsx(s.heading, s[level], className)} {...rest}>
      {children}
    </Component>
  );
}
