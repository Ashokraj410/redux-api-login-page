{/*

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { containerApi } from "../../Api/axiosInstance";
import "./form.css";
import Toasting from "../Toast/Toasting";

const ContainerForm = ({ onClose, editItem }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    containerNo: "",
    containerType: "",
    productType: "",        // containerGroupId
    currentLocation: "",    // ID
    currentDepot: "",       // ID
    grade: "",
    maxGrossWeight: "",
    tareWeight: "",
    principal: "",
    containerStatus: "",
    note: "",
    yom: "",
  });

  const [toastmsg, setToastMsg] = useState("");
  const [toasttype, setToastType] = useState("");

  const [containerGroups, setContainerGroups] = useState([]);
  const [ports, setPorts] = useState([]);
  const [depots, setDepots] = useState([]);

  // Fetch container groups and ports
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [groupRes, portRes] = await Promise.all([
          containerApi.get("api/container-group/get"),
          containerApi.get("api/port/all"),
        ]);
        setContainerGroups(groupRes?.data?.data || []);
        setPorts(portRes?.data?.data || []);
      } catch (err) {
        console.error("Error fetching container groups or ports:", err);
      }
    };
    fetchData();
  }, []);

  // Fetch depots for currentLocation
  useEffect(() => {
    if (formData.currentLocation) {
      const fetchDepots = async () => {
        try {
          const res = await containerApi.get(
            `api/depot/fetch/${formData.currentLocation}`
          );
          setDepots(res?.data?.data || []);
        } catch (err) {
          console.error("Error fetching depots:", err);
          setDepots([]);
        }
      };
      fetchDepots();
    }
  }, [formData.currentLocation]);

  // Set editItem data
  useEffect(() => {
    if (editItem) {
      setFormData({
        containerNo: editItem.containerNo || "",
        containerType: editItem.containerType || "",
        productType: editItem.containerGroupId || "",
        currentLocation: editItem.currentLocation || "",
        currentDepot: editItem.currentDepot || "",
        grade: editItem.grade || "",
        maxGrossWeight: editItem.maxGrossWeight || "",
        tareWeight: editItem.tareWeight || "",
        principal: editItem.principal || "",
        containerStatus: editItem.containerStatus || "",
        note: editItem.notes || "",
        yom: editItem.yom || "",
      });
    }
  }, [editItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "containerType" && (value === "Owned" || value === "Leased")) {
      setFormData({
        ...formData,
        containerType: value,
        principal: "HASTIN CONTAINER LINE PTE LTD.",
      });
    } else if (name === "productType") {
      setFormData({ ...formData, productType: value });
      const fetchGroupDetails = async () => {
        try {
          const res = await containerApi.get(`api/container-group/get/${value}`);
          const groupData = res?.data?.data;
          if (groupData) {
            setFormData((prev) => ({
              ...prev,
              tareWeight: groupData.tareWeight || 0,
              maxGrossWeight: groupData.maxPayloadPerContainer || 0,
            }));
          }
        } catch (err) {
          console.error("Error fetching container group details:", err);
        }
      };
      fetchGroupDetails();
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    containerNo: formData.containerNo,
    containerType: formData.containerType,
    containerGroupId: formData.productType,
    currentLocation: formData.currentLocation,
    currentDepot: formData.currentDepot,
    grade: formData.grade,
    maxGrossWeight: Number(formData.maxGrossWeight),
    tareWeight: Number(formData.tareWeight),
    principal: formData.principal,
    containerStatus: formData.containerStatus.toUpperCase(),
    notes: formData.note || "",
    yom: formData.yom || "",
  };

  try {
    const response = editItem
      ? await containerApi.put(`api/container/update/${editItem.id}`, payload)
      : await containerApi.post("api/container/create", payload);

    // ✅ Show toast first
    setToastMsg("Container successfully " + (editItem ? "updated!" : "created!"));
    setToastType("success");

    // ✅ Wait a moment before closing modal
    setTimeout(() => {
      setToastMsg("");
      onClose();
    }, 2000);
  } catch (err) {
    console.error("API error:", err.response || err.message);
    setToastMsg("Error: " + (err.response?.data?.data || err.message));
    setToastType("error");
    setTimeout(() => setToastMsg(""), 3000);
  }
};

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 className="modal-title">
          {editItem ? "Edit Container" : "Add Container"}
        </h3>

        <form className="con-frm" onSubmit={handleSubmit}>
          <div className="first">
            <div className="form-group">
              <input
                name="containerNo"
                value={formData.containerNo}
                onChange={handleChange}
                type="text"
                required
                placeholder=""
              />
              <label>Container No</label>
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
              </select>
              <label>Container Type</label>
            </div>

            <div className="form-group">
              <select
                name="productType"
                value={formData.productType}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Product Type
                </option>
                {containerGroups.map((group) => (
                  <option key={group.id} value={group.id}>
                    {group.name}
                  </option>
                ))}
              </select>
              <label>Product Type</label>
            </div>

            <div className="form-group">
              <select
                name="currentLocation"
                value={formData.currentLocation}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Location
                </option>
                {ports.map((port) => (
                  <option key={port.id} value={port.id}>
                    {port.name}
                  </option>
                ))}
              </select>
              <label>Current Location</label>
            </div>

            <div className="form-group">
              <input
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <label>Grade</label>
            </div>

            <div className="form-group">
              <input
                name="yom"
                value={formData.yom}
                onChange={handleChange}
                type="month"
              />
              <label>YOM</label>
            </div>
          </div>

          <div className="second">
            <div className="form-group">
              <select
                name="containerStatus"
                value={formData.containerStatus}
                onChange={handleChange}
                required
              >
                <option value="" disabled hidden>
                  Select Status
                </option>
                <option value="AVAILABLE">AVAILABLE</option>
                <option value="PICKED">PICKED</option>
                <option value="IN-TRANSIT">IN-TRANSIT</option>
                <option value="CFS-IN">CFS-IN</option>
                <option value="CFS-OUT">CFS-OUT</option>
              </select>
              <label>Container Status</label>
            </div>

            <div className="form-group">
              <input
                name="principal"
                value={formData.principal}
                type="text"
                readOnly
                placeholder=""
              />
              <label>Principal</label>
            </div>

            <div className="form-group">
              <input
                name="tareWeight"
                value={formData.tareWeight}
                type="number"
                readOnly
                placeholder=""
              />
              <label>Tare Weight</label>
            </div>

            <div className="form-group">
              <input
                name="maxGrossWeight"
                value={formData.maxGrossWeight}
                type="number"
                readOnly
                placeholder=""
              />
              <label>Max Gross Weight</label>
            </div>

            <div className="form-group">
              <select
                name="currentDepot"
                value={formData.currentDepot}
                onChange={handleChange}
                required
              >
                <option value="">Select Depot</option>
                {depots.map((depot) => (
                  <option key={depot.depotId} value={depot.depotId}>
                    {depot.name}
                  </option>
                ))}
              </select>
              <label>Current Depot</label>
            </div>

            <div className="form-group">
              <input
                name="note"
                value={formData.note}
                onChange={handleChange}
                type="text"
                placeholder=""
              />
              <label>Notes</label>
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

        {toastmsg && (
          <Toasting
            message={toastmsg}
            type={toasttype}
            onClose={() => setToastMsg("")}
          />
        )}
      </div>
    </div>
  );
};

export default ContainerForm;
*/}
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContainerRequest, updateContainerRequest } from "../Actions/Action";
import FormFields from "./FormFields";
import Toasting from "../Toast/Toasting";
import "./form.css";

const ContainerForm = ({ onClose, editItem }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.container);

  const [formData, setFormData] = useState({
    containerNo: "",
    containerType: "",
    productType: "", // containerGroupId
    currentLocation: "", // port ID
    currentDepot: "", // depot ID
    grade: "",
    maxGrossWeight: "",
    tareWeight: "",
    principal: "",
    containerStatus: "",
    note: "",
    yom: "",
  });

  const [toastMsg, setToastMsg] = useState("");
  const [toastType, setToastType] = useState("");

  // Set editItem data if editing
  useEffect(() => {
    if (editItem) {
      setFormData({
        containerNo: editItem.containerNo || "",
        containerType: editItem.containerType || "",
        productType: editItem.containerGroupId || "",
        currentLocation: editItem.currentLocation || "",
        currentDepot: editItem.currentDepot || "",
        grade: editItem.grade || "",
        maxGrossWeight: editItem.maxGrossWeight || "",
        tareWeight: editItem.tareWeight || "",
        principal: editItem.principal || "",
        containerStatus: editItem.containerStatus || "",
        note: editItem.notes || "",
        yom: editItem.yom || "",
      });
    }
  }, [editItem]);

  const handleSubmit = (e) => {
    e.preventDefault();

     const payload = {
    containerNo: formData.containerNo,
    containerType: formData.containerType,
    containerGroupId: formData.productType,
    currentLocation: formData.currentLocation,
    currentDepot: formData.currentDepot,
    grade: formData.grade,
    maxGrossWeight: Number(formData.maxGrossWeight),
    tareWeight: Number(formData.tareWeight),
    principal: formData.principal,
    containerStatus: formData.containerStatus.toUpperCase(),
    notes: formData.note || "",
    yom: formData.yom || "",
  };

    if (editItem) {
      dispatch(updateContainerRequest({ id: editItem.id, ...payload }));
      setToastMsg("Updating container...");
    } else {
      dispatch(addContainerRequest(payload));
      setToastMsg("Adding container...");
    }
    setToastType("success");

    // Close after toast
    setTimeout(() => {
      setToastMsg("");
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3>{editItem ? "Edit Container" : "Add Container"}</h3>
        <form onSubmit={handleSubmit}>
          <FormFields formData={formData} setFormData={setFormData} />
          <div className="button-group">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" disabled={loading}>
              {editItem ? "Update" : "Add"}
            </button>
          </div>
        </form>

        {toastMsg && (
          <Toasting
            message={toastMsg}
            type={toastType}
            onClose={() => setToastMsg("")}
          />
        )}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ContainerForm;
