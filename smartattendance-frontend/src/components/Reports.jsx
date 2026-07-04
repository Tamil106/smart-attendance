import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";
import "../styles/Reports.css";

function Reports() {

    const [stats, setStats] = useState({});
    const [students, setStudents] = useState([]);
    const [attendanceList, setAttendanceList] = useState([]);
    const [departmentReport, setDepartmentReport] = useState({});

    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    const [status, setStatus] = useState("All");

    useEffect(() => {

        loadStats();
        loadStudents();
        loadAttendance();
        loadDepartmentReport();

    }, []);

    const loadStats = async () => {

        const response = await API.get("/dashboard");

        setStats(response.data);

    };

    const loadStudents = async () => {

        const response = await API.get("/students");

        setStudents(response.data);

    };

    const loadAttendance = async () => {

        const response = await API.get("/attendance");

        setAttendanceList(response.data);

    };

    const loadDepartmentReport = async () => {

        const response = await API.get("/reports/department-report");

        setDepartmentReport(response.data);

    };

    const filteredAttendance = attendanceList.filter((record) => {

        const student = students.find(
            s => s.id === record.studentId
        );

        if (!student) return false;

        const matchSearch =
            student.name.toLowerCase().includes(search.toLowerCase()) ||
            student.rollNumber.toLowerCase().includes(search.toLowerCase());

        const matchDate =
            selectedDate === "" ||
            record.date === selectedDate;

        const matchStatus =
            status === "All" ||
            record.status === status;

        return matchSearch && matchDate && matchStatus;

    });

    return (

        <>

            <Navbar />

            <div className="reports-container">

                <div className="reports-header">

                    <h1>📊 Attendance Reports</h1>

                    <p>
                        View attendance statistics and department-wise reports.
                    </p>

                </div>

                <div className="summary-cards">

                    <div className="summary-card students">

                        <h3>Total Students</h3>

                        <h2>{stats.totalStudents}</h2>

                    </div>

                    <div className="summary-card present">

                        <h3>Present Today</h3>

                        <h2>{stats.presentToday}</h2>

                    </div>

                    <div className="summary-card absent">

                        <h3>Absent Today</h3>

                        <h2>{stats.absentToday}</h2>

                    </div>

                    <div className="summary-card records">

                        <h3>Total Records</h3>

                        <h2>{stats.totalAttendance}</h2>

                    </div>

                </div>

                <div className="department-section">

                    <h2>Department Attendance Percentage</h2>

                    <div className="department-grid">

                        {Object.keys(departmentReport).map((department) => (

                            <div
                                className="department-card"
                                key={department}
                            >

                                <h3>{department}</h3>

                                <table className="department-table">

                                    <thead>

                                        <tr>

                                            <th>Student</th>

                                            <th>%</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {departmentReport[department].map(student => (

                                            <tr key={student.name}>

                                                <td>{student.name}</td>

                                                <td>

                                                    {student.percentage.toFixed(2)}%

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        ))}

                    </div>

                </div>

                <div className="history-section">

                    <h2>Attendance History</h2>

                    <div className="filter-box">

                        <input

                            type="text"

                            placeholder="🔍 Search Student"

                            value={search}

                            onChange={(e)=>setSearch(e.target.value)}

                        />

                        <input

                            type="date"

                            value={selectedDate}

                            onChange={(e)=>setSelectedDate(e.target.value)}

                        />

                        <select

                            value={status}

                            onChange={(e)=>setStatus(e.target.value)}

                        >

                            <option value="All">All</option>

                            <option value="Present">Present</option>

                            <option value="Absent">Absent</option>

                        </select>

                    </div>

                    <div className="table-wrapper">

                        <table className="history-table">

                            <thead>

                                <tr>

                                    <th>Department</th>

                                    <th>Roll No</th>

                                    <th>Name</th>

                                    <th>Date</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>
                                                                {filteredAttendance.map((record) => {

                                    const student = students.find(
                                        s => s.id === record.studentId
                                    );

                                    return (

                                        <tr key={record.id}>

                                            <td>{student?.department}</td>

                                            <td>{student?.rollNumber}</td>

                                            <td>{student?.name}</td>

                                            <td>{record.date}</td>

                                            <td>

                                                {record.status === "Present" ? (

                                                    <span className="present-status">

                                                        ✅ Present

                                                    </span>

                                                ) : (

                                                    <span className="absent-status">

                                                        ❌ Absent

                                                    </span>

                                                )}

                                            </td>

                                        </tr>

                                    );

                                })}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>

    );

}

export default Reports;