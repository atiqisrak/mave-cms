import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import faqjson from "./faq.json";
import Image from "next/image";

const Support = () => {
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    setFaqData(faqjson);
  }, []);

  return (
    <div
      className="mavecontainer"
      style={{
        marginTop: "6em",
      }}
    >
      <div
        style={{
          backgroundImage: "url(/images/supportbg.svg)",
          backgroundSize: "15vw",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top right",
          height: "100%",
        }}
      >
        <center>
          <h1
            style={{
              fontSize: "3em",
              fontWeight: "bold",
              color: "var(--themes)",
              marginTop: "2em",
            }}
          >
            How can we help?
          </h1>
          <Input
            placeholder="Search a topic"
            suffix={<SearchOutlined />}
            style={{
              marginTop: "2em",
              width: "70%",
              borderRadius: "45px",
              border: "1px solid #e0e0e0",
              padding: "0 2em",
              height: "80px",
              boxShadow: "0px 14px 14px rgba(0, 0, 0, 0.25)",
              fontSize: "1.5em",
            }}
          />
        </center>
        <div
          style={{
            paddingTop: "5em",
          }}
        >
          <h1>General</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1em",
              marginTop: "2em",
            }}
          >
            {faqData &&
              faqData?.map((item, index) => (
                <div
                  key={index}
                  className="support-card"
                  onClick={() => window.open("/usermanual/faq")}
                >
                  <Image
                    src={"/images/icons/support/" + item?.category + ".svg"}
                    alt={item.name}
                    width={100}
                    height={100}
                    objectFit="contain"
                  />
                  <h2>{item.name}</h2>
                  <p
                    style={{
                      textAlign: "center",
                      fontSize: "1em",
                      color: "#666",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
