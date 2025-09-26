import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyOtp } from "../../AuthSlice";
import "./otp.css"

export default function VerifyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessCode, error, otpMessage } = useSelector((state) => state.auth);

  const [inputOtp, setInputOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    parseInt(localStorage.getItem("expiry")) || 100
  );
  const [storedAccessCode, setStoredAccessCode] = useState(
    localStorage.getItem("accessCode")
  );

  // countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // update OTP when Redux changes
  useEffect(() => {
    if (accessCode) {
      setStoredAccessCode(accessCode);
      localStorage.setItem("accessCode", accessCode);
      setTimeLeft(100); // reset timer on new OTP
    }
  }, [accessCode]);

  const handleVerify = async () => {
    try {
      const result = await dispatch(
        verifyOtp({ accessCode: inputOtp }) // payload to backend
      ).unwrap();
        alert("OTP Verified Successfully!");
        navigate("/home");
      
    } catch (err) {
      console.error("OTP Verification Failed:", err);
      alert("Invalid OTP. Try again.");
    }
  };


  return (
    <div className="container">
      <div className="con-main"
      >
        <h3>Message</h3>
        <p>
          Your OTP:{" "}
          <strong>{storedAccessCode || "Waiting for OTP..."}</strong>
        </p>
        <p>Expires in: {timeLeft}s</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={inputOtp}
          onChange={(e) => setInputOtp(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />

        <button
          onClick={handleVerify}
          style={{
            width: "100%",
            padding: "10px",
            background: "#4caf50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
        >
          Verify
        </button>

        {error && <p style={{ color: "red" }}>{error.message || error}</p>}
        {otpMessage && <p style={{ color: "green" }}>{otpMessage}</p>}
      </div>
    </div>
  );
}
