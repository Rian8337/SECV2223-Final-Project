import { useContext, useRef, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import UserService from "../../infrastructure/user";

export default function ChangePassword() {
    const themeCtx = useContext(ThemeContext);

    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    function validatePassword() {
        setError(
            passwordRef.current?.value !== confirmPasswordRef.current?.value
                ? "Passwords do not match."
                : null
        );
    }

    function changePassword(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!passwordRef.current) {
            return;
        }

        setError(null);
        setIsSubmitting(true);

        UserService.changePassword(passwordRef.current.value)
            .then(() => {
                alert("Password changed successfully.");
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
                setIsSubmitting(false);
            });
    }

    return (
        <div>
            <h2 style={{ textAlign: "center" }}>Change Password</h2>

            <form className="vertical-form" onSubmit={changePassword}>
                <span className="input-container">
                    <label htmlFor="password">Password</label>

                    <input
                        ref={passwordRef}
                        type="password"
                        name="password"
                        className={`${themeCtx.theme}-input`}
                        placeholder="Enter new password..."
                        required
                        autoComplete="new-password"
                        onChange={validatePassword}
                        disabled={isSubmitting}
                    />
                </span>

                <span className="input-container">
                    <label htmlFor="confirm-password">Confirm Password</label>

                    <input
                        ref={confirmPasswordRef}
                        type="password"
                        name="confirm-password"
                        className={`${themeCtx.theme}-input`}
                        placeholder="Confirm new password..."
                        required
                        autoComplete="new-password"
                        onChange={validatePassword}
                        disabled={isSubmitting}
                    />
                </span>

                {error ? <p className="error">{error}</p> : null}

                <button
                    type="submit"
                    className={`${themeCtx.theme}-button`}
                    disabled={isSubmitting || error !== null}
                >
                    Change Password
                </button>
            </form>
        </div>
    );
}
