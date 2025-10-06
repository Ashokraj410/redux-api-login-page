import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addContainerRequest,
  updateContainerRequest,
} from "../Actions/Action";
import { containerApi } from "../../Api/axiosInstance";
import "./form.css";

const ContainerForm = ({ onClose, editItem }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    containerNo: "",
    containerType: "",
    productType: "",
    currentLocation: "",
    principal: "",
    maxGrossWeight: "",
    grade: "",
    note: "",
    containerStatus: "",
    onHireDate: "",
    onHireLocation: "",
  });

  const [containerGroups, setContainerGroups] = useState([]);
  const [ports, setPorts] = useState([]);

  useEffect(() => {
    const fetchContainerGroups = async () => {
      try {
        const res = await containerApi.get(
          "https://hastin-container.com/staging/api/container-group/get"
        );
        setContainerGroups(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching container groups:", err);
        setContainerGroups([]);
      }
    };

    const fetchPorts = async () => {
      try {
        const res = await containerApi.get(
          "https://hastin-container.com/staging/api/port/all"
        );
        setPorts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching ports:", err);
        setPorts([]);
      }
    };

    fetchContainerGroups();
    fetchPorts();
  }, []);

  // Pre-fill edit data
  useEffect(() => {
    if (editItem) setFormData(editItem);
  }, [editItem]);

  // Handle input/select change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-fill principal if Owned/Leased
    if (name === "containerType" && (value === "Owned" || value === "Leased")) {
      setFormData({
        ...formData,
        containerType: value,
        principal: "HASTIN CONTAINER PTE LTE",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      dispatch(updateContainerRequest({ ...formData, id: editItem.id }));
    } else {
      dispatch(addContainerRequest(formData));
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 className="modal-title">{editItem ? "Edit Container" : "Add Container"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="first">
            <div className="form-group">
              <input
                name="containerNo"
                value={formData.containerNo}
                onChange={handleChange}
                type="text"
                placeholder=""
                required
              />
              <label htmlFor="containerNo">Container No</label>
            </div>

            <div className="form-group">
              <select
                name="containerType"
                value={formData.containerType}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Container Type
                </option>
                <option value="Owned">Owned</option>
                <option value="Leased">Leased</option>
                {Array.isArray(containerGroups) &&
                  containerGroups.map((group) => (
                    <option key={group.id} value={group.name}>
                      {group.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="containerType">Container Type</label>
            </div>

            <div className="form-group">
              <input
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <label htmlFor="productType">Product Type</label>
            </div>

            <div className="form-group">
              <select
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Port
                </option>
                {Array.isArray(ports) &&
                  ports.map((port) => (
                    <option key={port.id} value={port.name}>
                      {port.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="currentLocation">Current Location</label>
            </div>

            <div className="form-group">
              <input
                name="principal"
                value={formData.principal}
                onChange={handleChange}
                type="text"
                placeholder=""
                readOnly={formData.containerType === "Owned" || formData.containerType === "Leased"}
              />
              <label htmlFor="principal">Principal</label>
            </div>
          </div>

          <div className="second">
            <div className="form-group">
              <input
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <label htmlFor="grade">Grade</label>
            </div>

            <div className="form-group">
              <select
                name="containerStatus"
                value={formData.containerStatus}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Status
                </option>
                <option value="Available">Available</option>
                <option value="Picked">Picked</option>
                <option value="in-transit">in-transit</option>
                <option value="Cfs-in">Cfs-in</option>
                <option value="Cfs-out">Cfs-out</option>
              </select>
              <label htmlFor="containerStatus">Container Status</label>
            </div>

            <div className="form-group">
              <input
                name="onHireDate"
                value={formData.onHireDate}
                onChange={handleChange}
                type="date"
                placeholder=""
              />
              <label htmlFor="onHireDate">On Hire Date</label>
            </div>

            <div className="form-group">
              <select
                name="onHireLocation"
                value={formData.onHireLocation}
                onChange={handleChange}
              >
                <option value="" disabled hidden>
                  Select Port
                </option>
                {Array.isArray(ports) &&
                  ports.map((port) => (
                    <option key={port.id} value={port.name}>
                      {port.name}
                    </option>
                  ))}
              </select>
              <label htmlFor="onHireLocation">On Hire Location</label>
            </div>

            <div className="form-group">
              <input
                name="maxGrossWeight"
                value={formData.maxGrossWeight}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <label htmlFor="maxGrossWeight">Max Gross Weight</label>
            </div>

            <div className="button-group">
              <button type="button" onClick={onClose} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {editItem ? "Update" : "Insert"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContainerForm;
