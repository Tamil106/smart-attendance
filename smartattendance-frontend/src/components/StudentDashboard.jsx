import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";
import "../styles/StudentDashboard.css";

function StudentDashboard() {

    const student = JSON.parse(localStorage.getItem("student"));

    const [percentage, setPercentage] = useState(0);
    const [attendance, setAttendance] = useState([]);

    const [presentCount, setPresentCount] = useState(0);
    const [absentCount, setAbsentCount] = useState(0);

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

        try {

            const percentageResponse = await API.get(
                `/attendance/percentage/${student.id}`
            );

            const attendanceResponse = await API.get(
                `/attendance/student/${student.id}`
            );

            setPercentage(percentageResponse.data);

            setAttendance(attendanceResponse.data);

            const present = attendanceResponse.data.filter(
                a => a.status === "Present"
            ).length;

            const absent = attendanceResponse.data.filter(
                a => a.status === "Absent"
            ).length;

            setPresentCount(present);

            setAbsentCount(absent);

        }

        catch(error){

            console.log(error);

        }

    };

    return (

        <>

            <Navbar />

            <div className="student-dashboard">

                <div className="student-header">

                    <div className="profile-circle">

                        👨‍🎓

                    </div>

                    <div>

                        <h1>

                            Welcome, {student.name}

                        </h1>

                        <p>

                            View your attendance details and academic record.

                        </p>

                    </div>

                </div>

                <div className="student-cards">

                    <div className="student-card blue">

                        <h3>🎓 Roll Number</h3>

                        <p>{student.rollNumber}</p>

                    </div>

                    <div className="student-card green">

                        <h3>🏫 Department</h3>

                        <p>{student.department}</p>

                    </div>

                    <div className="student-card orange">

                        <h3>📚 Year</h3>

                        <p>{student.year}</p>

                    </div>

                    <div className="student-card purple">

                        <h3>📊 Attendance</h3>

                        <p>{percentage.toFixed(2)}%</p>

                    </div>

                    <div className="student-card success">

                        <h3>✅ Present</h3>

                        <p>{presentCount}</p>

                    </div>

                    <div className="student-card danger">

                        <h3>❌ Absent</h3>

                        <p>{absentCount}</p>

                    </div>

                </div>

                <div className="history-card">

                    <h2>

                        📅 Attendance History

                    </h2>

                    <div className="table-wrapper">

                        <table className="attendance-table">

                            <thead>

                                <tr>

                                    <th>Date</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>
                                                            {attendance.length > 0 ? (

                                attendance.map((a) => (

                                    <tr key={a.id}>

                                        <td>{a.date}</td>

                                        <td>

                                            <span
                                                className={
                                                    a.status === "Present"
                                                        ? "status present"
                                                        : "status absent"
                                                }
                                            >

                                                {a.status === "Present"
                                                    ? "✅ Present"
                                                    : "❌ Absent"}

                                            </span>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="2">

                                        No Attendance Records Found

                                    </td>

                                </tr>

                            )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}

export default StudentDashboard;