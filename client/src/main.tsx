import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Providers } from "./hooks/ContextProviders.tsx";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById("root")!).render(
    <Providers>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Providers>
);
