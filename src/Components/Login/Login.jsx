import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../AuthSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, accessCode } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const resultAction = await dispatch(
      loginUser({ userName, password, origin: "AGENT" })
    );

    // ✅ Check if login was successful
    if (loginUser.fulfilled.match(resultAction)) {
      // API response is in resultAction.payload
      const { accessCode, opaque } = resultAction.payload.data;

      // ✅ Store values in localStorage
      localStorage.setItem("accessCode", accessCode);
      localStorage.setItem("opaque", opaque);

      // ✅ Navigate to OTP page
      navigate("/verify");
    } else {
      // Login failed, show error
      console.error("Login failed:", resultAction.payload || resultAction.error);
    }
  } catch (err) {
    console.error("Unexpected error during login:", err);
  }
};


  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>

      {accessCode && (
        <p style={{ color: "blue" }}>Mock OTP: {accessCode}</p>
      )}

      {error && <p style={{ color: "red" }}>{error?.message || error}</p>}
    </div>
  );
};

export default LoginPage;
