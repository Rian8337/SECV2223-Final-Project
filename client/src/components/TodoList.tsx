import { useContext } from "react";
import { TodoContext } from "../hooks/TodoContext";
import TodoItem from "./TodoItem";
import "./TodoList.css";

export default function TodoList() {
    const todoCtx = useContext(TodoContext);

    return (
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
    );
}
