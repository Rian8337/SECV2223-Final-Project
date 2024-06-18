import AddTask from "./components/AddTask";
import DateTime from "./components/DateTime";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

export default function App() {
    return (
        <>
            <Header />
            <AddTask />
            <DateTime />
            <TodoList />
        </>
    );
}