import { PropsWithChildren } from "react";

export default function SectionHeader(props: PropsWithChildren) {
    return (
        <h2 className="text-3xl font-semibold text-center">{props.children}</h2>
    );
}
