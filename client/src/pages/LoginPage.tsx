import { useContext, useEffect } from "react";
import LoginForm from "../components/login/LoginForm";
import { UserContext } from "../hooks/UserContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        if (userCtx.value) {
            navigate("/");
        }
    }, [navigate, userCtx.value]);

    return (
        <>
            <h2>Login</h2>

            <LoginForm />
        </>
    );
}
