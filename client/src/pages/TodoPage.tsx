import { useContext, useEffect, useState } from "react";
import TodoList from "../components/todo/TodoList";
import { TodoContext } from "../hooks/TodoContext";
import TodoService from "../infrastructure/todo";
import PageWrapper from "../components/PageWrapper";
import AddTodo from "../components/todo/AddTodo";
import { ThemeContext } from "../hooks/ThemeContext";
import "./TodoPage.css";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

export default function TodoPage() {
    const navigate = useNavigate();

    const userCtx = useContext(UserContext);
    const themeCtx = useContext(ThemeContext);
    const todoCtx = useContext(TodoContext);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userCtx.value === null) {
            navigate("/login");

            return;
        }

        // Get existing todos from the server
        TodoService.getTodos()
            .then((data) => {
                todoCtx.setTodos(data);
            })
            .catch((e: unknown) => {
                console.error(e);

                setError(
                    e instanceof Error
                        ? e.message
                        : "An error occurred. Please try again later."
                );
            });
        // We only want to run this hook once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCtx.value]);

    if (error !== null) {
        return (
            <PageWrapper>
                <h2>Todo</h2>

                <p className="todo-page-error">{error}</p>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <AddTodo />

            <hr className={themeCtx.theme} />

            <TodoList />
        </PageWrapper>
    );
}
