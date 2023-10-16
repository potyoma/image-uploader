"use client";

import { useImageKeeperStore } from "@web/store";
import { nanoid } from "nanoid";
import Notification from "@web/components/molecules/notification";
import s from "./notifications.module.css";

export default function Notifications() {
  const { notifications } = useImageKeeperStore();

  if (notifications.length < 1) return null;

  return (
    <div className={s.notifications}>
      {[...notifications].reverse().map(n => (
        <Notification key={nanoid()} notification={n} />
      ))}
    </div>
  );
}
