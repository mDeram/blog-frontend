import React from "react";
import Popup from "../components/Popup";

interface RestoreEditionPopupProps {
    restore: () => any;
    openRef?: React.MutableRefObject<Function | undefined>;
    date: any;
}

const RestoreEditionPopup: React.FC<RestoreEditionPopupProps> = ({
    restore,
    openRef,
    date
}) => {
    function renderDate(date: any) {
        console.log(date);
        if (!date) return;
        const parsedDate = new Date(date);
        const formatedDate = parsedDate.toLocaleString();

        return `from ${formatedDate}`;
    }

    return (
        <Popup openRef={openRef} closeOnDocumentClick={false}>
            {(close: () => void) => (
                <div>
                    <p>Some unsaved data have been found {renderDate(date)}, would you like to restore it?</p>
                    <button onClick={close}>No</button>
                    <button onClick={() => { restore(); close() }}>Yes</button>
                </div>
            )}
        </Popup>
    )
}

export default RestoreEditionPopup;
