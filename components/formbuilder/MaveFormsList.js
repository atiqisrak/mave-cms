// src/components/MaveFormsList.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import instance from "../../axios";
import { Tabs } from "antd";

const MaveFormsList = ({ onSelectForm }) => {
  const [forms, setForms] = useState([]);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await instance.get("/mave_forms");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  return (
    <div>
      <h1>Forms</h1>
      <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <button onClick={() => onSelectForm(form.id)}>
              {form.mave_title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaveFormsList;
