import Logo from "@web/components/atoms/logo";
import s from "./header.module.css";
import UploadButton from "../upload-button";

export default function Header() {
  return (
    <header className={s.header}>
      <Logo />
      <UploadButton />
    </header>
  );
}
