import { useEffect, useState } from "react";
import { Form, Input, Switch, Checkbox, Button, message, Select } from "antd";
import instance from "../../../axios";

export default function CreateRole() {
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch all permissions to display as checkboxes
  const fetchPermissions = async () => {
    try {
      const response = await instance.get("/permissions");

      if (response.status === 200) {
        setPermissions(response.data);
      } else {
        console.error(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const createRole = async (values) => {
    setLoading(true);
    const { title, description, status, selectedPermissions } = values;

    try {
      const response = await instance.post("/roles", {
        title,
        description,
        status: status ? 1 : 0,
        permission_ids: selectedPermissions,
      });

      if (response.status === 201) {
        message.success("Role created successfully!");
        form.resetFields(); // Reset form fields after successful submission
      } else {
        console.error(response);
        message.error("Failed to create role.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred while creating the role.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Form
        form={form}
        name="create_role"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={createRole}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the role title!" }]}
        >
          <Input allowClear placeholder="Enter role title" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input the role description!" },
          ]}
        >
          <Input.TextArea allowClear placeholder="Enter role description" />
        </Form.Item>

        <Form.Item
          label="Status"
          name="status"
          valuePropName="checked"
          initialValue={false}
        >
          <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
        </Form.Item>

        <Form.Item
          label="Permissions"
          name="selectedPermissions"
          rules={[{ required: true, message: "Please select permissions!" }]}
        >
          <Select
            mode="multiple"
            placeholder="Select permissions"
            style={{ width: "100%" }}
            allowClear
            showSearch
          >
            {permissions.map((permission) => (
              <Select.Option key={permission.id} value={permission.id}>
                {permission.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            style={{
              backgroundColor: "var(--maveyellow)",
              color: "white",
            }}
          >
            Create Role
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
