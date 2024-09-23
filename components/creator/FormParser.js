import React, { useState, useEffect } from "react";
import { Select, message } from "antd";
import instance from "../../axios";

const { Option } = Select;

const FormParser = ({ item, editMode, onFormSelect, onUpdateComponent }) => {
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(item?._mave || null);

  useEffect(() => {
    if (editMode && !forms.length) {
      fetchForms();
    }
  }, [editMode]);

  const fetchForms = async () => {
    try {
      const response = await instance("/forms");
      if (response.data) {
        setForms(response.data);
      } else {
        message.error("Error fetching forms");
      }
    } catch (error) {
      message.error("Error fetching forms");
    }
  };

  const handleFormChange = (value) => {
    const form = forms.find((f) => f.id === value);
    setSelectedForm(form);
    onFormSelect({ _mave: form, type: "form", id: form.id });
    onUpdateComponent(form);
  };

  return (
    <div>
      {editMode ? (
        <Select
          showSearch
          placeholder="Select a form"
          style={{ width: "100%" }}
          onChange={handleFormChange}
          value={selectedForm?.id || undefined}
        >
          {forms.map((form) => (
            <Option key={form.id} value={form.id}>
              {form.title_en}
            </Option>
          ))}
        </Select>
      ) : (
        <div
          style={{
            padding: "2em",
            border: "1px solid #e8e8e8",
            borderRadius: "5px",
          }}
        >
          <h3>{item?._mave?.title_en}</h3>
          <p>{item?._mave?.description_en}</p>
        </div>
      )}
    </div>
  );
};

export default React.memo(FormParser);
