import { Family } from "../../model/Family";

/**
 * API for interacting with family-related data.
 */
export interface FamilyApi {
    /**
     * Creates a new family.
     *
     * @param name The name of the family.
     * @param signal The abort signal if needed.
     * @returns The created family.
     */
    createFamily(name: string, signal?: AbortSignal): Promise<Family>;

    /**
     * Deletes the family that the user belongs to.
     *
     * @param signal The abort signal if needed.
     */
    deleteFamily(signal?: AbortSignal): Promise<void>;

    /**
     * Edits the family that the user belongs to.
     *
     * @param name The new name of the family.
     * @param signal The abort signal if needed.
     * @returns The edited family.
     */
    editFamily(name: string, signal?: AbortSignal): Promise<Family>;

    /**
     * Gets the family that the user belongs to.
     *
     * @param signal The abort signal if needed.
     * @returns The family.
     */
    getFamily(signal?: AbortSignal): Promise<Family>;

    /**
     * Adds a member to the family.
     *
     * @param email The email of the user to add.
     * @param signal The abort signal if needed.
     * @returns The updated family.
     */
    addMember(email: string, signal?: AbortSignal): Promise<Family>;

    /**
     * Removes a member from the family.
     *
     * @param userId The ID of the user to remove.
     * @param signal The abort signal if needed.
     * @returns The updated family.
     */
    removeMember(userId: number, signal?: AbortSignal): Promise<Family>;

    /**
     * Demotes a member from an admin.
     *
     * Requires the user to be the family owner.
     *
     * @param userId The ID of the user to demote.
     * @param signal The abort signal if needed.
     * @returns The updated family.
     */
    demoteMember(userId: number, signal?: AbortSignal): Promise<Family>;

    /**
     * Promotes a member to an admin.
     *
     * Requires the user to be the family owner.
     *
     * @param userId The ID of the user to promote.
     * @param signal The abort signal if needed.
     * @returns The updated family.
     */
    promoteMember(userId: number, signal?: AbortSignal): Promise<Family>;

    /**
     * Moves the ownership of the family to another member.
     *
     * Requires the user to be the family owner.
     *
     * @param userId The ID of the user to make the owner.
     * @param signal The abort signal if needed.
     * @returns The updated family.
     */
    moveOwnership(userId: number, signal?: AbortSignal): Promise<Family>;
}
