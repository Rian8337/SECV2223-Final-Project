import { Todo } from "../../types/Todo";
import { TodoApi } from "./interfaces";

/**
 * Service for interacting with todo-related data.
 */
export class TodoService implements TodoApi {
    private readonly api: TodoApi;

    constructor(api: TodoApi) {
        this.api = api;
    }

    getTodos(searchedTitle?: string, signal?: AbortSignal): Promise<Todo[]> {
        return this.api.getTodos(searchedTitle, signal);
    }
}
