import { PropsWithChildren, createContext, useState } from "react";

const defaultValue = 1;

export const TodoSearchPageContext = createContext({
    page: defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setPage: (_: number) => {},
});

export function TodoSearchPageContextProvider(props: PropsWithChildren) {
    const [page, setPage] = useState(defaultValue);

    return (
        <TodoSearchPageContext.Provider
            value={{ page: page, setPage: setPage }}
        >
            {props.children}
        </TodoSearchPageContext.Provider>
    );
}
