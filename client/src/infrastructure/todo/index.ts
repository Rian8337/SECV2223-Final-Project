import TodoApi from "./api";
import { TodoService } from "./service";

const service = new TodoService(TodoApi);

/**
 * Service for interacting with todo-related data.
 */
export default service;
