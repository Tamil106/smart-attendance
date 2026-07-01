import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";
import "../styles/StudentDashboard.css";

function StudentDashboard() {

    const student = JSON.parse(localStorage.getItem("student"));

    const [percentage, setPercentage] = useState(0);
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        const percentageResponse = await API.get(
            `/attendance/percentage/${student.id}`
        );

        const attendanceResponse = await API.get(
            `/attendance/student/${student.id}`
        );

        setPercentage(percentageResponse.data);
        setAttendance(attendanceResponse.data);

    };

    return (
        <>
            <Navbar />

            <div className="student-dashboard">

                <h1>Welcome, {student.name}</h1>

                <div className="student-cards">

                    <div className="student-card">
                        <h3>Roll Number</h3>
                        <p>{student.rollNumber}</p>
                    </div>

                    <div className="student-card">
                        <h3>Department</h3>
                        <p>{student.department}</p>
                    </div>

                    <div className="student-card">
                        <h3>Year</h3>
                        <p>{student.year}</p>
                    </div>

                    <div className="student-card">
                        <h3>Attendance %</h3>
                        <p>{percentage.toFixed(2)}%</p>
                    </div>

                </div>

                <h2>Attendance History</h2>

                <table className="attendance-table">

                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>
                    </thead>

                    <tbody>

                    {attendance.map((a) => (

                        <tr key={a.id}>
                            <td>{a.date}</td>
                            <td>{a.status}</td>
                        </tr>

                    ))}

                    </tbody>

                </table>

            </div>

        </>
    );
}

export default StudentDashboard;