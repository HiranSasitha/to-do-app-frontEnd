import React, { useState } from "react";
import TaskAdd from "./components/TaskAdd";
import TaskList from "./components/TaskList";

function App() {
    const [refresh, setRefresh] = useState(false);
    const triggerRefresh = () => setRefresh((prev) => !prev);

    return (
        <div className="container py-4">
            <div className="text-center mb-4">
                <h1 className="text-primary fw-bold">📝 To-Do Task Manager</h1>
                <p className="text-muted">Create tasks and mark them as completed.</p>
            </div>

            <TaskAdd onTaskCreated={triggerRefresh} refresh={refresh} />
            <TaskList onTaskChange={triggerRefresh} refresh={refresh} />
        </div>
    );
}

export default App;
