import { User } from "../../model/User";

/**
 * API for interacting with user-related data.
 */
export interface UserApi {
    /**
     * Logs in a user with the session ID cookie.
     *
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the logged-in user.
     */
    loginWithCookie(signal?: AbortSignal): Promise<User>;

    /**
     * Logs in a user.
     *
     * @param email The user's email.
     * @param password The user's password.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the logged-in user.
     */
    login(email: string, password: string, signal?: AbortSignal): Promise<User>;

    /**
     * Logs out the user.
     *
     * @param signal The abort signal if needed.
     * @returns A promise that resolves when the user is logged out.
     */
    logout(signal?: AbortSignal): Promise<void>;

    /**
     * Edits a user.
     *
     * @param email The user's email.
     * @param name The user's name.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the edited user.
     */
    editUser(email: string, name: string, signal?: AbortSignal): Promise<User>;

    /**
     * Changes the password of the user.
     *
     * @param password The new password.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves when the password is changed.
     */
    changePassword(password: string, signal?: AbortSignal): Promise<void>;

    /**
     * Registers a new user.
     *
     * @param name The name of the user.
     * @param email The email of the user.
     * @param password The password of the user.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the registered user.
     */
    register(
        name: string,
        email: string,
        password: string,
        signal?: AbortSignal
    ): Promise<User>;
}
