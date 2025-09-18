import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./Components/Login/Login";
import VerifyOtpPage from "./Components/ValidationCode/VerifyOtpPage";
import Home from "./Components/Home/Home";
import VerifyPage from "./Components/ValidationCode/VerifyPage";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/verifyotp" element={<VerifyOtpPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<LoginPage />} />
      <Route path="/verify" element={<VerifyPage />} />

    </Routes>
    </BrowserRouter>
  );
};

export default App;
