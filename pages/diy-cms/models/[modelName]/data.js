// pages/diy-cms/models/[modelName]/data.js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Breadcrumb,
  Spin,
  message,
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
} from "antd";
import { HomeFilled } from "@ant-design/icons";
import instance from "../../../../axios";
import { snakeCase } from "lodash";

export default function ManageData() {
  const router = useRouter();
  const { modelName } = router.query;
  const [loading, setLoading] = useState(true);
  const [modelData, setModelData] = useState([]);
  const [fields, setFields] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    if (modelName) {
      fetchModelFields();
      fetchModelData();
    }
  }, [modelName]);

  const fetchModelFields = async () => {
    try {
      const response = await instance.get("/generated-models");
      if (response.data) {
        const formattedModelName = snakeCase(modelName.toLowerCase());
        const existingModel = response.data.find(
          (model) => model.model_name === formattedModelName
        );
        if (existingModel) {
          setFields(existingModel.fields);
        } else {
          message.error("Model not found.");
          router.push("/diy-cms");
        }
      }
    } catch (error) {
      console.error("Error fetching model data:", error);
      message.error("Failed to fetch model data.");
      router.push("/diy-cms");
    }
  };

  const fetchModelData = async () => {
    setLoading(true);
    try {
      const formattedModelName = snakeCase(modelName.toLowerCase());
      const response = await instance.get(
        `/dynamic?model=${formattedModelName}`
      );
      if (response.status === 200) {
        setModelData(response.data);
      }
    } catch (error) {
      console.error("Error fetching model records:", error);
      message.error("Failed to fetch model records.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setVisible(true);
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    form.setFieldsValue(record);
    setVisible(true);
  };

  const handleDelete = async (record) => {
    try {
      const formattedModelName = snakeCase(modelName.toLowerCase());
      await instance.delete(
        `/dynamic?model=${formattedModelName}&id=${record.id}`
      );
      message.success("Record deleted successfully.");
      fetchModelData();
    } catch (error) {
      console.error("Error deleting record:", error);
      message.error("Failed to delete record.");
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const formattedModelName = snakeCase(modelName.toLowerCase());
      if (editingRecord) {
        // Update record
        await instance.put(
          `/dynamic?model=${formattedModelName}&id=${editingRecord.id}`,
          values
        );
        message.success("Record updated successfully.");
      } else {
        // Create new record
        await instance.post(`/dynamic?model=${formattedModelName}`, values);
        message.success("Record created successfully.");
      }
      setVisible(false);
      fetchModelData();
    } catch (error) {
      console.error("Error saving record:", error);
      message.error("Failed to save record.");
    }
  };

  const columns = [
    ...fields?.map((field) => ({
      title: field.name,
      dataIndex: field.name,
      key: field.name,
    })),
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="mavecontainer">
      <Breadcrumb
        style={{
          marginBottom: "1em",
          cursor: "pointer",
        }}
      >
        <Breadcrumb.Item
          onClick={() => {
            router.push("/");
          }}
        >
          <HomeFilled />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            router.push("/diy-cms");
          }}
        >
          DIY CMS
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            router.push(`/diy-cms/models/${modelName}`);
          }}
        >
          {modelName}
        </Breadcrumb.Item>
        <Breadcrumb.Item>Manage Data</Breadcrumb.Item>
      </Breadcrumb>

      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add New {modelName}
      </Button>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table dataSource={modelData} columns={columns} rowKey="id" />
      )}

      <Modal
        title={`${editingRecord ? "Edit" : "Add"} ${modelName}`}
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleFormSubmit(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form form={form} layout="vertical">
          {fields?.map((field) => {
            // Handle relationship fields
            if (field.relationshipType) {
              return (
                <Form.Item
                  key={field.name}
                  label={field.name}
                  name={field.name}
                  rules={[
                    {
                      required: field.required,
                      message: `${field.name} is required`,
                    },
                  ]}
                >
                  <Select
                    placeholder={`Select ${field.relatedModel}`}
                    showSearch
                  >
                    {/* Fetch and map related model data */}
                    {/* You would need to fetch the related model's data here */}
                  </Select>
                </Form.Item>
              );
            }

            // Handle regular fields
            return (
              <Form.Item
                key={field.name}
                label={field.name}
                name={field.name}
                rules={[
                  {
                    required: field.required,
                    message: `${field.name} is required`,
                  },
                ]}
              >
                <Input />
              </Form.Item>
            );
          })}
        </Form>
      </Modal>
    </div>
  );
}
