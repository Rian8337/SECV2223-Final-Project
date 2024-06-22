import { User } from "../../types/User";
import { encodePassword } from "../../utils/TextEncoder";
import { UserApi } from "./interfaces";

/**
 * Service for interacting with user-related data.
 */
export class UserService implements UserApi {
    private readonly api: UserApi;

    constructor(api: UserApi) {
        this.api = api;
    }

    async login(
        email: string,
        password: string,
        signal?: AbortSignal
    ): Promise<User> {
        const encodedPassword = await encodePassword(password);

        return this.api.login(email, encodedPassword, signal);
    }

    loginWithCookie(signal?: AbortSignal): Promise<User> {
        return this.api.loginWithCookie(signal);
    }

    async register(
        name: string,
        email: string,
        password: string,
        signal?: AbortSignal
    ): Promise<User> {
        const encodedPassword = await encodePassword(password);

        return this.api.register(name, email, encodedPassword, signal);
    }
}
