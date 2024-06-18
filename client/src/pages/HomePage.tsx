import PageWrapper from "../components/PageWrapper";
import AddTask from "../components/AddTask";
import DateTime from "../components/DateTime";
import TodoList from "../components/TodoList";

export default function HomePage() {
    return (
        <PageWrapper>
            <AddTask />
            <DateTime />
            <TodoList />
        </PageWrapper>
    );
}
