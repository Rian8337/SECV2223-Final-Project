import { useEffect, useRef } from "react";
import "./DateTime.css";

export default function DateTime() {
    const datetimeRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        // Update the datetime every second.
        const datetimeInterval = setInterval(() => {
            if (!datetimeRef.current) {
                return;
            }

            datetimeRef.current.innerHTML = new Date().toLocaleString();
        }, 1000);

        return () => {
            clearInterval(datetimeInterval);
        };
    }, []);

    return (
        <p>
            <span id="datetime" ref={datetimeRef}>
                {new Date().toLocaleString()}
            </span>
        </p>
    );
}
