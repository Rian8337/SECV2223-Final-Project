import PageWrapper from "../components/PageWrapper";
import AddTask from "../components/tasks/AddTask";
import TodoList from "../components/tasks/TodoList";

export default function TaskPage() {
    return (
        <PageWrapper>
            <AddTask />
            <TodoList />
        </PageWrapper>
    );
}
