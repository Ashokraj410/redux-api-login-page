import React from "react";
import { NavLink } from "react-router-dom";

const ListNavbar = () => {
  const linkStyle = ({ isActive }) => ({
    margin: "0 15px",
    textDecoration: "none",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? "blue" : "black",
  });

  return (
    <nav style={{ background: "#f9f9f9", padding: "10px" }}>
      <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
        <li>
          <NavLink to="dashboard" style={linkStyle}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="accounts" style={linkStyle}>
            Accounts
          </NavLink>
        </li>
        <li>
          <NavLink to="inventory" style={linkStyle}>
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="filemanager" style={linkStyle}>
            File Manager
          </NavLink>
        </li>
        <li>
          <NavLink to="fwd" style={linkStyle}>
            Fwd
          </NavLink>
        </li>
        <li>
          <NavLink to="hcl" style={linkStyle}>
            Hcl
          </NavLink>
        </li>
        <li>
          <NavLink to="indicator" style={linkStyle}>
            Indicator
          </NavLink>
        </li><li>
          <NavLink to="master" style={linkStyle}>
            Master
          </NavLink>
        </li><li>
          <NavLink to="schedule" style={linkStyle}>
            Schedule
          </NavLink>
        </li><li>
          <NavLink to="soa" style={linkStyle}>
            SOA
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default ListNavbar;
