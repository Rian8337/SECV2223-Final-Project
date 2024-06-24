import { Dispatch, SetStateAction, useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import "./TodoListPagination.css";

interface Props {
    readonly page: number;
    readonly setPage: Dispatch<SetStateAction<number>>;
    readonly disabled: boolean;
    readonly disableNext: boolean;
}

export default function TodoListPagination(props: Props) {
    const { page, setPage, disabled, disableNext } = props;

    const themeCtx = useContext(ThemeContext);

    return (
        <div className="todo-list-pagination">
            <button
                type="button"
                className={`${themeCtx.theme}-button`}
                onClick={() => {
                    setPage(page - 1);
                }}
                disabled={page <= 1 || disabled}
            >
                Previous
            </button>
            <button
                type="button"
                className={`${themeCtx.theme}-button`}
                disabled
            >
                Page {page}
            </button>
            <button
                type="button"
                className={`${themeCtx.theme}-button`}
                onClick={() => {
                    setPage(page + 1);
                }}
                disabled={disableNext || disabled}
            >
                Next
            </button>
        </div>
    );
}
