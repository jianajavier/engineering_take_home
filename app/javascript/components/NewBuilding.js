import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NewBuilding = () => {
  const [newBuilding, setNewBuilding] = useState({
    address1: '',
    address2: '',
    city: '',
    state: '',
    postal_code: '',
    country: ''
  });
  const [customFields, setCustomFields] = useState({});
  const [customClientFields, setCustomClientFields] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { clientId } = useParams();

  // Fetch custom fields when the component mounts
  useEffect(() => {
    const fetchCustomFields = async () => {
      try {
        const response = await axios.get(`/api/v1/clients/${clientId}/custom_fields`);
        setCustomClientFields(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCustomFields();
  }, [clientId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBuilding({ ...newBuilding, [name]: value });
  };

  const handleCustomFieldChange = (e) => {
    const { name, value } = e.target;
    setCustomFields({ ...customFields, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/v1/clients/${clientId}/buildings`, {
        ...newBuilding,
        custom_fields: customFields, 
      });

      if (response.status === 201) {
        navigate("/", { state: { successMessage: "Building created successfully!" } });
      }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setError(err.response.data.errors.join(','));
      } else {
        setError(err.message);
      }
    }
  };

  const errorBannerStyle = {
    backgroundColor: 'red',
    color: 'white',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '16px',
  };

  return (
    <div>
      <h1>Create New Building</h1>
      {error && <div style={errorBannerStyle}>Error: {error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="address1"
            placeholder="Address Line 1"
            value={newBuilding.address1}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px' }} 
          />
          <input
            type="text"
            name="address2"
            placeholder="Address Line 2 (optional)"
            value={newBuilding.address2}
            onChange={handleInputChange}
            style={{ display: 'block', marginBottom: '10px' }} 
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={newBuilding.city}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px' }}
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={newBuilding.state}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px' }} 
          />
          <input
            type="text"
            name="postal_code"
            placeholder="Zip Code"
            value={newBuilding.postal_code}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px' }} 
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={newBuilding.country}
            onChange={handleInputChange}
            required
            style={{ display: 'block', marginBottom: '10px' }} 
          />
        </div>
        <p>Custom Fields</p>
        {customClientFields && customClientFields.map((field) => (
          <div key={field.id}>
            <label>{field.name}</label>
            {field.enum_options ? (
              <select
                name={field.name}
                value={customFields[field.name] || ''}
                onChange={handleCustomFieldChange}
                style={{ display: 'block', marginBottom: '10px' }}
              >
                <option value="" disabled>Select {field.name}</option>
                {field.enum_options.map((value) => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                name={field.name}
                placeholder={`Enter ${field.name}`}
                value={customFields[field.name] || ''} 
                onChange={handleCustomFieldChange}
                style={{ display: 'block', marginBottom: '10px' }} 
              />
            )}
          </div>
        ))}

        <div style={{ marginTop: '20px' }}>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewBuilding;

