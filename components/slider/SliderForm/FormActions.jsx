// components/slider/SliderForm/FormActions.jsx

import React from "react";
import { Space, Button, Form } from "antd";

const FormActions = ({ editingItemId, onCancelEdit }) => (
  <Form.Item>
    <Space>
      <Button htmlType="submit" className="mavebutton">
        {editingItemId ? "Update Slider" : "Create Slider"}
      </Button>
      {editingItemId && (
        <Button className="mavecancelbutton" onClick={onCancelEdit}>
          Discard
        </Button>
      )}
    </Space>
  </Form.Item>
);

export default FormActions;
