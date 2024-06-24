import { PropsWithChildren } from "react";

export default function HomePageContainer(props: PropsWithChildren) {
    return <div className="background grid gap-20 p-20">{props.children}</div>;
}
