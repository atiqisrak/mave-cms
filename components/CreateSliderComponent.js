import React, { useState } from "react";
import {
  Alert,
  Button,
  Col,
  Collapse,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Space,
} from "antd";
import instance from "../axios";
import { UploadOutlined } from "@ant-design/icons";
import MediaSelectionModal from "./MediaSelectionModal";
const CreateSliderComponent = ({
  loading,
  setLoading,
  response,
  setResponse,
  setShowCreateSliderForm,
}) => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
    // router.push("/create-slider");
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const postData = {
        title_en: values.title_e,
        title_bn: values.title_b,
        media_ids: selectedMedia,
      };
      const response = await instance.post("/sliders", postData);
      if (response.status === 201) {
        setResponse(response);
        setShowCreateSliderForm(false);
        setLoading(false);
      } else {
        // Handle error response
        console.error("Error creating slider:", response.data);
      }
    } catch (error) {
      console.error("Error creating slider:", error);
    }
  };
  return (
    <div className="login-page">
      <div className="ViewContiner  ViewContentContainer media-area login-page-section">
        <div className="ViewContentContiner">
          <h1 style={{ textAlign: "center" }}>Create Slider</h1>
          <hr style={{ marginBottom: "1rem", marginTop: ".5rem" }} />

          <Form
            form={form}
            name="createSlider"
            onFinish={handleSubmit}
            style={{
              marginTop: "10em",
              maxWidth: 600,
              margin: "0 auto",
            }}
            layout="vertical"
            autoComplete="off"
          >
            <Form.Item hasFeedback label="Title English" name="title_e">
              <Input placeholder="Enter title in English" />
            </Form.Item>
            <Form.Item hasFeedback label="Title Bangla" name="title_b">
              <Input placeholder="Enter title in Bangla" />
            </Form.Item>
            <Form.Item hasFeedback label="Media" name="title_m">
              {/* <Collapse accordion ghost items={items}></Collapse> */}
              <Button icon={<UploadOutlined />} onClick={showModal}>
                Click to Select
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Modal
                width="60vw"
                title="Upload Media"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                className="uploadMediaModal"
              >
                <MediaSelectionModal
                  selectedMedia={selectedMedia}
                  setSelectedMedia={setSelectedMedia}
                ></MediaSelectionModal>
              </Modal>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateSliderComponent;