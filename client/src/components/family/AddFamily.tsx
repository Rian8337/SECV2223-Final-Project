import { useContext, useState } from "react";
import { UserContext } from "../../hooks/UserContext";
import { ThemeContext } from "../../hooks/ThemeContext";
import FamilyService from "../../infrastructure/family";
import { FamilyContext } from "../../hooks/FamilyContext";
import "./AddFamily.css";

export default function AddFamily() {
    const themeCtx = useContext(ThemeContext);
    const familyCtx = useContext(FamilyContext);
    const userCtx = useContext(UserContext);

    const [isCreating, setIsCreating] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!userCtx.value) {
        return null;
    }

    function createFamily(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsCreating(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const familyName = formData.get("family-name") as string;

        FamilyService.createFamily(familyName)
            .then((family) => {
                if (!userCtx.value) {
                    return;
                }

                userCtx.setValue({
                    ...userCtx.value,
                    family_id: family.id,
                });

                familyCtx.setValue(family);
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
                setIsCreating(false);
            });
    }

    return (
        <>
            <p>
                It appears that you are not in a family yet! Let&apos;s create
                your family.
            </p>

            <form className="add-family-form" onSubmit={createFamily}>
                <input
                    name="family-name"
                    className={`${themeCtx.theme}-input`}
                    type="text"
                    placeholder="Enter family name..."
                    required
                    disabled={isCreating}
                    minLength={3}
                    maxLength={255}
                />

                {error ? <p className="error">{error}</p> : null}

                <button
                    className={`${themeCtx.theme}-button`}
                    type="submit"
                    disabled={isCreating}
                >
                    {isCreating ? "Creating..." : "Create"}
                </button>
            </form>
        </>
    );
}
