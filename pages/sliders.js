import {
  Button,
  Carousel,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Row,
  Space,
  Typography,
  message,
  notification,
} from "antd";
import React, { useEffect, useState } from "react";
import instance from "../axios";
import Loader from "../components/Loader";
import {
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  LeftOutlined,
  PlusCircleOutlined,
  RightOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import MediaSelectionModal from "../components/MediaSelectionModal";
import CreateSliderComponent from "../components/CreateSliderComponent";

const Sliders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { Title } = Typography;
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [form] = Form.useForm();
  const [response, setResponse] = useState();
  const [editingItemId, setEditingItemId] = useState(null);
  const [responseData, setResponseData] = useState();
  const [showCreateSliderForm, setShowCreateSliderForm] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  const CustomPrevArrow = ({ onClick }) => (
    <Button
      icon={<LeftOutlined />}
      onClick={onClick}
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        left: 0,
        zIndex: "1",
        backgroundColor: "transparent",
        border: "none",
      }}
    ></Button>
  );

  const CustomNextArrow = ({ onClick }) => (
    <Button
      icon={<RightOutlined />}
      onClick={onClick}
      size="large"
      style={{
        position: "absolute",
        top: "50%",
        right: 0,
        zIndex: "1",
        backgroundColor: "transparent",
        border: "none",
      }}
    ></Button>
  );

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`${API_BASE_URL}/media`);
        const response = await instance("/sliders");
        if (response.data) {
          setSliders(response.data);
          // console.log("Media Assets: ", response.data);
          message.success("Sliders fetched successfully");
          setLoading(false);
        } else {
          // console.error("Error fetching media assets:", response.data.message);
          message.error("Sliders couldn't be fetched");
        }
      } catch (error) {
        // console.error("Error fetching media assets:", error);
        message.error("Sliders couldn't be fetched");
      }
    };

    fetchSliders();
  }, [responseData, response]);
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
  const handleShowCreateSliderForm = () => {
    setShowCreateSliderForm((prev) => !prev);
  };

  const handDeleteSlider = async (e, id) => {
    // console.log("your log output", id);
    try {
      setLoading(true);
      const response = await instance.delete(`/sliders/${id}`);

      if (response?.data) {
        api.info({
          message: `${response?.data?.message}`,
          top,
        });
        setResponseData(response?.data);
        message.success("Slider deleted successfully");
        setLoading(false);
      } else {
        // console.error("Error deleting slider:", response.data);
        message.error("Error deleting slider");
        setLoading(false);
      }
    } catch (e) {
      // console.error("Error deleting slider:", e);
      message.error("Error deleting slider");
      setLoading(false);
    }
  };
  const handleEditClick = (itemId) => {
    setEditingItemId(itemId);
  };
  const handleCancelEdit = () => {
    setEditingItemId(null);
  };
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const postData = {
        title_en: values.title_e,
        title_bn: values.title_b,
        media_ids: selectedMedia,
      };
      const response = await instance.put(
        `/sliders/${editingItemId}`,
        postData
      );
      if (response.status === 200) {
        if (response?.data) {
          api.info({
            message: `${response?.data?.message}`,
            top,
          });
          setResponseData(response);
        }
        setEditingItemId(null);
        setLoading(false);
      } else {
        console.error("Error creating slider:", response.data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error creating slider:", error);
      setLoading(false);
    }
  };

  return (
    <div className="ViewContainer ViewContentContainer">
      <div className="login-page">
        {contextHolder}
        <div className="ViewContiner  ViewContentContainer media-area login-page-section">
          <div className="ViewContentContiner" style={{ marginBottom: "5rem" }}>
            <Space
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h1>Sliders</h1>
              <Button
                type="primary"
                onClick={() => handleShowCreateSliderForm()}
                icon={<PlusCircleOutlined />}
                style={{
                  backgroundColor: "var(--themes)",
                  borderColor: "var(--themes)",
                  color: "white",
                  borderRadius: "10px",
                  fontSize: "1.2em",
                  paddingBottom: "1.8em",
                  width: "15em",
                }}
              >
                Add New Slider
              </Button>
            </Space>

            {showCreateSliderForm && (
              <CreateSliderComponent
                loading={loading}
                setLoading={setLoading}
                response={response}
                setResponse={setResponse}
                setShowCreateSliderForm={setShowCreateSliderForm}
              ></CreateSliderComponent>
            )}

            {
              loading ? (
                <Loader />
              ) : (
                <>
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    {sliders?.map((asset) => (
                      <Col span={12} style={{ marginTop: "1rem" }} key={asset.id}>
                        {editingItemId === asset.id ? (
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
                            <Form.Item hasFeedback label="Select Media" name="title_m">
                              {/* <Collapse accordion ghost items={items}></Collapse> */}
                              <Button icon={<UploadOutlined />} onClick={showModal}>
                                Click to Select
                              </Button>
                            </Form.Item>
                            <Form.Item>
                              <Space>
                                <Button type="primary" htmlType="submit">
                                  Submit
                                </Button>
                                <Button
                                  onClick={() => handleCancelEdit()}
                                  type="primary"
                                  danger
                                >
                                  Cancel
                                </Button>
                              </Space>
                              <Modal
                                width={"40%"}
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
                        ) : (
                          <div style={{
                            marginBottom: "5rem",
                            border: "1px solid #f0f0f0",
                            borderRadius: "10px",
                            padding: "2.4rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                          }}>
                            <Carousel
                              style={{ position: "relative" }}
                              autoplay
                              arrows={true}
                              prevArrow={<CustomPrevArrow />}
                              nextArrow={<CustomNextArrow />}
                            >
                              {asset?.medias?.map((img, index) => (
                                <div key={index}>
                                  <Image
                                    src={`${MEDIA_URL}/${img?.file_path}`}
                                    alt={asset.file_name}
                                    width={"100%"}
                                    height={400}
                                    style={{ objectFit: "cover", borderRadius: 10 }}
                                  />
                                </div>
                              ))}
                            </Carousel>

                            <Space
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
                            >
                              <Title level={4}>Title: {asset.title_en}</Title>
                              <Title level={5}>শিরোনাম: {asset.title_bn}</Title>
                            </Space>
                            <Space
                              style={{
                                marginTop: "1em",
                                display: "flex",
                                justifyContent: "center",
                                width: "100%",
                              }}
                            >
                              <Button onClick={() => handleEditClick(asset.id)} style={{
                                backgroundColor: "var(--theme)",
                                borderColor: "var(--theme)",
                                color: "white",
                              }}>
                                <EditOutlined /> Edit
                              </Button>
                              <Popconfirm
                                title="Are you sure delete this slider?"
                                okText="Yes"
                                cancelText="No"
                                onConfirm={(e) => handDeleteSlider(e, asset?.id)}
                              >
                                <Button danger
                                ><DeleteOutlined /> Delete</Button>
                              </Popconfirm>
                            </Space>
                          </div>
                        )}
                      </Col>
                    ))}
                  </Row>
                </>
              )
            }

          </div>
        </div>
      </div>
    </div>

  );
};

export default Sliders;