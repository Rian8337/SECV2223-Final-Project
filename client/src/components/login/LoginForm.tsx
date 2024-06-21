import { useContext, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { encodePassword } from "../../utils/TextEncoder";
import { UserContext } from "../../hooks/UserContext";
import { User } from "../../types/User";

export default function LoginForm() {
    const navigate = useNavigate();

    const userCtx = useContext(UserContext);
    const themeCtx = useContext(ThemeContext);

    const [error, setError] = useState<string | null>(null);

    function login(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setError(null);

        const formData = new FormData(event.currentTarget);

        // Need to use URLSearchParams instead of FormData as FormData
        // doesn't support setting the Content-Type header to
        // application/x-www-form-urlencoded.
        const searchParams = new URLSearchParams();

        searchParams.append("email", formData.get("email") as string);

        encodePassword(formData.get("password") as string)
            .then((hashedPassword) => {
                searchParams.append("password", hashedPassword);

                // Send email and hashed password to server
                fetch(
                    "http://localhost/SECV2223-Final-Project/server/api/user/login.php",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: searchParams,
                    }
                )
                    .then((response) => {
                        switch (response.status) {
                            case 400:
                                throw new Error("Missing credentials.");
                            case 401:
                                throw new Error("Invalid email or password.");
                            case 500:
                                throw new Error("Server error.");
                            default:
                                return response.json();
                        }
                    })
                    .then((data: Pick<User, "id" | "name" | "family_id">) => {
                        userCtx.setValue({
                            ...data,
                            email: formData.get("email") as string,
                        });

                        navigate("/");
                    })
                    .catch((e: unknown) => {
                        console.error(e);

                        setError(
                            e instanceof Error
                                ? e.message
                                : "An error occurred. Please try again later."
                        );
                    });
            })
            .catch((e: unknown) => {
                console.error(e);

                setError(
                    e instanceof Error
                        ? e.message
                        : "An error occurred. Please try again later."
                );
            });
    }

    return (
        <form className="login-form" onSubmit={login}>
            <input
                name="email"
                type="email"
                className={`${themeCtx.theme}-input`}
                placeholder="Email"
                required
                autoComplete="email"
            />

            <input
                name="password"
                type="password"
                className={`${themeCtx.theme}-input`}
                placeholder="Password"
                required
            />

            {error !== null ? <p className="error">{error}</p> : null}

            <div className="login-form-section">
                <button className={`${themeCtx.theme}-button`} type="submit">
                    Login
                </button>

                <button
                    className={`${themeCtx.theme}-button`}
                    type="button"
                    onClick={() => {
                        navigate("/register");
                    }}
                >
                    Register
                </button>
            </div>
        </form>
    );
}
