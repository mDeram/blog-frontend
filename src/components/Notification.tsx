import { useEffect, useRef, useState } from "react";
import styles from "../styles/Notification.module.scss";

interface Notification {
    type: "Error" | "Success";
    message: string;
    duration: number;
}

type NotificationWithKey = Notification & { key: number };

function wrongUsageAlert(data: Notification) {
    console.log(
        "NotificationStore is not initialized early enough try rendering NotificationManager earlier",
        `(Notification : "${data.message}")`
    )
}

const NotificationStore = {
    NotificationPush: wrongUsageAlert
}

const NotificationManager: React.FC = () => {
    const [notifications, setNotifications] = useState<NotificationWithKey[]>([])
    const key = useRef(0);

    useEffect(() => {
        NotificationStore.NotificationPush = handleNotificationPush;
    }, []);

    function deleteNotification(toDelete: Notification) {
        setNotifications(prev => {
            return prev.filter(notification => notification !== toDelete);
        });
    }

    function handleNotificationPush(data: Notification) {
        key.current += 1;
        const newNotification = {
            ...data,
            key: key.current
        }
        setNotifications(prev => {
            return [...prev, newNotification];
        });
        setTimeout(() => deleteNotification(newNotification), data.duration);
    }

    return (
        <div className={styles.notificationManager}>
            {notifications.map(notification =>
                <div className={styles[notification.type.toLowerCase()]} key={notification.key}>
                    <p className={styles.type}>{notification.type}</p>
                    <p className={styles.message}>{notification.message}</p>
                </div>
            )}
        </div>
    )
}

export { NotificationStore };
export default NotificationManager;
