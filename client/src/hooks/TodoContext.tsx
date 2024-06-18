import { PropsWithChildren, createContext, useState } from "react";
import { Todo } from "../types/Todo";

const defaultValue = JSON.parse(
    localStorage.getItem("todos") ?? "[]"
) as readonly Todo[];

export const TodoContext = createContext({
    todos: defaultValue,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    addTodo: (_: Todo) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    removeTodo: (_: Todo) => {},
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    toggleTodoCheck: (_: Todo) => {},
});

export function TodoContextProvider(props: PropsWithChildren) {
    const [todos, setTodos] = useState(defaultValue);

    const addTodo = (todo: Todo) => {
        setTodos((prevTodos) => {
            const newTodos = prevTodos.concat(todo);

            localStorage.setItem("todos", JSON.stringify(newTodos));

            return newTodos;
        });
    };

    const removeTodo = (todo: Todo) => {
        setTodos((prevTodos) => {
            const newTodos = prevTodos.filter(
                (value) => value.task !== todo.task
            );

            localStorage.setItem("todos", JSON.stringify(newTodos));

            return newTodos;
        });
    };

    const toggleTodoCheck = (todo: Todo) => {
        setTodos((prevTodos) => {
            const newTodos = prevTodos.map((v) =>
                v.task === todo.task ? { ...v, checked: !v.checked } : v
            );

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
                toggleTodoCheck,
            }}
        >
            {props.children}
        </TodoContext.Provider>
    );
}
