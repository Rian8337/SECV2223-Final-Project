import { Todo } from "../../model/Todo";
import { TodoApi } from "./interfaces";

/**
 * Service for interacting with todo-related data.
 */
export class TodoService implements TodoApi {
    private readonly api: TodoApi;

    constructor(api: TodoApi) {
        this.api = api;
    }

    addTodo(
        title: string,
        description?: string,
        signal?: AbortSignal
    ): Promise<Todo> {
        return this.api.addTodo(title, description, signal);
    }

    deleteTodo(todoId: number, signal?: AbortSignal): Promise<void> {
        return this.api.deleteTodo(todoId, signal);
    }

    editTodo(
        todoId: number,
        title?: string,
        description?: string,
        completed?: boolean,
        signal?: AbortSignal
    ): Promise<Todo> {
        return this.api.editTodo(todoId, title, description, completed, signal);
    }

    getTodos(
        title: string,
        page: number,
        completed: boolean | null,
        signal?: AbortSignal
    ): Promise<Todo[]> {
        return this.api.getTodos(title, page, completed, signal);
    }
}
