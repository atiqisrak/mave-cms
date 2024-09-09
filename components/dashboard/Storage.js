import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Table } from "antd";
import Image from "next/image";

// Dynamically import ReactApexChart to handle Next.js SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function Storage() {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "donut",
    },
    labels: ["Image", "Video", "Documents", "Others", "Empty"],
    colors: ["#FCB813", "#E3A611", "#FEE9B6", "#FFF4DC", "#FFFFFF"], // Custom colors
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });

  const [chartSeries, setChartSeries] = useState([44, 55, 41, 17, 15]);
  const total = chartSeries.reduce((a, b) => a + b, 0);

  return (
    <div style={{ border: "2.22px solid #C9C9C9", borderRadius: "1rem" }}>
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
        <h3>Storage</h3>
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
      <div>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          height={350}
        />
      </div>
    </div>
  );
}
