import { useContext, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/UserContext";
import UserService from "../../infrastructure/user";
import VerticalForm from "../form/VerticalForm";
import VerticalFormError from "../form/VerticalFormError";
import VerticalFormSection from "../form/VerticalFormSection";

export default function LoginForm() {
    const navigate = useNavigate();

    const userCtx = useContext(UserContext);
    const themeCtx = useContext(ThemeContext);

    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);
        setIsLoggingIn(true);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        UserService.login(email, password)
            .then((user) => {
                userCtx.setValue(user);

                navigate("/");
            })
            .catch((e: unknown) => {
                console.error(e);

                setError(
                    e instanceof Error
                        ? e.message
                        : "An error occurred. Please try again later."
                );
            })
            .finally(() => {
                setIsLoggingIn(false);
            });
    }

    return (
        <VerticalForm onSubmit={login}>
            <input
                name="email"
                type="email"
                className={`${themeCtx.theme}-input`}
                placeholder="Email"
                required
                autoComplete="email"
                disabled={isLoggingIn}
            />

            <input
                name="password"
                type="password"
                className={`${themeCtx.theme}-input`}
                placeholder="Password"
                required
                disabled={isLoggingIn}
            />

            <VerticalFormError error={error} />

            <VerticalFormSection>
                <button className={`${themeCtx.theme}-button`} type="submit">
                    {isLoggingIn ? "Logging in..." : "Login"}
                </button>

                <button
                    className={`${themeCtx.theme}-button`}
                    type="button"
                    onClick={() => {
                        navigate("/register");
                    }}
                    disabled={isLoggingIn}
                >
                    Don&apos;t have an account? Register an account
                </button>
            </VerticalFormSection>
        </VerticalForm>
    );
}
