import { PropsWithChildren } from "react";

interface Props {
    readonly title: string;
}

export default function HomePageSection(props: PropsWithChildren<Props>) {
    return (
        <div className="grid">
            <div className="intro-statement text-4xl font-normal">
                <strong>{props.title}</strong>
            </div>
            <br />
            {props.children}
        </div>
    );
}
