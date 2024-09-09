import { Row, Col, Statistic, Button } from "antd";
import Image from "next/image";
import { useState } from "react";
import CountUp from "react-countup";
const formatter = (value) => <CountUp end={value} separator="," />;

export default function CounterCards() {
  const [cardData, setCardData] = useState([
    {
      title: "Media",
      value: 12600,
      button: "View All",
      link: "/media",
    },
    // Components, Pages, Blogs, Users, Pending Approval
    {
      title: "Components",
      value: 287,
      button: "View All",
      link: "/components",
    },
    {
      title: "Pages",
      value: 65,
      button: "View All",
      link: "/pages",
    },
    {
      title: "Blogs",
      value: 127,
      button: "View All",
      link: "/blogs",
    },
    {
      title: "Users",
      value: 60,
      button: "View All",
      link: "/users",
    },
    {
      title: "Pending Approval",
      value: 14,
      button: "View All",
      link: "/pending-approval",
    },
  ]);
  return (
    <div
      className="counter-cards"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "3rem",
      }}
    >
      {cardData?.map((card, index) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            border: "3px solid #FDCA4E",
            padding: "2rem 1.2rem",
            borderRadius: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h3
              style={{
                color: "var(--black)",
                fontSize: "1.1rem",
                fontWeight: "bold",
              }}
            >
              {card.title}
            </h3>
            <Image
              src="/icons/mave_icons/threedots.svg"
              alt="Three Dots"
              width={40}
              height={40}
            />
          </div>
          <CountUp
            end={card.value}
            separator=","
            style={{
              color: "var(--black)",
              fontSize: "2rem",
              fontWeight: "bold",
            }}
          />
          <Button
            type="primary"
            href={card.link}
            style={{
              backgroundColor: "var(--theme)",
              borderColor: "var(--theme)",
              color: "var(--black)",
              fontWeight: "bold",
              borderRadius: "10px",
              padding: "7px 20px",
            }}
          >
            {card.button}
          </Button>
        </div>
      ))}
    </div>
  );
}
