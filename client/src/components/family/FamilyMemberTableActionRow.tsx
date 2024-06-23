import { Dispatch, SetStateAction, useContext } from "react";
import { FamilyMember } from "../../model/FamilyMember";
import { FamilyMemberRole } from "../../constants/FamilyMemberRole";
import { FamilyContext } from "../../hooks/FamilyContext";
import { ThemeContext } from "../../hooks/ThemeContext";
import { UserContext } from "../../hooks/UserContext";
import FamilyService from "../../infrastructure/family";

export default function FamilyMemberTableActionRow(
    props: Readonly<{
        member: FamilyMember;
        isUserAdmin: boolean;
        isUserOwner: boolean;
        setError: Dispatch<SetStateAction<string | null>>;
        isSubmitting: boolean;
        setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    }>
) {
    const userCtx = useContext(UserContext);
    const themeCtx = useContext(ThemeContext);
    const familyCtx = useContext(FamilyContext);

    if (!userCtx.value) {
        return null;
    }

    const {
        member,
        isUserAdmin,
        isUserOwner,
        setError,
        isSubmitting,
        setIsSubmitting,
    } = props;

    function removeMember(memberId: number) {
        setIsSubmitting(true);

        FamilyService.removeMember(memberId)
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

    function moveOwnership(memberId: number) {
        setIsSubmitting(true);

        FamilyService.moveOwnership(memberId)
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

    function promoteMember(memberId: number) {
        setIsSubmitting(true);

        FamilyService.promoteMember(memberId)
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

    function demoteMember(memberId: number) {
        setIsSubmitting(true);

        FamilyService.demoteMember(memberId)
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

    const buttons: JSX.Element[] = [];

    if (
        member.id === userCtx.value.id ||
        isUserOwner ||
        (isUserAdmin && member.role === FamilyMemberRole.Member)
    ) {
        buttons.push(
            <button
                key="leave"
                type="button"
                className={`${themeCtx.theme}-button action-button`}
                disabled={isSubmitting}
                onClick={() => {
                    removeMember(member.id);
                }}
            >
                {member.id === userCtx.value.id ? "Leave" : "Remove"}
            </button>
        );
    }

    if (isUserOwner && member.role !== FamilyMemberRole.Owner) {
        buttons.push(
            <button
                key="make-owner"
                type="button"
                className={`${themeCtx.theme}-button action-button`}
                disabled={isSubmitting}
                onClick={() => {
                    moveOwnership(member.id);
                }}
            >
                Move Ownership
            </button>
        );
    }

    if (isUserOwner && member.role === FamilyMemberRole.Member) {
        buttons.push(
            <button
                key="promote"
                type="button"
                className={`${themeCtx.theme}-button action-button`}
                disabled={isSubmitting}
                onClick={() => {
                    promoteMember(member.id);
                }}
            >
                Promote
            </button>
        );
    }

    if (isUserOwner && member.role === FamilyMemberRole.Admin) {
        buttons.push(
            <button
                key="demote"
                type="button"
                className={`${themeCtx.theme}-button action-button`}
                disabled={isSubmitting}
                onClick={() => {
                    demoteMember(member.id);
                }}
            >
                Demote
            </button>
        );
    }

    return (
        <div className="action-row">
            {buttons.length > 0 ? buttons.map((button) => button) : "None"}
        </div>
    );
}
