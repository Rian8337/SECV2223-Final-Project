import ThemeSelector from "./ThemeSelector";
import TopMenu from "./TopMenu";
import "./Header.css";
import DateTime from "./DateTime";

export default function Header() {
    return (
        <div id="header">
            <div className="flexrow-container">
                <TopMenu />
                <ThemeSelector />
            </div>

            <h1 id="title">To-Do List</h1>
            <DateTime />
        </div>
    );
}
