// components/SiteSpeed.js
import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// Dynamically import ReactApexChart to handle Next.js SSR
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export const generateRandomSiteSpeedData = () => {
  const data = [];
  const categories = [];
  const now = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() + i * 60 * 60 * 1000); // increment by 1 hour
    categories.push(date.toISOString());
    data.push(Math.floor(Math.random() * 100) + 50); // Random site speed data between 50ms to 150ms
  }

  return { data, categories };
};

export default function SiteSpeed() {
  const [chartOptions, setChartOptions] = useState({});
  const [chartSeries, setChartSeries] = useState([]);

  useEffect(() => {
    // Generate random data for site speed
    const seriesData = generateRandomSiteSpeedData();

    setChartOptions({
      chart: {
        height: 350,
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2, // Border width
        colors: ["#fcb813"], // 100% fill color for the line
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.25, // 25% opacity for the fill
          opacityTo: 0,
          stops: [25, 100], // Fill gradient starts at 25%
          colorStops: [
            {
              offset: 0,
              color: "#fcb813",
              opacity: 1,
            },
            {
              offset: 100,
              color: "#fcb813",
              opacity: 0.25,
            },
          ],
        },
      },
      xaxis: {
        type: "datetime",
        categories: seriesData.categories,
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    });

    setChartSeries([
      {
        name: "Page Load Time",
        data: seriesData.data,
      },
    ]);
  }, []);

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
        <h3>Site Speed</h3>
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
      {chartOptions && chartSeries.length > 0 && (
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={350}
        />
      )}
    </div>
  );
}
