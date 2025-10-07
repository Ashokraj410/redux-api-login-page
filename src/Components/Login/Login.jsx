import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../AuthSlice";
import { useNavigate } from "react-router-dom";
import Toasting from "../Toast/Toasting";
import "./log.css"

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [toastmsg, setToastMsg] = useState("");
  const [toasttype, setToastType] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!userName) {
      setUserNameError("Please enter Username");
      return;
    }
    if (!password) {
      setPasswordError("Please enter Password");
      return;
    }

    try {
      const result = await dispatch(
        loginUser({ userName, password, origin: "AGENT" })
      );

      if (loginUser.fulfilled.match(result)) {
        setToastMsg("login Successfully!")
        setToastType("success")
        setTimeout(() => {
          navigate("/verify")

        }, 5000)
      } else {
        const apiError = result.payload || result.error;
        setToastMsg(apiError.message || "Login failed!");
        setToastType("error");
      }
    } catch (err) {
      console.error("Login error:", err);
      setToastMsg("Something went wrong.");
      setToastType("error");
    }
  };

  const inputstyle = {
    width: "90%",
    height: "30px",
    border: "2px solid #ccc",
    outline: "none",
    borderRadius: "10px",
    background: "#f2f2f2",
    paddingInline: "10px",
    alignSelf: "center",
  }
  

  return (
    <div
      style={{
        padding: "20px",
        width: "380px",
        background: "#ccc",
        borderRadius: "30px",
        float: "right",
        margin: "240px 100px",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        onSubmit={handleLogin}
      >
        <label>UserName</label>
        <input
          style={inputstyle}
          type="text"
          name="Username"
          placeholder="Username"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
            if (e.target.value.trim() !== "") setUserNameError("");
          }}
        />
        {userNameError && <span style={{ color: "red" }}>{userNameError}</span>}

        <label>Password</label>
        <input
          style={inputstyle}
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (e.target.value.trim() !== "") setPasswordError("");
          }}
        />
        {passwordError && <span style={{ color: "red" }}>{passwordError}</span>}

        <button
          style={{
            width: "40%",
            alignSelf: "center",
            height: "35px",
            cursor: "pointer",
            borderRadius: "10px",
            border: "none",
            background: "#1976d2",
            color: "#fff",
            fontWeight: "bold",
          }}
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <Toasting
          message={toastmsg}
          type={toasttype}
          onClose={() => setToastMsg("")}
        />
      </form>
    </div>
  );
};

export default LoginPage;
