import { useContext, useState } from "react";
import { FamilyContext } from "../../hooks/FamilyContext";
import { UserContext } from "../../hooks/UserContext";
import FamilyMemberTable from "./FamilyMemberTable";
import { FamilyMemberRole } from "../../constants/FamilyMemberRole";
import "./FamilyMemberList.css";
import SectionHeader from "../SectionHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

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
                <motion.p
                    className="family-members-error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                >
                    <FontAwesomeIcon icon={faXmark} /> {error}
                </motion.p>
            ) : null}

            <FamilyMemberTable
                isUserAdmin={isAdmin}
                isUserOwner={isOwner}
                setError={setError}
            />
        </>
    );
}
