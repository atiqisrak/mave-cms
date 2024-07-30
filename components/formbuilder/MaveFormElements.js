// src/components/MaveFormElements.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../axios";
import ElementsParser from "./ElementsParser";

const MaveFormElements = ({ formId }) => {
  const [elements, setElements] = useState([]);

  useEffect(() => {
    const fetchElements = async () => {
      try {
        const response = await instance.get(`/form_builder/${formId}`);
        response?.data && setElements(response?.data?.elements);
      } catch (error) {
        console.error("Error fetching elements:", error);
      }
    };

    if (formId) {
      fetchElements();
    }
  }, [formId]);

  return (
    <div>
      {console.log("MaveFormElements -> elements", elements)}
      {elements?.map((element) => (
        <ElementsParser key={element._id} element={element} />
      ))}
    </div>
  );
};

export default MaveFormElements;
