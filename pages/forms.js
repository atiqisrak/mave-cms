import React, { useEffect, useState } from "react";
import FormBuilder from "../components/FormBuilder";
import {
  ClockCircleFilled,
  CloseCircleFilled,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Button, Form } from "antd";
import FormComponent from "../components/FormComponent";
import instance from "../axios";
import Loader from "../components/Loader";

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
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          <div
            className="TopbarContainer"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
            <h1 style={{ paddingBottom: "2em" }}>These are Forms</h1>

            <div
              className="buttonHolder"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
              }}
            >
              {isCreateFormVisible ? (
                <Button
                  danger
                  style={{
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    paddingBottom: "1.8em",
                  }}
                  icon={<CloseCircleFilled />}
                  onClick={toggleCreateForm}
                >
                  Cancel
                </Button>
              ) : (
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "var(--themes)",
                    borderColor: "var(--themes)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    paddingBottom: "1.8em",
                  }}
                  icon={<PlusCircleOutlined />}
                  onClick={toggleCreateForm}
                >
                  Add New Form
                </Button>
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
            }}
          >
            {forms?.map((formData) => (
              <>
                {/* {console.log("your log output", formData)} */}
                <FormComponent key={formData.id} formData={formData} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
