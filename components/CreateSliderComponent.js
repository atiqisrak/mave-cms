import React, { useEffect, useState } from "react";
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
  Select,
  Space,
  Tabs,
  Tooltip,
} from "antd";
import instance from "../axios";
import {
  CloseCircleOutlined,
  ExportOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import MediaSelectionModal from "./MediaSelectionModal";
import RichTextEditor from "./RichTextEditor";
const CreateSliderComponent = ({
  loading,
  setLoading,
  response,
  setResponse,
  setShowCreateSliderForm,
  cards,
}) => {
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [readyToSubmit, setReadyToSubmit] = useState(false);

  const [asset, setAsset] = useState({
    description_en: "",
    description_bn: "",
  });
  const [type, setType] = useState();

  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    type && setReadyToSubmit(true);
  }, [type]);

  const handleSubmit = async (values) => {
    setLoading(true);
    const maveMedia = values?.type === "image" ? selectedMedia : [];
    const maveCard = values?.type === "card" ? values?.card_ids : [];
    const maveSliderType = values?.type ? values?.type : "image";

    try {
      const postData = {
        title_en: values.title_e,
        title_bn: values.title_b,
        description_en: values.description_en,
        description_bn: values.description_bn,
        type: maveSliderType,
        media_ids: maveMedia,
        card_ids: maveCard,
      };
      const response = await instance.post("/sliders", postData);
      if (response.status === 201) {
        setResponse(response);
        setShowCreateSliderForm(false);
        setLoading(false);
      } else {
        console.error("Error creating slider:", response.data);
      }
      console.log("postData: ", postData);
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
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
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
            <Form.Item
              hasFeedback
              label="Description English"
              name="description_en"
            >
              <RichTextEditor
                value={asset.description_en}
                defaultValue={asset.description_en}
                editMode={true}
                onChange={(value) =>
                  form.setFieldsValue({ description_en: value })
                }
              />
            </Form.Item>
            <Form.Item
              hasFeedback
              label="Description Bangla"
              name="description_bn"
            >
              <RichTextEditor
                value={asset.description_bn}
                defaultValue={asset.description_bn}
                editMode={true}
                onChange={(value) =>
                  form.setFieldsValue({ description_bn: value })
                }
              />
            </Form.Item>
            <Form.Item hasFeedback label="Slider Type" name="type">
              <Tabs
                hasFeedback
                label="Slider Type"
                name="type"
                animated
                centered
                defaultActiveKey="empty"
                onChange={(key) => {
                  setType(key);
                  form.setFieldsValue({ type: key });
                }}
              >
                <Tabs.TabPane tab="Nothing" key="empty"></Tabs.TabPane>
                <Tabs.TabPane tab="Image" key="image"></Tabs.TabPane>
                <Tabs.TabPane tab="Card" key="card"></Tabs.TabPane>
              </Tabs>
            </Form.Item>

            {type ? (
              type === "card" ? (
                <Form.Item hasFeedback label="Card" name="card_ids">
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Please select"
                    defaultValue={[]}
                  >
                    {cards.map((card) => (
                      <Select.Option key={card.id} value={card.id}>
                        {card.title_en}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              ) : (
                type === "image" && (
                  <Form.Item hasFeedback label="Media" name="media_ids">
                    <Button icon={<UploadOutlined />} onClick={showModal}>
                      Click to Select
                    </Button>
                  </Form.Item>
                )
              )
            ) : null}
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Tooltip
                  title={
                    !readyToSubmit
                      ? "Please select a slider type to submit"
                      : "Ready to submit"
                  }
                >
                  <Button
                    icon={<ExportOutlined />}
                    type="primary"
                    htmlType="submit"
                    disabled={!readyToSubmit}
                    style={{
                      backgroundColor: readyToSubmit ? "var(--theme)" : "gray",
                      borderColor: readyToSubmit ? "var(--theme)" : "gray",
                      color: "var(--white)",
                      borderRadius: "5px",
                      fontSize: "1.2rem",
                      padding: "0.5rem 2rem",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Submit
                  </Button>
                </Tooltip>
                <Button
                  danger
                  icon={<CloseCircleOutlined />}
                  onClick={() => {
                    setShowCreateSliderForm(false);
                  }}
                >
                  Cancel
                </Button>
              </div>

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
                />
              </Modal>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateSliderComponent;
