/**
 * Represents the structure of a todo stored in local storage.
 */
export interface Todo {
    /**
     * The task of the todo.
     */
    readonly task: string;

    /**
     * Whether the todo is checked.
     */
    checked: boolean;
}
