import { Row, Col, Statistic } from "antd";
import { useState } from "react";
import CountUp from "react-countup";
const formatter = (value) => <CountUp end={value} separator="," />;

export default function CounterCards() {
  const [cardData, setCardData] = useState([
    {
      title: "Pages",
      value: 112893,
      icon: "DollarCircleOutlined",
      backgroundColor: "#29CC39",
    },
    {
      title: "Posts",
      value: 112893,
      icon: "MailOutlined",
      backgroundColor: "#8833FF",
    },
    {
      title: "Pages",
      value: 112893,
      icon: "DollarCircleOutlined",
      backgroundColor: "#FF6633",
    },
    {
      title: "Pages",
      value: 112893,
      icon: "DollarCircleOutlined",
      backgroundColor: "#33BFFF",
    },
    {
      title: "Posts",
      value: 112893,
      icon: "MailOutlined",
      backgroundColor: "#1A2233",
    },
    {
      title: "Pages",
      value: 112893,
      icon: "DollarCircleOutlined",
      backgroundColor: "#E62E7B",
    },
  ]);
  return (
    <div>
      {/* <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Pages" value={112893} formatter={formatter} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Posts"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={8}>
          <Statistic title="Pages" value={112893} formatter={formatter} />
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Statistic title="Pages" value={112893} formatter={formatter} />
        </Col>
        <Col span={8}>
          <Statistic
            title="Posts"
            value={112893}
            precision={2}
            formatter={formatter}
          />
        </Col>
        <Col span={8}>
          <Statistic title="Pages" value={112893} formatter={formatter} />
        </Col>
      </Row> */}
      <Row gutter={16}>
        {cardData.map((data, index) => (
          <Col
            span={8}
            key={index}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "1rem 0",
            }}
          >
            <Statistic
              title={data.title}
              value={data.value}
              formatter={formatter}
              style={{
                backgroundColor: data.backgroundColor,
                borderRadius: "10px",
                padding: "2rem 3rem",
              }}
              valueStyle={{ color: "white", fontWeight: "bold" }}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
