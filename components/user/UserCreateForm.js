import { Input, Button, Col, Row } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const UserCreateForm = ({
  name,
  email,
  password,
  confirmPassword,
  handleChange,
  showPassword,
  togglePasswordVisibility,
  showConfirmPassword,
  toggleConfirmPasswordVisibility,
  handleCreateUser,
  validEmail,
  emailMessage,
  passwordsMatch,
  isSubmitDisabled,
}) => {
  return (
    <Row gutter={16} style={{ marginTop: "1rem", backgroundColor: "#ceedff" }}>
      <Col span={6}>
        <label>Name</label>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => handleChange(e, "name")}
        />
      </Col>
      <Col span={6}>
        <label>Email</label>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => handleChange(e, "email")}
        />
        {!validEmail && <p style={{ color: "red" }}>{emailMessage}</p>}
      </Col>
      <Col span={4}>
        <label>Password</label>
        <Input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => handleChange(e, "password")}
          suffix={
            showPassword ? (
              <EyeOutlined onClick={togglePasswordVisibility} />
            ) : (
              <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            )
          }
        />
      </Col>
      <Col span={4}>
        <label>Confirm Password</label>
        <Input
          type={showConfirmPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => handleChange(e, "confirmPassword")}
          suffix={
            showConfirmPassword ? (
              <EyeOutlined onClick={toggleConfirmPasswordVisibility} />
            ) : (
              <EyeInvisibleOutlined onClick={toggleConfirmPasswordVisibility} />
            )
          }
        />
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          onClick={handleCreateUser}
          disabled={!passwordsMatch || !validEmail}
        >
          Create User
        </Button>
      </Col>
    </Row>
  );
};

export default UserCreateForm;
