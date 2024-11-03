import React, { useState } from "react";
import { Button, Form, Input, Image, message } from "antd";
import Link from "next/link";
import {
  EyeInvisibleOutlined,
  InsertRowLeftOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import instance from "../../axios"; // Assuming axios is set up correctly
import Loader from "../../components/Loader"; // Assuming you have a Loader component

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (values) => {
    const { email, name, phone, company, password, password_confirmation } =
      values;
    setIsLoading(true);
    try {
      const res = await instance.post("admin/register", {
        email,
        name,
        phone,
        company,
        password,
        password_confirmation,
      });
      if (res?.status === 201) {
        // Success - Redirect to login after signup
        message.success("Signup successful! Please login to continue.");
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during signup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3.5fr 6.5fr",
          width: "100%",
          margin: "0 auto",
        }}
      >
        {/* Left Panel - Image and Content */}
        <div
          className="LeftPanel"
          style={{
            backgroundImage: "url(/images/ui/rleftbg.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "2rem",
            padding: "0 6rem",
          }}
        />
        {/* Right Panel - Signup Form */}
        <div
          className="RightPanel"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="inputContainer"
            style={{
              backgroundImage: "url(/images/ui/rrightbg.png)",
              backgroundSize: "cover",
              backgroundPosition: "bottom",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1.5rem",
              padding: "2rem",
              borderRadius: "10px",
            }}
          >
            <Image
              preview={false}
              src="/images/ui/mave_new_logo.png"
              alt="Mave Logo"
              width={330}
              height={100}
              objectFit="contain"
            />
            <h1
              style={{
                fontSize: "2.4rem",
                fontWeight: "bold",
                color: "var(--theme)",
              }}
            >
              Create your account
            </h1>
            <div style={{ display: "flex", gap: "1rem" }}>
              <p style={{ fontSize: "1.5rem", fontWeight: 400 }}>
                Have an account?
              </p>
              <Link href="/login">
                <h3
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 500,
                    color: "var(--theme)",
                    cursor: "pointer",
                  }}
                >
                  Log in now
                </h3>
              </Link>
            </div>
            <Form
              name="signup"
              initialValues={{ remember: true }}
              onFinish={handleSignup}
              style={{
                width: "35%",
                backgroundColor: "rgba(255, 255, 255, 0.6)",
                backdropFilter: "blur(1px)",
                borderRadius: "10px",
                padding: "2rem",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Form.Item
                name="email"
                rules={[{ required: true, message: "Email Address" }]}
              >
                <Input
                  prefix={
                    <MailOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: "#797B7E",
                        marginRight: "0.8rem",
                        fontWeight: 500,
                      }}
                    />
                  }
                  placeholder="Email Address"
                  className="input-field"
                  style={{
                    border: "2px solid var(--gray-dark)",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="name"
                rules={[{ required: true, message: "Please input your name!" }]}
              >
                <Input
                  prefix={
                    <UserOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: "#797B7E",
                        marginRight: "0.8rem",
                        fontWeight: 500,
                      }}
                    />
                  }
                  placeholder="Full Name"
                  className="input-field"
                  style={{
                    border: "2px solid var(--gray-dark)",
                  }}
                />
              </Form.Item>

              {/* Phone */}
              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  prefix={
                    <PhoneOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: "#797B7E",
                        marginRight: "0.8rem",
                        fontWeight: 500,
                      }}
                    />
                  }
                  placeholder="Phone Number"
                  className="input-field"
                  style={{
                    border: "2px solid var(--gray-dark)",
                  }}
                />
              </Form.Item>

              {/* Company Name (Optional) */}
              <Form.Item name="company">
                <Input
                  prefix={
                    <InsertRowLeftOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: "#797B7E",
                        marginRight: "0.8rem",
                        fontWeight: 500,
                      }}
                    />
                  }
                  placeholder="Company Name (Optional)"
                  className="input-field"
                  style={{
                    border: "2px solid var(--gray-dark)",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password
                  placeholder="Password"
                  className="input-field"
                  prefix={
                    <LockOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: "#797B7E",
                        marginRight: "0.8rem",
                        fontWeight: 500,
                      }}
                    />
                  }
                  suffix={<EyeInvisibleOutlined style={{ fontSize: "22px" }} />}
                  style={{
                    border: "2px solid var(--gray-dark)",
                  }}
                />
              </Form.Item>
              <Form.Item
                name="password_confirmation"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  placeholder="Confirm Password"
                  className="input-field"
                  prefix={
                    <LockOutlined
                      style={{
                        fontSize: "1.3rem",
                        color: "#797B7E",
                        marginRight: "0.8rem",
                        fontWeight: 500,
                      }}
                    />
                  }
                  suffix={<EyeInvisibleOutlined style={{ fontSize: "22px" }} />}
                  style={{
                    border: "2px solid var(--gray-dark)",
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  block
                  className="buttons"
                  htmlType="submit"
                  style={{
                    backgroundColor: "var(--theme)",
                    color: "var(--white)",
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    padding: "1.5rem 0",
                    marginTop: "2rem",
                  }}
                  disabled
                >
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
