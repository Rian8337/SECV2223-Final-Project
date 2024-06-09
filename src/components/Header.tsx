import ThemeSelector from "./ThemeSelector";

export default function Header() {
    return (
        <div id="header">
            <ThemeSelector />

            <h1 id="title">
                To-Do List
                <div id="border" />
            </h1>
        </div>
    );
}
