import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../axios";
import Loader from "./Loader";

const Signup = ({ open, setOpen, setOpen1 }) => {
  const [name, setName] = useState("");
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    // Check if passwords match and update state
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);
  const handleChange = (e, inputName) => {
    // Dynamically select the state variable to update based on inputName
    switch (inputName) {
      case "name":
        setName(e.target.value);
        break;
      case "email":
        setEamil(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);

        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  // handlearea
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showconfirmPassword);
  };
  const handleChangeState = () => {
    setOpen(false);
    setOpen1(true);
  };
  const handleRegiste = async () => {
    setIsLoading(true);
    const items = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    };
    try {
      // Send a put request to the API endpoint
      const res = await instance.post("admin/register", items);
      if (res?.status === 201) {
        setData(res);
        console.log("register successfully");
        const newToken = res.data.token;
        setIsLoading(false);
        setOpen(false);
        // Store the token in state and localStorage
        setToken(newToken);
        localStorage.setItem("token", newToken);
      }
    } catch (error) {
      // Handle errors, e.g., display an error message or log the error
      console.error("Error deleting data:", error);
    }
  };
  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <>
      <Modal
        open={open}
        onOk={setOpen}
        onCancel={() => setOpen(false)}
        width={600}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="modalContiner">
          <h1>Register</h1>
          <div style={{ marginTop: "1rem" }}>
            <strong>Name</strong>
            <Input
              placeholder="Name"
              value={name}
              required
              onChange={(e) => handleChange(e, "name")}
              className="input-field"
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <strong>Email</strong>
            <Input
              value={email}
              required
              onChange={(e) => handleChange(e, "email")}
              placeholder="Email"
              className="input-field"
            />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <strong>Password</strong>
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => handleChange(e, "password")}
              placeholder="Password"
              className="input-field"
              suffix={
                showPassword ? (
                  <EyeOutlined
                    style={{ fontSize: "22px" }}
                    onClick={togglePasswordVisibility}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "22px" }}
                    onClick={togglePasswordVisibility}
                  />
                )
              }
            />
          </div>
          <div style={{ marginTop: "1rem" }}>
            <strong>Confirm Password</strong>
            <Input
              type={showconfirmPassword ? "text" : "password"}
              value={confirmPassword}
              required
              onChange={(e) => handleChange(e, "confirmPassword")}
              placeholder="Confirm Password"
              className="input-field"
              suffix={
                showconfirmPassword ? (
                  <EyeOutlined
                    style={{ fontSize: "22px" }}
                    onClick={toggleConfirmPasswordVisibility}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "22px" }}
                    onClick={toggleConfirmPasswordVisibility}
                  />
                )
              }
            />
          </div>
          <br />

          {passwordsMatch ? (
            <span style={{ color: "green" }}>Passwords match</span>
          ) : (
            <span style={{ color: "red" }}>Passwords do not match</span>
          )}
        </div>
        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <Button
            type="primary"
            block
            className="buttons"
            onClick={() => handleRegiste()}
          >
            register
          </Button>
        </Space>
        <div className="createAccout">
          <p>
            New to Mave?{" "}
            <span onClick={handleChangeState}>Already have an Account</span>{" "}
          </p>
        </div>
      </Modal>
    </>
  );
};

export default Signup;
