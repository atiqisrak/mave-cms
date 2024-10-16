// "https://apimave-dev.etherstaging.xyz/api/get_test_data",
import React from "react";
import useSWR from "swr";
import { Card, Spin, Row, Col } from "antd";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import moment from "moment";

const fetcher = (url) => fetch(url).then((res) => res.json());

const processData = (data) => {
  return data.map((item, index) => {
    const floor = parseInt(item.form_data.split(",")[0]) || 1; // Extract floor, default to 1 if undefined
    const time = moment(item.created_at).valueOf(); // Convert time to a numeric value (e.g., timestamp)

    // Debugging: Log the intermediate values
    console.log("Floor:", floor);
    console.log("Time:", time);

    const amplitude = floor * 10; // Adjust the amplitude based on the floor
    const frequency = 0.05; // Adjust frequency to visualize changes
    const sineValue = amplitude * Math.sin(frequency * index); // Use index to spread out points

    // Debugging: Check the sineValue
    console.log("Sine Value:", sineValue);

    return {
      ...item,
      time: moment(item.created_at).format("YYYY-MM-DD HH:mm:ss"), // Format time for display
      sineValue: isNaN(sineValue) ? 0 : sineValue, // Default to 0 if NaN
    };
  });
};

const DataChart = ({ data }) => {
  console.log("Chart Data: ", data); // Debugging - Check processed data
  return (
    <LineChart
      width={800}
      height={400}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="sineValue"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

const DataPage = () => {
  const { data, error } = useSWR(
    "https://apimave-dev.etherstaging.xyz/api/get_test_data",
    fetcher,
    {
      refreshInterval: 10000, // Poll every 10 seconds
    }
  );

  if (error) return <div>Failed to load data</div>;
  if (!data) return <Spin size="large" />;

  const processedData = processData(data);

  return (
    <Row gutter={[16, 16]}>
      {/* <Col span={24}>
        <Card title="Movement Data Table" bordered={false}>
          {processedData.map((item) => (
            <div key={item.id}>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Floor:</strong> {item.form_data.split(",")[0]} (Floor{" "}
                {item.form_data.split(",")[0]})
              </p>
              <p>
                <strong>RFID:</strong> {item.form_data.split(",")[1]}
              </p>
              <p>
                <strong>Time:</strong> {item.time}
              </p>
              <hr />
            </div>
          ))}
        </Card>
      </Col> */}
      <Col span={24}>
        <Card title="Movement Frequency Visualization" bordered={false}>
          <DataChart data={processedData} />
        </Card>
      </Col>
    </Row>
  );
};

export default function Blackbox() {
  return (
    <div className="mavecontainer">
      <DataPage />
    </div>
  );
}
