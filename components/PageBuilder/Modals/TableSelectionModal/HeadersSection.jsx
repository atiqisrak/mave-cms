// components/PageBuilder/Modals/TableSelectionModal/HeadersSection.jsx

import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const HeadersSection = ({ headers, setHeaders }) => {
  const { Title } = Typography;
  const addHeader = () => {
    setHeaders([...headers, `Header ${headers.length + 1}`]);
  };

  const removeHeader = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    setHeaders(newHeaders);
  };

  const updateHeader = (value, index) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  return (
    <>
      <Title level={4}>Headers</Title>
      <div className="flex items-center mb-4 flex-wrap">
        {headers.map((header, index) => (
          <div key={index} className="flex items-center mr-2 mb-2">
            <Form.Item
              name={`header_${index}`}
              initialValue={header}
              rules={[{ required: true, message: "Header cannot be empty." }]}
              style={{ marginBottom: 0 }}
            >
              <Input
                placeholder={`Header ${index + 1}`}
                style={{ width: 150, marginRight: 8 }}
                onChange={(e) => updateHeader(e.target.value, index)}
              />
            </Form.Item>
            <Button
              icon={<MinusOutlined />}
              onClick={() => removeHeader(index)}
              danger
              type="text"
            />
          </div>
        ))}
        <Button
          type="dashed"
          onClick={addHeader}
          icon={<PlusOutlined />}
          style={{ width: 150 }}
        >
          Add Header
        </Button>
      </div>
    </>
  );
};

export default HeadersSection;
