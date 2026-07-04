import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../services/api";

function ScanAttendance() {

    const [searchParams] = useSearchParams();

    useEffect(() => {
        markAttendance();
    }, []);

    const markAttendance = async () => {

        const student = JSON.parse(localStorage.getItem("student"));

        if (!student) {

            alert("Please login as Student");

            window.location.href = "/login";

            return;

        }

        const date = searchParams.get("date");

        try {

            await API.post("/attendance", {

                studentId: student.id,

                date: date,

                status: "Present"

            });

            alert("✅ Attendance Marked Successfully");

            window.location.href = "/student-dashboard";

        }

        catch (error) {

            if (error.response) {

                alert(error.response.data);

            }

            else {

                alert("Something went wrong");

            }

            window.location.href = "/student-dashboard";

        }

    };

    return (

        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg,#dbeafe,#eff6ff)",
                padding: "20px"
            }}
        >

            <div
                style={{
                    background: "#ffffff",
                    width: "420px",
                    maxWidth: "100%",
                    borderRadius: "20px",
                    padding: "40px",
                    textAlign: "center",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.12)"
                }}
            >

                <div
                    style={{
                        width: "90px",
                        height: "90px",
                        margin: "0 auto 25px",
                        borderRadius: "50%",
                        background: "#2563eb",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "45px",
                        color: "white"
                    }}
                >
                    📷
                </div>

                <h2
                    style={{
                        color: "#1e3a8a",
                        marginBottom: "15px"
                    }}
                >
                    Processing Attendance
                </h2>

                <p
                    style={{
                        color: "#64748b",
                        fontSize: "16px",
                        lineHeight: "1.8"
                    }}
                >
                    Please wait while your attendance is being verified and marked.
                </p>

                {/* Loading Spinner */}

                <div
                    style={{
                        width: "50px",
                        height: "50px",
                        border: "5px solid #dbeafe",
                        borderTop: "5px solid #2563eb",
                        borderRadius: "50%",
                        margin: "30px auto",
                        animation: "spin 1s linear infinite"
                    }}
                />

                <p
                    style={{
                        color: "#2563eb",
                        fontWeight: "600"
                    }}
                >
                    Verifying QR Code...
                </p>

            </div>

            {/* Spinner Animation */}

            <style>

                {`
                    @keyframes spin {
                        0% {
                            transform: rotate(0deg);
                        }
                        100% {
                            transform: rotate(360deg);
                        }
                    }
                `}

            </style>

        </div>

    );

}

export default ScanAttendance;