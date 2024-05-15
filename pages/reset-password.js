import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import instance from "../axios";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
const resetPasword = () => {
  const [password, setPassword] = useState("");
  const [email, setEamil] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const token = router.query.token;

  useEffect(() => {
    // Check if passwords match and update state
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);
  const handleChange = (e, inputName) => {
    // Dynamically select the state variable to update based on inputName
    switch (inputName) {
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

  const handleResetPassword = async () => {
    const items = {
      password: password,
      password_confirmation: confirmPassword,
      token: token,
      email: email,
    };
    // console.log(items)
    setIsLoading(true);
    try {
      // Send a put request to the API endpoint
      const res = await instance.post("admin/password/reset", items);
      // console.log(res)
      if (res?.status === 200) {
        // setOpen(false)

        // setResponse(res)
        setIsLoading(false);

        console.log(res?.data?.message);
        // Handle success, e.g., show a success message or update your UI
        // console.log("Data deleted successfully");
        router.push("/"); // Update this path to match your home page route
        // setIsModalOpen(true)
      }
    } catch (error) {
      // Handle errors, e.g., display an error message or log the error
      if (error?.response?.status === 500) {
        message.error("Invalid Credentials");
        setIsLoading(false);
      }
      console.error("Error data:", error);
    }
  };
  if (isLoading)
    return (
      <>
        <Loader />
      </>
    );
  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        <div
          className="MainContent"
          style={{
            width: "90vw",
            maxWidth: "500px",
            margin: "0 auto",
            padding: "1rem",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Password Reset</h2>
          <Divider />
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
          {passwordsMatch === true && (
            <span style={{ color: "green" }}>Passwords match</span>
          )}
          {passwordsMatch === false && (
            <span style={{ color: "red" }}>Passwords do not match</span>
          )}
          <Space
            direction="vertical"
            style={{ width: "100%", marginTop: "1rem" }}
          >
            <Button
              type="primary"
              block
              className="buttons"
              onClick={() => handleResetPassword()}
            >
              Reset Password
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default resetPasword;
