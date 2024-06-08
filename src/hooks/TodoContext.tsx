import { PropsWithChildren, createContext, useState } from "react";

const defaultValue = JSON.parse(
    localStorage.getItem("todos") ?? "[]"
) as string[];

export const TodoContext = createContext({
    todos: defaultValue as readonly string[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    addTodo: (_: string) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    removeTodo: (_: string) => {},
});

export function TodoContextProvider(props: PropsWithChildren) {
    const [todos, setTodos] = useState<string[]>(defaultValue);

    const updateTodos = (todos: string[]) => {
        setTodos(() => todos);

        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const addTodo = (todo: string) => {
        updateTodos(todos.concat(todo));
    };

    const removeTodo = (todo: string) => {
        updateTodos(todos.filter((value) => value !== todo));
    };

    return (
        <TodoContext.Provider
            value={{
                todos,
                addTodo,
                removeTodo,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}
