import { FC } from "react";
import { TodoContextProvider } from "./TodoContext";
import { ThemeContextProvider } from "./ThemeContext";
import { UserContextProvider } from "./UserContext";
import { FamilyContextProvider } from "./FamilyContext";

const compose =
    (...components: FC<Record<string, unknown>>[]) =>
    (props: { children: JSX.Element }) =>
        components.reduce(
            (children, Current) => <Current {...props}>{children}</Current>,
            props.children
        );

export const Providers = compose(
    FamilyContextProvider,
    TodoContextProvider,
    ThemeContextProvider,
    UserContextProvider
);
