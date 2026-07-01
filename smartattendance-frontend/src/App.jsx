import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Student from "./components/Student";
import Attendance from "./components/Attendance";
import Reports from "./components/Reports";
import StudentDashboard from "./components/StudentDashboard";
import QRCodeAttendance from "./components/QRCodeAttendance";
import ScanAttendance from "./components/ScanAttendance";

function App() {

    const isLoggedIn = localStorage.getItem("loggedIn") === "true";
    const role = localStorage.getItem("role");

    return (

        <Routes>

            <Route
                path="/"
                element={
                    !isLoggedIn ? (
                        <Navigate to="/login" />
                    ) : role === "ADMIN" ? (
                        <Navigate to="/dashboard" />
                    ) : (
                        <Navigate to="/student-dashboard" />
                    )
                }
            />

            <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />

            <Route
                path="/dashboard"
                element={
                    isLoggedIn && role === "ADMIN"
                        ? <Dashboard />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/students"
                element={
                    isLoggedIn && role === "ADMIN"
                        ? <Student />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/attendance"
                element={
                    isLoggedIn && role === "ADMIN"
                        ? <Attendance />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/reports"
                element={
                    isLoggedIn && role === "ADMIN"
                        ? <Reports />
                        : <Navigate to="/login" />
                }
            />

            {/* 👇 Add it here */}
            <Route
                path="/generate-qr"
                element={
                    isLoggedIn && role === "ADMIN"
                        ? <QRCodeAttendance />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/student-dashboard"
                element={
                    isLoggedIn && role === "STUDENT"
                        ? <StudentDashboard />
                        : <Navigate to="/login" />
                }
            />

            <Route
                path="/scan"
                element={<ScanAttendance />}
            />

        </Routes>

    );
}

export default App;