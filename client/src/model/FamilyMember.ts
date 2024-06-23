import { FamilyMemberRole } from "../constants/FamilyMemberRole";
import { User } from "./User";

/**
 * Represents a family member.
 */
export interface FamilyMember extends Pick<User, "id" | "name" | "email"> {
    /**
     * The role of the family member.
     */
    role: FamilyMemberRole;
}
