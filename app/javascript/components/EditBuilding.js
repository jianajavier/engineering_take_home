import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const EditBuilding = () => {
  const location = useLocation();
  const { building } = location.state || {}; 

  const { buildingId } = useParams();
  const [address, setAddress] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    country: '',
    postal_code: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const response = await axios.get(`/api/v1/buildings/${buildingId}`);
        const { address1, address2, city, state, country, postal_code } = response.data.address;
        setAddress({ address1, address2, city, state, country, postal_code });
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBuilding();
  }, [buildingId]);

  useEffect(() => {
    if (building && building.address) {
      const { address1, address2, city, state, country, postal_code } = building.address;
      setAddress({ address1, address2, city, state, country, postal_code });
    }
  }, [building]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/v1/buildings/${buildingId}`,
        {
          address1: address.address1,
          address2: address.address2,
          city: address.city,
          state: address.state,
          country: address.country,
          postal_code: address.postal_code,
        }
      );
      if (response.status === 200) {
        navigate("/", { state: { successMessage: "Building edited successfully!" } });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Edit Building</h1>
      {error && <div>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={address.address1}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2"
            value={address.address2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={address.country}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="postal_code"
            placeholder="Postal Code"
            value={address.postal_code}
            onChange={handleInputChange}
            required
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <button type="submit">Update Address</button>
        </div>
      </form>
    </div>
  );
};

export default EditBuilding;
