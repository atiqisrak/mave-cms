import { Button, Form, Input, Image } from "antd";
// import Image from "next/image";
import Link from "next/link";
import {
  EyeInvisibleOutlined,
  LockOutlined,
  MailOutlined,
} from "@ant-design/icons";
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
        // router.replace("/");
        router.push("/"); // Redirect to home page
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
          gridTemplateColumns: "2fr 5fr",
          // gap: "2rem",
          // padding: "2rem",
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div
          className="LeftPanel"
          style={{
            backgroundImage: "url(/images/ui/lleftbg.png)",
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
        >
          <Image
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
            Log in to your account
          </h1>
          <div
            className="Signup"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              fontSize: "1.2rem",
            }}
          >
            <h3
              style={{
                fontWeight: 400,
              }}
            >
              Don't have an account?
            </h3>
            <Link href="/signup">
              <h3
                style={{
                  fontWeight: 600,
                  color: "var(--theme)",
                }}
              >
                Sign Up
              </h3>
            </Link>
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
                backgroundColor: "var(--white)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                padding: "2rem 0",
                border: "2px solid #C9C9C9",
              }}
            >
              <Image
                src="/images/ui/Google.png"
                alt="Google Logo"
                width={30}
                height={30}
                objectFit="contain"
              />
              <h3
                style={{
                  color: "#797B7E",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                Continue with Google
              </h3>
            </Button>
            <Button
              type="primary"
              block
              className="buttons"
              style={{
                backgroundColor: "var(--white)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                padding: "2rem 0",
                border: "2px solid #C9C9C9",
              }}
            >
              <Image
                src="/images/ui/Github.png"
                alt="Github Logo"
                width={30}
                height={30}
                objectFit="contain"
              />
              <h3
                style={{
                  color: "#797B7E",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                Continue with Github
              </h3>
            </Button>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: "1rem",
            }}
          >
            <Image
              src="/images/ui/line.svg"
              alt="Line"
              width={80}
              height={10}
              objectFit="contain"
            />
            <p
              style={{
                fontSize: "1rem",
                fontWeight: 400,
                color: "#797B7E",
              }}
            >
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
                  }}
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
            height: "100vh",
            backgroundColor: "var(--theme)",
            color: "var(--black)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-between",
            gap: "2rem",
          }}
        >
          <div
            style={{
              padding: "5rem 0 0 5rem",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            <h1
              style={{
                fontSize: "3rem",
                fontWeight: "bold",
              }}
            >
              Mave CMS. Local is
              <br />
              coming to Bangladesh!
            </h1>
            <p
              style={{
                fontSize: "1.5rem",
                fontWeight: 500,
                width: "52%",
              }}
            >
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using
            </p>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              width: "100%",
            }}
          >
            <Image
              preview={false}
              src="/images/ui/lrightbg.svg"
              alt="Mave Promotional Image"
              objectFit="cover"
              style={{
                width: "60vw",
                height: "100%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
