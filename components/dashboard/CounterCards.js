// components/CounterCards.js
import { Button } from "antd";
import Image from "next/image";
import { useState } from "react";
import CountUp from "react-countup";

export default function CounterCards() {
  const [cardData] = useState([
    {
      title: "Media",
      value: 12600,
      button: "View All",
      link: "/gallery",
    },
    {
      title: "Components",
      value: 287,
      button: "View All",
      link: "#",
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
      link: "/settings/users",
    },
    {
      title: "Pending Approval",
      value: 14,
      button: "View All",
      link: "#",
    },
  ]);

  return (
    <div className="counter-cards grid grid-cols-1 sm:grid-cols-2 xxl:grid-cols-3 gap-8">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center gap-4 border-4 border-[#FDCA4E] p-6 rounded-xl bg-white shadow-md transition-transform transform hover:scale-105"
        >
          <div className="flex justify-between items-center w-full">
            <h3 className="text-black text-base sm:text-lg xxl:text-xl font-bold">
              {card.title}
            </h3>
            <Image
              src="/icons/mave_icons/threedots.svg"
              alt="Three Dots"
              width={30}
              height={30}
              className="sm:w-10 sm:h-10 xxl:w-12 xxl:h-12"
            />
          </div>
          <CountUp
            end={card.value}
            separator=","
            className="text-black text-xl sm:text-2xl xxl:text-3xl font-bold"
          />
          <Button
            href={card.link}
            className="bg-theme border border-theme text-black hover:bg-slate-500 hover:text-white font-bold rounded-md px-4 py-2 sm:px-5 sm:py-3 xxl:px-6 xxl:py-4 hover:bg-theme-dark transition-colors"
          >
            {card.button}
          </Button>
        </div>
      ))}
      {/* {console.log("Card Data: ", cardData)} */}
    </div>
  );
}
