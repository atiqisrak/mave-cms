import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Modal, message, Progress } from "antd";
import instance from "../../../axios";

const { Option } = Select;

const UserForm = ({ visible, fetchUsers, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0); // 0 to 100 scale for strength
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    password_confirmation: "",
    profile_picture_id: "",
    role_id: "",
  });

  const fetchRoles = async () => {
    try {
      const res = await instance.get("/roles");
      setLoading(true);
      if (res.status === 200) {
        setRoles(res.data);
      } else {
        message.error("Something went wrong");
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleCreateUser = async () => {
    setLoading(true);
    const items = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      profile_picture_id: formData.profile_picture_id,
      role_id: formData.role_id,
    };
    try {
      const response = await instance.post("/admin/register", items);
      if (response.status === 201) {
        console.log("User created successfully");
        message.success("User created successfully");
        setCreateUser(false);
        fetchUsers();
      }
    } catch (error) {
      message.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Generate strong random password and fill both password and confirm password fields
  const passwordGenerator = () => {
    const randomPassword = Math.random().toString(36).slice(-8);
    form.setFieldsValue({
      password: randomPassword,
      password_confirmation: randomPassword,
    });
    checkPasswordStrength(randomPassword);

    console.log("Password: ", randomPassword);
  };
  // Check password strength and set it to state
  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    if (password.length >= 6) strength += 30;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 30;

    setPasswordStrength(strength);
  };

  return (
    <Modal
      open={visible}
      title="User Form"
      okText="Save"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleCreateUser(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="userForm"
        initialValues={initialValues}
        onValuesChange={(changedValues) => {
          if (changedValues.password) {
            checkPasswordStrength(changedValues.password);
          }
        }}
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phone"
          label="Phone"
          rules={[{ required: true, message: "Please input the phone!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Button
          onClick={passwordGenerator}
          style={{ marginTop: "8px", width: "fit-content" }}
        >
          Generate Password
        </Button>
        {/* Display password strength as a progress bar */}
        <Progress
          percent={passwordStrength}
          showInfo={false}
          strokeColor={{
            "0%": "#ff4d4f", // red for weak
            "100%": "#52c41a", // green for strong
          }}
          style={{ marginTop: "8px" }}
        />
        <Form.Item
          name="password_confirmation"
          label="Confirm Password"
          rules={[{ required: true, message: "Please confirm the password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="role_id"
          label="Role"
          rules={[{ required: true, message: "Please select the role!" }]}
        >
          <Select>
            {roles?.map((role) => (
              <Option key={role.id} value={role.id}>
                {role.title}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserForm;
