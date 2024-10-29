// pages/login.js

import { Button, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import {
  EyeInvisibleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useAuth } from "../../src/context/AuthContext";
import Loader from "../../components/Loader";

export default function Login() {
  const { login, loading } = useAuth();

  const handleLogin = (values) => {
    const { email, password } = values;
    if (!email || !password) {
      message.error("Please fill in all fields");
      return;
    }
    login(email, password);
  };

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 w-full">
        {/* Left Panel */}
        <div
          className="flex flex-col justify-center gap-8 px-8 md:px-24 h-screen bg-cover bg-bottom bg-no-repeat col-span-1"
          style={{ backgroundImage: "url('/images/ui/lleftbg.png')" }}
        >
          <Image
            src="/images/ui/mave_new_logo.png"
            alt="Mave Logo"
            width={330}
            height={100}
            objectFit="contain"
          />
          <h1 className="text-3xl md:text-[2.4rem] font-bold text-theme text-center">
            Log in to your account
          </h1>
          <div className="flex justify-center items-center gap-4 text-[1.2rem]">
            <h3 className="font-normal">Don't have an account?</h3>
            <Link href="/signup">
              <h3 className="font-semibold text-theme cursor-pointer">
                Sign Up
              </h3>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <Button
              // type="primary"
              block
              className="flex justify-center items-center gap-4 py-8 border-2 border-[#C9C9C9] bg-white"
            >
              <Image
                src="/images/ui/Google.png"
                alt="Google Logo"
                width={30}
                height={30}
                objectFit="contain"
              />
              <h3 className="text-[#797B7E] text-[1.2rem] font-medium capitalize">
                Continue with Google
              </h3>
            </Button>
            {/* <Button
              block
              className="flex justify-center items-center gap-4 py-8 border-2 border-[#C9C9C9] bg-white"
            >
              <Image
                src="/images/ui/Github.png"
                alt="Github Logo"
                width={30}
                height={30}
                objectFit="contain"
              />
              <h3 className="text-[#797B7E] text-[1.2rem] font-medium capitalize">
                Continue with Github
              </h3>
            </Button> */}
          </div>
          <div className="flex justify-center items-center gap-4">
            <Image
              src="/images/ui/line.svg"
              alt="Line"
              width={80}
              height={10}
              objectFit="contain"
            />
            <p className="text-base font-normal text-[#797B7E]">
              Or with email and password
            </p>
            <Image
              src="/images/ui/line.svg"
              alt="Line"
              width={80}
              height={10}
              objectFit="contain"
            />
          </div>
          <div>
            <Form
              name="login"
              initialValues={{
                remember: true,
              }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <MailOutlined className="text-[1.3rem] text-[#797B7E] mr-2 font-medium" />
                  }
                  placeholder="Email"
                  className="input-field"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="input-field"
                  prefix={
                    <LockOutlined className="text-[1.3rem] text-[#797B7E] mr-2 font-medium" />
                  }
                  iconRender={(visible) =>
                    visible ? (
                      <EyeInvisibleOutlined />
                    ) : (
                      <EyeInvisibleOutlined />
                    )
                  }
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  className="bg-theme text-white text-[1.2rem] font-medium py-6"
                  htmlType="submit"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        {/* Right Panel */}
        <div
          className="h-screen bg-theme text-black flex flex-col justify-between gap-8 col-span-2
          bg-right-bottom bg-no-repeat bg-80%"
          style={{
            backgroundImage: "url('/images/ui/lrightbg.svg')",
            // backgroundSize: "80%",
          }}
        >
          <div className="flex flex-col gap-8 pt-20 pl-8 md:pl-20">
            <h1 className="text-3xl md:text-4xl font-bold">
              Mave CMS is
              <br />
              launching in Bangladesh soon !!!
            </h1>
            <p className="text-lg md:text-xl font-normal md:w-[50%] leading-8 md:leading-[2.5rem]">
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
