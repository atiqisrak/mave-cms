import React, { useState, useEffect } from "react";
import ElementPanel from "./ElementPanel";
import BuilderPanel from "./BuilderPanel";
import instance from "../../../axios";
import { Button, Card, Popconfirm } from "antd";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);
  const [formAttributes, setFormAttributes] = useState({
    component_id: "",
    component_class: "",
    method: "POST",
    action_url: "",
    enctype: "multipart/form-data",
  });

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await instance.get("/form_builder/1");
        setFormAttributes(response.data.attributes);
        setFormElements(response.data.elements);
      } catch (error) {
        console.error("Error loading form:", error);
      }
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
      await instance.post("/form_builder/1", {
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
          <Button onClick={saveForm}>Save Form</Button>
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
