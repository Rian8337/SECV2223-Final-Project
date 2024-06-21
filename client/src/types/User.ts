/**
 * Represents a user.
 */
export interface User {
    /**
     * The ID of the user.
     */
    readonly id: number;

    /**
     * The name of the user.
     */
    name: string;

    /**
     * The email of the user.
     */
    email: string;

    /**
     * The ID of the family that this user belongs.
     */
    family_id: number | null;
}
