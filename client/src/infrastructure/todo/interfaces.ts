import { Todo } from "../../model/Todo";

/**
 * API for interacting with todo-related data.
 */
export interface TodoApi {
    /**
     * Gets all the todos in the currently signed in user's family.
     *
     * @param searchedTitle The title to search, if any.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the list of todos.
     */
    getTodos(searchedTitle?: string, signal?: AbortSignal): Promise<Todo[]>;
}
