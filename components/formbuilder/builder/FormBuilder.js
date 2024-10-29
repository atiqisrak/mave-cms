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
  Modal,
  Popconfirm,
  Select,
  Switch,
  Tabs,
  Tag,
} from "antd";
import RichTextEditor from "../../RichTextEditor";
import Router from "next/router";
import FormPreview from "./FormPreview";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formAttributes, setFormAttributes] = useState({});
  const [modifyAttributes, setModifyAttributes] = useState(false);
  const [formMeta, setFormMeta] = useState({});
  const [preview, setPreview] = useState(false);
  const router = Router;

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
        status: 0,
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

  // const updateElement = (updatedElement) => {
  //   setFormElements(
  //     formElements?.map((el) =>
  //       el.updated_on === updatedElement.updated_on ? updatedElement : el
  //     )
  //   );
  // };
  const updateElement = (newElements) => {
    setFormElements(newElements);
  };

  const saveForm = async () => {
    try {
      await instance.post("/form_builder", {
        title: formMeta.title,
        description: formMeta.description,
        attributes: formAttributes,
        elements: formElements,
      });
      if (response.status === 201) {
        message.success("Form saved successfully!");
        router.push("/formbuilder");
      } else {
        message.error("Failed to save form.");
      }
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  const PreviewModal = ({ visible, onCancel, onSave }) => (
    <Modal
      title="Draft Form Preview"
      open={visible}
      footer={[
        <Button key="back" onClick={onCancel} danger>
          Discard
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={onSave}
          style={{
            backgroundColor: "var(--theme)",
            color: "white",
            border: "none",
          }}
        >
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
          <Card
            title="Form Attributes"
            style={{
              marginBottom: "1rem",
              borderRadius: "5px",
              height: "30vh",
              overflowY: "auto",
            }}
          >
            <h3>
              <Tag color="blue">Component ID:</Tag>{" "}
              {formAttributes.component_id}
            </h3>
            <h3>
              <Tag color="blue">Component Class:</Tag>{" "}
              {formAttributes.component_class}
            </h3>
            <h3>
              <Tag color="blue">Method:</Tag>
              <span
                style={{
                  color:
                    formAttributes.method === "POST"
                      ? "var(--themes)"
                      : "var(--theme)",
                }}
              >
                {formAttributes.method}
              </span>
            </h3>
            <h3>
              <Tag color="blue">Action URL:</Tag> {formAttributes.action_url}
            </h3>
            <h3>
              <Tag color="blue">Enctype:</Tag> {formAttributes.enctype}
            </h3>
          </Card>
        </Tabs.TabPane>
      </Tabs>
    </Modal>
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
                {/* <Form.Item label="Component Classes">
                  <Select
                    mode="tags"
                    placeholder="Component Classes"
                    value={formAttributes.component_class.split(",")}
                    onChange={(value) =>
                      setFormAttributes({
                        ...formAttributes,
                        component_class: value.join(","),
                      })
                    }
                    style={{ width: "100%" }}
                  />
                </Form.Item> */}
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
                type="primary"
                // onClick={() => {
                //   console.log("Form data:", {
                //     title: formMeta.title,
                //     descriprion: formMeta.description,
                //     attributes: formAttributes,
                //     elements: formElements,
                //   });
                //   saveForm();
                // }}
                style={{
                  backgroundColor: "var(--themes)",
                  color: "white",
                  border: "none",
                }}
                onClick={() => {
                  setPreview(true);
                }}
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
      <PreviewModal
        open={preview}
        onCancel={() => setPreview(false)}
        onSave={saveForm}
      />
      {/* show the current form preview and ask if save or discard */}
    </div>
  );
};

export default FormBuilder;
