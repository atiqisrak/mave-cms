import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import instance from "../../axios";

const FooterParser = ({ item, editMode, onFooterSelect }) => {
  const { Option } = Select;
  const [footers, setFooters] = useState([]);
  const [selectedFooter, setSelectedFooter] = useState(null);

  useEffect(() => {
    const fetchFooters = async () => {
      try {
        const response = await instance.get("/footers");
        if (response.data) setFooters(response.data);
      } catch {
        message.error("Error fetching footers");
      }
    };
    if (editMode) fetchFooters();
  }, [editMode]);

  const handleFooterChange = (value) => {
    const selectedFooter = footers.find((footer) => footer.id === value);
    setSelectedFooter(value);
    onFooterSelect({ _mave: selectedFooter, type: "footer", id: value });
  };

  return editMode ? (
    <Select
      placeholder="Select a footer"
      onChange={handleFooterChange}
      style={{ width: 200 }}
    >
      {footers.map((footer) => (
        <Option key={footer.id} value={footer.id}>
          {footer.title_en}
        </Option>
      ))}
    </Select>
  ) : (
    <div className="footerContainer">
      <h3>{item?._mave?.title_en}</h3>
      <p>{item?._mave?.description_en}</p>
    </div>
  );
};

export default FooterParser;
