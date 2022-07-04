import Link from "next/link";
import React from "react";
import Popup from "../components/Popup";
import styles from "../styles/Popup.module.scss";

const Discard: React.FC = () => {
    return (
        <Popup trigger={<button className="btn">Discard</button>}>
            {(close: () => void) => (
                <div className={styles.discardPopup}>
                    <p>If you discard, all changes will be lost, are you sure?</p>
                    <div>
                        <button className="btn" onClick={close}>Cancel</button>
                        <Link href="/editor"><a className="btn">Discard</a></Link>
                    </div>
                </div>
            )}
        </Popup>
    )
}

export default Discard;
