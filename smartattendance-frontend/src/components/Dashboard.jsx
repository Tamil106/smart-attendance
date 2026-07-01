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
        totalAttendance: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        const response = await API.get("/dashboard");
        setStats(response.data);
    };

    const logout = () => {
        localStorage.removeItem("loggedIn");
        navigate("/login");
    };
    return (
        <>
            <Navbar/>

            <div className="dashboard">

                <h1>Smart Attendance Management System</h1>

                <h3>Welcome, Admin</h3>

                <div className="card-container">

                    <div className="card">
                        <h2>👨‍🎓 Total Students</h2>
                        <p>{stats.totalStudents}</p>
                    </div>

                    <div className="card">
                        <h2>✅ Present Today</h2>
                        <p>{stats.presentToday}</p>
                    </div>

                    <div className="card">
                        <h2>❌ Absent Today</h2>
                        <p>{stats.absentToday}</p>
                    </div>

                    <div className="card">
                        <h2>📋 Total Records</h2>
                        <p>{stats.totalAttendance}</p>
                    </div>

                </div>

                {/* Low Attendance Alert */}

                <h2 style={{marginTop: "40px"}}>
                    Low Attendance Alerts
                </h2>

                {stats.lowAttendanceCount > 0 ? (
                    <div
                        style={{
                            background: "#ffe5e5",
                            color: "#d32f2f",
                            padding: "15px",
                            borderRadius: "10px",
                            marginTop: "20px",
                            fontWeight: "bold"
                        }}
                    >
                        ⚠️ {stats.lowAttendanceCount} student(s) have attendance below 75%.
                    </div>
                ) : (
                    <div
                        style={{
                            background: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "15px",
                            borderRadius: "10px",
                            marginTop: "20px",
                            fontWeight: "bold"
                        }}
                    >
                        ✅ Great! No students have low attendance.
                    </div>
                )}

                <div className="menu">

                    <button onClick={() => navigate("/students")}>
                        Student Management
                    </button>

                    <br/>

                    <button onClick={() => navigate("/attendance")}>
                        Attendance
                    </button>

                    <br/>

                    <button onClick={() => navigate("/reports")}>
                        Reports
                    </button>

                    <br/>

                    <button onClick={logout}>
                        Logout
                    </button>

                </div>

                <DashboardChart stats={stats}/>

            </div>

        </>
    );
}

export default Dashboard;