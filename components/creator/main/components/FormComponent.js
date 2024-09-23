import React from "react";
import { Form, Input, Button } from "antd";

const FormComponent = ({ data, editMode, onFormChange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {editMode ? (
        <div>
          <textarea
            value={data.formDescription}
            onChange={(e) =>
              onFormChange({ ...data, formDescription: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
            placeholder="Form Description"
          />
        </div>
      ) : (
        <Form layout="vertical">
          <p>{data.formDescription}</p>
          <Form.Item label="Your Name">
            <Input placeholder="Enter your name" />
          </Form.Item>
          <Form.Item label="Email">
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default FormComponent;
