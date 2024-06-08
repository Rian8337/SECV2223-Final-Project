import { PropsWithChildren, createContext, useState } from "react";
import { Todo } from "../types/Todo";

const defaultValue = JSON.parse(
    localStorage.getItem("todos") ?? "[]"
) as Todo[];

export const TodoContext = createContext({
    todos: defaultValue as readonly Todo[],
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
        todo.checked = !todo.checked;

        localStorage.setItem("todos", JSON.stringify(todos));
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
