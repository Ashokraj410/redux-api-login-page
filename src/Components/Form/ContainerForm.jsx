import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  addContainerRequest,
  updateContainerRequest,
} from "../Actions/Action";
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
    onHireDate: "",
    onHireLocation: "",
  });

  useEffect(() => {
    if (editItem) {
      setFormData(editItem);
    }
  }, [editItem]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editItem) {
      dispatch(updateContainerRequest(formData));
    } else {
      dispatch(addContainerRequest(formData));
    }
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-container">
        <h3 className="modal-title">
          {editItem ? "Edit Container" : "Add Container"}
        </h3>
        <form onSubmit={handleSubmit}>
          {Object.keys(formData).map((key) => (
            <div key={key} className="form-group">
              <label htmlFor={key}>
                {key.replace(/([A-Z])/g, " $1").toUpperCase()}
              </label>
              <input
                id={key}
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
              />
            </div>
          ))}
          <div className="button-group">
            <button
              type="button"
              onClick={onClose}
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
            >
              {editItem ? "Update" : "Insert"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContainerForm;
