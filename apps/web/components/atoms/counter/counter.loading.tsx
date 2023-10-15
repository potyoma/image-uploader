import clsx from "clsx";
import s from "./counter.module.css";

export default function CounterLoading() {
  return <div className={clsx(s.loading, "rounded")}></div>;
}
