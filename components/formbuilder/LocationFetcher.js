// components/formbuilder/LocationFetcher.jsx
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import instance from "../../axios";

const { Option } = Select;

const LocationFetcher = ({
  onDivisionChange,
  onDistrictChange,
  divisionLabel = "Select Division",
  districtLabel = "Select District",
}) => {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const fetchDivisions = async () => {
    try {
      const response = await instance.get("/location/divisions");
      if (response.status === 200) {
        setDivisions(response.data);
      }
    } catch (error) {
      console.error("Error fetching divisions:", error);
    }
  };

  const fetchDistricts = async (divisionId) => {
    try {
      const response = await instance.get(`/location/districts/${divisionId}`);
      if (response.status === 200) {
        setDistricts(response.data);
      }
    } catch (error) {
      console.error("Error fetching districts:", error);
    }
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    onDivisionChange?.(value);
    fetchDistricts(value);
  };

  const handleDistrictChange = (value) => {
    onDistrictChange?.(value);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-4">
      <Select
        placeholder={divisionLabel}
        onChange={handleDivisionChange}
        className="w-full sm:w-1/2"
        value={selectedDivision}
      >
        {divisions?.map((div) => (
          <Option key={div.id} value={div.id}>
            {div.name}
          </Option>
        ))}
      </Select>

      <Select
        placeholder={districtLabel}
        onChange={handleDistrictChange}
        className="w-full sm:w-1/2"
      >
        {districts?.map((dist) => (
          <Option key={dist.id} value={dist.id}>
            {dist.name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default LocationFetcher;
