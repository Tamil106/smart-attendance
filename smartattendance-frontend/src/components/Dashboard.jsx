import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Dashboard.css";
import Navbar from "./Navbar";
import DashboardChart from "./DashboardChart";

function Dashboard() {

    const navigate = useNavigate();

    const [stats, setStats] = useState({
        totalStudents: 0,
        presentToday: 0,
        absentToday: 0,
        totalAttendance: 0,
        lowAttendanceCount: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {

            const response = await API.get("/dashboard");

            setStats(response.data);

        } catch (error) {

            console.log(error);

        }
    };

    const logout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <>

            <Navbar />

            <div className="dashboard">

                {/* Header */}

                <div className="dashboard-header">

                    <div>

                        <h1>📊 Dashboard</h1>

                        <p>
                            Welcome back, <b>Admin</b> 👋
                        </p>

                    </div>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

                {/* Cards */}

                <div className="card-container">

                    <div className="card students">

                        <div className="icon">👨‍🎓</div>

                        <h2>Total Students</h2>

                        <p>{stats.totalStudents}</p>

                    </div>

                    <div className="card present">

                        <div className="icon">✅</div>

                        <h2>Present Today</h2>

                        <p>{stats.presentToday}</p>

                    </div>

                    <div className="card absent">

                        <div className="icon">❌</div>

                        <h2>Absent Today</h2>

                        <p>{stats.absentToday}</p>

                    </div>

                    <div className="card records">

                        <div className="icon">📋</div>

                        <h2>Total Records</h2>

                        <p>{stats.totalAttendance}</p>

                    </div>

                </div>

                {/* Attendance Chart */}

                <div className="chart">

                    <h2>📈 Attendance Statistics</h2>

                    <DashboardChart stats={stats} />

                </div>

                {/* Alert */}

                <div className="alert-section">

                    <h2>⚠ Attendance Alert</h2>

                    {stats.lowAttendanceCount > 0 ? (

                        <div className="alert-danger">

                            {stats.lowAttendanceCount} student(s) have attendance below 75%.

                        </div>

                    ) : (

                        <div className="alert-success">

                            🎉 Great! No students have low attendance.

                        </div>

                    )}

                </div>

                {/* Quick Actions */}

                <div className="quick-actions">

                    <h2>⚡ Quick Actions</h2>

                    <div className="action-buttons">

                        <button onClick={() => navigate("/students")}>
                            👨‍🎓 Student Management
                        </button>

                        <button onClick={() => navigate("/attendance")}>
                            📅 Attendance
                        </button>

                        <button onClick={() => navigate("/reports")}>
                            📊 Reports
                        </button>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;