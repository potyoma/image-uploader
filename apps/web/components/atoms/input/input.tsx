import clsx from "clsx";
import {
  DetailedHTMLProps,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from "react";
import s from "./input.module.css";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = forwardRef(function CustomInput(
  { className, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return <input className={clsx(s.input, className)} {...props} ref={ref} />;
});
