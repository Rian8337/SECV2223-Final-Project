import { User } from "../../model/User";
import { baseApiUrl } from "../baseApi";
import { UserApi } from "./interfaces";

const baseUrl = new URL("user/", baseApiUrl);

export default {
    async login(email, password, signal) {
        const url = new URL("login.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("email", email);
        searchParams.set("password", password);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: searchParams,
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<User>;
    },

    async loginWithCookie(signal) {
        const url = new URL("login.php", baseUrl);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<User>;
    },

    async logout() {
        const url = new URL("logout.php", baseUrl);

        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    },

    async register(name, email, password, signal) {
        const url = new URL("register.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("name", name);
        searchParams.set("email", email);
        searchParams.set("password", password);

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: searchParams,
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<User>;
    },

    async editUser(email, name, signal) {
        const url = new URL("edit.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("email", email);
        searchParams.set("name", name);

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: searchParams,
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<User>;
    },

    async changePassword(password, signal) {
        const url = new URL("changepassword.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("password", password);

        const response = await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            credentials: "include",
            body: searchParams,
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    },
} satisfies UserApi;
