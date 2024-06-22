import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
import {
    Navigate,
    Route,
    Routes,
    useLocation,
    useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FamilyPage from "./pages/FamilyPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext } from "./hooks/UserContext";
import { useContext, useEffect } from "react";
import TaskPage from "./pages/TaskPage";
import UserService from "./infrastructure/user";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    const isAuthenticated = !!userCtx.value;

    useEffect(() => {
        if (userCtx.value !== undefined) {
            return;
        }

        // Try to login user in case the session is still valid.
        const controller = new AbortController();

        UserService.loginWithCookie(controller.signal)
            .then((user) => {
                userCtx.setValue(user);

                if (
                    location.pathname === "/login" ||
                    location.pathname === "/register"
                ) {
                    navigate("/");
                }
            })
            .catch(() => {
                // User not logged in.
                userCtx.setValue(null);
            });

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Header />

            <AnimatePresence mode="wait">
                <Routes>
                    <Route
                        path="/family"
                        element={
                            isAuthenticated ? (
                                <FamilyPage />
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />

                    <Route
                        path="/login"
                        element={
                            isAuthenticated ? (
                                <Navigate to={"/"} />
                            ) : (
                                <LoginPage />
                            )
                        }
                    />

                    <Route
                        path="/register"
                        element={
                            isAuthenticated ? (
                                <Navigate to={"/"} />
                            ) : (
                                <RegisterPage />
                            )
                        }
                    />

                    <Route
                        path="/tasks"
                        element={
                            isAuthenticated ? (
                                <TaskPage />
                            ) : (
                                <Navigate to={"/login"} />
                            )
                        }
                    />

                    <Route path="*" element={<HomePage />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}
