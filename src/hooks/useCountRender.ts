import { useRef } from "react"

const useCountRender = (name: string) => {
    const renderCount = useRef(0);
    console.log(`${name} render count: `, ++renderCount.current);
}

export default useCountRender;
