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

        } catch (error) {

            if (error.response) {
                alert(error.response.data);
            } else {
                alert("Something went wrong");
            }

        }

    };

    return (
        <div style={{ textAlign: "center", marginTop: "100px" }}>
            <h2>Processing Attendance...</h2>
        </div>
    );

}

export default ScanAttendance;