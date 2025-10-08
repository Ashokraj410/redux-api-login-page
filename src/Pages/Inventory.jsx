import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContainerRequest,
  addContainerRequest,
  updateContainerRequest,
} from "../Components/Actions/Action";
import ContainerForm from "../Components/Form/ContainerForm";
import "./inven.css";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector(
    (state) => state.container
  );

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // Fetch containers on mount
  useEffect(() => {
    dispatch(fetchContainerRequest());
  }, [dispatch]);

  const handleFormSubmit = (formData) => {
    if (editItem) {
      dispatch(updateContainerRequest({ id: editItem.id, ...formData }));
    } else {
      dispatch(addContainerRequest(formData));
    }
    setShowForm(false);
  };

  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Container Details</h2>

      <button
        onClick={() => {
          setEditItem(null);
          setShowForm(true);
        }}
        className="add-container-btn"
      >
        + Add Container
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Container No</th>
              <th>Type</th>
              <th>Product Type</th>
              <th>Location</th>
              <th>Principal</th>
              <th>Gross Weight</th>
              <th>Grade</th>
              <th>Note</th>
              <th>YOM</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {items.length > 0 ? (
              items.map((inv) => (
                <tr key={inv.id}>
                  <td>{inv.containerNo}</td>
                  <td>{inv.containerType}</td>
                  <td>{inv.productTypeName || inv.productType}</td>
                  <td>{inv.currentLocationName || inv.currentLocation}</td>
                  <td>{inv.principal}</td>
                  <td>{inv.maxGrossWeight}</td>
                  <td>{inv.grade}</td>
                  <td>{inv.notes}</td>
                  <td>{inv.yom}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditItem(inv);
                        setShowForm(true);
                      }}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center" }}>
                  No containers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ContainerForm
          editItem={editItem}
          onSubmit={handleFormSubmit}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default InventoryPage;
