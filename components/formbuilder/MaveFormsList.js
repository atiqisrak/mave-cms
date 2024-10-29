import React, { useEffect, useState } from "react";
import instance from "../../axios";
import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Popconfirm,
  Spin,
  Switch,
  Tooltip,
} from "antd";
import {
  CloudSyncOutlined,
  DeleteOutlined,
  DockerOutlined,
  EditOutlined,
  EyeOutlined,
  HomeOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MaveFormElements from "./MaveFormElements";
import router from "next/router";

const MaveFormsList = ({ onSelectForm, selectedFormId }) => {
  const [forms, setForms] = useState([]);
  const [changeFormsView, setChangeFormsView] = useState(false);

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

  const handleDeleteForm = async (formId) => {
    try {
      await instance.delete(`/form_builder/${formId}`);
      setForms(forms.filter((form) => form.id !== formId));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  // spinner
  if (!forms.length) {
    return (
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Spin indicator={<CloudSyncOutlined spin />} />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb
        style={{ margin: "16px 0" }}
        items={[
          { title: <HomeOutlined />, href: "/" },
          { title: "Form Builder", href: "/formbuilder" },
          { title: "Mave Forms" },
        ]}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Input
          placeholder="Search for forms"
          suffix={<SearchOutlined />}
          style={{ width: "100%", marginRight: "1rem" }}
        />
        <Switch
          style={{ justifySelf: "end" }}
          checkedChildren="List"
          unCheckedChildren="Groups"
          defaultChecked
          onChange={() => {
            setChangeFormsView(!changeFormsView);
          }}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {forms &&
          forms?.map((form) => (
            <div
              key={form.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                borderRadius: "10px",
                border: "2px solid var(--gray-dark)",
                padding: "1rem 1rem 2rem 1rem",
                gap: "2rem",
                boxShadow: "5px 10px 10px #00000020",
                cursor: "pointer",
                backgroundColor: "var(--white)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: "1rem",
                  height: "30vh",
                  backgroundColor: "var(--themes)",
                  borderRadius: "10px 10px 0 0",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "contain",
                  backgroundPosition: "center",
                }}
              >
                <h3
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    padding: "0 2rem",
                  }}
                >
                  Form ID: {form.id}
                </h3>
                <h3
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    padding: "0 2rem",
                  }}
                >
                  {form.title}
                </h3>
              </div>
              <p
                style={{
                  fontSize: "1.2em",
                  padding: "0 1em",
                }}
              >
                <Tooltip
                  placement="right"
                  overlayInnerStyle={{
                    backgroundColor: "var(--theme)",
                    width: "30vw",
                    padding: "1.8rem",
                    border: "2px solid var(--black)",
                    borderRadius: "20px",
                  }}
                  title={
                    <p
                      style={{
                        fontSize: "1.1rem",
                      }}
                      dangerouslySetInnerHTML={{
                        __html: form.description,
                      }}
                    />
                  }
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: form.description.substring(0, 120) + "...",
                    }}
                  />
                </Tooltip>
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1rem",
                }}
              >
                <Button
                  icon={
                    <EyeOutlined
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--theme)",
                      }}
                    />
                  }
                  onClick={() => {
                    console.log("Form ID:", form.id);
                    console.log("Form Title:", form.title);
                    onSelectForm
                      ? onSelectForm(form.id)
                      : console.log("No onSelectForm prop passed");
                  }}
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Preview
                </Button>
                <Button
                  icon={
                    <DockerOutlined
                      style={{
                        fontSize: "1.5rem",
                        color: "var(--theme)",
                      }}
                    />
                  }
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Responses
                </Button>
                <Popconfirm
                  title="Are you sure you want to delete this form?"
                  onConfirm={() => {
                    handleDeleteForm(form.id);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    danger
                    icon={
                      <DeleteOutlined
                        style={{
                          fontSize: "1.5rem",
                          color: "red",
                        }}
                      />
                    }
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      color: "var(--black)",
                    }}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ))}
      </div>

      <Modal
        title={`Form ${selectedFormId} Elements`}
        open={selectedFormId}
        onCancel={() => onSelectForm(null)}
        width={800}
        footer={[
          <Button
            key="edit"
            style={{
              backgroundColor: "var(--theme)",
              color: "white",
              border: "none",
            }}
            onClick={() => {
              router.push(`/formbuilder/edit-form?id=${selectedFormId}`);
            }}
          >
            Edit Form
          </Button>,
        ]}
      >
        <MaveFormElements formId={selectedFormId} />
      </Modal>
    </div>
  );
};

export default MaveFormsList;
