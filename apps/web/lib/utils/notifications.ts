import type { Notification } from "@web/store/models/notification";

export function success(message: string): Notification {
  return { status: "success", heading: "Cool", message };
}

export function failed(message: string): Notification {
  return { status: "error", heading: "Sorry, but", message };
}
