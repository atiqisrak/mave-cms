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

const fetcher = (url) => fetch(url).then((res) => res.json());

const DataPage = () => {
  const { data, error } = useSWR("/get_test_data", fetcher, {
    refreshInterval: 10000, // Poll every 10 seconds
  });

  if (error) return <div>Failed to load data</div>;
  if (!data) return <Spin size="large" />;

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card title="Data Table" bordered={false}>
          {data.map((item) => (
            <div key={item.id}>
              <p>
                <strong>ID:</strong> {item.id}
              </p>
              <p>
                <strong>Form Data:</strong> {item.form_data}
              </p>
              <p>
                <strong>Created At:</strong> {item.created_at}
              </p>
              <p>
                <strong>Updated At:</strong> {item.updated_at}
              </p>
              <hr />
            </div>
          ))}
        </Card>
      </Col>
      <Col span={24}>
        <Card title="Data Visualization" bordered={false}>
          <LineChart
            width={800}
            height={400}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="created_at" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="form_data"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </Card>
      </Col>
    </Row>
  );
};

export default function Blackbox() {
  return (
    <div className="ViewContainer" style={{ padding: "24px" }}>
      <DataPage />
    </div>
  );
}
