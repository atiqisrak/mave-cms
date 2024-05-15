import { Button, Input, Modal, Space, message } from "antd";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import instance from "../axios";

const ForgotPass = ({ open, setOpen }) => {
  const [email, setEamil] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [data, setData] = useState({});
  const handleChange = (e, inputName) => {
    // Dynamically select the state variable to update based on inputName
    switch (inputName) {
      case "email":
        setEamil(e.target.value);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // Check if a token is stored in localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const handlelogout = async () => {
    const items = { email: email };
    setIsLoading(true);
    try {
      // Send a put request to the API endpoint
      const res = await instance.post("admin/password/forget", items);
      if (res?.status === 200) {
        setOpen(false);
        setData(res.data);
        // setResponse(res)
        setIsLoading(false);

        console.log(res?.data?.status);
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
          <h1>Forgot Password</h1>
          <p style={{ marginTop: "1rem" }}>
            Lost your password? Please enter your username or email address. You
            will receive a link to create a new password via email.
          </p>
          <div style={{ marginTop: "1rem" }}>
            <strong>Email</strong>
            <Input
              placeholder="Email"
              onChange={(e) => handleChange(e, "email")}
              className="input-field"
            />
          </div>
        </div>
        <Space
          direction="vertical"
          style={{ width: "100%", marginTop: "1rem" }}
        >
          <Button
            type="primary"
            block
            className="buttons"
            onClick={() => handlelogout()}
          >
            reset password
          </Button>
        </Space>
      </Modal>
    </>
  );
};

export default ForgotPass;
