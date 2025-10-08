import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addContainerRequest,
  updateContainerRequest,
} from "../Actions/Action";
import FormFields from "./FormFields";
import Toasting from "../Toast/Toasting";
import "./form.css";

const ContainerForm = ({ onClose, editItem }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.container);

  const [formData, setFormData] = useState({
    containerNo: "",
    containerType: "",
    productType: "",
    currentLocation: "",
    currentDepot: "",
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
      setToastMsg("Container updated successfully!");
    } else {
      dispatch(addContainerRequest(payload));
      setToastMsg("Container added successfully!");
    }

    setToastType("success");
    setTimeout(() => {
      setToastMsg("");
      onClose();
    }, 2000);
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 style={{ textAlign: "center" }}>
          {editItem ? "Edit Container" : "Add Container"}
        </h3>
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
