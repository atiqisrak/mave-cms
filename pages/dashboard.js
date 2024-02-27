"use client";
import React, { useEffect, useState } from "react";
import Site from "../components/Site";
import { setPageTitle } from "../global/constants/pageTitle";
import Login from "../components/Login";
import { useRouter } from "next/router";
import { Image } from "antd";
import Orders from "./orders";

const Dashboard = () => {

  const GOOGLE_ANALYTICS = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_LINK;

  useEffect(() => {
    // Set the dynamic page title for the Home page
    setPageTitle("Dashboard");
  }, []);

  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();

  useEffect(() => {

    // Check if a token is stored in localStorage when the component mounts
    const storedToken = localStorage.getItem("token");
    const users = localStorage.getItem("user");
    const user_Parse = JSON.parse(users);
    if (storedToken && user_Parse) {
      setToken(storedToken);
      setUser(user_Parse);
      // console.log("User: ", user_Parse);
      // console.log("Token: ", storedToken);
    }
  }, []);



  return (
    <>
      <div className="ViewContainer ViewContentContainer">
        {/* <center>
          <h1>Welcome to Mave CMS</h1>
          <br /><br />
          <Image src="/images/mave_logo_horizontal.png" width={800} alt="" />
          </center> */}
        {user && token ? (
          <>
            <div className="dashboard-area">
              {/* <h1>Admin Dashboard</h1> */}
              <div className="user">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                  width={50}
                  alt=""
                />
                <h2 style={{ textAlign: "center" }}>{user.name}</h2>
                <p style={{
                  textTransform: 'lowercase',
                }}>{user.email}</p>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="flexed-center">
        {/* iframe */}
        <iframe src={GOOGLE_ANALYTICS}
          width="60%"
          height="900px"
          frameborder="0"
          style={{
            overflowX: 'hidden',
            overflowY: 'hidden',
          }}
        ></iframe>
      </div>
      <Orders />
    </>
  );
};

export default Dashboard;
