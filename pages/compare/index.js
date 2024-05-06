import { Button } from "antd";
import React from "react";
import router from "next/router";

export default function Compare() {
  return (
    <div className="ViewContainer">
      <h1>
        Welcome to the place where you will know why Mave is better than others
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: 20,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <Button
          onClick={() => {
            router.push("/compare/mave-vs-storyblok");
          }}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--themes)",
            padding: "3rem 2rem",
            border: "1px solid var(--themes)",
            backgroundColor: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          }}
        >
          MAVE vs StoryBlok
        </Button>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--themes)",
            padding: "3rem 2rem",
            border: "1px solid var(--themes)",
            backgroundColor: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          }}
        >
          MAVE vs Strapi
        </Button>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--themes)",
            padding: "3rem 2rem",
            border: "1px solid var(--themes)",
            backgroundColor: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          }}
        >
          MAVE vs Dato CMS
        </Button>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "var(--themes)",
            padding: "3rem 2rem",
            border: "1px solid var(--themes)",
            backgroundColor: "white",
            boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
          }}
        >
          MAVE vs Wordpress
        </Button>
      </div>
    </div>
  );
}
