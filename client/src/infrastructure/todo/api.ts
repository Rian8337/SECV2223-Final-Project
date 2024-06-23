import { Todo } from "../../model/Todo";
import { baseApiUrl } from "../baseApi";
import { TodoApi } from "./interfaces";

const baseUrl = new URL("todo/", baseApiUrl);

export default {
    async getTodos(searchedTitle, signal) {
        const url = new URL("gettodos.php", baseUrl);
        const searchParams = new URLSearchParams();

        if (searchedTitle) {
            searchParams.set("searchedTitle", searchedTitle);
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
