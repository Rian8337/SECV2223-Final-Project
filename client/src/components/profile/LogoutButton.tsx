import { useContext, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import UserService from "../../infrastructure/user";
import { UserContext } from "../../hooks/UserContext";
import { FamilyContext } from "../../hooks/FamilyContext";

export default function LogoutButton() {
    const themeCtx = useContext(ThemeContext);
    const userCtx = useContext(UserContext);
    const familyCtx = useContext(FamilyContext);

    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function logout(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const confirm = window.confirm("Are you sure you want to logout?");

        if (!confirm) {
            return;
        }

        setIsLoggingOut(true);

        UserService.logout()
            .then(() => {
                userCtx.setValue(null);
                familyCtx.setValue(null);
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
        <form className="vertical-form" onSubmit={logout}>
            {error ? <p className="error">{error}</p> : null}

            <button
                type="submit"
                className={`${themeCtx.theme}-button`}
                disabled={isLoggingOut}
            >
                Logout
            </button>
        </form>
    );
}
