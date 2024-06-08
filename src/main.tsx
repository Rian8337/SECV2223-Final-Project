import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ThemeContextProvider } from "./hooks/ThemeContext.tsx";
import { TodoContextProvider } from "./hooks/TodoContext.tsx";
import "./styles/corner.css";
import "./styles/index.css";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <TodoContextProvider>
        <ThemeContextProvider>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ThemeContextProvider>
    </TodoContextProvider>
);
