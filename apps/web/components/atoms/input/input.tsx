import clsx from "clsx";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactNode,
  useId,
} from "react";
import s from "./input.module.css";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export default function Input({ className, ...rest }: InputProps) {
  return <input className={clsx(s.input, className)} {...rest} />;
}
