import { faCheck, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import { TodoContext } from "../hooks/TodoContext";

export default function TodoItem(props: { todo: string }) {
    const { todo } = props;

    const divRef = useRef<HTMLDivElement>(null);
    const todoCtx = useContext(TodoContext);
    const themeCtx = useContext(ThemeContext);

    function checkTodo(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!divRef.current) {
            return;
        }

        divRef.current.classList.toggle("completed");
    }

    function deleteTodo(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!divRef.current) {
            return;
        }

        // Enable delete animation.
        divRef.current.classList.add("fall");

        // Remove the todo from the list after the animation ends.
        divRef.current.addEventListener("transitionend", () => {
            todoCtx.removeTodo(todo);
        });
    }

    return (
        <div className={`todo ${themeCtx.theme}-todo`} ref={divRef}>
            <li className="todo-item">{todo}</li>
            <button
                className={`check-btn ${themeCtx.theme}-button`}
                type="button"
                onClick={checkTodo}
            >
                <FontAwesomeIcon icon={faCheck} />
            </button>

            <button
                className={`delete-btn ${themeCtx.theme}-button`}
                type="button"
                onClick={deleteTodo}
            >
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
    );
}
