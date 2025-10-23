import React, { useEffect, useState } from "react";
import { getTasks, markTaskDone } from "../api";

const TaskList = () => {
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

    // Mark task
    const handleDone = async (id, mark) => {
        try {
            await markTaskDone(id, mark);
            fetchTasks(currentPage);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    useEffect(() => {
        fetchTasks(0);
    }, []);

    // Pagination
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
                                        <h5 className="card-title">{task.title}</h5>
                                        <p className="card-text flex-grow-1">{task.description}</p>

                                        {task.completed === false ? (
                                            <button
                                                onClick={() => handleDone(task.id, 1)}
                                                className="btn btn-success mt-auto"
                                            >
                                                Done
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleDone(task.id, 0)}
                                                className="btn btn-warning mt-auto"
                                            >
                                                Reverse Task
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
