export type NotificationStatus = "success" | "error" | "info";

export interface Notification {
  status: NotificationStatus;
  heading: string;
  message: string;
}
