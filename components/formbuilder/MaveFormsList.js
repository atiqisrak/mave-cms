// components/formbuilder/MaveFormsList.jsx

import React, { useEffect, useState } from "react";
import instance from "../../axios";
import {
  Breadcrumb,
  Button,
  Input,
  Drawer,
  Popconfirm,
  Spin,
  Switch,
  Tooltip,
} from "antd";
import {
  CloudSyncOutlined,
  DeleteOutlined,
  DockerOutlined,
  EyeOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import MaveFormElements from "./MaveFormElements";
import { useRouter } from "next/router";

const MaveFormsList = ({ onSelectForm, selectedFormId }) => {
  const [forms, setForms] = useState([]);
  const [changeFormsView, setChangeFormsView] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await instance.get("/form_builder");
        setForms(response.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };

    fetchForms();
  }, []);

  useEffect(() => {
    if (selectedFormId) {
      setDrawerVisible(true);
    } else {
      setDrawerVisible(false);
    }
  }, [selectedFormId]);

  const handleDeleteForm = async (formId) => {
    try {
      await instance.delete(`/form_builder/${formId}`);
      setForms(forms.filter((form) => form.id !== formId));
      if (selectedFormId === formId) {
        onSelectForm(null);
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  // Spinner
  if (!forms.length) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb
        className="mb-4"
        items={[
          { title: <HomeOutlined />, href: "/" },
          { title: "Form Builder", href: "/formbuilder" },
          { title: "Mave Forms" },
        ]}
      />

      {/* Search and View Switch */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Input
          placeholder="Search for forms"
          suffix={<SearchOutlined />}
          className="w-full sm:w-1/2 mb-4 sm:mb-0"
        />
        <div className="flex items-center space-x-2">
          <span className="mr-2">View:</span>
          <Switch
            checkedChildren="List"
            unCheckedChildren="Groups"
            checked={changeFormsView}
            onChange={() => {
              setChangeFormsView(!changeFormsView);
            }}
          />
        </div>
      </div>

      {/* Forms Display */}
      {changeFormsView ? (
        // List View
        <div className="flex flex-col space-y-4">
          {forms.map((form) => (
            <div
              key={form.id}
              className="border-2 border-gray-300 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col"
            >
              {/* Form Header */}
              <div className="flex flex-col items-center justify-center bg-theme text-white p-4 rounded-t-lg mb-4">
                <h3 className="text-lg font-bold">Form ID: {form.id}</h3>
                <h3 className="text-lg font-bold">{form.title}</h3>
              </div>

              {/* Form Description */}
              <p
                className="text-gray-600 mb-4"
                dangerouslySetInnerHTML={{
                  __html:
                    form.description.length > 100
                      ? `${form.description.substring(0, 100)}...`
                      : form.description,
                }}
              />

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2">
                <Button
                  icon={<EyeOutlined className="text-theme" />}
                  onClick={() => onSelectForm(form.id)}
                  className="flex items-center"
                />
                <Button
                  icon={<DockerOutlined className="text-theme" />}
                  className="flex items-center"
                  onClick={() =>
                    router.push(`/formbuilder/form-responses/${form.id}`)
                  }
                />
                <Popconfirm
                  title="Are you sure you want to delete this form?"
                  onConfirm={() => handleDeleteForm(form.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined className="text-red-500" />}
                    className="flex items-center"
                  />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Groups View (Grid)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form.id}
              className=" flex flex-col justify-between border-2 border-gray-300 rounded-lg shadow-lg p-4 bg-white hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div>
                {/* Form Header */}
                <div className="flex flex-col items-center justify-center bg-theme text-white p-4 rounded-t-lg mb-4">
                  <h3 className="text-lg font-bold">Form ID: {form.id}</h3>
                  <h3 className="text-lg font-bold">{form.title}</h3>
                </div>

                {/* Form Description */}
                <p
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{
                    __html:
                      form.description?.length > 100
                        ? `${form.description.substring(0, 100)}...`
                        : form.description,
                  }}
                />
              </div>
              {/* Action Buttons */}
              <div className="flex justify-between">
                <Button
                  icon={<EyeOutlined className="text-theme" />}
                  onClick={() => onSelectForm(form.id)}
                  className="flex items-center"
                />
                <Button
                  icon={<DockerOutlined className="text-theme" />}
                  className="flex items-center"
                  onClick={() =>
                    router.push(`/formbuilder/form-responses/${form.id}`)
                  }
                />
                <Popconfirm
                  title="Are you sure you want to delete this form?"
                  onConfirm={() => handleDeleteForm(form.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    danger
                    icon={<DeleteOutlined className="text-red-500" />}
                    className="flex items-center"
                  />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drawer for Form Elements */}
      <Drawer
        title={`Form ${selectedFormId} Elements`}
        placement="right"
        onClose={() => onSelectForm(null)}
        open={drawerVisible}
        width={`60vw`}
      >
        <div className="mt-4 flex justify-end">
          <Button
            className="mavebutton"
            onClick={() => {
              router.push(`/formbuilder/edit-form?id=${selectedFormId}`);
              onSelectForm(null);
            }}
          >
            Edit Form
          </Button>
        </div>
        {selectedFormId && (
          <MaveFormElements
            formId={selectedFormId}
            setDrawerVisible={setDrawerVisible}
          />
        )}
      </Drawer>
    </div>
  );
};

export default MaveFormsList;
