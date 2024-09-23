import React from "react";
import { Typography } from "antd";

const { Title } = Typography;

const TitleComponent = ({ data, editMode }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {editMode ? (
        <input
          type="text"
          value={data.value}
          onChange={(e) => data.onChange(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            fontSize: "1.5rem",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
        />
      ) : (
        <Title level={2}>{data.value}</Title>
      )}
    </div>
  );
};

export default TitleComponent;
