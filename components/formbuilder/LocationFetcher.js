import { Select } from "antd";
import { useEffect, useState } from "react";

export default function LocationFetcher({
  onDivisionChange,
  onDistrictChange,
}) {
  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDivision, setSelectedDivision] = useState(null);

  const fetchDivisions = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_BD_API + "/divisions");
    const divisionsJson = await response.json();
    setDivisions(divisionsJson.data);
  };

  const fetchDistricts = async (division) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BD_API}/division/${division}`
    );
    const districtsJson = await response.json();
    setDistricts(districtsJson.data);
  };

  useEffect(() => {
    fetchDivisions();
  }, []);

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    fetchDistricts(value);
    if (onDivisionChange) onDivisionChange(value);
  };

  const handleDistrictChange = (value) => {
    if (onDistrictChange) onDistrictChange(value);
  };

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <Select
        placeholder="Select Division"
        style={{ width: "50%" }}
        options={divisions?.map((division) => ({
          label: division.division,
          value: division.division,
        }))}
        onChange={handleDivisionChange}
      />
      <Select
        placeholder="Select District"
        style={{ width: "50%" }}
        options={districts?.map((district) => ({
          label: district.district,
          value: district.district,
        }))}
        disabled={!selectedDivision}
        onChange={handleDistrictChange}
      />
    </div>
  );
}
