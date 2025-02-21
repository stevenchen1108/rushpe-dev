import { useState, useEffect } from "react";

export default function SpringCounter ({ target, speed = 17 }: { target: number, speed: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        var currCount = 1;
        var increment = 1;
        const interval = setInterval(() => {
            increment = Math.ceil((target - currCount) / (speed));
            currCount += increment;
            if (currCount >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(currCount);
            }
        }, 40);

        return () => clearInterval(interval);
    }, [target]);

    return <>{count}</>;
};