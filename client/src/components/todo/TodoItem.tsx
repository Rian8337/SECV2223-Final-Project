import { Todo } from "../../model/Todo";
import TodoItemActionRow from "./TodoItemActionRow";

export default function TodoItem(props: { todo: Todo }) {
    const { todo } = props;

    return (
        <tr key={todo.id}>
            <td>{todo.title}</td>
            <td>{todo.description ?? "None"}</td>
            <td>{new Date(todo.created_at).toLocaleString()}</td>
            <td>{todo.completed ? "Yes" : "No"}</td>
            <td>{todo.user?.name ?? "Unknown"}</td>
            <td>
                <TodoItemActionRow todo={todo} />
            </td>
        </tr>
    );
}
