import React, { useState, useEffect } from "react";
import { containerApi } from "../../Api/axiosInstance";
import "./form.css";

const FormFields = ({ formData, setFormData }) => {
  const [containerGroups, setContainerGroups] = useState([]);
  const [ports, setPorts] = useState([]);
  const [depots, setDepots] = useState([]);

  useEffect(() => {
    // Fetch container groups and ports
    containerApi.get("api/container-group/get").then((res) =>
      setContainerGroups(res?.data?.data || [])
    );
    containerApi.get("api/port/all").then((res) =>
      setPorts(res?.data?.data || [])
    );
  }, []);

  useEffect(() => {
    if (!formData.currentLocation) return;
    // Fetch depots for selected location
    containerApi
      .get(`api/depot/fetch/${formData.currentLocation}`)
      .then((res) => setDepots(res?.data?.data || []))
      .catch(() => setDepots([]));
  }, [formData.currentLocation]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "containerType") {
      setFormData({
        ...formData,
        containerType: value,
        principal: "HASTIN CONTAINER LINE PTE LTD.",
      });
    } else if (name === "productType") {
      setFormData({ ...formData, productType: value });
      containerApi.get(`api/container-group/get/${value}`).then((res) => {
        const g = res?.data?.data;
        if (g)
          setFormData((prev) => ({
            ...prev,
            tareWeight: g.tareWeight || 0,
            maxGrossWeight: g.maxPayloadPerContainer || 0,
          }));
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <div className="form-fields">
      <div className="first">
        <div className="form-group">
          <input
            name="containerNo"
            value={formData.containerNo}
            onChange={handleChange}
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
            <option value="">Select container Type</option>
            <option value="Owned">Owned</option>
            <option value="Leased">Leased</option>
          </select>
        </div>

        <div className="form-group">
          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
          >
            <option value="">Select Product Type</option>
            {containerGroups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="currentLocation">CurrentLocation</label>
          <select
            name="currentLocation"
            value={formData.currentLocation}
            onChange={handleChange}
            required
          >
            <option value="">Select Current  Location</option>
            {ports.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select
            name="currentDepot"
            value={formData.currentDepot}
            onChange={handleChange}
            required
          >
            <option value="">Select Depot</option>
            {depots.map((d) => (
              <option key={d.depotId} value={d.depotId}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <input
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            placeholder=""
          />
          <label>Grade</label>
        </div>
      </div>

      <div className="second">
        <div className="form-group">
          <input
            name="yom"
            value={formData.yom}
            onChange={handleChange}
            type="month"
          />
          <label>YOM</label>
        </div>

        <div className="form-group">
          <select
            name="containerStatus"
            value={formData.containerStatus}
            onChange={handleChange}
            required
          >
            <option value="">Select Status</option>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="PICKED">PICKED</option>
            <option value="IN-TRANSIT">IN-TRANSIT</option>
            <option value="CFS-IN">CFS-IN</option>
            <option value="CFS-OUT">CFS-OUT</option>
          </select>
        </div>

        

        <div className="form-group">
          <input
            name="principal"
            value={formData.principal}
            readOnly
            placeholder=""
          />
          <label>Principal</label>
        </div>

        <div className="form-group">
          <input
            name="tareWeight"
            value={formData.tareWeight}
            readOnly
            placeholder=""
          />
          <label>Tare Weight</label>
        </div>

        <div className="form-group">
          <input
            name="maxGrossWeight"
            value={formData.maxGrossWeight}
            readOnly
            placeholder=""
          />
          <label>Max Gross Weight</label>
        </div>
        <div className="form-group">
          <input
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder=""
          />
          <label>Note</label>
        </div>
      </div>
    </div>
  );
};

export default FormFields;

