import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome {user?.name || "User"} 🎉</h1>
      <p>You are logged in successfully.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
