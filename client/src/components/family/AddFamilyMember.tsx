import { useContext, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { FamilyContext } from "../../hooks/FamilyContext";
import FamilyService from "../../infrastructure/family";
import VerticalForm from "../form/VerticalForm";
import VerticalFormError from "../form/VerticalFormError";
import SectionHeader from "../SectionHeader";
import VerticalFormInputContainer from "../form/VerticalFormInputContainer";

export default function AddFamilyMember() {
    const themeCtx = useContext(ThemeContext);
    const familyCtx = useContext(FamilyContext);

    const [error, setError] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    function addMember(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsAdding(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;

        FamilyService.addMember(email)
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
                setIsAdding(false);
            });
    }

    return (
        <>
            <SectionHeader>Add Family Member</SectionHeader>

            <VerticalForm onSubmit={addMember}>
                <VerticalFormInputContainer>
                    <label htmlFor="email">Email</label>

                    <input
                        type="email"
                        name="email"
                        className={`${themeCtx.theme}-input`}
                        placeholder="Enter email..."
                        required
                        disabled={isAdding}
                    />
                </VerticalFormInputContainer>

                <VerticalFormError error={error} />

                <button
                    type="submit"
                    className={`${themeCtx.theme}-button`}
                    disabled={isAdding}
                >
                    Add Member
                </button>
            </VerticalForm>
        </>
    );
}
