import { PropsWithChildren } from "react";
import "./VerticalFormInputContainer.css";

export default function VerticalFormInputContainer(props: PropsWithChildren) {
    return <span className="input-container">{props.children}</span>;
}
