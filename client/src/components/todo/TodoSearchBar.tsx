import { Dispatch, SetStateAction, useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import "./TodoSearchBar.css";

interface Props {
    readonly title: string;
    readonly setTitle: Dispatch<SetStateAction<string>>;
    readonly setPage: Dispatch<SetStateAction<number>>;
}

export default function TodoSearchBar(props: Props) {
    const { title, setTitle, setPage } = props;

    const themeCtx = useContext(ThemeContext);

    return (
        <input
            type="text"
            className={`${themeCtx.theme}-input todo-search-bar`}
            placeholder="Search title..."
            value={title}
            onChange={(e) => {
                setTitle(e.target.value);

                // Reset page to 1 when searching.
                setPage(1);
            }}
        />
    );
}
