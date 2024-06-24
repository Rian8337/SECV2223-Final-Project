import { useState, useRef, useContext } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { UserContext } from "../../hooks/UserContext";
import UserService from "../../infrastructure/user";

export default function EditUserDetails() {
    const themeCtx = useContext(ThemeContext);
    const userCtx = useContext(UserContext);

    const [isEditing, setIsEditing] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const nameInputRef = useRef<HTMLInputElement>(null);

    if (!userCtx.value) {
        return null;
    }

    function cancelEdit() {
        if (!userCtx.value || !nameInputRef.current || !emailInputRef.current) {
            return;
        }

        // Reset the form.
        emailInputRef.current.value = userCtx.value.email;
        nameInputRef.current.value = userCtx.value.name;

        setIsEditing(false);
    }

    function editUser(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!userCtx.value || !nameInputRef.current || !emailInputRef.current) {
            return;
        }

        const email = emailInputRef.current.value;
        const name = nameInputRef.current.value;

        if (email === userCtx.value.email && name === userCtx.value.name) {
            return;
        }

        setError(null);
        setIsEditing(false);
        setIsSubmitting(true);

        UserService.editUser(email, name)
            .then((user) => {
                userCtx.setValue(user);

                alert("Details updated successfully.");
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
            <h2 style={{ textAlign: "center" }}>Edit Details</h2>

            <form className="vertical-form" onSubmit={editUser}>
                <span className="input-container">
                    <label htmlFor="email">Email</label>

                    <input
                        type="email"
                        className={`${themeCtx.theme}-input`}
                        name="email"
                        placeholder="Enter email..."
                        required
                        defaultValue={userCtx.value.email}
                        disabled={!isEditing || isSubmitting}
                        ref={emailInputRef}
                    />
                </span>

                <span className="input-container">
                    <label htmlFor="name">Name</label>

                    <input
                        type="text"
                        className={`${themeCtx.theme}-input`}
                        name="name"
                        placeholder="Enter name..."
                        required
                        defaultValue={userCtx.value.name}
                        disabled={!isEditing || isSubmitting}
                        ref={nameInputRef}
                    />
                </span>

                {error ? <p className="error">{error}</p> : null}

                <div className="vertical-form-section">
                    <button
                        type={isEditing ? "submit" : "button"}
                        className={`${themeCtx.theme}-button`}
                        onClick={
                            !isEditing
                                ? () => {
                                      setIsEditing(!isEditing);
                                  }
                                : undefined
                        }
                        disabled={isSubmitting}
                    >
                        {isEditing ? "Save" : "Edit"}
                    </button>

                    {isEditing ? (
                        <button
                            type="button"
                            className={`${themeCtx.theme}-button`}
                            onClick={cancelEdit}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    ) : null}
                </div>
            </form>
        </div>
    );
}
