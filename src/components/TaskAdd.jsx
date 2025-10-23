import React, { useEffect, useState } from "react";
import { createTask, getCount } from "../api";

const TaskAdd = ({ onTaskCreated, refresh, onCounts }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        await createTask({ title, description });
        setTitle("");
        setDescription("");
        onTaskCreated(); // refresh list
    };

    const fetchCount = async () => {
        try {
            const res = await getCount();
            const data = res.data.data;
            if (onCounts) onCounts(data.done, data.pen);
        } catch (error) {
            console.error("Error fetching counts:", error);
        }
    };

    useEffect(() => {
        fetchCount();
    }, [refresh]);

    return (
        <div className="card shadow-sm mb-4">
            <div className="card-body">
                <h5 className="card-title text-primary">Add New Task</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter task title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Enter task description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskAdd;
