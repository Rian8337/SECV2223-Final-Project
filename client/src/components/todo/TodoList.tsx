import { useContext } from "react";
import { TodoContext } from "../../hooks/TodoContext";
import TodoItem from "./TodoItem";
import { ThemeContext } from "../../hooks/ThemeContext";

export default function TodoList() {
    const themeCtx = useContext(ThemeContext);
    const todoCtx = useContext(TodoContext);

    if (todoCtx.todos.length === 0) {
        return <p>No todos yet.</p>;
    }

    return (
        <>
            <h2>Todo List</h2>

            <table className={themeCtx.theme}>
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Description</th>
                        <th>Creation Date</th>
                        <th>Completed</th>
                        <th>Created By</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {todoCtx.todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} />
                    ))}
                </tbody>
            </table>
        </>
    );
}