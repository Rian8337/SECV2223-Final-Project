import { PropsWithChildren, createContext, useState } from "react";
import { Todo } from "../types/Todo";

const defaultValue = [] as readonly Todo[];

export const TodoContext = createContext({
    todos: defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    setTodos: (_: Todo[]) => {},
});

export function TodoContextProvider(props: PropsWithChildren) {
    const [todos, setTodos] = useState(defaultValue);

    const modifyTodos = (todos: Todo[]) => {
        setTodos(() => todos);
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                setTodos: modifyTodos,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}
