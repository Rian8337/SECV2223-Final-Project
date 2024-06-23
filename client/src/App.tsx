import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FamilyPage from "./pages/FamilyPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext } from "./hooks/UserContext";
import { useContext, useEffect } from "react";
import TaskPage from "./pages/TaskPage";
import UserService from "./infrastructure/user";
import { ThemeContext } from "./hooks/ThemeContext";
import PageWrapper from "./components/PageWrapper";

export default function App() {
    const themeCtx = useContext(ThemeContext);
    const userCtx = useContext(UserContext);

    useEffect(() => {
        if (userCtx.value !== undefined) {
            return;
        }

        // Try to login user in case the session is still valid.
        const controller = new AbortController();

        UserService.loginWithCookie(controller.signal)
            .then((user) => {
                userCtx.setValue(user);
            })
            .catch((e: unknown) => {
                if (e instanceof DOMException && e.name === "AbortError") {
                    return;
                }

                // User not logged in.
                userCtx.setValue(null);
            });

        return () => {
            controller.abort();
        };
        // We only want this hook to run once.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (userCtx.value === undefined) {
        return (
            <>
                <Header />

                <p>Loading...</p>
            </>
        );
    }

    return (
        <>
            <Header />

            <hr className={themeCtx.theme} />

            <AnimatePresence mode="wait">
                <PageWrapper>
                    <Routes>
                        <Route path="/family" element={<FamilyPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/tasks" element={<TaskPage />} />

                        <Route path="*" element={<HomePage />} />
                    </Routes>
                </PageWrapper>
            </AnimatePresence>
        </>
    );
}
