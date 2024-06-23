import { User } from "./User";

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
     * The date the todo was created.
     */
    readonly created_at: string;

    /**
     * Whether the todo is completed.
     */
    completed: boolean;

    /**
     * The user who created the todo.
     */
    readonly user: Pick<User, "id" | "name"> | null;
}
