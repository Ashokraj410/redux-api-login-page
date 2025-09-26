import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchContainerRequest,
  deleteContainerRequest,
} from "../Components/Actions/Action";
import ContainerForm from "../Components/Form/ContainerForm";
import "./inven.css";

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { items = [], loading, error } = useSelector((state) => state.container);

  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    dispatch(fetchContainerRequest());
  }, [dispatch]);





  return (
    <div className="inventory-container">
      <h2 className="inventory-title">Container</h2>
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
        <table>
          <thead>
            <tr>
              <th>Container No</th>
              <th>Container Type</th>
              <th>Product Type</th>
              <th>Location</th>
              <th>Principal</th>
              <th>Gross Weight</th>
              <th>Grade</th>
              <th>Note</th>
              <th>Hire Date</th>
              <th>Hire Location</th>
              <th>Actions</th>
            </tr>
          </thead>

         <tbody>
  {items.length > 0 ? (
    items.map((inv) => (
      <tr key={`${inv.containerNo}-${inv.productType}`}>
        <td>{inv.containerNo}</td>
        <td>{inv.containerType}</td>
        <td>{inv.productType}</td>
        <td>{inv.currentLocation}</td>
        <td>{inv.principal}</td>
        <td>{inv.maxGrossWeight}</td>
        <td>{inv.grade}</td>
        <td>{inv.note}</td>
        <td>{inv.onHireDate}</td>
        <td>{inv.onHireLocation}</td>
        <td>
          <button onClick={() => { setEditItem(inv); setShowForm(true); }}>Edit</button>
          <button onClick={() => dispatch(deleteContainerRequest(inv.id))}>Delete</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="11" style={{ textAlign: "center" }}>No containers found</td>
    </tr>
  )}
</tbody>

        </table>
      </div>

      {showForm && (
        <ContainerForm onClose={() => setShowForm(false)} editItem={editItem} />
      )}
    </div>
  );
};

export default InventoryPage;
