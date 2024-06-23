import { FamilyMember } from "./FamilyMember";

/**
 * Represents a family.
 */
export interface Family {
    /**
     * The ID of the family.
     */
    readonly id: number;

    /**
     * The name of the family.
     */
    name: string;

    /**
     * The members of the family.
     */
    readonly members: readonly FamilyMember[];
}
