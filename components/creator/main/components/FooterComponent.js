import React from "react";
import { Layout, Typography } from "antd";

const { Footer } = Layout;
const { Text } = Typography;

const FooterComponent = ({ data, editMode, onFooterChange }) => {
  return (
    <Footer style={{ textAlign: "center", marginTop: "16px" }}>
      {editMode ? (
        <input
          type="text"
          value={data.text}
          onChange={(e) => onFooterChange({ ...data, text: e.target.value })}
          style={{
            width: "100%",
            padding: "8px",
            border: "1px solid #d9d9d9",
            borderRadius: "4px",
          }}
          placeholder="Enter footer text"
        />
      ) : (
        <Text>{data.text}</Text>
      )}
    </Footer>
  );
};

export default FooterComponent;
