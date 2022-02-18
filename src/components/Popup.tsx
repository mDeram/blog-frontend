import React, { useState } from "react";
import useOuterClick from "../hooks/useOuterClick";
import styles from "../styles/Popup.module.scss";

export interface PopupProps {
    trigger: JSX.Element | ((open: () => void) => JSX.Element)
    closeOnDocumentClick?: boolean
    hideTriggerOnShow?: boolean
}

const Popup: React.FC<PopupProps> = ({
    children,
    trigger,
    closeOnDocumentClick = true,
    hideTriggerOnShow = false
}) => {
    const [show, setShow] = useState(false);
    const ref = useOuterClick(handleSetHide, closeOnDocumentClick ? show : false);

    function handleSetShow() {
        setShow(true);
    }

    function handleSetHide() {
        setShow(false);
    }

    function renderTrigger() {
        if (typeof trigger === "function")
            return trigger(handleSetShow);
        return React.cloneElement(trigger, { onClick: handleSetShow });
    }

    function renderChildren() {
        if (typeof children === "function")
            return children(handleSetHide);
        return children;
    }

    return (
        <>
            {hideTriggerOnShow
                ? !show && renderTrigger()
                : renderTrigger()
            }
            {show &&
                <div className={styles.popup} ref={ref as any}>
                    {renderChildren()}
                </div>
            }
        </>
    )
}

export default Popup;
