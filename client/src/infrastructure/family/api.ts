import { Family } from "../../model/Family";
import { baseApiUrl } from "../baseApi";
import { FamilyApi } from "./interfaces";

const baseUrl = new URL("family/", baseApiUrl);

export default {
    async createFamily(name, signal) {
        const url = new URL("createfamily.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("name", name);

        const response = await fetch(url, {
            method: "PUT",
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

        return response.json() as Promise<Family>;
    },

    async deleteFamily(signal) {
        const url = new URL("deletefamily.php", baseUrl);

        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    },

    async editFamily(name, signal) {
        const url = new URL("editfamily.php", baseUrl);
        const searchParams = new URLSearchParams();

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

        return response.json() as Promise<Family>;
    },

    async getFamily(signal) {
        const url = new URL("getfamily.php", baseUrl);

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<Family>;
    },

    async addMember(email, signal) {
        const url = new URL("addmember.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("email", email);

        const response = await fetch(url, {
            method: "PUT",
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

        return response.json() as Promise<Family>;
    },

    async removeMember(userId, signal) {
        const url = new URL("removemember.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("userId", userId.toString());

        const response = await fetch(url, {
            method: "DELETE",
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

        return response.json() as Promise<Family>;
    },

    async demoteMember(userId, signal) {
        const url = new URL("demotemember.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("id", userId.toString());

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

        return response.json() as Promise<Family>;
    },

    async promoteMember(userId, signal) {
        const url = new URL("promotemember.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("id", userId.toString());

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

        return response.json() as Promise<Family>;
    },

    async moveOwnership(userId, signal) {
        const url = new URL("moveownership.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("id", userId.toString());

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

        return response.json() as Promise<Family>;
    },
} satisfies FamilyApi;
