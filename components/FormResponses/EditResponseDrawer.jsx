// components/FormResponses/EditResponseDrawer.jsx

import React, { useEffect } from "react";
import { Drawer, Form, Button, Input, message, Empty } from "antd";
import instance from "../../axios";

const EditResponseDrawer = ({ visible, onClose, data, onUpdate }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (data && data.form_data && typeof data.form_data === "object") {
      // Populate the form with existing data
      form.setFieldsValue(data.form_data);
    } else {
      // Reset form if data is invalid
      form.resetFields();
    }
  }, [data, form]);

  const onFinish = async (values) => {
    try {
      // Assuming the API endpoint for updating a submission is /form-submission/{id}
      const response = await instance.put(`/form-submission/${data.id}`, {
        form_data: values,
      });

      if (response.status === 200) {
        message.success("Form response updated successfully.");
        onUpdate(); // Refresh the table data
        onClose();
      } else {
        message.error("Failed to update the form response.");
      }
    } catch (error) {
      console.error("Error updating form response:", error);
      message.error("An error occurred while updating the form response.");
    }
  };

  if (!data || !data.form_data || typeof data.form_data !== "object") {
    return (
      <Drawer
        title="Edit Form Response"
        width={"50%"}
        onClose={onClose}
        open={visible}
        bodyStyle={{ padding: "20px" }}
      >
        <Empty description="No Data Available for Editing" />
      </Drawer>
    );
  }

  return (
    <Drawer
      title="Edit Form Response"
      width={"50%"}
      onClose={onClose}
      open={visible}
      bodyStyle={{ paddingBottom: 80 }}
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        {Object.entries(data.form_data).map(([key, value]) => (
          <Form.Item
            key={key}
            name={key}
            label={key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
            rules={[
              {
                required: true,
                message: `Please enter ${key.replace(/_/g, " ")}`,
              },
            ]}
          >
            {Array.isArray(value) ? (
              <Input.TextArea
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            ) : typeof value === "object" && value !== null ? (
              <Input.TextArea
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
                autoSize={{ minRows: 2, maxRows: 4 }}
              />
            ) : (
              <Input placeholder={`Enter ${key.replace(/_/g, " ")}`} />
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <Button className="mavebutton" htmlType="submit">
            Update Response
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default EditResponseDrawer;
