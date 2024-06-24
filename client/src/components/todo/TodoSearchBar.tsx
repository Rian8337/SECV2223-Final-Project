import { useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import "./TodoSearchBar.css";
import { TodoSearchTitleContext } from "../../hooks/TodoSearchTitleContext";
import { TodoSearchPageContext } from "../../hooks/TodoSearchPageContext";
import { TodoSearchCompletedContext } from "../../hooks/TodoSearchCompletedContext";

export default function TodoSearchBar() {
    const themeCtx = useContext(ThemeContext);
    const titleCtx = useContext(TodoSearchTitleContext);
    const pageCtx = useContext(TodoSearchPageContext);
    const completedCtx = useContext(TodoSearchCompletedContext);

    return (
        <div className="todo-search-bar">
            <input
                type="text"
                className={`${themeCtx.theme}-input search-title`}
                placeholder="Search title..."
                value={titleCtx.title}
                onChange={(e) => {
                    titleCtx.setTitle(e.target.value);

                    // Reset page to 1 when searching.
                    pageCtx.setPage(1);
                }}
            />

            <div className="todo-search-bar-completed">
                <label htmlFor="completed">Completed</label>

                <select
                    className={themeCtx.theme}
                    id="completed"
                    name="completed"
                    defaultValue="any"
                    onChange={(event) => {
                        const value = event.target.value;

                        if (value === "any") {
                            completedCtx.setCompleted(null);
                        } else if (value === "incomplete") {
                            completedCtx.setCompleted(false);
                        } else {
                            completedCtx.setCompleted(true);
                        }

                        // Reset page to 1 when changing the completed filter.
                        pageCtx.setPage(1);
                    }}
                >
                    <option value="any">Any</option>
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Completed</option>
                </select>
            </div>
        </div>
    );
}
