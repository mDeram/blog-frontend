import { useEffect, useRef, useState } from "react";

interface Notification {
    type: "error" | "success";
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
        <div>
            {notifications.map(notification =>
                <div key={notification.key}>
                    <p>{notification.type}</p>
                    <p>{notification.message}</p>
                </div>
            )}
        </div>
    )
}

export { NotificationStore };
export default NotificationManager;
