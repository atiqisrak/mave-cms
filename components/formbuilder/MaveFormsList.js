import React, { useEffect, useState } from "react";
import instance from "../../axios";
import { Breadcrumb, Button, Card, Input, Modal, Switch, Tabs } from "antd";
import {
  CloudSyncOutlined,
  DeleteOutlined,
  EditOutlined,
  GroupOutlined,
  HomeOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MaveFormElements from "./MaveFormElements";

const MaveFormsList = ({ onSelectForm, selectedFormId }) => {
  const [forms, setForms] = useState([]);
  const [changeFormsView, setChangeFormsView] = useState(false);

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
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[
          {
            title: <HomeOutlined />,
            href: "/",
          },
          {
            title: "Form Builder",
            href: "/formbuilder",
          },
          {
            title: "Mave Forms",
          },
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
        {/* {Search && (
          <Search
            placeholder="Search for forms"
            onSearch={(value) => console.log(value)}
            style={{ width: 100 }}
          />
        )} */}
        <Input
          placeholder="Search for forms"
          suffix={<SearchOutlined />}
          style={{
            width: "100%",
            marginRight: "1rem",
          }}
        />
        <Switch
          style={{
            justifySelf: "end",
          }}
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
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        {forms.map((form) => (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              margin: "2rem 0 8rem 0",
              borderRadius: "10px",
              border: "1px solid var(--gray-dark)",
              padding: "1rem 1rem 2rem 1rem",
              gap: "2rem",
              boxShadow: "5px 10px 10px #00000020",
            }}
          >
            {/* Name, banner, description, edit and delete buttons */}

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "30vh",
                backgroundColor: "var(--themes)",
                borderRadius: "10px 10px 0 0",
                backgroundImage: `url(https://random.imagecdn.app/500/330)`,
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
                {form.mave_title}
              </h3>
            </div>
            <p
              style={{
                fontSize: "1.2em",
                padding: "0 1em",
              }}
            >
              {form.mave_description}
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Button onClick={() => onSelectForm(form.id)}>
                <EditOutlined />
              </Button>
              <Button danger>
                <DeleteOutlined />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal holding form elements */}
      <Modal
        title="Form Elements"
        open={selectedFormId ? true : false}
        onCancel={() => onSelectForm(null)}
        footer={null}
      >
        {selectedFormId ? (
          <MaveFormElements formId={selectedFormId} />
        ) : (
          <p>Please select a form to view its elements.</p>
        )}
      </Modal>
    </div>
  );
};

export default MaveFormsList;
