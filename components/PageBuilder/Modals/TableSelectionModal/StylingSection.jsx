// components/PageBuilder/Modals/TableSelectionModal/StylingSection.jsx

import React from "react";
import { Form, Select, Input, Typography } from "antd";

const { Title } = Typography;
const { Option } = Select;

const StylingSection = ({ styles, setStyles }) => {
  const handleStyleChange = (value, key) => {
    setStyles({ ...styles, [key]: value });
  };

  return (
    <>
      <Title level={4} style={{ marginTop: 24 }}>
        Table Styling
      </Title>
      <Form.Item
        name="borderStyle"
        label="Borders"
        initialValue={styles.borderStyle}
      >
        <Select onChange={(value) => handleStyleChange(value, "borderStyle")}>
          <Option value="none">None</Option>
          <Option value="thin">Thin</Option>
          <Option value="thick">Thick</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="cellColor"
        label="Cell Background Color"
        initialValue={styles.cellColor}
      >
        <Input
          type="color"
          onChange={(e) => handleStyleChange(e.target.value, "cellColor")}
        />
      </Form.Item>
      <Form.Item
        name="textAlign"
        label="Text Alignment"
        initialValue={styles.textAlign}
      >
        <Select onChange={(value) => handleStyleChange(value, "textAlign")}>
          <Option value="left">Left</Option>
          <Option value="center">Center</Option>
          <Option value="right">Right</Option>
        </Select>
      </Form.Item>
    </>
  );
};

export default StylingSection;
