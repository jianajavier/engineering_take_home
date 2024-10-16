import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import BuildingItem from "./BuildingItem";

const BuildingList = () => {
  const [buildings, setBuildings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  const fetchBuildings = async (page) => {
    try {
      const response = await axios.get(`/api/v1/buildings?page=${currentPage}`);
      setBuildings(response.data.buildings);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchBuildings(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    }
  }, [location.state?.successMessage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleCreateBuilding = (clientId) => {
    navigate(`/clients/${clientId}/buildings/new`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const headerStyle = {
    padding: '0 0 0 16px',
  };

  const createButtonStyle = {
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
    margin: '0 0 0 16px',
    transition: 'background-color 0.2s',
  };

  const createButtonHoverStyle = {
    ...createButtonStyle,
    backgroundColor: '#2980b9',
  };

  const successBannerStyle = {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '16px',
  };

  // Group buildings by client
  const buildingsByClient = buildings.reduce((acc, building) => {
    const clientName = building.client.name;
    if (!acc[clientName]) {
      acc[clientName] = {
        clientId: building.client_id,
        buildings: [],
      };
    }
    acc[clientName].buildings.push(building);
    return acc;
  }, {});

  return (
    <div>
      {successMessage && (
        <div style={successBannerStyle}>{successMessage}</div>
      )}
      <h1 style={headerStyle}>Buildings</h1>
      {Object.entries(buildingsByClient).map(([clientName, { clientId, buildings }]) => (
        <div key={clientId}>
          <h2 style={{padding: '0 0 0 16px'}}>{clientName}</h2>
          <button
            style={createButtonStyle}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = createButtonHoverStyle.backgroundColor)}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = createButtonStyle.backgroundColor)}
            onClick={() => handleCreateBuilding(clientId)}
          >
            Create New Building for {clientName}
          </button>
          {buildings.map((building) => (
            <BuildingItem key={building.id} clientId={clientId} building={building} />
          ))}
        </div>
      ))}
      <div style={{padding: '0 0 0 16px'}} className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default BuildingList;

