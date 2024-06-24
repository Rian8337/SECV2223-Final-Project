import { useContext, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { FamilyContext } from "../../hooks/FamilyContext";
import FamilyService from "../../infrastructure/family";
import VerticalForm from "../form/VerticalForm";
import VerticalFormError from "../form/VerticalFormError";
import SectionHeader from "../SectionHeader";
import VerticalFormInputContainer from "../form/VerticalFormInputContainer";

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
            <SectionHeader>Edit Family Details</SectionHeader>

            <VerticalForm onSubmit={editFamilyDetails}>
                <VerticalFormInputContainer>
                    <label htmlFor="name">Name</label>

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
                </VerticalFormInputContainer>

                <VerticalFormError error={error} />

                <button
                    type="submit"
                    className={`${themeCtx.theme}-button`}
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Saving..." : "Save"}
                </button>
            </VerticalForm>
        </>
    );
}
