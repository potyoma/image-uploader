import clsx from "clsx";
import {
  DetailedHTMLProps,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
  useId,
} from "react";
import s from "./input.module.css";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string };

export const Input = forwardRef(function CustomInput(
  { className, label, ...props }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId();

  return (
    <div className={s.container}>
      <input
        id={id}
        className={clsx(s.input, className)}
        {...props}
        ref={ref}
      />
      {label && (
        <label className={s.label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
});
