import { DetailedHTMLProps, FormEvent, FormHTMLAttributes } from "react";

type FormProps = DetailedHTMLProps<
  FormHTMLAttributes<HTMLFormElement>,
  HTMLFormElement
>;

export default function Form({ children, onSubmit, ...props }: FormProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.(event);
  };

  return (
    <form onSubmit={handleSubmit} {...props}>
      {children}
    </form>
  );
}
