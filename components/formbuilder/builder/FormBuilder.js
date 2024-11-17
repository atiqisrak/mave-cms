import React, { useState, useEffect } from "react";
import ElementPanel from "./ElementPanel";
import BuilderPanel from "./BuilderPanel";
import instance from "../../../axios";
import {
  Button,
  Card,
  Drawer,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Switch,
  Table,
  Tabs,
} from "antd";
import RichTextEditor from "../../RichTextEditor";
import FormPreview from "./FormPreview";
import { useRouter } from "next/router";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formAttributes, setFormAttributes] = useState({});
  const [modifyAttributes, setModifyAttributes] = useState(false);
  const [formMeta, setFormMeta] = useState({});
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadForm = async () => {
      setFormAttributes({
        component_id: "dummy_form",
        component_class: "form, bg-light",
        method: "POST",
        action_url: "https://example.com",
        enctype: "multipart/form-data",
      });
      setFormMeta({
        title: "Demo Form",
        description: "This is a demo form.",
        status: 1,
      });
    };

    loadForm();
  }, []);

  const addElement = (element) => {
    setFormElements([
      ...formElements,
      { ...element, updated_on: new Date().getTime().toString() },
    ]);
  };

  const updateElement = (newElements) => {
    setFormElements(newElements);
  };

  const saveForm = async () => {
    try {
      setLoading(true);
      const response = await instance.post("/form_builder", {
        title: formMeta.title,
        description: formMeta.description,
        attributes: formAttributes,
        elements: formElements,
      });
      if (response.status === 201) {
        message.success("Form saved successfully!");
        setPreview(false);
        await router.push("/formbuilder"); // Ensure navigation before clearing state
      } else {
        message.error("Failed to save form.");
      }
    } catch (error) {
      console.error("Error saving form:", error);
    } finally {
      setLoading(false);
    }
  };

  const PreviewDrawer = ({ visible, onCancel, onSave }) => (
    <Drawer
      title="Draft Form Preview"
      open={visible}
      onClose={onCancel}
      width="60%"
      footer={[
        <Button key="back" onClick={onCancel} className="mavecancelbutton">
          Discard
        </Button>,
        <Button key="submit" onClick={onSave} className="mavebutton">
          Publish Form
        </Button>,
      ]}
    >
      <Tabs defaultActiveKey="1" type="card" size="large" centered>
        <Tabs.TabPane tab="Preview" key="1">
          <FormPreview
            formMeta={formMeta}
            formAttributes={formAttributes}
            formElements={formElements}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Attributes" key="2">
          <Table
            className="mavetable font-semibold"
            dataSource={[
              {
                key: "1",
                attribute: "Component ID",
                value: formAttributes.component_id,
              },
              {
                key: "2",
                attribute: "Component Class",
                value: formAttributes.component_class,
              },
              {
                key: "3",
                attribute: "Method",
                value: formAttributes.method,
              },
              {
                key: "4",
                attribute: "Action URL",
                value: formAttributes.action_url,
              },
              {
                key: "5",
                attribute: "Enctype",
                value: formAttributes.enctype,
              },
            ]}
            columns={[
              {
                title: "Attribute",
                dataIndex: "attribute",
                key: "attribute",
              },
              {
                title: "Value",
                dataIndex: "value",
                key: "value",
              },
            ]}
            pagination={false}
          />
        </Tabs.TabPane>
      </Tabs>
    </Drawer>
  );

  return (
    <div
      className="form-builder"
      style={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "2rem" }}
    >
      <div className="panel">
        <Tabs
          defaultActiveKey="1"
          style={{ marginBottom: "1rem" }}
          type="card"
          size="large"
          centered
        >
          <Tabs.TabPane tab="Attributes" key="1">
            <Card
              title="Form Attributes"
              style={{
                marginBottom: "1rem",
                borderRadius: "5px",
                height: "70vh",
                overflowY: "auto",
              }}
            >
              <Form layout="vertical" style={{ marginBottom: "1rem" }}>
                <Form.Item label="Form Title">
                  <Input
                    placeholder="Form Title"
                    value={formMeta.title}
                    onChange={(e) => {
                      setFormMeta({ ...formMeta, title: e.target.value });
                      setFormAttributes({
                        ...formAttributes,
                        component_id: e.target.value
                          .toLowerCase()
                          .replace(/\s/g, "_"),
                      });
                    }}
                  />
                </Form.Item>
                <Form.Item label="Form Description">
                  <RichTextEditor
                    value={formMeta.description}
                    onChange={(value) =>
                      setFormMeta({ ...formMeta, description: value })
                    }
                    editMode={true}
                  />
                </Form.Item>
                <Form.Item label="Method">
                  <Switch
                    checkedChildren="POST"
                    unCheckedChildren="GET"
                    defaultChecked
                    onChange={(checked) =>
                      setFormAttributes({
                        ...formAttributes,
                        method: checked ? "POST" : "GET",
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Action URL">
                  <Input
                    label="Action URL"
                    type="url"
                    placeholder="Action URL"
                    value={formAttributes.action_url}
                    onChange={(e) =>
                      setFormAttributes({
                        ...formAttributes,
                        action_url: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Enctype">
                  <Select
                    placeholder="Enctype"
                    value={formAttributes.enctype}
                    onChange={(value) =>
                      setFormAttributes({ ...formAttributes, enctype: value })
                    }
                    style={{ width: "100%" }}
                    showSearch
                  >
                    <Select.Option value="application/x-www-form-urlencoded">
                      application/x-www-form-urlencoded
                    </Select.Option>
                    <Select.Option value="multipart/form-data">
                      multipart/form-data
                    </Select.Option>
                    <Select.Option value="text/plain">text/plain</Select.Option>
                  </Select>
                </Form.Item>
              </Form>
            </Card>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Elements" key="2">
            <BuilderPanel
              formElements={formElements}
              addElement={addElement}
              updateElement={updateElement}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1rem 0 5rem",
              }}
            >
              <Button
                onClick={() => {
                  setPreview(true);
                }}
                className="mavebutton"
              >
                Preview
              </Button>
              <Popconfirm
                title="Are you sure you want to clear the form?"
                onConfirm={() => setFormElements([])}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Clear Form</Button>
              </Popconfirm>
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
      <div className="panel">
        <ElementPanel />
      </div>
      <PreviewDrawer
        visible={preview}
        onCancel={() => setPreview(false)}
        onSave={saveForm}
      />
    </div>
  );
};

export default FormBuilder;
