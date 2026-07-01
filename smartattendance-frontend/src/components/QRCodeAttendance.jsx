import { useState } from "react";
import QRCode from "react-qr-code";
import Navbar from "./Navbar";

function QRCodeAttendance() {

    const today = new Date().toISOString().split("T")[0];

    const [qrValue, setQrValue] = useState(
        `http://localhost:3000/scan?date=${today}`
    );

    const generateQR = () => {
        const today = new Date().toISOString().split("T")[0];
        setQrValue(`http://localhost:3000/scan?date=${today}`);
    };

    return (
        <>
            <Navbar />

            <div
                style={{
                    textAlign: "center",
                    padding: "40px"
                }}
            >
                <h1>QR Code Attendance</h1>

                <p>Today's Date: {today}</p>

                <div
                    style={{
                        background: "white",
                        display: "inline-block",
                        padding: "20px",
                        borderRadius: "15px",
                        marginTop: "20px"
                    }}
                >
                    <QRCode
                        value={qrValue}
                        size={250}
                    />
                </div>

                <br /><br />

                <button onClick={generateQR}>
                    Generate Today's QR
                </button>

            </div>

        </>
    );
}

export default QRCodeAttendance;