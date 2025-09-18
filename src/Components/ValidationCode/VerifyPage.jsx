import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resendOtpApi, verifyOtpApi } from '../../Api/axiosInstance';

const VerifyPage = () => {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, otpMessage, accessCode } = useSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(100);

 

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setOtp(value); // only allow digits
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) return; // basic validation
    dispatch(verifyOtpApi({ otp, userId: user?.id || user?.userId }))
      .unwrap()
      .then(() => navigate("/home", { replace: true }))
      .catch((err) => console.error("OTP verify failed:", err));
  };

  const handleResend = () => {
    if ((user?.id || user?.userId) && timer === 0) {
      dispatch(resendOtpApi(user.id || user.userId));
      setTimer(100);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", paddingTop: "20px" }}>
      <form
        onSubmit={handleVerify}
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2>Verify OTP</h2>

        {process.env.NODE_ENV === "development" && accessCode && (
          <p style={{ color: "blue", fontWeight: "bold" }}>
            Mock OTP: {accessCode}
          </p>
        )}

        <input
          type="text"
          value={otp}
          onChange={handleChange}
          placeholder="Enter OTP"
          autoFocus
          style={{
            fontSize: "18px",
            padding: "8px",
            marginBottom: "12px",
            textAlign: "center",
            width: "100%",
          }}
        />
        <br />
        <button type="submit" disabled={loading || !otp}>
          {loading ? "Verifying..." : "Verify"}
        </button>

        <div style={{ marginTop: "12px" }}>
          {timer > 0 ? (
            <p>Resend OTP in {timer}s</p>
          ) : (
            <button type="button" onClick={handleResend} disabled={loading}>
              Resend OTP
            </button>
          )}
        </div>

        {otpMessage && timer === 30 && (
          <p style={{ color: "green" }}>{otpMessage}</p>
        )}
        {error && (
          <p style={{ color: "red" }}>
            {typeof error === "string" ? error : error.message || "Error"}
          </p>
        )}
      </form>
    </div>
  );
};



export default VerifyPage