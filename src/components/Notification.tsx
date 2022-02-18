import { useEffect, useRef, useState } from "react";
import styles from "../styles/Notification.module.scss";

export interface NotificationProps {
    type: "Error" | "Success";
    message: string | JSX.Element;
    duration: number;
}

function wrongUsageAlert(data: NotificationProps) {
    console.log(
        "NotificationStore is not initialized early enough try rendering NotificationManager earlier",
        `(Notification : "${data.message}")`
    )
}

const NotificationStore = {
    push: wrongUsageAlert
}

const Notification: React.FC<NotificationProps> = ({
    type,
    message
}) => {
    return (
        <div className={styles[type.toLowerCase()]}>
            <p className={styles.type}>{type}</p>
            <div className={styles.message}>
                {typeof message === "string" ? <p>{message}</p> : message}
            </div>
        </div>
    )
}

const NotificationManager: React.FC = () => {
    const [notifications, setNotifications] = useState<(NotificationProps & { key: number })[]>([])
    const key = useRef(0);

    useEffect(() => {
        NotificationStore.push = handleNotificationPush;
    }, []);

    function deleteNotification(toDelete: NotificationProps) {
        setNotifications(prev => {
            return prev.filter(notification => notification !== toDelete);
        });
    }

    function handleNotificationPush(data: NotificationProps) {
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
                <Notification { ...notification } />
            )}
        </div>
    )
}

export { NotificationStore };
export default NotificationManager;
