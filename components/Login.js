import React, { useContext, useEffect, useState } from "react";
import { Button, Divider, Input, Modal, Space, message } from "antd";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import GLOBAL_CONTEXT from "../src/context/context";
import Signup from "./Signup";
import ForgotPass from "./ForgotPass";
import Loader from "./Loader";
import instance from "../axios";

const Login = ({ open, setOpen, response, setResponse }) => {
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState(null);
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useContext(GLOBAL_CONTEXT);

  // Effect to update the global context after data is fetched
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setUser(data); // Update context after data is fetched
    }
  }, [data, setUser]);

  // Effect to check for token in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  // Toggle visibility of password
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Handle switching to Signup modal
  const handleChangeState = () => {
    setOpen(false);
    setSignupModalOpen(true);
  };

  // Handle switching to Forgot Password modal
  const handleChangeForgot = () => {
    setOpen(false);
    setForgotModalOpen(true);
  };

  // Handle input changes
  const handleChange = (e, inputName) => {
    switch (inputName) {
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  // Handle login process
  const handleLogin = async () => {
    const items = { email: email, password: password };
    setIsLoading(true);
    try {
      const res = await instance.post("admin/login", items);
      if (res?.status === 200) {
        setOpen(false);
        setData(res.data); // Trigger useEffect to update context
        setResponse(res);
        setIsLoading(false);
        const newToken = res?.data?.token;
        const user = JSON.stringify(res?.data?.user);
        setToken(newToken);
        localStorage.setItem("user", user);
        localStorage.setItem("token", newToken);
        localStorage.setItem(
          "niloy",
          "y$vtw#*tPECXug7SBeUqNSMVd2!TS!YkjL%#sbtBEPkxS65NtDxm&F$5mKhX(kUP"
        );
        console.log("Login successfully");
        window.location.reload(); // Reload to refresh state
      }
    } catch (error) {
      if (error?.response?.status === 401) {
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
    <>
      <Modal
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={600}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <div className="modalContainer">
          <h1>Login</h1>
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
        </div>

        <div className="forgot">
          <p onClick={handleChangeForgot}>Forgot Password?</p>
        </div>
        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <Button
            type="primary"
            block
            className="buttons"
            onClick={handleLogin}
          >
            Login
          </Button>
        </Space>

        <Divider>Or</Divider>
        <div
          className="createAccount"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>New to Mave?</p>
          <Button
            style={{
              backgroundColor: "transparent",
              color: "#1890ff",
              border: "none",
              boxShadow: "none",
              fontSize: "16px",
            }}
            onClick={() =>
              message.info("Please contact your admin to create an account")
            }
          >
            Create an Account
          </Button>
        </div>
      </Modal>
      {/* Signup and ForgotPass Modals */}
      <Signup
        open={signupModalOpen}
        setOpen={setSignupModalOpen}
        setOpen1={setOpen}
      />
      <ForgotPass open={forgotModalOpen} setOpen={setForgotModalOpen} />
    </>
  );
};

export default Login;
