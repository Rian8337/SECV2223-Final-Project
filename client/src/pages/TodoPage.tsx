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
import TodoListPagination from "../components/todo/TodoListPagination";
import { motion } from "framer-motion";
import SectionHeader from "../components/SectionHeader";
import TodoSearchBar from "../components/todo/TodoSearchBar";

export default function TodoPage() {
    const navigate = useNavigate();

    const userCtx = useContext(UserContext);
    const themeCtx = useContext(ThemeContext);
    const todoCtx = useContext(TodoContext);

    const [title, setTitle] = useState("");
    const [page, setPage] = useState(1);

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsQuerying] = useState(false);

    useEffect(() => {
        if (userCtx.value === null) {
            navigate("/login");

            return;
        }

        if (!userCtx.value?.family_id) {
            return;
        }

        const controller = new AbortController();

        const debounce = setTimeout(() => {
            setError(null);
            setIsQuerying(true);

            // Get existing todos from the server
            TodoService.getTodos(title, page)
                .then((data) => {
                    todoCtx.setTodos(data);
                })
                .catch((e: unknown) => {
                    if (e instanceof DOMException && e.name === "AbortError") {
                        return;
                    }

                    console.error(e);

                    setError(
                        e instanceof Error
                            ? e.message
                            : "An error occurred. Please try again later."
                    );

                    todoCtx.setTodos([]);
                })
                .finally(() => {
                    setIsQuerying(false);
                });
        }, 250);

        return () => {
            controller.abort();

            clearTimeout(debounce);
        };

        // We only want to run this hook once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCtx.value, page, title]);

    return (
        <PageWrapper>
            <AddTodo />

            <hr className={themeCtx.theme} />

            {error ? (
                <motion.p
                    className="todo-page-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                >
                    {error}
                </motion.p>
            ) : null}

            {/* This is specially put here as search bar should come first. */}
            <SectionHeader>Todo List</SectionHeader>

            <TodoSearchBar
                title={title}
                setTitle={setTitle}
                setPage={setPage}
            />

            <TodoList />

            <TodoListPagination
                page={page}
                setPage={setPage}
                disableNext={todoCtx.todos.length < 10}
                disabled={isSubmitting}
            />
        </PageWrapper>
    );
}
