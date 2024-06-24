import { PropsWithChildren, createContext, useState } from "react";

const defaultValue = "";

export const TodoSearchTitleContext = createContext({
    title: defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setTitle: (_: string) => {},
});

export function TodoSearchTitleContextProvider(props: PropsWithChildren) {
    const [title, setTitle] = useState(defaultValue);

    return (
        <TodoSearchTitleContext.Provider
            value={{ title: title, setTitle: setTitle }}
        >
            {props.children}
        </TodoSearchTitleContext.Provider>
    );
}
