import { useContext, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { FamilyContext } from "../../hooks/FamilyContext";
import FamilyService from "../../infrastructure/family";

export default function EditFamilyDetails() {
    const themeCtx = useContext(ThemeContext);
    const familyCtx = useContext(FamilyContext);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!familyCtx.value) {
        return null;
    }

    function editFamilyDetails(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const name = formData.get("name") as string;

        FamilyService.editFamily(name)
            .then((family) => {
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
                setIsSubmitting(false);
            });
    }

    return (
        <>
            <h2 className="text-3xl font-semibold">Edit Family Details</h2>

            <form className="vertical-form" onSubmit={editFamilyDetails}>
                <input
                    name="name"
                    type="text"
                    className={`${themeCtx.theme}-input`}
                    placeholder="Enter family name..."
                    required
                    autoComplete="name"
                    defaultValue={familyCtx.value.name}
                    minLength={3}
                    maxLength={255}
                    disabled={isSubmitting}
                />

                {error ? <p className="error">{error}</p> : null}

                <button
                    type="submit"
                    className={`${themeCtx.theme}-button`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </form>
        </>
    );
}
