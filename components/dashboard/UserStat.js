import { MoreOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";
import { Chart } from "react-google-charts";

export const monthData = [
  ["Days", "Users"],
  ["1-5", 1234],
  ["6-10", 1416],
  ["11-15", 1345],
  ["16-20", 1456],
  ["21-25", 1234],
  ["26-30", 1416],
  ["31", 1345],
];

export const sixMonthsData = [
  ["Month", "Users"],
  ["Jan", 100],
  ["Feb", 622],
  ["Mar", 846],
  ["Apr", 1175],
  ["May", 1456],
  ["Jun", 1234],
];

export const yearData = [
  ["Year", "Users"],
  ["2020", 1000],
  ["2021", 2000],
  ["2022", 3000],
  ["2023", 4000],
  ["2024", 5000],
  ["2025", 6000],
];

export const options = {
  title: "User Stat",
  subtitle: "Users per month",
  bar: {
    groupWidth: "35%",
  },
  vAxis: {
    title: "Users",
  },
  legend: {
    position: "none",
  },
  colors: ["#29CC39"],
  animation: {
    startup: true,
    easing: "linear",
    duration: 1500,
  },
};

export default function UserStat() {
  const [dataTypes, setDataTypes] = useState("Month");

  const data =
    dataTypes === "Month"
      ? monthData
      : dataTypes === "6 Months"
      ? sixMonthsData
      : yearData;

  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "1rem",
        backgroundColor: "white",
      }}
    >
      <div
        className="flexed-among"
        style={{
          borderBottom: "1px solid var(--gray)",
          marginBottom: "1rem",
        }}
      >
        <h4
          style={{
            fontSize: "1.1rem",
            fontWeight: 500,
            color: "var(--black)",
          }}
        >
          User Stat
        </h4>
        <Menu
          mode="horizontal"
          defaultSelectedKeys={["Month"]}
          onClick={(e) => setDataTypes(e.key)}
        >
          <Menu.Item key="Month">Month</Menu.Item>
          <Menu.Item key="6 Months">6 Months</Menu.Item>
          <Menu.Item key="Year">Year</Menu.Item>
        </Menu>
        <MoreOutlined />
      </div>

      <Chart
        chartType="Bar"
        width={"100%"}
        height={"600px"}
        data={data}
        options={options}
      />
    </div>
  );
}
