import React, { useEffect, useState } from "react";
import FormBuilder from "../components/FormBuilder";
import {
  ClockCircleFilled,
  CloseCircleFilled,
  CopyOutlined,
  HomeFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Button, Form, message } from "antd";
import FormComponent from "../components/FormComponent";
import instance from "../axios";
import Loader from "../components/Loader";
import router from "next/router";

function Forms() {
  const [isCreateFormVisible, setIsCreateFormVisible] = useState(false);

  const toggleCreateForm = () => {
    setIsCreateFormVisible(!isCreateFormVisible);
  };

  // Fetch Forms
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchForms = async () => {
    try {
      setLoading(true);
      const response = await instance("/forms");
      if (response.data) {
        setForms(response.data);
        // console.log("Forms: ", response.data);
        // console.log("Forms fetched successfully");
        setLoading(false);
      } else {
        console.error("Error fetching forms:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  useEffect(() => {
    fetchForms();
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <div className="mavecontainer">
        <div
          className="TopbarContainer"
          style={{
            display: "grid",
            gridTemplateColumns: "3fr 1fr",
            alignItems: "center",
          }}
        >
          <Breadcrumb
            style={{
              fontSize: "1.2em",
              marginBottom: "1em",
            }}
            items={[
              {
                href: "/",
                title: <HomeFilled />,
              },
              {
                title: "Components",
              },
              {
                title: "Forms",
                menu: {
                  items: [
                    {
                      title: "Gallery",
                      onClick: () => router.push("/gallery"),
                    },
                    {
                      title: "Menus Items",
                      onClick: () => router.push("/menuitems"),
                    },
                    {
                      title: "Menus",
                      onClick: () => router.push("/menus"),
                    },
                    {
                      title: "Navbars",
                      onClick: () => router.push("/navbars"),
                    },
                    {
                      title: "Sliders",
                      onClick: () => router.push("/sliders"),
                    },
                    {
                      title: "Cards",
                      onClick: () => router.push("/cards"),
                    },
                    {
                      title: "Forms",
                      onClick: () => router.push("/forms"),
                    },
                    {
                      title: "Footers",
                      onClick: () => router.push("/footer"),
                    },
                  ],
                },
              },
            ]}
          />
          <div
            className="buttonHolder"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1em",
              marginBottom: "2em",
            }}
          >
            {isCreateFormVisible ? (
              <Button
                danger
                style={{
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  // paddingBottom: "1.8em",
                }}
                icon={<CloseCircleFilled />}
                onClick={toggleCreateForm}
              >
                Cancel
              </Button>
            ) : (
              <>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "var(--themes)",
                    borderColor: "var(--themes)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    // paddingBottom: "1.8em",
                  }}
                  icon={<PlusCircleOutlined />}
                  onClick={toggleCreateForm}
                >
                  Add New Form
                </Button>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "var(--theme)",
                    borderColor: "var(--theme)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                  }}
                  icon={<CopyOutlined />}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_API_BASE_URL}/forms`
                    );
                    message.success("API Endpoint Copied");
                  }}
                >
                  Copy API Endpoint
                </Button>
              </>
            )}
          </div>
        </div>
        {isCreateFormVisible ? <FormBuilder /> : null}

        <div
          className="formShowcase"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "1em",
            border: "1px solid black",
          }}
        >
          {forms?.map((formData) => (
            <>
              <FormComponent key={formData.id} formData={formData} />
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Forms;
