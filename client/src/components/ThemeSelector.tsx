import { useContext } from "react";
import { ThemeContext } from "../hooks/ThemeContext";
import "./ThemeSelector.css";

export default function ThemeSelector() {
    const themeCtx = useContext(ThemeContext);

    return (
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
    );
}
