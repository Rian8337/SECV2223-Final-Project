import { useContext, useRef } from "react";
import { TodoContext } from "../hooks/TodoContext";
import { ThemeContext } from "../hooks/ThemeContext";

export default function AddTask() {
    const todoCtx = useContext(TodoContext);
    const themeCtx = useContext(ThemeContext);

    const todoInputRef = useRef<HTMLInputElement>(null);

    function addTodo(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!todoInputRef.current) {
            return;
        }

        const task = todoInputRef.current.value;

        if (!task) {
            alert("You must write something!");

            return;
        }

        todoCtx.addTodo({
            task: task,
            checked: false,
        });

        // Empty the input field.
        todoInputRef.current.value = "";
    }

    return (
        <div id="form">
            <form>
                <input
                    className={`${themeCtx.theme}-input`}
                    type="text"
                    placeholder="Add a task."
                    ref={todoInputRef}
                />

                <button
                    className={`${themeCtx.theme}-button`}
                    type="submit"
                    onClick={addTodo}
                >
                    I Got This!
                </button>
            </form>
        </div>
    );
}
