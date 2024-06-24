import { Todo } from "../../model/Todo";

/**
 * API for interacting with todo-related data.
 */
export interface TodoApi {
    /**
     * Adds a new todo to the currently signed in user's family.
     *
     * @param title The title of the todo.
     * @param description The description of the todo, if any.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the newly created todo.
     */
    addTodo(
        title: string,
        description?: string,
        signal?: AbortSignal
    ): Promise<Todo>;

    /**
     * Deletes a todo from the currently signed in user's family.
     *
     * @param todoId The ID of the todo to delete.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves when the todo is deleted.
     */
    deleteTodo(todoId: number, signal?: AbortSignal): Promise<void>;

    /**
     * Edits a todo in the currently signed in user's family.
     *
     * @param todoId The ID of the todo to edit.
     * @param title The new title of the todo, if any.
     * @param description The new description of the todo, if any.
     * @param completed The new completion status of the todo, if any.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the edited todo.
     */
    editTodo(
        todoId: number,
        title?: string,
        description?: string,
        completed?: boolean,
        signal?: AbortSignal
    ): Promise<Todo>;

    /**
     * Gets all the todos in the currently signed in user's family.
     *
     * @param searchedTitle The title to search, if any.
     * @param signal The abort signal if needed.
     * @returns A promise that resolves to the list of todos.
     */
    getTodos(searchedTitle?: string, signal?: AbortSignal): Promise<Todo[]>;
}
