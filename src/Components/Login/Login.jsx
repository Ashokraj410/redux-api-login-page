import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../AuthSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  // errors
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [agreeError, setAgreeError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!userName.trim()) {
      setUserNameError("Enter valid username");
      valid = false;
    } else setUserNameError("");

    if (!password.trim()) {
      setPasswordError("Enter your password");
      valid = false;
    } else setPasswordError("");

    if (!agree) {
      setAgreeError("You must agree to conditions");
      valid = false;
    } else setAgreeError("");

    if (!valid) return;

    dispatch(loginUser({ userName, password }));
  };

  useEffect(() => {
    if (token) navigate("/home");
  }, [token, navigate]);

  const inputStyle = {
    width: "80%",
    height: "30px",
    border: "2px solid #ccc",
    borderRadius: "9px",
    paddingInline: "9px",
    marginLeft: "10px",
  };
  const btnStyle = {
    width: "100px",
    height: "35px",
    alignSelf: "center",
    border: "3px solid #888",
    borderRadius: "9px",
  };
  const errorStyle = {
    color: "red",
    marginLeft: "30px",
  };

  return (
    <div
      style={{
        width: "400px",
        background: "#ccc",
        float: "right",
        margin: "100px 100px",
        padding: "20px",
        border: "2px solid",
        borderRadius: "20px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "8px" }}
      >
        <label>UserName</label>
        <input
          type="text"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={inputStyle}
        />
        {userNameError && <span style={errorStyle}>{userNameError}</span>}

        <label>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        {passwordError && <span style={errorStyle}>{passwordError}</span>}

        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            type="checkbox"
            id="agree"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label htmlFor="agree">Terms and conditions</label>
        </div>
        {agreeError && <span style={errorStyle}>{agreeError}</span>}

        {error && <span style={errorStyle}>{error}</span>}
        <button style={btnStyle} type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <Link
          to="/verifyotp"
          style={{ textAlign: "center", textDecoration: "none" }}
        >
          Verify-Otp
        </Link>
      </form>
    </div>
  );
};

export default Login;
