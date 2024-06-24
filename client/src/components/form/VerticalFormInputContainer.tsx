import { PropsWithChildren } from "react";
import "./VerticalFormInputContainer.css";

interface Props {
    readonly halfSize?: boolean;
}

export default function VerticalFormInputContainer(
    props: PropsWithChildren<Props>
) {
    return (
        <span
            className={
                props.halfSize ? "input-container half-size" : "input-container"
            }
        >
            {props.children}
        </span>
    );
}
