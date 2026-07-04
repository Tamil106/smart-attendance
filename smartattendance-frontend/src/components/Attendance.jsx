import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Attendance.css";
import Navbar from "./Navbar";

function Attendance() {

    const today = new Date().toISOString().split("T")[0];

    const [students, setStudents] = useState([]);
    const [attendance, setAttendance] = useState({});
    const [selectedDate, setSelectedDate] = useState(today);
    const [department, setDepartment] = useState("");
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        loadStudents();
    }, []);

    useEffect(() => {
        if (students.length > 0) {
            loadAttendanceForDate();
        }
    }, [selectedDate, students]);

    const loadStudents = async () => {

        try {

            const response = await API.get("/students");

            const allStudents = response.data;

            const uniqueDepartments = [
                ...new Set(allStudents.map(student => student.department))
            ];

            setDepartments(uniqueDepartments);

        } catch (error) {

            console.log(error);

        }

    };

    const loadStudentsByDepartment = async () => {

        if (department === "") {

            alert("Please select a department.");

            return;

        }

        try {

            const response = await API.get(
                `/students/department/${department}`
            );

            setStudents(response.data);

            const temp = {};

            response.data.forEach(student => {

                temp[student.id] = "Present";

            });

            setAttendance(temp);

        } catch (error) {

            console.log(error);

        }

    };

    const loadAttendanceForDate = async () => {

        try {

            const response = await API.get(
                `/attendance/date/${selectedDate}`
            );

            const temp = {};

            students.forEach(student => {

                temp[student.id] = "Present";

            });

            response.data.forEach(record => {

                temp[record.studentId] = record.status;

            });

            setAttendance(temp);

        } catch (error) {

            console.log(error);

        }

    };

    const saveAttendance = async () => {

        try {

            const attendanceData = students.map(student => ({

                studentId: student.id,

                date: selectedDate,

                status: attendance[student.id]

            }));

            await API.post("/attendance/save-all", attendanceData);

            alert("Attendance Saved Successfully!");

        } catch (error) {

            console.log(error);

            alert("Error Saving Attendance");

        }

    };

    return (

        <>

            <Navbar />

            <div className="attendance-container">

                <div className="attendance-header">

                    <div>

                        <h1>📅 Attendance Management</h1>

                        <p>

                            Select a department, mark attendance and save records.

                        </p>

                    </div>

                </div>

                <div className="attendance-card">

                    <div className="form-group">

                        <label>Department</label>

                        <select

                            value={department}

                            onChange={(e)=>setDepartment(e.target.value)}

                        >

                            <option value="">

                                Select Department

                            </option>

                            {departments.map(dep=>(

                                <option

                                    key={dep}

                                    value={dep}

                                >

                                    {dep}

                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="form-group">

                        <label>Date</label>

                        <input

                            type="date"

                            value={selectedDate}

                            onChange={(e)=>

                                setSelectedDate(e.target.value)

                            }

                        />

                    </div>

                    <button

                        className="load-btn"

                        onClick={loadStudentsByDepartment}

                    >

                        Load Students

                    </button>

                </div>

                <div className="table-wrapper">

                    <table className="attendance-table">

                        <thead>

                        <tr>

                            <th>Roll No</th>

                            <th>Name</th>

                            <th>Department</th>

                            <th>✅ Present</th>

                            <th>❌ Absent</th>

                        </tr>

                        </thead>

                        <tbody>
                                                    {students.map((student) => (

                            <tr key={student.id}>

                                <td>{student.rollNumber}</td>

                                <td>{student.name}</td>

                                <td>{student.department}</td>

                                <td>

                                    <label className="radio-label">

                                        <input
                                            type="radio"
                                            name={`status-${student.id}`}
                                            checked={
                                                attendance[student.id] === "Present"
                                            }
                                            onChange={() =>
                                                setAttendance({
                                                    ...attendance,
                                                    [student.id]: "Present"
                                                })
                                            }
                                        />

                                        <span className="present-badge">
                                            Present
                                        </span>

                                    </label>

                                </td>

                                <td>

                                    <label className="radio-label">

                                        <input
                                            type="radio"
                                            name={`status-${student.id}`}
                                            checked={
                                                attendance[student.id] === "Absent"
                                            }
                                            onChange={() =>
                                                setAttendance({
                                                    ...attendance,
                                                    [student.id]: "Absent"
                                                })
                                            }
                                        />

                                        <span className="absent-badge">
                                            Absent
                                        </span>

                                    </label>

                                </td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

                <div className="save-section">

                    <button

                        className="save-btn"

                        onClick={saveAttendance}

                    >

                        💾 Save Attendance

                    </button>

                </div>

            </div>

        </>

    );

}

export default Attendance;