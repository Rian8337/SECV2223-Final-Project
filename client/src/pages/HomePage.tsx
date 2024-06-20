import PageWrapper from "../components/PageWrapper";
import AddTask from "../components/home/AddTask";
import DateTime from "../components/home/DateTime";
import TodoList from "../components/home/TodoList";

export default function HomePage() {
    return (
        <PageWrapper>
            <AddTask />
            <DateTime />
            <TodoList />
        </PageWrapper>
    );
}
