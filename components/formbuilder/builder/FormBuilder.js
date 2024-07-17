import React, { useState, useEffect } from "react";
import ElementPanel from "./ElementPanel";
import BuilderPanel from "./BuilderPanel";
import instance from "../../../axios";
import { Button } from "antd";

const FormBuilder = () => {
  const [formElements, setFormElements] = useState([]);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await instance.get("/mave_forms/1/elements");
        setFormElements(response.data);
      } catch (error) {
        console.error("Error loading form:", error);
      }
    };

    loadForm();
  }, []);

  const addElement = (element) => {
    setFormElements([...formElements, element]);
  };

  const updateElement = (updatedElement) => {
    setFormElements(
      formElements.map((el) =>
        el.id === updatedElement.id ? updatedElement : el
      )
    );
  };

  const saveForm = async () => {
    try {
      await instance.post("/mave_forms/1/elements", formElements);
      alert("Form saved successfully!");
    } catch (error) {
      console.error("Error saving form:", error);
    }
  };

  return (
    <div className="form-builder">
      <div className="panel">
        <ElementPanel />
      </div>
      <div className="panel">
        <BuilderPanel
          formElements={formElements}
          addElement={addElement}
          updateElement={updateElement}
        />
        <Button onClick={saveForm}>Save Form</Button>
      </div>
    </div>
  );
};

export default FormBuilder;
