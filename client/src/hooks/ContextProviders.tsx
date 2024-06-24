import { FC } from "react";
import { TodoContextProvider } from "./TodoContext";
import { ThemeContextProvider } from "./ThemeContext";
import { UserContextProvider } from "./UserContext";
import { FamilyContextProvider } from "./FamilyContext";
import { TodoSearchPageContextProvider } from "./TodoSearchPageContext";
import { TodoSearchTitleContextProvider } from "./TodoSearchTitleContext";
import { TodoSearchCompletedContextProvider } from "./TodoSearchCompletedContext";

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
    UserContextProvider,
    TodoSearchTitleContextProvider,
    TodoSearchPageContextProvider,
    TodoSearchCompletedContextProvider
);
