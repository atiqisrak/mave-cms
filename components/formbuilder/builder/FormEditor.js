import React, { useState, useEffect } from "react";
import ElementPanel from "./ElementPanel";
import BuilderPanel from "./BuilderPanel";
import instance from "../../../axios";
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Popconfirm,
  Select,
  Switch,
  Tabs,
} from "antd";
import RichTextEditor from "../../RichTextEditor";

const FormEditor = ({ formId }) => {
  const [formElements, setFormElements] = useState([]);
  const [formAttributes, setFormAttributes] = useState({});
  const [formMeta, setFormMeta] = useState({});

  useEffect(() => {
    const loadForm = async () => {
      if (formId) {
        try {
          const response = await instance.get(`/form_builder/${formId}`);
          const form = response.data;
          setFormAttributes(form.attributes);
          setFormMeta({
            title: form.title,
            description: form.description,
            status: form.status,
          });
          setFormElements(form.elements);
        } catch (error) {
          console.error("Error loading form:", error);
        }
      } else {
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
          status: 0,
        });
      }
    };

    loadForm();
  }, [formId]);

  const addElement = (element) => {
    setFormElements([
      ...formElements,
      { ...element, _id: new Date().getTime().toString() },
    ]);
  };

  const updateElement = (newElements) => {
    setFormElements(newElements);
  };

  const saveForm = async () => {
    try {
      const response = await instance.put(`/form_builder/${formId || ""}`, {
        title: formMeta.title,
        description: formMeta.description,
        attributes: formAttributes,
        elements: formElements,
      });
      if (response.status === 200) {
        message.success("Form saved successfully!");
      } else {
        message.error("Failed to save form.");
      }
    } catch (error) {
      console.error("Error saving form:", error);
      message.error("Error saving form.");
    }
  };

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
          <Tabs.TabPane tab="Elements" key="1">
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
              <Button type="primary" onClick={saveForm}>
                Save Form
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
          <Tabs.TabPane tab="Attributes" key="2">
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
                    checked={formAttributes.method === "POST"}
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
        </Tabs>
      </div>
      <div className="panel">
        <ElementPanel />
      </div>
    </div>
  );
};

export default FormEditor;
