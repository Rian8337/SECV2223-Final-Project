import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import "./TodoListPagination.css";
import { TodoContext } from "../../hooks/TodoContext";
import { TodoSearchPageContext } from "../../hooks/TodoSearchPageContext";

export default function TodoListPagination(props: { disabled: boolean }) {
    const themeCtx = useContext(ThemeContext);
    const todoCtx = useContext(TodoContext);
    const pageCtx = useContext(TodoSearchPageContext);

    return (
        <div className="todo-list-pagination">
            <button
                type="button"
                className={`${themeCtx.theme}-button`}
                onClick={() => {
                    pageCtx.setPage(pageCtx.page - 1);
                }}
                disabled={pageCtx.page <= 1 || props.disabled}
            >
                Previous
            </button>
            <button
                type="button"
                className={`${themeCtx.theme}-button`}
                disabled
            >
                Page {pageCtx.page}
            </button>
            <button
                type="button"
                className={`${themeCtx.theme}-button`}
                onClick={() => {
                    pageCtx.setPage(pageCtx.page + 1);
                }}
                disabled={todoCtx.todos.length < 10 || props.disabled}
            >
                Next
            </button>
        </div>
    );
}
