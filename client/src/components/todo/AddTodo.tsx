import { useContext, useRef, useState } from "react";
import { TodoContext } from "../../hooks/TodoContext";
import { ThemeContext } from "../../hooks/ThemeContext";
import TodoService from "../../infrastructure/todo";
import VerticalForm from "../form/VerticalForm";
import VerticalFormError from "../form/VerticalFormError";
import SectionHeader from "../SectionHeader";

export default function AddTodo() {
    const todoCtx = useContext(TodoContext);
    const themeCtx = useContext(ThemeContext);

    const todoTitleRef = useRef<HTMLInputElement>(null);
    const todoDescriptionRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function addTodo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);
        setIsSubmitting(true);

        const formData = new FormData(event.currentTarget);
        const title = formData.get("title") as string;
        const description = (formData.get("description") ?? undefined) as
            | string
            | undefined;

        TodoService.addTodo(title, description)
            .then((todo) => {
                const newTodos = todoCtx.todos.slice();
                newTodos.unshift(todo);

                todoCtx.setTodos(newTodos);

                if (todoTitleRef.current) {
                    todoTitleRef.current.value = "";
                }

                if (todoDescriptionRef.current) {
                    todoDescriptionRef.current.value = "";
                }
            })
            .catch((e: unknown) => {
                console.error(e);

                setError(
                    e instanceof Error
                        ? e.message
                        : "An error occurred. Please try again later."
                );
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    return (
        <>
            <SectionHeader>Add Todo</SectionHeader>

            <VerticalForm onSubmit={addTodo}>
                <input
                    className={`${themeCtx.theme}-input`}
                    type="text"
                    name="title"
                    placeholder="Enter title..."
                    required
                    disabled={isSubmitting}
                    ref={todoTitleRef}
                />

                <input
                    className={`${themeCtx.theme}-input`}
                    type="text"
                    name="description"
                    placeholder="Enter description..."
                    required
                    disabled={isSubmitting}
                    ref={todoDescriptionRef}
                />

                <VerticalFormError error={error} />

                <button
                    className={`${themeCtx.theme}-button`}
                    type="submit"
                    disabled={isSubmitting}
                >
                    Add Todo
                </button>
            </VerticalForm>
        </>
    );
}
