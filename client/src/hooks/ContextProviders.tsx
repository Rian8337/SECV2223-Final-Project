import { FC } from "react";
import { TodoContextProvider } from "./TodoContext";
import { ThemeContextProvider } from "./ThemeContext";
import { UserContextProvider } from "./UserContext";

const compose =
    (...components: FC<Record<string, unknown>>[]) =>
    (props: { children: JSX.Element }) =>
        components.reduce(
            (children, Current) => <Current {...props}>{children}</Current>,
            props.children
        );

export const Providers = compose(
    TodoContextProvider,
    ThemeContextProvider,
    UserContextProvider
);
