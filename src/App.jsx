import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import VerifyPage from "./Components/ValidationCode/VerifyPage";
import "./App.css"
import Toasting from "./Components/Toast/Toasting";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="*" element={<LoginPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route  path="/toast" element={<Toasting/>}/>

    </Routes>
    </BrowserRouter>
  );
};

export default App;
