import React, { useState } from "react";
import { NotificationProps, NotificationStore } from "../components/Notification";

interface ConfirmDeleteArticlePopupProps {
    closeCb: () => void;
    deleteCb: () => Promise<boolean>;
    name: string;
    show: boolean
}

const ConfirmDeleteArticlePopup: React.FC<ConfirmDeleteArticlePopupProps> = ({
    closeCb,
    deleteCb,
    name,
    show
}) => {
    const [value, setValue] = useState("");

    if (!show) return null;

    function setError(message: NotificationProps["message"]) {
        NotificationStore.NotificationPush({
            type: "Error",
            message,
            duration: 3000
        });
    }

    async function handleDelete() {
        if (value !== name) {
            setError(<p>Name <strong>{value}</strong> is different than <strong>{name}</strong></p>);
            return;
        }
        const isDeleted = await deleteCb();
        if (isDeleted) {
            NotificationStore.NotificationPush({
                type: "Success",
                message: <p><strong>{name}</strong> has been deleted</p>,
                duration: 2500
            });
        } else {
            setError(<p>Could not delete <strong>{name}</strong> please try again later...</p>);
            return;
        }

        closeCb();
    }

    return (
        <div>
            <h2>Delete {name}?</h2>
            <p>To delete {name} type in <strong>&quot;{name}&quot;</strong> and press delete.</p>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={_ => closeCb()}>Cancel</button>
            <button onClick={_ => handleDelete()}>Delete</button>
        </div>
    )
}

export default ConfirmDeleteArticlePopup;
