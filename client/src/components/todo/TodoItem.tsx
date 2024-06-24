import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Todo } from "../../model/Todo";
import TodoItemActionRow from "./TodoItemActionRow";
import { faCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import TodoService from "../../infrastructure/todo";
import { TodoContext } from "../../hooks/TodoContext";
import { TodoSearchCompletedContext } from "../../hooks/TodoSearchCompletedContext";

export default function TodoItem(props: { todo: Todo }) {
    const { todo } = props;

    const themeCtx = useContext(ThemeContext);
    const todoCtx = useContext(TodoContext);
    const todoCompletedFilterCtx = useContext(TodoSearchCompletedContext);

    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const completedRef = useRef<HTMLInputElement>(null);

    function editTodo() {
        if (
            !titleRef.current ||
            !descriptionRef.current ||
            !completedRef.current
        ) {
            return;
        }

        if (
            titleRef.current.value === todo.title &&
            descriptionRef.current.value === todo.description &&
            completedRef.current.checked === todo.completed
        ) {
            return;
        }

        const confirm = window.confirm(
            "Are you sure you want to edit the todo?"
        );

        if (!confirm) {
            return;
        }

        setIsEditing(false);
        setIsSubmitting(true);

        TodoService.editTodo(
            todo.id,
            titleRef.current.value,
            descriptionRef.current.value,
            completedRef.current.checked
        )
            .then((todo) => {
                // When there is a completed status filter applied and
                // the complete status does not match, remove the todo.
                if (
                    todoCompletedFilterCtx.completed !== null &&
                    todo.completed !==
                        todoCtx.todos.find((t) => t.id === todo.id)?.completed
                ) {
                    todoCtx.setTodos(
                        todoCtx.todos.filter((t) => t.id !== todo.id)
                    );

                    return;
                }

                todoCtx.setTodos(
                    todoCtx.todos.map((t) => (t.id === todo.id ? todo : t))
                );
            })
            .catch((e: unknown) => {
                console.error(e);

                alert(e instanceof Error ? e.message : "Failed to edit todo.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    function deleteTodo() {
        const confirm = window.confirm(
            "Are you sure you want to delete the todo?"
        );

        if (!confirm) {
            return;
        }

        setIsSubmitting(true);

        TodoService.deleteTodo(todo.id)
            .then(() => {
                todoCtx.setTodos(todoCtx.todos.filter((t) => t.id !== todo.id));
            })
            .catch((e: unknown) => {
                console.error(e);

                alert(e instanceof Error ? e.message : "Failed to edit todo.");
            })
            .finally(() => {
                setIsSubmitting(false);
            });
    }

    if (isEditing) {
        return (
            <tr key={todo.id}>
                <td>
                    <input
                        type="text"
                        className={`${themeCtx.theme}-input`}
                        name="title"
                        defaultValue={todo.title}
                        required
                        disabled={isSubmitting}
                        ref={titleRef}
                    />
                </td>
                <td>
                    <input
                        type="text"
                        className={`${themeCtx.theme}-input`}
                        name="description"
                        defaultValue={todo.description ?? ""}
                        disabled={isSubmitting}
                        ref={descriptionRef}
                    />
                </td>
                <td>{new Date(todo.created_at).toLocaleString()}</td>
                <td>
                    <input
                        type="checkbox"
                        className={`${themeCtx.theme}-input`}
                        name="completed"
                        defaultChecked={todo.completed}
                        required
                        disabled={isSubmitting}
                        ref={completedRef}
                    />
                </td>
                <td>{todo.user?.name ?? "Unknown"}</td>
                <td>
                    <TodoItemActionRow
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                        editTodo={editTodo}
                        deleteTodo={deleteTodo}
                    />
                </td>
            </tr>
        );
    }

    return (
        <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>{todo.description ?? "None"}</td>
            <td>{new Date(todo.created_at).toLocaleString()}</td>
            <td>
                <FontAwesomeIcon
                    icon={todo.completed ? faCheck : faCircleXmark}
                />
            </td>
            <td>{todo.user?.name ?? "Unknown"}</td>
            <td>
                <TodoItemActionRow
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editTodo={editTodo}
                    deleteTodo={deleteTodo}
                />
            </td>
        </tr>
    );
}
