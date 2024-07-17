import React, { useEffect, useState } from "react";
import instance from "../../axios";
import { Breadcrumb, Tabs } from "antd";
import {
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

      <h2>Welcome to Mave Form Builder</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "4fr 1fr",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        {/* Navigation bar holding search and view toggle */}
        <Search
          placeholder="Search for forms"
          onSearch={(value) => console.log(value)}
          style={{ width: 200 }}
        />
        <Tabs
          animated
          type="card"
          defaultActiveKey="2"
          centered
          items={[
            {
              title: "List",
              icon: <UnorderedListOutlined />,
              key: "1",
            },
            {
              title: "Groups",
              icon: <GroupOutlined />,
              key: "2",
            },
          ]}
          onChange={() => {
            setChangeFormsView(!changeFormsView);
          }}
        />
      </div>
      <div>
        {/* Cards holding forms */}

        {changeFormsView ? (
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
                <h3>{form.mave_title}</h3>
                <p>{form.mave_description}</p>
                <button onClick={() => onSelectForm(form.id)}>View</button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {forms.map((form) => (
              <div
                key={form.id}
                style={{
                  padding: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                }}
              >
                <h3>{form.mave_title}</h3>
                <p>{form.mave_description}</p>
                <button onClick={() => onSelectForm(form.id)}>View</button>
              </div>
            ))}
          </div>
        )}
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

      <div>
        {selectedFormId ? (
          <MaveFormElements formId={selectedFormId} />
        ) : (
          <p>Please select a form to view its elements.</p>
        )}
      </div>
    </div>
  );
};

export default MaveFormsList;
