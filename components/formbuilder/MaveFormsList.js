import React, { useEffect, useState } from "react";
import instance from "../../axios";
import { Breadcrumb, Card, Modal, Switch, Tabs } from "antd";
import {
  CloudSyncOutlined,
  EditOutlined,
  GroupOutlined,
  HomeOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import MaveFormElements from "./MaveFormElements";
import Search from "antd/es/transfer/search";

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

      <h2>Welcome to Mave Form Showcase</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 3fr",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <Search
          placeholder="Search for forms"
          onSearch={(value) => console.log(value)}
          style={{ width: 100 }}
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
            key={form.id}
            style={{
              padding: "1rem",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          >
            <Card
              bordered={false}
              title={form.mave_title}
              hoverable
              onClick={() => onSelectForm(form.id)}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <EditOutlined key="edit" />,
                <CloudSyncOutlined key="sync" />,
              ]}
            >
              <Card.Meta
                description={form.mave_description}
                style={{ height: "100px" }}
              />
            </Card>
          </div>
        ))}
      </div>

      {/* <ul>
        {forms.map((form) => (
          <li key={form.id}>
            <button onClick={() => onSelectForm(form.id)}>
              {form.mave_title}
            </button>
          </li>
        ))}
      </ul> */}

      {/* <div>
        {selectedFormId ? (
          <MaveFormElements formId={selectedFormId} />
        ) : (
          <p>Please select a form to view its elements.</p>
        )}
      </div> */}

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
