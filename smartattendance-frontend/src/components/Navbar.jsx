import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    const role = localStorage.getItem("role");

    const logout = () => {

        localStorage.clear();

        navigate("/login", { replace: true });

        window.location.reload();

    };

    return (

        <nav className="navbar">

            <h2>Smart Attendance</h2>

            <div>

                {role === "ADMIN" ? (
                    <>
                        <Link to="/dashboard">Dashboard</Link>

                        <Link to="/students">Students</Link>

                        <Link to="/attendance">Attendance</Link>

                        <Link to="/reports">Reports</Link>

                        <Link to="/generate-qr">QR Attendance</Link>
                    </>
                ) : (
                    <>
                        <Link to="/student-dashboard">
                            My Dashboard
                        </Link>
                    </>
                )}

                <button onClick={logout}>
                    Logout
                </button>

            </div>

        </nav>

    );

}

export default Navbar;