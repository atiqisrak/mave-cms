// ModelsShowcase.js
import { Button, message, Popconfirm, Spin, Table } from "antd";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import instance from "../../axios";
import {
  CheckCircleFilled,
  CopyOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";
import { snakeCase } from "lodash";

export default function ModelsShowcase() {
  const [loading, setLoading] = useState(false);
  const [dynamicModels, setDynamicModels] = useState([]);
  const router = useRouter();

  const fetchDynamicModels = async () => {
    setLoading(true);
    try {
      const response = await instance.get("/generated-models");
      if (response.data) {
        setDynamicModels(response.data);
      } else {
        setDynamicModels([]);
      }
    } catch (error) {
      console.error("Error fetching dynamic models:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDynamicModels();
  }, []);

  const handleDeleteModel = async (modelId) => {
    setLoading(true);
    try {
      const response = await instance.delete(`/generated-models/${modelId}`);
      if (response.data) {
        message.success("Model deleted successfully!");
        fetchDynamicModels();
      }
    } catch (error) {
      console.error("Error deleting model:", error);
      message.error("Error deleting model. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="mavecontainer"
      style={{
        backgroundColor: "white",
        padding: "1em",
        width: "100%",
        borderRadius: "0.5em",
      }}
    >
      {loading ? (
        <div style={{ textAlign: "center" }}>
          <Spin />
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1em",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          }}
        >
          {dynamicModels.map((model) => (
            <div
              key={model.id}
              style={{
                padding: "1em",
                border: "1px solid #ccc",
                borderRadius: "0.5em",
                marginBottom: "1em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <h2
                  style={{
                    textAlign: "center",
                    marginBottom: "1.5em",
                    width: "100%",
                    color: "var(--theme)",
                  }}
                >
                  {model.model_name}
                </h2>
                <div
                  style={{
                    display: "flex",
                    gap: "1em",
                    justifyContent: "center",
                    marginBottom: "1em",
                  }}
                >
                  {model.status ? (
                    <CheckCircleFilled
                      style={{ color: "green", fontSize: "1.5em" }}
                    />
                  ) : (
                    <CheckCircleFilled
                      style={{ color: "gray", fontSize: "1.5em" }}
                    />
                  )}
                  <Button
                    type="primary"
                    onClick={() => {
                      router.push(`/diy-cms/models/${model.model_name}`);
                    }}
                    icon={<EditFilled />}
                    style={{
                      backgroundColor: "transparent",
                      color: "var(--theme)",
                    }}
                  />
                  <Popconfirm
                    title="Are you sure you want to delete this model?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={async () => {
                      handleDeleteModel(model.id);
                    }}
                  >
                    <DeleteOutlined style={{ color: "red" }} />
                  </Popconfirm>
                </div>
                <Table
                  dataSource={model.fields}
                  columns={[
                    {
                      title: "Name",
                      dataIndex: "name",
                      key: "name",
                    },
                    {
                      title: "Type",
                      dataIndex: "type",
                      key: "type",
                    },
                  ]}
                  pagination={false}
                  width="100%"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1em",
                  marginTop: "1em",
                }}
              >
                <code
                  style={{
                    backgroundColor: "#f0f0f0",
                    padding: "0.5em",
                    borderRadius: "0.5em",
                  }}
                >
                  {model.api_route}
                </code>
                <Button
                  icon={<CopyOutlined />}
                  onClick={() => {
                    const url = `${process.env.NEXT_PUBLIC_DYNAMIC_MODEL_URL}${model.api_route}`;
                    navigator.clipboard.writeText(url);
                    message.success("Copied to clipboard!");
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
