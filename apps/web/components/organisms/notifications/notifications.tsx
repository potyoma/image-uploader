"use client";

import { useImageKeeperStore } from "@web/store";
import { nanoid } from "nanoid";
import Notification from "@web/components/molecules/notification";
import s from "./notifications.module.css";
import { useShallow } from "zustand/react/shallow";
import { useEffect } from "react";

export default function Notifications() {
  const notifications = useImageKeeperStore(
    useShallow(state => state.notifications)
  );

  const { removeNotification } = useImageKeeperStore();

  useEffect(() => {
    notifications.length > 0 && setTimeout(removeNotification, 4000);
  }, [notifications.length]);

  if (notifications.length < 1) return null;

  return (
    <div className={s.notifications}>
      {[...notifications].reverse().map(n => (
        <Notification key={nanoid()} notification={n} />
      ))}
    </div>
  );
}
