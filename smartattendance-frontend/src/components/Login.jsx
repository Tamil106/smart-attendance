import { useState } from "react";
import API from "../services/api";
import "../styles/Login.css";

function Login() {

    const [role, setRole] = useState("ADMIN");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = async () => {

        try {

            if (role === "ADMIN") {

                const response = await API.post("/admin/login", {
                    username,
                    password
                });

                if (response.data === "Login Successful") {

                    localStorage.setItem("loggedIn", "true");
                    localStorage.setItem("role", "ADMIN");

                    window.location.href = "/dashboard";

                } else {

                    alert("Invalid Admin Credentials");

                }

            } else {

                const response = await API.post("/students/login", {
                    rollNumber: username,
                    password: password
                });

                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("role", "STUDENT");
                localStorage.setItem("student", JSON.stringify(response.data));

                window.location.href = "/student-dashboard";

            }

        } catch (error) {

            console.log(error);

            alert("Login Failed");

        }

    };

    return (

        <div className="login-container">

            <div className="login-box">

                <h2><b>SMART ATTENDANCE</b></h2>

                <h3>{role} Login</h3>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="ADMIN">Admin</option>
                    <option value="STUDENT">Student</option>
                </select>

                <br /><br />

                <input
                    type="text"
                    placeholder={role === "ADMIN" ? "Username" : "Roll Number"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={login}>
                    Login
                </button>

            </div>

        </div>

    );

}

export default Login;