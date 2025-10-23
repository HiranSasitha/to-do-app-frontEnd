import React, { useEffect, useState } from "react";
import { getTasks, markTaskDone, getCount } from "../api";

const TaskList = ({ onTaskChange, refresh, onCounts }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const pageSize = 6;

    const fetchTasks = async (page = 0) => {
        try {
            const res = await getTasks(page, pageSize);
            const data = res.data.data;

            if (data && Array.isArray(data.tasks)) {
                setTasks(data.tasks);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            } else {
                setTasks([]);
            }
        } catch (error) {
            console.error("Error fetching tasks:", error);
            setTasks([]);
        }
    };

    const handleDone = async (id, mark) => {
        try {
            await markTaskDone(id, mark);
            fetchTasks(currentPage);


            const countRes = await getCount();
            const data = countRes.data;
            if (onCounts) onCounts(data.done, data.pen);

            onTaskChange();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "No date";
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        fetchTasks(0);
    }, [refresh]);

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            fetchTasks(newPage);
        }
    };

    return (
        <div>
            <h4 className="mb-3 text-success">Pending Tasks</h4>
            {tasks.length === 0 ? (
                <div className="alert alert-success text-center">
                    🎉 No Tasks Available!
                </div>
            ) : (
                <>
                    <div className="row">
                        {tasks.map((task) => (
                            <div key={task.id} className="col-md-6 mb-3">
                                <div className="card shadow-sm h-100">
                                    <div className="card-body d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <h5 className="card-title mb-0">{task.title}</h5>
                                            <span
                                                className={`d-flex align-items-center ${
                                                    task.completed ? "text-success" : "text-warning"
                                                } fw-bold`}
                                            >
                                                <span
                                                    className={`me-2 ${
                                                        task.completed ? "bg-success" : "bg-warning"
                                                    } rounded-circle`}
                                                    style={{ width: "10px", height: "10px", display: "inline-block" }}
                                                ></span>
                                                {task.completed ? "Task Done" : "Pending"}
                                            </span>
                                        </div>

                                        <p className="card-text mb-1">{task.description}</p>
                                        <p className="card-text text-muted">{formatDate(task.date)}</p>

                                        {task.completed === false ? (
                                            <button
                                                onClick={() => handleDone(task.id, 1)}
                                                className="btn btn-warning mt-auto"
                                            >
                                                Mark Done
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleDone(task.id, 0)}
                                                className="btn btn-success mt-auto"
                                            >
                                                Reverse
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-4">
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 0}
                        >
                            ⬅ Prev
                        </button>

                        <span>
                            Page {currentPage + 1} of {totalPages}
                        </span>

                        <button
                            className="btn btn-outline-primary"
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage + 1 >= totalPages}
                        >
                            Next ➡
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default TaskList;
