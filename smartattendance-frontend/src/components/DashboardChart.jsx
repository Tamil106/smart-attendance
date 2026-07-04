import { useEffect, useState } from "react";
import API from "../services/api";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Line } from "react-chartjs-2";
import "../styles/DashboardChart.css";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function DashboardChart() {

    const [dailyChart, setDailyChart] = useState([]);
    const [weeklyChart, setWeeklyChart] = useState([]);

    useEffect(() => {
        loadDailyChart();
        loadWeeklyChart();
    }, []);

    const loadDailyChart = async () => {
        const response = await API.get("/dashboard/chart");
        setDailyChart(response.data);
    };

    const loadWeeklyChart = async () => {
        const response = await API.get("/dashboard/weekly-chart");
        setWeeklyChart(response.data);
    };

    //---------------- BAR CHART ----------------//

    const departments = dailyChart.map(item => item.department);

    const barData = {
        labels: departments,
        datasets: [
            {
                label: "Present",
                backgroundColor: "#22c55e",
                data: dailyChart.map(item => item.present)
            },
            {
                label: "Absent",
                backgroundColor: "#ef4444",
                data: dailyChart.map(item => item.absent)
            }
        ]
    };

    //---------------- LINE CHART ----------------//

    const lineData = {
        labels: weeklyChart.map(x => x.day),

        datasets: [
            {
                label: "Present",
                data: weeklyChart.map(x => x.present),
                borderColor: "#1565c0",
                backgroundColor: "#1565c0",
                tension: 0.4,
                fill: false
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,

        plugins: {
            legend: {
                position: "top"
            }
        },

        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (

        <div className="chart-row">

            <div className="chart-box">

                <h3>Today's Attendance</h3>

                <div className="chart-area">
                    <Bar
                        data={barData}
                        options={options}
                    />
                </div>

            </div>

            <div className="chart-box">

                <h3>Weekly Attendance</h3>

                <div className="chart-area">
                    <Line
                        data={lineData}
                        options={options}
                    />
                </div>

            </div>

        </div>

    );
}

export default DashboardChart;