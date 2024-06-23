import { Dispatch, SetStateAction, useContext, useState } from "react";
import { ThemeContext } from "../../hooks/ThemeContext";
import { FamilyContext } from "../../hooks/FamilyContext";
import FamilyMemberTableRow from "./FamilyMemberTableRow";

export default function FamilyMemberTable(
    props: Readonly<{
        isUserAdmin: boolean;
        isUserOwner: boolean;
        setError: Dispatch<SetStateAction<string | null>>;
    }>
) {
    const { isUserAdmin, isUserOwner, setError } = props;

    const themeCtx = useContext(ThemeContext);
    const familyCtx = useContext(FamilyContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!familyCtx.value) {
        return null;
    }

    return (
        <table className={themeCtx.theme}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {familyCtx.value.members.map((member) => (
                    <FamilyMemberTableRow
                        key={member.id}
                        member={member}
                        isUserAdmin={isUserAdmin}
                        isUserOwner={isUserOwner}
                        setError={setError}
                        isSubmitting={isSubmitting}
                        setIsSubmitting={setIsSubmitting}
                    />
                ))}
            </tbody>
        </table>
    );
}
