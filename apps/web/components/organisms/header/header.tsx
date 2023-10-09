import Logo from "@web/components/atoms/logo";
import s from "./header.module.css";

export default function Header() {
  return (
    <header className={s.header}>
      <Logo />
    </header>
  );
}
