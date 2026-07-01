import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Student.css";
import Navbar from "./Navbar";

function Student() {

    const [students, setStudents] = useState([]);
    const [search, setSearch] = useState("");

    const [student, setStudent] = useState({
        name: "",
        rollNumber: "",
        department: "",
        year: "",
        email: ""
    });

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        const response = await API.get("/students");
        setStudents(response.data);
    };

    const saveStudent = async () => {

        if (student.id) {
            await API.put(`/students/${student.id}`, student);
        } else {
            await API.post("/students", student);
        }

        setStudent({
            name: "",
            rollNumber: "",
            department: "",
            year: "",
            email: ""
        });

        loadStudents();
    };

    const editStudent = (s) => {

        setStudent({
            id: s.id,
            name: s.name,
            rollNumber: s.rollNumber,
            department: s.department,
            year: s.year,
            email: s.email
        });

    };

    const deleteStudent = async (id) => {

        if (window.confirm("Are you sure you want to delete this student?")) {
            await API.delete(`/students/${id}`);
            loadStudents();
        }

    };

    return (
        <>
            <Navbar />
        <div className="student-container">

            <h2>Student Management</h2>

            <div className="student-form">

                <input
                    placeholder="Name"
                    value={student.name}
                    onChange={(e) =>
                        setStudent({ ...student, name: e.target.value })
                    }
                />

                <input
                    placeholder="Roll Number"
                    value={student.rollNumber}
                    onChange={(e) =>
                        setStudent({ ...student, rollNumber: e.target.value })
                    }
                />

                <input
                    placeholder="Department"
                    value={student.department}
                    onChange={(e) =>
                        setStudent({ ...student, department: e.target.value })
                    }
                />

                <input
                    type="number"
                    placeholder="Year"
                    value={student.year}
                    onChange={(e) =>
                        setStudent({ ...student, year: e.target.value })
                    }
                />

                <input
                    placeholder="Email"
                    value={student.email}
                    onChange={(e) =>
                        setStudent({ ...student, email: e.target.value })
                    }
                />

                <button onClick={saveStudent}>
                    {student.id ? "Update Student" : "Add Student"}
                </button>

            </div>

            <br />

            <input
                type="text"
                placeholder="🔍 Search by Name, Roll Number or Department"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "350px",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "5px",
                    border: "1px solid gray"
                }}
            />

            <table className="student-table">

                <thead>
                <tr>
                    <th>Name</th>
                    <th>Roll Number</th>
                    <th>Department</th>
                    <th>Year</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>

                <tbody>

                {students
                    .filter((s) =>
                        s.name.toLowerCase().includes(search.toLowerCase()) ||
                        s.rollNumber.toLowerCase().includes(search.toLowerCase()) ||
                        s.department.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((s) => (

                        <tr key={s.id}>
                            
                            <td>{s.name}</td>
                            <td>{s.rollNumber}</td>
                            <td>{s.department}</td>
                            <td>{s.year}</td>
                            <td>{s.email}</td>

                            <td>

                                <button
                                    className="action-btn edit-btn"
                                    onClick={() => editStudent(s)}
                                >
                                    Edit
                                </button>

                                <button
                                    className="action-btn delete-btn"
                                    onClick={() => deleteStudent(s.id)}
                                >
                                    Delete
                                </button>

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
        </>

    );
}

export default Student;