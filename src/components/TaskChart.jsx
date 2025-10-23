import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskChart = ({ done, pending }) => {
    const data = {
        labels: ["Done", "Pending"],
        datasets: [
            {
                label: "Tasks",
                data: [done, pending],
                backgroundColor: ["#28a745", "#ffc107"],
                borderColor: ["#28a745", "#ffc107"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="card shadow-sm">
            <div className="card-body">
                <h5 className="card-title text-primary text-center">Task Status</h5>
                <Doughnut data={data} />
            </div>
        </div>
    );
};

export default TaskChart;
