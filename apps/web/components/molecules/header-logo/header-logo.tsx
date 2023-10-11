import Logo from "@web/components/atoms/logo/logo";
import s from "./header-logo.module.css";
import Counter from "@web/components/atoms/counter/counter";
import Link from "next/link";

export default function HeaderLogo() {
  return (
    <div className={s.container}>
      <Link href="/">
        <Logo />
      </Link>
      <Counter />
    </div>
  );
}
