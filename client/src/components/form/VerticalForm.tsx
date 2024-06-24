import { PropsWithChildren } from "react";
import "./VerticalForm.css";

interface Props {
    readonly onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function VerticalForm(props: PropsWithChildren<Props>) {
    return (
        <form className="vertical-form" onSubmit={props.onSubmit}>
            {props.children}
        </form>
    );
}
