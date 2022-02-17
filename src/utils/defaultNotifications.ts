import { NotificationProps, NotificationStore } from "../components/Notification";

export const pushNotificationError = (message: NotificationProps["message"]) => {
    NotificationStore.push({
        type: "Error",
        message,
        duration: 3000
    });
}

export const pushNotificationSuccess = (message: NotificationProps["message"]) => {
    NotificationStore.push({
        type: "Success",
        message,
        duration: 2500
    });
}
