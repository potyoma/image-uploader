import s from "./header.module.css";
import UploadButton from "../upload-button";
import HeaderLogo from "@web/components/molecules/header-logo/header-logo";

export default function Header() {
  return (
    <header className={s.header}>
      <HeaderLogo />
      <UploadButton />
    </header>
  );
}
