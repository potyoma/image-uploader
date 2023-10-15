import Logo from "@web/components/atoms/logo/logo";
import s from "./header-logo.module.css";
import Counter, { CounterSkeleton } from "@web/components/atoms/counter";
import Link from "next/link";
import { Suspense } from "react";

export default function HeaderLogo() {
  return (
    <div className={s.container}>
      <Link href="/">
        <Logo />
      </Link>
      <Suspense fallback={<CounterSkeleton />}>
        <Counter />
      </Suspense>
    </div>
  );
}
