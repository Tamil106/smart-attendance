import { useState } from "react";
import QRCode from "react-qr-code";
import Navbar from "./Navbar";
import "../styles/QRCodeAttendance.css";

function QRCodeAttendance() {

    const today = new Date().toISOString().split("T")[0];

    const [qrValue, setQrValue] = useState(
        `https://smart-attendance-ochre.vercel.app/scan?date=${today}`
    );

    const generateQR = () => {

        const currentDate = new Date().toISOString().split("T")[0];

        setQrValue(
            `https://smart-attendance-ochre.vercel.app/scan?date=${currentDate}`
        );

    };

    return (

        <>

            <Navbar />

            <div className="qr-page">

                <div className="qr-header">

                    <h1>📷 QR Attendance</h1>

                    <p>

                        Generate today's QR code for students to mark attendance.

                    </p>

                </div>

                <div className="qr-container">

                    <div className="qr-card">

                        <h2>Today's QR Code</h2>

                        <div className="qr-box">

                            <QRCode

                                value={qrValue}

                                size={240}

                            />

                        </div>

                        <p className="date">

                            📅 Date : <strong>{today}</strong>

                        </p>

                        <span className="status">

                            🟢 QR Status : Active

                        </span>

                        <button

                            className="generate-btn"

                            onClick={generateQR}

                        >

                            🔄 Generate Today's QR

                        </button>

                    </div>

                    <div className="instruction-card">

                        <h2>Instructions</h2>

                        <ol>

                            <li>Student must login first.</li>

                            <li>Scan the QR Code.</li>

                            <li>Attendance will be marked automatically.</li>

                            <li>QR is valid only for today.</li>

                        </ol>

                    </div>

                </div>

            </div>

        </>

    );

}

export default QRCodeAttendance;