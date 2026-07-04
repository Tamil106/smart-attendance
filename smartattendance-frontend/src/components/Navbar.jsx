import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const role = localStorage.getItem("role");

    const [menuOpen, setMenuOpen] = useState(false);
    

    const logout = () => {

    localStorage.clear();

    navigate("/login", { replace: true });

    window.location.reload();

};

    const closeMenu = () => {

        setMenuOpen(false);

    };

    return (

        <>

            {/* Mobile Top Navbar */}

            <div className="mobile-navbar">

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(true)}
                >
                    ☰
                </button>

                <h2>Smart Attendance</h2>

            </div>

            {/* Overlay */}

            {menuOpen && (

                <div
                    className="overlay"
                    onClick={closeMenu}
                />

            )}

            {/* Sidebar */}

            <div className={`sidebar ${menuOpen ? "open" : ""}`}>

                <div>

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
                                    to="/dashboard"
                                    className={location.pathname === "/dashboard" ? "active" : ""}
                                    onClick={closeMenu}
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/students"
                                    className={location.pathname === "/students" ? "active" : ""}
                                    onClick={closeMenu}
                                >
                                    Students
                                </Link>

                                <Link
                                    to="/attendance"
                                    className={location.pathname === "/attendance" ? "active" : ""}
                                    onClick={closeMenu}
                                >
                                    Attendance
                                </Link>

                                <Link
                                    to="/reports"
                                    className={location.pathname === "/reports" ? "active" : ""}
                                    onClick={closeMenu}
                                >
                                    Reports
                                </Link>

                                <Link
                                    to="/generate-qr"
                                    className={location.pathname === "/generate-qr" ? "active" : ""}
                                    onClick={closeMenu}
                                >
                                    QR Attendance
                                </Link>

                            </>

                        ) : (

                            <Link
                                to="/student-dashboard"
                                className={location.pathname === "/student-dashboard" ? "active" : ""}
                                onClick={closeMenu}
                            >
                                My Dashboard
                            </Link>

                        )}

                    </div>

                </div>

                <div className="sidebar-bottom">

                    <button onClick={logout}>

                        Logout

                    </button>

                </div>

            </div>

        </>

    );

}

export default Navbar;