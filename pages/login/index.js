import { Button, Form, Input } from "antd";
import Image from "next/image";
import Link from "next/link";
import { EyeInvisibleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState } from "react";
import instance from "../../axios"; // Assuming axios is set up correctly
import Loader from "../../components/Loader"; // Assuming you have a Loader component

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (values) => {
    const { email, password } = values;
    setIsLoading(true);
    try {
      const res = await instance.post("admin/login", { email, password });
      if (res?.status === 200) {
        const newToken = res?.data?.token;
        const user = JSON.stringify(res?.data?.user);

        localStorage.setItem("user", user);
        localStorage.setItem("token", newToken);
        localStorage.setItem(
          "niloy",
          "y$vtw#*tPECXug7SBeUqNSMVd2!TS!YkjL%#sbtBEPkxS65NtDxm&F$5mKhX(kUP"
        );

        setIsLoading(false);
        router.replace("/"); // Redirect to home page after successful login
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error during login:", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 3fr",
          gap: "2rem",
          padding: "2rem",
          margin: "0 auto",
        }}
      >
        <div className="LeftPanel">
          <Image
            src="/images/ui/Logo.png"
            alt="Mave Logo"
            width={330}
            height={100}
            objectFit="contain"
          />
          <h1>Log in to your account</h1>
          <div
            className="Signup"
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <h3>Don't have an account?</h3>
            <Link href="/signup">Sign Up</Link>
          </div>
          <div
            className="oauth"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Button
              type="primary"
              block
              className="buttons"
              style={{
                backgroundColor: "#3b5998",
                color: "white",
              }}
            >
              <Image
                src="/images/ui/Google.png"
                alt="Google Logo"
                width={20}
                height={20}
                objectFit="contain"
              />
            </Button>
            <Button
              type="primary"
              block
              className="buttons"
              style={{
                backgroundColor: "#333",
                color: "white",
              }}
            >
              <Image
                src="/images/ui/Github.png"
                alt="Github Logo"
                width={20}
                height={20}
                objectFit="contain"
              />
            </Button>
          </div>

          <div>
            <p>or use your email and password</p>
          </div>
          <div className="inputContainer">
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
                <Input placeholder="Email" className="input-field" />
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
                  suffix={<EyeInvisibleOutlined style={{ fontSize: "22px" }} />}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  block
                  className="buttons"
                  htmlType="submit"
                >
                  Log in
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <div
          className="RightPanel"
          style={{
            backgroundColor: "var(--v2theme)",
            backgroundImage: "url(/images/ui/rightbg.png)",
            backgroundSize: "cover",
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
            height: "100vh",
          }}
        >
          <h1>Mave CMS. Local is coming to Bangladesh!</h1>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using
          </p>
        </div>
      </div>
    </div>
  );
}
