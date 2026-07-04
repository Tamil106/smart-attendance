import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

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

                    navigate("/dashboard", { replace: true });

                } else {

                    alert("Invalid Admin Credentials");

                }

            } else {

                const response = await API.post("/students/login", {
                    rollNumber: username,
                    password
                });

                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("role", "STUDENT");
                localStorage.setItem("student", JSON.stringify(response.data));

                navigate("/student-dashboard", { replace: true });

            }

        } catch (error) {

            alert("Login Failed");

        }

    };

    return (

        <div className="login-container">

            <div className="design1"></div>
            <div className="design2"></div>

            <div className="login-box">

                <div className="logo">🎓</div>

                <h2>SMART ATTENDANCE</h2>

                <h3>Welcome Back 👋</h3>

                <h4>{role} Login</h4>

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="ADMIN">Admin</option>
                    <option value="STUDENT">Student</option>
                </select>

                <input
                    type="text"
                    placeholder={
                        role === "ADMIN"
                            ? "Username"
                            : "Roll Number"
                    }
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