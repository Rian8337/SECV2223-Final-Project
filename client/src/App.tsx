import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FamilyPage from "./pages/FamilyPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext } from "./hooks/UserContext";
import { useContext, useEffect } from "react";
import { User } from "./types/User";

export default function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        if (userCtx.value !== undefined) {
            return;
        }

        // Try to login user in case the session is still valid.
        fetch(
            "http://localhost/SECV2223-Final-Project/server/api/user/login.php",
            {
                method: "POST",
                credentials: "include",
            }
        )
            .then((response) => {
                switch (response.status) {
                    case 200:
                        return response.json();
                    default:
                        throw new Error();
                }
            })
            .then((data: User) => {
                userCtx.setValue(data);

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
    }, [location.pathname, navigate, userCtx]);

    return (
        <>
            <Header />

            <AnimatePresence mode="wait">
                <Routes>
                    <Route path="/family" element={<FamilyPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route path="*" element={<HomePage />} />
                </Routes>
            </AnimatePresence>
        </>
    );
}
