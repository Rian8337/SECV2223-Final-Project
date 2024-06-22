import React, { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import "./RegisterForm.css";
import { encodePassword } from "../../utils/TextEncoder";
import { User } from "../../types/User";
import { UserContext } from "../../hooks/UserContext";

export default function RegisterForm() {
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

        // Need to use URLSearchParams instead of FormData as FormData
        // doesn't support setting the Content-Type header to
        // application/x-www-form-urlencoded.
        const searchParams = new URLSearchParams();

        searchParams.append("name", formData.get("name") as string);
        searchParams.append("email", formData.get("email") as string);

        encodePassword(formData.get("password") as string)
            .then((hashedPassword) => {
                searchParams.append("password", hashedPassword);

                // Send name, email, and hashed password to server
                fetch(
                    "http://localhost/SECV2223-Final-Project/server/api/user/register.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        credentials: "include",
                        body: searchParams,
                    }
                )
                    .then(async (response) => {
                        if (!response.ok) {
                            throw new Error(await response.text());
                        }

                        return response.json();
                    })
                    .then((data: Pick<User, "id" | "name" | "family_id">) => {
                        userCtx.setValue({
                            ...data,
                            email: formData.get("email") as string,
                        });

                        setError(null);
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
        <form className="register-form" onSubmit={register}>
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

            <button type="submit" disabled={isRegistering}>
                Register
            </button>
        </form>
    );
}
