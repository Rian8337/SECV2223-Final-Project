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

    const addTodo = (todo: string) => {
        setTodos((prevTodos) => {
            const newTodos = prevTodos.concat(todo);

            localStorage.setItem("todos", JSON.stringify(newTodos));

            return newTodos;
        });
    };

    const removeTodo = (todo: string) => {
        setTodos((prevTodos) => {
            const newTodos = prevTodos.filter((value) => value !== todo);

            localStorage.setItem("todos", JSON.stringify(newTodos));

            return newTodos;
        });
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
