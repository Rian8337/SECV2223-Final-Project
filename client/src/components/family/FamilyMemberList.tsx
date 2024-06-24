import { useContext, useState } from "react";
import { FamilyContext } from "../../hooks/FamilyContext";
import { UserContext } from "../../hooks/UserContext";
import FamilyMemberTable from "./FamilyMemberTable";
import { FamilyMemberRole } from "../../constants/FamilyMemberRole";
import "./FamilyMemberList.css";
import SectionHeader from "../SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function FamilyMemberList() {
    const userCtx = useContext(UserContext);
    const familyCtx = useContext(FamilyContext);
    const [error, setError] = useState<string | null>(null);

    if (!userCtx.value || !familyCtx.value) {
        return null;
    }

    const user = userCtx.value;
    const member = familyCtx.value.members.find((m) => m.id === user.id);
    const isOwner = member?.role === FamilyMemberRole.Owner;
    const isAdmin = isOwner || member?.role === FamilyMemberRole.Admin;

    return (
        <>
            <SectionHeader>Family Members</SectionHeader>

            {error ? (
                <p className="family-members-error">
                    <span>
                        <FontAwesomeIcon icon={faXmark} /> {error}
                    </span>
                </p>
            ) : null}

            <FamilyMemberTable
                isUserAdmin={isAdmin}
                isUserOwner={isOwner}
                setError={setError}
            />
        </>
    );
}
