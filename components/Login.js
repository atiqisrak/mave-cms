import { Button, Divider, Input, Modal, Space, message } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import Signup from './Signup'
import ForgotPass from './ForgotPass'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import instance from '../axios'
import GLOBAL_CONTEXT from '../src/context/context'
import Loader from './Loader'
const Login = ({ open, setOpen, response,
  setResponse }) => {
  const [signupModalOpen, setSignupModalOpen] = useState(false)
  const [forgotModalOpen, setForgotModalOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEamil] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState(null);
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const { setUser } = useContext(GLOBAL_CONTEXT)
  setUser(data)
  useEffect(() => {

    // Check if a token is stored in localStorage when the component mounts
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);

    }
  }, []);
  // handler area
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChangeState = () => {
    setOpen(false)
    setSignupModalOpen(true)
  }
  const handleChangeForgot = () => {
    setOpen(false)
    setForgotModalOpen(true)
  }
  const handleChange = (e, inputName) => {
    // Dynamically select the state variable to update based on inputName
    switch (inputName) {
      case "email":
        setEamil(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);

        break;
      default:
        break;
    }

  };
  const handleLogin = async () => {
    const items = { email: email, password: password, }
    setIsLoading(true)
    try {
      // Send a put request to the API endpoint
      const res = await instance.post("admin/login", items);
      if (res?.status === 200) {
        setOpen(false)
        setData(res.data);
        setResponse(res)
        setIsLoading(false)
        const newToken = res?.data?.token;
        const user = JSON.stringify(res?.data?.user)
        setToken(newToken);
        localStorage.setItem('user', user)
        localStorage.setItem('token', newToken);
        message.success("Login successfully");

      }

    } catch (error) {
      // Handle errors, e.g., display an error message or log the error
      if (error?.response?.status === 401) {
        message.error("Invalid Credentials");
        setIsLoading(false)
      }
      console.error("Error data:", error);
    }
  }
  if (isLoading) return <><Loader /></>
  return (
    <>
      <Modal open={open} onOk={setOpen} onCancel={() => setOpen(false)} width={600} cancelButtonProps={{ style: { display: 'none' } }} okButtonProps={{ style: { display: 'none' } }}>
        <div className="modalContiner">
          <h1>Login</h1>
          <div style={{ marginTop: "1rem" }}>
            <strong>Email</strong>
            <Input value={email} required
              onChange={(e) => handleChange(e, "email")} placeholder='Email' className='input-field' />
          </div>

          <div style={{ marginTop: "1rem" }}>
            <strong>Password</strong>
            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => handleChange(e, "password")} placeholder='Password' className='input-field' suffix={showPassword ? <EyeOutlined style={{ fontSize: "22px" }} onClick={togglePasswordVisibility} /> : <EyeInvisibleOutlined style={{ fontSize: "22px" }} onClick={togglePasswordVisibility} />} />
          </div>
        </div>

        <div className="forgot" >
          <p onClick={handleChangeForgot}>Forgot Password?</p>
        </div>
        <Space direction="vertical" style={{ width: '100%', marginTop: "1rem", }}>

          <Button type="primary" block className='buttons' onClick={() => handleLogin()} >
            Login
          </Button>
        </Space>

        <Divider>Or</Divider>
        <div className="createAccout">
          <p>New to Mave?
            <span onClick={handleChangeState}>Create an Account</span>{" "}
            {/* <span onClick={() => {
              message.info("Contact Admin");
            }}>Create an Account</span>{" "} */}
          </p>
        </div>
      </Modal>
      <Signup open={signupModalOpen} setOpen={setSignupModalOpen} setOpen1={setOpen} />
      <ForgotPass open={forgotModalOpen} setOpen={setForgotModalOpen} />
    </>
  )
}

export default Login