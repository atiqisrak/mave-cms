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
  Tag,
} from "antd";
import RichTextEditor from "../../RichTextEditor";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formAttributes, setFormAttributes] = useState({});
  const [modifyAttributes, setModifyAttributes] = useState(false);
  const [formMeta, setFormMeta] = useState({});

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

  const updateElement = (updatedElement) => {
    setFormElements(
      formElements.map((el) =>
        el.updated_on === updatedElement.updated_on ? updatedElement : el
      )
    );
  };

  const saveForm = async () => {
    try {
      await instance.post("/form_builder", {
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
    }
  };

  return (
    <div
      className="form-builder"
      style={{ display: "grid", gridTemplateColumns: "4fr 1fr", gap: "2rem" }}
    >
      <div className="panel">
        <center>
          <Button
            type="primary"
            style={{
              marginBottom: "1rem",
              display: "block",
              width: "fit-content",
              borderRadius: "5px",
              backgroundColor: modifyAttributes
                ? "var(--themes)"
                : "var(--theme)",
            }}
            onClick={() => setModifyAttributes(!modifyAttributes)}
          >
            {modifyAttributes ? "Close" : "Modify Form Attributes"}
          </Button>
        </center>
        {modifyAttributes && (
          <Card
            title="Form Attributes"
            style={{ marginBottom: "1rem", borderRadius: "5px" }}
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
                  style={{ marginBottom: "1rem" }}
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
              <Form.Item label="Component Classes">
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
                  style={{ marginBottom: "1rem" }}
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
                  style={{ marginBottom: "1rem" }}
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
        )}

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
          {/* <Button onClick={saveForm}>Save Form</Button> */}
          <Button
            type="primary"
            onClick={() => {
              console.log("Form data:", {
                title: formMeta.title,
                descriprion: formMeta.description,
                attributes: formAttributes,
                elements: formElements,
              });
              saveForm();
            }}
          >
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
      </div>
      <div className="panel">
        <ElementPanel />
      </div>
    </div>
  );
};

export default FormBuilder;
