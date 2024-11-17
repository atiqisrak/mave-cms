import { BlockOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Button, Select } from "antd";

export default function TopNav({ activeTab, setActiveTab }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 3fr",
        padding: "1rem 0",
        alignItems: "center",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <h4
        style={{
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        Role Permission{" "}
        <span style={{ fontSize: "1rem", fontWeight: 200 }}>
          {activeTab === "role" ? "Role Table" : "Permission Table"}
        </span>
      </h4>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
        <Select style={{ width: 60 }} placeholder="10" showSearch>
          <Select.Option value="10">10</Select.Option>
          <Select.Option value="20">20</Select.Option>
          <Select.Option value="30">30</Select.Option>
        </Select>
        <Button
          type="primary"
          style={{
            backgroundColor:
              activeTab === "role" ? "var(--maveyellow)" : "white",
            color: activeTab === "role" ? "white" : "black",
            border: "2px solid",
            borderColor:
              activeTab === "role" ? "var(--maveyellow)" : "var(--gray-dark)",
          }}
          icon={<BlockOutlined />}
          onClick={() => setActiveTab("role")}
        >
          Role
        </Button>
        <Button
          type="primary"
          style={{
            backgroundColor:
              activeTab === "permission" ? "var(--maveyellow)" : "white",
            color: activeTab === "permission" ? "white" : "black",
            border: "2px solid",
            borderColor:
              activeTab === "permission"
                ? "var(--maveyellow)"
                : "var(--gray-dark)",
          }}
          icon={<CheckCircleOutlined />}
          onClick={() => setActiveTab("permission")}
        >
          Permission
        </Button>
      </div>
    </div>
  );
}
