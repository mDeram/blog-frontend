import React, { useState } from "react";
import Popup from "../components/Popup";
import { pushNotificationError, pushNotificationSuccess } from "../utils/defaultNotifications";

interface DeleteArticleProps {
    deleteCb: () => Promise<boolean>;
    name: string;
    openRef: React.MutableRefObject<Function | undefined>;
    closeRef: React.MutableRefObject<Function | undefined>;
}

const DeleteArticle: React.FC<DeleteArticleProps> = ({
    deleteCb,
    name,
    openRef,
    closeRef
}) => {
    const [value, setValue] = useState("");

    async function handleDelete() {
        if (value !== name) {
            pushNotificationError(
                <p>Name <strong>{value}</strong> is different than <strong>{name}</strong></p>
            );
            return;
        }

        const isDeleted = await deleteCb();
        if (!isDeleted) {
            pushNotificationError(
                <p>Could not delete <strong>{name}</strong> please try again later...</p>
            );
            return;
        }

        pushNotificationSuccess(<p><strong>{name}</strong> has been deleted</p>);
        closeRef.current!();
    }

    return (
        <Popup openRef={openRef} closeRef={closeRef}>
            <div>
                <h2>Delete {name}?</h2>
                <p>To delete {name} type in <strong>&quot;{name}&quot;</strong> and press delete.</p>
                <input
                    type="text"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
                <button onClick={() => closeRef.current!()}>Cancel</button>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </Popup>
    )
}

export default DeleteArticle;
