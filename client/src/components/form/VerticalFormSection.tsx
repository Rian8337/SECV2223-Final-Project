import { PropsWithChildren } from "react";
import "./VerticalFormSection.css";

export default function VerticalFormSection(props: PropsWithChildren) {
    return <div className="vertical-form-section">{props.children}</div>;
}
