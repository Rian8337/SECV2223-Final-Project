import { Dispatch, SetStateAction } from "react";
import { FamilyMember } from "../../model/FamilyMember";
import FamilyMemberTableActionRow from "./FamilyMemberTableActionRow";
import "./FamilyMemberTableRow.css";

export default function FamilyMemberTableRow(
    props: Readonly<{
        member: FamilyMember;
        isUserAdmin: boolean;
        isUserOwner: boolean;
        setError: Dispatch<SetStateAction<string | null>>;
        isSubmitting: boolean;
        setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    }>
) {
    const { member } = props;

    return (
        <tr key={member.id}>
            <td>{member.name}</td>
            <td>{member.email}</td>
            <td>
                {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
            </td>
            <td>
                <FamilyMemberTableActionRow {...props} />
            </td>
        </tr>
    );
}
