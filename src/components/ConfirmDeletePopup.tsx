import React, { useState } from "react";

interface ConfirmDeletePopupProps {
    closeCb: () => void;
    deleteCb: () => Promise<boolean>;
    name: string;
}

const enum ConfirmDeletePopupError {
    None,
    Input,
    DeleteFail
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({
    closeCb,
    deleteCb,
    name
}) => {
    const [value, setValue] = useState("");
    const [error, setError] = useState(ConfirmDeletePopupError.None);

    async function handleDelete() {
        if (value !== name) {
            setError(ConfirmDeletePopupError.Input)
            return;
        }
        const isDeleted = await deleteCb();
        if (!isDeleted) {
            setError(ConfirmDeletePopupError.DeleteFail);
            return;
        }

        closeCb();
    }

    function showError(): null | JSX.Element {
        const errors = {
            [ConfirmDeletePopupError.None]: null,
            [ConfirmDeletePopupError.Input]: <p>Name <strong>{value}</strong> is different than <strong>{name}</strong></p>,
            [ConfirmDeletePopupError.DeleteFail]: <p>Could not delete <strong>{name}</strong> please try again later...</p>
        }

        return errors[error];
    }

    return (
        <div>
            <h2>Delete {name}?</h2>
            <p>To delete {name} type in <strong>"{name}"</strong> and press delete.</p>
            <input
                type="text"
                value={value}
                onChange={e => setValue(e.target.value)}
            />
            <button onClick={_ => closeCb()}>Cancel</button>
            <button
                onClick={_ => handleDelete()}
                onBlur={_ => setError(ConfirmDeletePopupError.None)}
            >Delete</button>
            {showError()}
        </div>
    )
}

export default ConfirmDeletePopup;
