import React, { useState } from "react";
import TaskAdd from "./components/TaskAdd";
import TaskList from "./components/TaskList";
import TaskChart from "./components/TaskChart";

function App() {
    const [refresh, setRefresh] = useState(false);
    const [done, setDone] = useState(0);
    const [pending, setPending] = useState(0);

    const triggerRefresh = () => setRefresh((prev) => !prev);

    // Update chart counts
    const handleCounts = (doneCount, pendingCount) => {
        setDone(doneCount);
        setPending(pendingCount);
    };

    return (
        <div className="container py-4">
            <div className="text-center mb-4">
                <h1 className="text-primary fw-bold">📝 To-Do Task Manager</h1>
                <p className="text-muted">Create tasks and mark them as completed.</p>
            </div>

            <div className="row">
                <div className="col-md-9">
                    <TaskAdd
                        onTaskCreated={triggerRefresh}
                        refresh={refresh}
                        onCounts={handleCounts}
                    />
                    <TaskList
                        onTaskChange={triggerRefresh}
                        refresh={refresh}
                        onCounts={handleCounts}
                    />
                </div>

                <div className="col-md-3">
                    <TaskChart done={done} pending={pending} />
                </div>
            </div>
        </div>
    );
}

export default App;
