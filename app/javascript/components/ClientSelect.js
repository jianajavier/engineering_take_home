import React, { useState } from "react";

const ClientSelect = ({ clients, handleCreateBuilding }) => {
  const [selectedClientId, setSelectedClientId] = useState("");

  const handleChange = (e) => {
    setSelectedClientId(e.target.value);
  };

  return (
    <div style={{ padding: "16px" }}>
      <select
        value={selectedClientId}
        onChange={handleChange}
        style={{ padding: "8px", marginRight: "12px" }}
      >
        <option value="" disabled>
          Select a Client
        </option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>

      <button
        style={{
          backgroundColor: "#4CAF50",
          color: "white",
          padding: "8px 16px",
          border: "none",
          cursor: "pointer",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#45a049")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4CAF50")}
        onClick={() => {
          if (selectedClientId) {
            handleCreateBuilding(selectedClientId);
          } else {
            alert("Please select a client.");
          }
        }}
      >
        Create New Building
      </button>
    </div>
  );
};

export default ClientSelect;
