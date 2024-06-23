/**
 * Represents a todo.
 */
export interface Todo {
    /**
     * The ID of the todo.
     */
    readonly id: number;

    /**
     * The title of the todo.
     */
    title: string;

    /**
     * The description of the todo.
     */
    description: string | null;

    /**
     * The date the todo was created in ISO-8601 format.
     */
    readonly created_at: string;

    /**
     * Whether the todo is completed.
     */
    completed: boolean;
}
