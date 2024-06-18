import { AnimatePresence } from "framer-motion";
import Header from "./components/header/Header";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import FamilyPage from "./pages/FamilyPage";
import RegisterPage from "./pages/RegisterPage";

export default function App() {
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
