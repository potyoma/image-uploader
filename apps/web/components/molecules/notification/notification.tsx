import type { Notification } from "@web/store/models/notification";
import s from "./notification.module.css";
import Heading from "@web/components/atoms/heading";
import Text from "@web/components/atoms/text";
import clsx from "clsx";

interface NotificationProps {
  notification: Notification;
}

export default function Notification({ notification }: NotificationProps) {
  return (
    <div className={s.notification}>
      <Heading className={clsx(s.heading, s[notification.status])}>
        {notification.heading}
      </Heading>
      <Text className={s.message}>{notification.message}</Text>
    </div>
  );
}
