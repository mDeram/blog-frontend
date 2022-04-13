import Link from "next/link";
import React from "react";
import Popup from "../components/Popup";

const Discard: React.FC = () => {
    return (
        <Popup trigger={<button>Discard</button>}>
            {(close: () => void) => (
                <div>
                    <p>If you discard, all changes will be lost, are you sure?</p>
                    <button onClick={close}>Cancel</button>
                    <Link href="/editor"><a>Discard</a></Link>
                </div>
            )}
        </Popup>
    )
}

export default Discard;
