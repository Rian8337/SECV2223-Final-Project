import { Dispatch, SetStateAction, useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";

export default function TodoItemActionRow(props: {
    isEditing: boolean;
    setIsEditing: Dispatch<SetStateAction<boolean>>;
    editTodo: () => unknown;
    deleteTodo: () => unknown;
}) {
    const { isEditing, setIsEditing, editTodo, deleteTodo } = props;
    const themeCtx = useContext(ThemeContext);

    return (
        <div className="action-row">
            <button
                type="button"
                className={`${themeCtx.theme}-button action-button`}
                onClick={() => {
                    if (isEditing) {
                        editTodo();
                    } else {
                        setIsEditing(true);
                    }
                }}
            >
                {isEditing ? "Save" : "Edit"}
            </button>

            <button
                type="button"
                className={`${themeCtx.theme}-button action-button`}
                disabled={isEditing}
                onClick={() => {
                    deleteTodo();
                }}
            >
                Delete
            </button>
        </div>
    );
}
