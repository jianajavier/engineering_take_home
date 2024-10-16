import React from "react";
import { useNavigate } from "react-router-dom";

const BuildingItem = ({ clientId, building }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/buildings/${building.id}/edit`, { state: { building } });
  };

  const cardStyle = {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    padding: '16px',
    margin: '16px',
    transition: 'transform 0.2s',
  };

  const titleStyle = {
    fontSize: '1.5rem',
    margin: '0 0 8px 0',
  };

  const addressStyle = {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '12px',
  };

  const customFieldStyle = {
    marginBottom: '12px',
  };

  const editButtonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  };

  const editButtonHoverStyle = {
    ...editButtonStyle,
    backgroundColor: '#2980b9',
  };

  return (
    <div
      style={cardStyle}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <h3 style={titleStyle}>{`${building.address.address1}: ${building.client.name}`}</h3>
      <div>
        <div>{building.address.address2}</div>
        <div>{`${building.address.city}, ${building.address.state}, ${building.address.postal_code}`}</div>
        <div>{building.address.country}</div>
      </div>
      <p></p>
      <div style={customFieldStyle}>
        {building.building_custom_field_values.map((field, index) => (
          <div key={index} style={{ margin: '4px 0' }}>
            <strong>{field.field_name}:</strong> {field.value}
          </div>
        ))}
      </div>
      <button
        style={editButtonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = editButtonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = editButtonStyle.backgroundColor)}
        onClick={() => handleEdit()}
      >
        Edit
      </button>
    </div>
  );
};

export default BuildingItem;
