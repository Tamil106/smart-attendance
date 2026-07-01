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

        const response = await API.get("/students");

        const allStudents = response.data;

        const uniqueDepartments = [
            ...new Set(allStudents.map(student => student.department))
        ];

        setDepartments(uniqueDepartments);

    };

    const loadStudentsByDepartment = async () => {

        if (department === "") {

            alert("Select Department");

            return;

        }

        const response = await API.get(
            `/students/department/${department}`
        );

        setStudents(response.data);

        const temp = {};

        response.data.forEach(student => {

            temp[student.id] = "Present";

        });

        setAttendance(temp);

    };

    const loadAttendanceForDate = async () => {

        try {

            const response = await API.get(`/attendance/date/${selectedDate}`);

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

            alert("Error Saving Attendance!");

        }

    };

    return (

        <>
            <Navbar />

            <div className="attendance-container">

                <h2>Attendance Management</h2>

                <div className="attendance-form">

                    <label><b>Department</b></label>

                    <select
                        value={department}
                        onChange={(e)=>setDepartment(e.target.value)}
                    >

                        <option value="">Select Department</option>

                        {departments.map(dep=>(
                            <option key={dep} value={dep}>
                                {dep}
                            </option>
                        ))}

                    </select>

                    <br/><br/>

                    <label><b>Date</b></label>

                    <input
                        type="date"
                        value={selectedDate}
                        onChange={(e)=>setSelectedDate(e.target.value)}
                    />

                    <br/><br/>

                    <button onClick={loadStudentsByDepartment}>
                        Load Students
                    </button>

                </div>

                <table className="attendance-table">

                    <thead>

                    <tr>
                        <th>Roll No</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Present</th>
                        <th>Absent</th>
                    </tr>

                    </thead>

                    <tbody>

                    {students.map(student => (

                        <tr key={student.id}>

                            <td>{student.rollNumber}</td>

                            <td>{student.name}</td>

                            <td>{student.department}</td>

                            <td>

                                <input
                                    type="radio"
                                    name={`status-${student.id}`}
                                    checked={attendance[student.id] === "Present"}
                                    onChange={() =>
                                        setAttendance({
                                            ...attendance,
                                            [student.id]: "Present"
                                        })
                                    }
                                />

                            </td>

                            <td>

                                <input
                                    type="radio"
                                    name={`status-${student.id}`}
                                    checked={attendance[student.id] === "Absent"}
                                    onChange={() =>
                                        setAttendance({
                                            ...attendance,
                                            [student.id]: "Absent"
                                        })
                                    }
                                />

                            </td>

                        </tr>

                    ))}

                    </tbody>

                </table>

                <div style={{ textAlign: "center", marginTop: "25px" }}>

                    <button
                        className="save-btn"
                        onClick={saveAttendance}
                    >
                        Save Attendance
                    </button>

                </div>

            </div>

        </>

    );

}

export default Attendance;