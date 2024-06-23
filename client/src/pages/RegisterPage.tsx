import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RegisterForm from "../components/register/RegisterForm";
import { UserContext } from "../hooks/UserContext";

export default function RegisterPage() {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);

    useEffect(() => {
        if (userCtx.value) {
            navigate("/");
        }
    }, [navigate, userCtx.value]);

    return (
        <>
            <h2>Register</h2>

            <RegisterForm />
        </>
    );
}
