import { useState } from "react";
import instance from "../../axios";
import { Form, Input, Switch, Button } from "antd";

export default function CreatePermission() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    slug: "",
    status: 0,
  });

  // Function to handle input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
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
        console.log(response.data);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete="off"
        onFinish={createPermission} // Calls the createPermission on successful form submission
      >
        <Form.Item
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
          />
        </Form.Item>
        <Form.Item
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
          />
        </Form.Item>
        <Form.Item
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
          />
        </Form.Item>
        <Form.Item
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
          />
        </Form.Item>
        <Form.Item
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
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
