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

        try {

            const response = await API.get("/students");

            setStudents(response.data);

        } catch (error) {

            console.log(error);

        }

    };

    const saveStudent = async () => {

        try {

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

        } catch (error) {

            console.log(error);

            alert("Unable to save student");

        }

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

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    };

    const deleteStudent = async (id) => {

        if (window.confirm("Delete this student?")) {

            await API.delete(`/students/${id}`);

            loadStudents();

        }

    };

    return (

        <>

            <Navbar />

            <div className="student-container">

                <div className="student-header">

                    <div>

                        <h1>👨‍🎓 Student Management</h1>

                        <p>
                            Add, edit, update and manage student information.
                        </p>

                    </div>

                </div>

                <div className="student-form">

                    <input
                        type="text"
                        placeholder="Student Name"
                        value={student.name}
                        onChange={(e) =>
                            setStudent({
                                ...student,
                                name: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Roll Number"
                        value={student.rollNumber}
                        onChange={(e) =>
                            setStudent({
                                ...student,
                                rollNumber: e.target.value
                            })
                        }
                    />

                    <input
                        type="text"
                        placeholder="Department"
                        value={student.department}
                        onChange={(e) =>
                            setStudent({
                                ...student,
                                department: e.target.value
                            })
                        }
                    />

                    <input
                        type="number"
                        placeholder="Year"
                        value={student.year}
                        onChange={(e) =>
                            setStudent({
                                ...student,
                                year: e.target.value
                            })
                        }
                    />

                    <input
                        type="email"
                        placeholder="Email"
                        value={student.email}
                        onChange={(e) =>
                            setStudent({
                                ...student,
                                email: e.target.value
                            })
                        }
                    />

                    <button onClick={saveStudent}>

                        {student.id
                            ? "Update Student"
                            : "Add Student"}

                    </button>

                </div>

                <div className="search-box">

                    <input

                        type="text"

                        placeholder="🔍 Search by Name, Roll Number or Department"

                        value={search}

                        onChange={(e) =>

                            setSearch(e.target.value)

                        }

                    />

                </div>

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
                                        ✏ Edit
                                    </button>

                                    <button
                                        className="action-btn delete-btn"
                                        onClick={() => deleteStudent(s.id)}
                                    >
                                        🗑 Delete
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