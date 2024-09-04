import { useState } from "react";
import { Form, Input, Switch, Button, Select, message } from "antd";
import instance from "../../../axios";
import { CopyOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function CreatePermission({ setModalVisible }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    slug: "",
    api_request_type: "GET", // Default value
    api_endpoint: "",
    sl_no: 99,
    status: 0,
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle Select change
  const handleSelectChange = (value) => {
    setFormData({
      ...formData,
      api_request_type: value,
    });
  };

  // Function to handle Switch change
  const handleSwitchChange = (checked) => {
    setFormData({
      ...formData,
      status: checked ? 1 : 0,
    });
  };

  const createPermission = async () => {
    setLoading(true); // Start loading state
    try {
      const response = await instance.post("/permissions", formData);
      if (response.status === 201) {
        message.success("Permission created successfully");
        setFormData({
          category: "",
          title: "",
          description: "",
          slug: "",
          api_request_type: "GET",
          api_endpoint: "",
          sl_no: 99,
          status: 0,
        });
        setModalVisible(false);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  const handleCopyText = (text) => {
    navigator.clipboard.writeText(text);
    message.success("Copied to clipboard");
  };

  return (
    <div>
      <Form
        name="create-permission"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={createPermission}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Form.Item
          labelAlign="left"
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please input the category!" }]}
        >
          <Input
            placeholder="Enter category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            allowClear
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            allowClear
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea
            placeholder="Enter description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            allowClear
            style={{ width: "100%" }}
          />
        </Form.Item>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "90% 10%",
            gap: "1em",
          }}
        >
          <Form.Item
            labelAlign="left"
            label="Slug"
            name="slug"
            rules={[{ required: true, message: "Please input the slug!" }]}
          >
            <Input
              placeholder="Enter slug"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              allowClear
              style={{ width: "90%" }}
            />
          </Form.Item>
          <Button
            type="primary"
            onClick={() => handleCopyText(formData.slug)}
            style={{
              marginBottom: 16,
              width: "fit-content",
              padding: "0 10px",
              backgroundColor: "var(--theme)",
            }}
            icon={<CopyOutlined />}
          />
        </div>
        <Form.Item
          labelAlign="left"
          label="API Request Type"
          name="api_request_type"
          rules={[
            { required: true, message: "Please select the API request type!" },
          ]}
        >
          <Select
            placeholder="Select API Request Type"
            onChange={handleSelectChange}
            value={formData.api_request_type}
            style={{ width: "100%" }}
          >
            <Option value="GET">GET</Option>
            <Option value="POST">POST</Option>
            <Option value="PUT">PUT</Option>
            <Option value="DELETE">DELETE</Option>
          </Select>
        </Form.Item>
        <Form.Item
          labelAlign="left"
          label="API Endpoint"
          name="api_endpoint"
          rules={[
            { required: true, message: "Please input the API endpoint!" },
          ]}
        >
          <Input
            placeholder="Enter API endpoint"
            name="api_endpoint"
            value={formData.api_endpoint}
            onChange={handleInputChange}
            allowClear
            style={{ width: "100%" }}
          />
        </Form.Item>
        {/* <Form.Item
          labelAlign="left"
          label="Serial Number"
          name="sl_no"
          rules={[
            { required: true, message: "Please input the serial number!" },
          ]}
        >
          <Input
            type="number"
            placeholder="Enter serial number"
            name="sl_no"
            value={formData.sl_no}
            onChange={handleInputChange}
            allowClear
          />
        </Form.Item> */}
        <Form.Item
          labelAlign="left"
          label="Status"
          name="status"
          valuePropName="checked"
          rules={[{ required: true, message: "Please input the status!" }]}
        >
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            checked={formData.status === 1}
            onChange={handleSwitchChange}
          />
        </Form.Item>
        {/* Full width button */}
        <Form.Item labelAlign="left" wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              backgroundColor: "var(--theme)",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              width: "100%",
            }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
