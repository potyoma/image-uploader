import Image from "next/image";
import styles from "./page.module.css";
import { PICS } from "@web/stab/pics";
import ImageBlock from "@web/components/organisms/image-block/image-block";

export default function Home() {
  return (
    <>
      {PICS.map(p => (
        <ImageBlock
          key={p.date.replace(" ", "_").toLowerCase()}
          date={p.date}
          pics={p.pics}
        />
      ))}
    </>
  );
}
