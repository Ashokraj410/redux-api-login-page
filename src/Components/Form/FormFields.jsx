import React, { useState, useEffect } from "react";
import { containerApi } from "../../Api/axiosInstance";

const FormFields = ({ formData, setFormData }) => {
  const [containerGroups, setContainerGroups] = useState([]);
  const [ports, setPorts] = useState([]);
  const [depots, setDepots] = useState([]);

  useEffect(() => {
    // Fetch container groups and ports
    containerApi.get("api/container-group/get").then(res => setContainerGroups(res?.data?.data || []));
    containerApi.get("api/port/all").then(res => setPorts(res?.data?.data || []));
  }, []);

  useEffect(() => {
    if (!formData.currentLocation) return;
    // Fetch depots for current location
    containerApi.get(`api/depot/fetch/${formData.currentLocation}`)
      .then(res => setDepots(res?.data?.data || []))
      .catch(() => setDepots([]));
  }, [formData.currentLocation]);

  const handleChange = e => {
    const { name, value } = e.target;

    if (name === "containerType") {
      setFormData({ ...formData, containerType: value, principal: "HASTIN CONTAINER LINE PTE LTD." });
    } else if (name === "productType") {
      setFormData({ ...formData, productType: value });
      containerApi.get(`api/container-group/get/${value}`)
        .then(res => {
          const g = res?.data?.data;
          if (g) setFormData(prev => ({
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
      <input name="containerNo" value={formData.containerNo} onChange={handleChange} placeholder="Container No" required />
      <select name="containerType" value={formData.containerType} onChange={handleChange} required>
        <option value="">Select Type</option>
        <option value="Owned">Owned</option>
        <option value="Leased">Leased</option>
      </select>
      <select name="productType" value={formData.productType} onChange={handleChange} required>
        <option value="">Select Product</option>
        {containerGroups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
      </select>
      <select name="currentLocation" value={formData.currentLocation} onChange={handleChange} required>
        <option value="">Select Location</option>
        {ports.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      <select name="currentDepot" value={formData.currentDepot} onChange={handleChange} required>
        <option value="">Select Depot</option>
        {depots.map(d => <option key={d.depotId} value={d.depotId}>{d.name}</option>)}
      </select>
      <input name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" />
      <input name="yom" value={formData.yom} onChange={handleChange} type="month" />
      <select name="containerStatus" value={formData.containerStatus} onChange={handleChange} required>
        <option value="">Select Status</option>
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="PICKED">PICKED</option>
        <option value="IN-TRANSIT">IN-TRANSIT</option>
        <option value="CFS-IN">CFS-IN</option>
        <option value="CFS-OUT">CFS-OUT</option>
      </select>
      <input name="note" value={formData.note} onChange={handleChange} placeholder="Notes" />
      <input name="principal" value={formData.principal} readOnly />
      <input name="tareWeight" value={formData.tareWeight} readOnly />
      <input name="maxGrossWeight" value={formData.maxGrossWeight} readOnly />
    </div>
  );
};

export default FormFields;
