import { Todo } from "../../model/Todo";
import { baseApiUrl } from "../baseApi";
import { TodoApi } from "./interfaces";

const baseUrl = new URL("todo/", baseApiUrl);

export default {
    async addTodo(title, description, signal) {
        const url = new URL("addtodo.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("title", title);

        if (description) {
            searchParams.set("description", description);
        }

        const response = await fetch(url, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: searchParams,
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<Todo>;
    },

    async deleteTodo(todoId, signal) {
        const url = new URL("deletetodo.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("id", todoId.toString());

        const response = await fetch(url, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: searchParams,
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }
    },

    async editTodo(todoId, title, description, completed, signal) {
        const url = new URL("edittodo.php", baseUrl);
        const searchParams = new URLSearchParams();

        searchParams.set("id", todoId.toString());

        if (title) {
            searchParams.set("title", title);
        }

        if (description) {
            searchParams.set("description", description);
        }

        if (completed !== undefined) {
            searchParams.set("completed", completed ? "1" : "0");
        }

        const response = await fetch(url, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: searchParams,
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<Todo>;
    },

    async getTodos(title, page, signal) {
        const url = new URL("gettodos.php", baseUrl);

        if (title) {
            url.searchParams.set("title", title);
        }

        if (page) {
            url.searchParams.set("page", page.toString());
        }

        const response = await fetch(url, {
            method: "GET",
            credentials: "include",
            signal: signal,
        });

        if (!response.ok) {
            throw new Error(await response.text());
        }

        return response.json() as Promise<Todo[]>;
    },
} satisfies TodoApi;
