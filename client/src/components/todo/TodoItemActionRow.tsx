import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { Todo } from "../../model/Todo";

export default function TodoItemActionRow(props: { todo: Todo }) {
    const themeCtx = useContext(ThemeContext);

    return (
        <div className="action-row">
            <button className={`${themeCtx.theme}-button action-button`}>
                Edit
            </button>

            <button className={`${themeCtx.theme}-button action-button`}>
                Delete
            </button>
        </div>
    );
}
