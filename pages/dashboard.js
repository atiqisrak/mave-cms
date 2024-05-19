"use client";
import React, { useEffect, useState } from "react";
import { setPageTitle } from "../global/constants/pageTitle";
import { useRouter } from "next/router";

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
        {user && token ? (
          <>
            <div className="dashboard-area">
              {/* <h1>Admin Dashboard</h1> */}
              <div className="user">
                <img
                  src="/images/profile_avatar.png"
                  style={{
                    borderRadius: "50%",
                    border: "1px solid #f0f0f0",
                  }}
                  width={50}
                  alt=""
                />
                <h2 style={{ textAlign: "center" }}>{user.name}</h2>
                <p
                  style={{
                    textTransform: "lowercase",
                  }}
                >
                  {user.email}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>
      <div className="flexed-center">
        {/* iframe */}
        <iframe
          src={GOOGLE_ANALYTICS}
          width="60%"
          height="900px"
          frameborder="0"
          style={{
            overflowX: "hidden",
            overflowY: "hidden",
          }}
        ></iframe>
      </div>
    </>
  );
};

export default Dashboard;
