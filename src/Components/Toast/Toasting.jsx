import React, { useEffect } from "react";

const Toasting = ({ message, type = "success", onClose, duration = 3000 }) => {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const styleToast = {
    backgroundColor: type === "success" ? "green" : "red",
    position: "fixed",
    padding: "10px 20px",
    top: "20px",
    right: "20px",
    borderRadius: "5px",
    color: "#f2f2f2",
    zIndex: 9999,
  };

  return <div style={styleToast}>{message}</div>;
};

export default Toasting;
