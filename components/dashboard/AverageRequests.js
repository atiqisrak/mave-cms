// components/AverageRequests.js
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

// Dynamically import ReactApexChart to handle Next.js SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

// Function to generate random data for different time views
const generateRandomData = (type) => {
  const data = [];
  const categories = [];
  const now = new Date();

  if (type === "day") {
    // Generate data for each hour of a day
    for (let i = 0; i < 24; i++) {
      const date = new Date(now.getTime() + i * 60 * 60 * 1000);
      categories.push(date.getHours() + ":00");
      data.push(Math.floor(Math.random() * 50) + 10); // Random hits between 10 to 60
    }
  } else if (type === "week") {
    // Generate data for each day of a week
    for (let i = 0; i < 7; i++) {
      const date = new Date(now.getTime() + i * 24 * 60 * 60 * 1000);
      categories.push(date.toLocaleDateString("default", { weekday: "short" }));
      data.push(Math.floor(Math.random() * 300) + 100); // Random hits between 100 to 400
    }
  } else {
    // Generate data for each month
    for (let i = 0; i < 12; i++) {
      const date = new Date(now.getFullYear(), i);
      categories.push(date.toLocaleDateString("default", { month: "short" }));
      data.push(Math.floor(Math.random() * 1000) + 500); // Random hits between 500 to 1500
    }
  }

  return { data, categories };
};

export default function AverageRequests() {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);
  const [activeTab, setActiveTab] = useState("month");

  useEffect(() => {
    // Generate random data based on active tab
    const seriesData = generateRandomData(activeTab);

    setChartOptions({
      chart: {
        height: 350,
        type: "bar", // Column chart
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
        colors: ["#FCB813"], // Yellow color for bars
      },
      fill: {
        colors: ["#FCB813"], // Fill color for bars
        opacity: 1,
      },
      xaxis: {
        categories: seriesData.categories,
      },
      yaxis: {
        title: {
          text: "API Hits",
        },
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    });

    setChartSeries([
      {
        name: "API Requests",
        data: seriesData.data,
      },
    ]);
  }, [activeTab]);

  return (
    <div
      id="chart"
      style={{
        border: "2.22px solid #C9C9C9",
        borderRadius: "1rem",
      }}
    >
      <div
        className="top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2.22px solid #C9C9C9",
          padding: "0.7rem 1rem",
          marginBottom: "1rem",
        }}
      >
        <h3>Average Requests</h3>
        <Image
          src="/icons/mave_icons/threedots.svg"
          alt="Three Dots"
          width={40}
          height={40}
          style={{
            transform: "rotate(90deg)",
          }}
        />
      </div>

      {/* Tabs for Day, Week, and Month */}
      <Tabs
        type="card"
        centered
        defaultActiveKey="month"
        onChange={(key) => setActiveTab(key)}
        style={{
          marginBottom: "1rem",
          padding: "0 1rem",
          color: "var(--theme)",
        }}
      >
        <Tabs.TabPane tab="Day" key="day" />
        <Tabs.TabPane tab="Week" key="week" />
        <Tabs.TabPane tab="Month" key="month" />
      </Tabs>

      {chartOptions && chartSeries.length > 0 && (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="bar"
          height={350}
        />
      )}
    </div>
  );
}
