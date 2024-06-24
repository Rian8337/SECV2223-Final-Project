import { useContext } from "react";
import { TodoContext } from "../../hooks/TodoContext";
import TodoItem from "./TodoItem";
import { ThemeContext } from "../../hooks/ThemeContext";
import SectionHeader from "../SectionHeader";

export default function TodoList() {
    const themeCtx = useContext(ThemeContext);
    const todoCtx = useContext(TodoContext);

    if (todoCtx.todos.length === 0) {
        return <p>No todos yet.</p>;
    }

    return (
        <>
            <SectionHeader>Todo List</SectionHeader>

            <table className={themeCtx.theme} style={{ marginBottom: "1em" }}>
                <thead>
                    <tr>
                        <th>Todo</th>
                        <th>Description</th>
                        <th>Created At</th>
                        <th>Done</th>
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
