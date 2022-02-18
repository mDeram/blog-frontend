import { useEffect, useRef } from "react";

const useOuterClick = (handler: (e: MouseEvent) => void, active: boolean) => {
    const handlerRef = useRef<typeof handler>();
    const ref = useRef<HTMLElement>();

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!active) return;

        function handleClick(e: MouseEvent) {
            if (handlerRef.current && ref.current && !ref.current.contains(e.target as Node)) {
                handlerRef.current(e);
            }
        }

        document.addEventListener("click", handleClick);
        return () => {
            document.removeEventListener("click", handleClick);
        };
    }, [ref, active]);

    return ref;
}

export default useOuterClick;
