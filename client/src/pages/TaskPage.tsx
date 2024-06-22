import { useContext, useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import TodoList from "../components/tasks/TodoList";
import { TodoContext } from "../hooks/TodoContext";
import TodoService from "../infrastructure/todo";
import "./TaskPage.css";

export default function TaskPage() {
    const todoCtx = useContext(TodoContext);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Get existing todos from the server
        TodoService.getTodos()
            .then((data) => {
                todoCtx.setTodos(data);
            })
            .catch((e: unknown) => {
                setError(
                    e instanceof Error
                        ? e.message
                        : "An error occurred. Please try again later."
                );
            });
    }, [todoCtx]);

    return (
        <PageWrapper>
            <h2>Tasks</h2>

            {error ? <p className="task-page-error">{error}</p> : <TodoList />}
        </PageWrapper>
    );
}
