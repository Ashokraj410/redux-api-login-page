import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import LoginPage from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import VerifyPage from "./Components/ValidationCode/VerifyPage";
import "./App.css"
import Toasting from "./Components/Toast/Toasting";
import DashBoard from "./Pages/DashBoard";
import Accounts from "./Pages/Accounts";
import Inventory from "./Pages/Inventory";
import FileManager from "./Pages/FileManager";
import Fwd from "./Pages/Fwd";
import Hcl from "./Pages/Hcl";
import Indicator from "./Pages/Indicator";
import Master from "./Pages/Master";
import Schedule from "./Pages/Schedule";
import Soa from "./Pages/Soa";

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<Home />} >
      <Route index element={<DashBoard/>}/>
      <Route path="dashboard" element={<DashBoard/>}/>
      <Route path="accounts" element={<Accounts/>}/>
      <Route path="inventory" element={<Inventory/>}/>
      <Route path="filemanager" element={<FileManager/>}/>
      <Route path="fwd" element={<Fwd/>} />
      <Route path="hcl" element={<Hcl/>} />
      <Route path="indicator" element={<Indicator/>} />
      <Route path="master" element={<Master/>} />
      <Route path="schedule" element={<Schedule/>} />
      <Route path="soa" element={<Soa/>} />
      </Route>
      <Route path="*" element={<LoginPage />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route  path="/toast" element={<Toasting/>}/>
    </Routes>
    </BrowserRouter>
  );
};

export default App;
