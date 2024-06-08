import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "./hooks/ThemeContext";
import { TodoContext } from "./hooks/TodoContext";
import TodoItem from "./components/TodoItem";

export default function App() {
    const todoCtx = useContext(TodoContext);
    const themeCtx = useContext(ThemeContext);

    const todoInputRef = useRef<HTMLInputElement>(null);
    const datetimeRef = useRef<HTMLSpanElement>(null);

    function addTodo(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();

        if (!todoInputRef.current) {
            return;
        }

        const todo = todoInputRef.current.value;

        if (!todo) {
            alert("You must write something!");

            return;
        }

        todoCtx.addTodo(todo);

        // Empty the input field.
        todoInputRef.current.value = "";
    }

    useEffect(() => {
        // Update the datetime every second.
        const datetimeInterval = setInterval(() => {
            if (!datetimeRef.current) {
                return;
            }

            datetimeRef.current.innerHTML = new Date().toLocaleString();
        }, 1000);

        return () => {
            clearInterval(datetimeInterval);
        };
    }, []);

    return (
        <>
            <div id="header">
                <div className="flexrow-container">
                    <div
                        className="standard-theme theme-selector"
                        onClick={() => {
                            themeCtx.setTheme("standard");
                        }}
                    />

                    <div
                        className="light-theme theme-selector"
                        onClick={() => {
                            themeCtx.setTheme("light");
                        }}
                    />

                    <div
                        className="darker-theme theme-selector"
                        onClick={() => {
                            themeCtx.setTheme("darker");
                        }}
                    />
                </div>

                <h1 id="title">
                    To-Do List
                    <div id="border" />
                </h1>
            </div>

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

            <p>
                <span id="datetime" ref={datetimeRef}>
                    {new Date().toLocaleString()}
                </span>
            </p>

            <div id="myUnOrdList">
                <ul className="todo-list">
                    {todoCtx.todos.map((todo, i) => (
                        <TodoItem
                            key={`${i.toString()}-${Date.now().toString()}`}
                            todo={todo}
                        />
                    ))}
                </ul>
            </div>
        </>
    );
}
