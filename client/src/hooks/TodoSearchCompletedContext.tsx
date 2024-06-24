import { PropsWithChildren, createContext, useState } from "react";

const defaultValue = null as boolean | null;

export const TodoSearchCompletedContext = createContext({
    completed: defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
    setCompleted: (_: boolean | null) => {},
});

export function TodoSearchCompletedContextProvider(props: PropsWithChildren) {
    const [completed, setCompleted] = useState<boolean | null>(defaultValue);

    return (
        <TodoSearchCompletedContext.Provider
            value={{ completed: completed, setCompleted: setCompleted }}
        >
            {props.children}
        </TodoSearchCompletedContext.Provider>
    );
}
