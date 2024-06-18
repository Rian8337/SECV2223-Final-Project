import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./hooks/ContextProviders.tsx";
import { HashRouter } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Providers>
            <HashRouter>
                <App />
            </HashRouter>
        </Providers>
    </React.StrictMode>
);
