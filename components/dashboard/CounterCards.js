import { PlusCircleFilled } from "@ant-design/icons";
import { Row, Col, Statistic, Button } from "antd";
import { useState } from "react";
import CountUp from "react-countup";
const formatter = (value) => <CountUp end={value} separator="," />;

export default function CounterCards() {
  const [cardData, setCardData] = useState([
    {
      title: "Pages",
      value: 100,
      icon: "DollarCircleOutlined",
      color: "white",
      backgroundColor: "#29CC39",
      buttonBackgroundColor: "#13BF24",
    },
    {
      title: "Components",
      value: 245,
      icon: "MailOutlined",
      color: "white",
      backgroundColor: "#8833FF",
      buttonBackgroundColor: "#7919FF",
    },
    {
      title: "Images",
      value: 445,
      icon: "DollarCircleOutlined",
      color: "white",
      backgroundColor: "#FF6633",
      buttonBackgroundColor: "#E64B17",
    },
    {
      title: "Videos",
      value: 32,
      icon: "DollarCircleOutlined",
      color: "white",
      backgroundColor: "#33BFFF",
      buttonBackgroundColor: "#17A5E6",
    },
    {
      title: "Files",
      value: 34,
      icon: "MailOutlined",
      color: "white",
      backgroundColor: "#1A2233",
      buttonBackgroundColor: "#26334D",
    },
    {
      title: "Cards",
      value: 117,
      icon: "DollarCircleOutlined",
      color: "white",
      backgroundColor: "#E62E7B",
      buttonBackgroundColor: "#E62E7B",
    },
  ]);
  return (
    <div className="counter-cards">
      <Row
        gutter={16}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {cardData.map((data, index) => (
          <Col
            span={7}
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: data.backgroundColor,
              borderRadius: "10px",
              padding: "1rem",
            }}
          >
            <Statistic
              title={data.title}
              value={data.value}
              formatter={formatter}
              style={{
                borderRadius: "10px",
                padding: "2rem 3rem",
                color: data.color,
              }}
              valueStyle={{
                fontSize: "2.4em",
                color: "white",
                fontWeight: "bold",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1em",
              }}
            >
              <div
                style={{
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: data.buttonBackgroundColor,
                  borderRadius: "50%",
                }}
              >
                <PlusCircleFilled
                  style={{
                    fontSize: "1.5rem",
                    backgroundColor: data.backgroundColor,
                    borderRadius: "50%",
                    color: data.color,
                  }}
                />
              </div>
              <Button
                style={{
                  backgroundColor: data.buttonBackgroundColor,
                  color: data.color,
                  borderRadius: "20px",
                  fontSize: "1rem",
                  fontWeight: 500,
                  border: "1px solid transparent",
                }}
              >
                View All
              </Button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
