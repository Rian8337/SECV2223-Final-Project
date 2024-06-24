import { useContext, useEffect, useState } from "react";
import { UserContext } from "../hooks/UserContext";
import AddFamily from "../components/family/AddFamily";
import EditFamilyDetails from "../components/family/EditFamilyDetails";
import { ThemeContext } from "../hooks/ThemeContext";
import { FamilyContext } from "../hooks/FamilyContext";
import FamilyService from "../infrastructure/family";
import "./FamilyPage.css";
import { useNavigate } from "react-router-dom";
import FamilyMemberList from "../components/family/FamilyMemberList";
import AddFamilyMember from "../components/family/AddFamilyMember";
import PageWrapper from "../components/PageWrapper";

export default function FamilyPage() {
    const navigate = useNavigate();

    const familyCtx = useContext(FamilyContext);
    const themeCtx = useContext(ThemeContext);
    const userCtx = useContext(UserContext);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (userCtx.value === null) {
            navigate("/login");

            return;
        }

        if (!userCtx.value?.family_id) {
            return;
        }

        // Do not refetch if it is the same family.
        if (familyCtx.value?.id === userCtx.value.family_id) {
            return;
        }

        FamilyService.getFamily()
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
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userCtx.value]);

    if (!userCtx.value?.family_id) {
        return (
            <PageWrapper>
                <AddFamily />
            </PageWrapper>
        );
    }

    if (!familyCtx.value) {
        return (
            <PageWrapper>
                <p>Loading family details...</p>
            </PageWrapper>
        );
    }

    if (error !== null) {
        return (
            <PageWrapper>
                <p className="family-page-error">{error}</p>
            </PageWrapper>
        );
    }

    return (
        <PageWrapper>
            <FamilyMemberList />
            <br />
            <AddFamilyMember />

            <hr className={themeCtx.theme} />

            <EditFamilyDetails />
        </PageWrapper>
    );
}
