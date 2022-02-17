import React, { useState } from "react";
import { NotificationProps, NotificationStore } from "../components/Notification";

interface ConfirmDeletePopupProps {
    closeCb: () => void;
    deleteCb: () => Promise<boolean>;
    name: string;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({
    closeCb,
    deleteCb,
    name
}) => {
    const [value, setValue] = useState("");

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
        if (!isDeleted) {
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

export default ConfirmDeletePopup;
