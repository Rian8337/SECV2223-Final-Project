import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { UserContext } from "../../hooks/UserContext";
import UserService from "../../infrastructure/user";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const navigate = useNavigate();
    const userCtx = useContext(UserContext);
    const themeCtx = useContext(ThemeContext);

    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState<string | null>();

    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    function validatePassword() {
        setError(
            passwordRef.current?.value !== confirmPasswordRef.current?.value
                ? "Passwords do not match."
                : null
        );
    }

    function register(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);
        setIsRegistering(true);

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        UserService.register(name, email, password)
            .then((user) => {
                userCtx.setValue(user);
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
                setIsRegistering(false);
            });
    }

    return (
        <form className="vertical-form" onSubmit={register}>
            <input
                name="name"
                type="text"
                className={`${themeCtx.theme}-input`}
                placeholder="Name"
                required
                autoComplete="name"
                disabled={isRegistering}
            />

            <input
                name="email"
                type="email"
                className={`${themeCtx.theme}-input`}
                placeholder="Email"
                required
                autoComplete="email"
                disabled={isRegistering}
            />

            <input
                name="password"
                type="password"
                className={`${themeCtx.theme}-input`}
                placeholder="Password"
                required
                onChange={validatePassword}
                ref={passwordRef}
                autoComplete="new-password"
                disabled={isRegistering}
            />

            <input
                name="confirm-password"
                type="password"
                className={`${themeCtx.theme}-input`}
                placeholder="Confirm Password"
                required
                onChange={validatePassword}
                ref={confirmPasswordRef}
                autoComplete="new-password"
                disabled={isRegistering}
            />

            {error !== null ? <p className="error">{error}</p> : null}

            <div className="vertical-form-section">
                <button
                    className={`${themeCtx.theme}-button`}
                    type="submit"
                    disabled={isRegistering}
                >
                    Register
                </button>

                <button
                    className={`${themeCtx.theme}-button`}
                    type="button"
                    onClick={() => {
                        navigate("/login");
                    }}
                    disabled={isRegistering}
                >
                    Have an account? Login
                </button>
            </div>
        </form>
    );
}
