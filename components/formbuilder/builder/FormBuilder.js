import React, { useState, useEffect } from "react";
import ElementPanel from "./ElementPanel";
import BuilderPanel from "./BuilderPanel";
import instance from "../../../axios";
import { Button, Card, Popconfirm } from "antd";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formAttributes, setFormAttributes] = useState({});

  useEffect(() => {
    const loadForm = async () => {
      setFormAttributes({
        component_id: "dummy_form",
        component_class: "form, bg-light",
        method: "POST",
        action_url: "https://example.com",
        enctype: "multipart/form-data",
      });
    };

    loadForm();
  }, []);

  const addElement = (element) => {
    setFormElements([
      ...formElements,
      { ...element, _id: new Date().getTime().toString() },
    ]);
  };

  const updateElement = (updatedElement) => {
    setFormElements(
      formElements.map((el) =>
        el._id === updatedElement._id ? updatedElement : el
      )
    );
  };

  const saveForm = async () => {
    try {
      await instance.post("/form_builder", {
        attributes: formAttributes,
        elements: formElements,
      });
      alert("Form saved successfully!");
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
            onClick={console.log(formAttributes, formElements)}
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
