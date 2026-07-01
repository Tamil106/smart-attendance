import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "./Navbar";

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
            selectedDate === "" || record.date === selectedDate;

        const matchStatus =
            status === "All" || record.status === status;

        return matchSearch && matchDate && matchStatus;

    });

    return (
        <>
            <Navbar />

            <div style={{ padding: "30px" }}>

                <h2 style={{ textAlign: "center" }}>
                    Attendance Reports
                </h2>

                <table
                    border="1"
                    cellPadding="15"
                    style={{
                        margin: "20px auto",
                        width: "50%",
                        borderCollapse: "collapse"
                    }}
                >
                    <tbody>

                    <tr>
                        <td><b>Total Students</b></td>
                        <td>{stats.totalStudents}</td>
                    </tr>

                    <tr>
                        <td><b>Total Attendance Records</b></td>
                        <td>{stats.totalAttendance}</td>
                    </tr>

                    <tr>
                        <td><b>Today's Present</b></td>
                        <td>{stats.presentToday}</td>
                    </tr>

                    <tr>
                        <td><b>Today's Absent</b></td>
                        <td>{stats.absentToday}</td>
                    </tr>

                    </tbody>
                </table>

                <hr />

                <h2 style={{ textAlign: "center" }}>
                    Student Attendance Percentage
                </h2>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "30px",
                        marginTop: "30px",
                        flexWrap: "wrap"
                    }}
                >

                    {Object.keys(departmentReport).map(department => (

                        <div
                            key={department}
                            style={{ flex: "1", minWidth: "350px" }}
                        >

                            <h3 style={{ textAlign: "center" }}>
                                {department} Department
                            </h3>

                            <table
                                border="1"
                                cellPadding="10"
                                style={{
                                    width: "100%",
                                    borderCollapse: "collapse"
                                }}
                            >

                                <thead>

                                <tr>
                                    <th>Student</th>
                                    <th>Attendance %</th>
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

                <hr />

                <h2 style={{ textAlign: "center" }}>
                    Attendance History
                </h2>

                <div
                    style={{
                        display: "flex",
                        gap: "15px",
                        marginBottom: "20px",
                        flexWrap: "wrap"
                    }}
                >

                    <input
                        type="text"
                        placeholder="Search Student"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) =>
                            setSelectedDate(e.target.value)
                        }
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="All">All</option>
                        <option value="Present">Present</option>
                        <option value="Absent">Absent</option>
                    </select>

                </div>

                <table
                    border="1"
                    cellPadding="10"
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >

                    <thead>

                    <tr>
                        <th>Department</th>
                        <th>Roll No</th>
                        <th>Student Name</th>
                        <th>Date</th>
                        <th>Status</th>
                    </tr>

                    </thead>

                    <tbody>

                    {filteredAttendance.map(record => {

                        const student = students.find(
                            s => s.id === record.studentId
                        );

                        return (

                            <tr key={record.id}>

                                <td>{student?.department}</td>

                                <td>{student?.rollNumber}</td>

                                <td>{student?.name}</td>

                                <td>{record.date}</td>

                                <td
                                    style={{
                                        color:
                                            record.status === "Present"
                                                ? "green"
                                                : "red",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {record.status === "Present"
                                        ? "✅ Present"
                                        : "❌ Absent"}
                                </td>

                            </tr>

                        );

                    })}

                    </tbody>

                </table>

            </div>

        </>
    );
}

export default Reports;