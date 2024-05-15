import React, { useState, useEffect, useMemo, memo } from "react";
import instance from "../../axios";
import { Form, Input, Select, message } from "antd";
import FormComponent from "../FormComponent";

const FormParser = ({ item, editMode, onFormSelect, onUpdateComponent }) => {
  const { Option } = Select;
  const [loading, setLoading] = useState(false);
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [formsFetched, setFormsFetched] = useState(false);

  const fetchForms = async () => {
    try {
      setLoading(true);
      // console.log("Item: ", item);
      const response = await instance("/forms");
      if (response.data) {
        setForms(response.data);
        // console.log("Forms: ", response.data);
        // console.log("Forms fetched successfully");
        setFormsFetched(true);
        setLoading(false);
      } else {
        // console.error("Error fetching form assets nn:", response.data.message);
        message.error("Error fetching form assets");
      }
    } catch (error) {
      // console.error("Error fetching form assets:", error);
      message.error("Error fetching form assets");
    }
  };

  useEffect(() => {
    if (editMode && !formsFetched) {
      fetchForms();
    }
  }, [editMode, formsFetched]);

  const handleFormChange = (values) => {
    const selectedForm = forms.find((form) => form.id === values);
    setSelectedForm(values);
    onFormSelect({
      _mave: selectedForm,
      type: "form",
      id: values,
    });
    onUpdateComponent(selectedForm);
  };

  return (
    <>
      {editMode ? (
        <div className="formContainer">
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a form"
            optionFilterProp="children"
            onChange={handleFormChange}
            value={selectedForm}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {forms?.map((form) => (
              <Option key={form?.id} value={form?.id}>
                {form?.title_en}
              </Option>
            ))}
          </Select>
        </div>
      ) : (
        <div
          className="formContainer"
          style={{
            display: "grid",
            padding: "2em",
            border: "1px solid #e8e8e8",
            marginBottom: "2em",
            borderRadius: "5px",
          }}
        >
          <Form name="basic">
            <Form.Item label="Title (English)">
              <Input
                name="title_en"
                initialValue={item?.title_en}
                disabled={!editMode}
                placeholder={item?.title_en}
              />
            </Form.Item>
            <Form.Item label="Title (Bengali)">
              <Input
                name="title_bn"
                initialValue={item?.title_bn}
                disabled={!editMode}
                placeholder={item?.title_bn}
              />
            </Form.Item>
            <Form.Item label="Description (English)">
              <Input.TextArea
                name="description_en"
                initialValue={item?.description_en}
                disabled={!editMode}
                placeholder={item?.description_en}
              />
            </Form.Item>
            <Form.Item label="Description (Bengali)">
              <Input.TextArea
                name="description_bn"
                initialValue={item?.description_bn}
                disabled={!editMode}
                placeholder={item?.description_bn}
              />
            </Form.Item>
            <Form.Item label="Submit Direction">
              <Input
                name="submit_direction"
                initialValue={item?.submit_direction}
                disabled={!editMode}
                placeholder={item?.submit_direction}
              />
            </Form.Item>
            <Form.Item label="Status">
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a status"
                optionFilterProp="children"
                onChange={handleFormChange}
                value={selectedForm}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {/* <Option value="active">Active</Option>
                      <Option value="inactive">Inactive</Option> */}
              </Select>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
};

export default memo(FormParser);
