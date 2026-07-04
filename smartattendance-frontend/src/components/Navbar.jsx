import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const location = useLocation();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        navigate("/login", { replace: true });

        window.location.reload();

    };

    return (

        <div className="sidebar">

            <div className="sidebar-top">

                <div className="logo">

                    🎓

                </div>

                <h2>Smart Attendance</h2>

                <p>Management System</p>

            </div>

            <div className="sidebar-menu">

                {role === "ADMIN" ? (

                    <>

                        <Link
                            className={location.pathname === "/dashboard" ? "active" : ""}
                            to="/dashboard"
                        >
                            Dashboard
                        </Link>

                        <Link
                            className={location.pathname === "/students" ? "active" : ""}
                            to="/students"
                        >
                            Students
                        </Link>

                        <Link
                            className={location.pathname === "/attendance" ? "active" : ""}
                            to="/attendance"
                        >
                            Attendance
                        </Link>

                        <Link
                            className={location.pathname === "/reports" ? "active" : ""}
                            to="/reports"
                        >
                            Reports
                        </Link>

                        <Link
                            className={location.pathname === "/generate-qr" ? "active" : ""}
                            to="/generate-qr"
                        >
                            QR Attendance
                        </Link>

                    </>

                ) : (

                    <>

                        <Link
                            className={location.pathname === "/student-dashboard" ? "active" : ""}
                            to="/student-dashboard"
                        >
                            🎓 My Dashboard
                        </Link>

                    </>

                )}

            </div>

            <div className="sidebar-bottom">

                <button onClick={logout}>

                    Logout

                </button>

            </div>

        </div>

    );

}

export default Navbar;