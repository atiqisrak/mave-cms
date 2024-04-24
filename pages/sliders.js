import {
  Button,
  Carousel,
  Col,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Tabs,
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
import RichTextEditor from "../components/RichTextEditor";

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
  const [cards, setCards] = useState([]);
  const [sliderType, setSliderType] = useState("image");

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
          setSliders(response.data?.sort((a, b) => b.id - a.id));
          // console.log("Media Assets: ", response.data);
          // message.success("Sliders fetched successfully");
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

    const fetchCards = async () => {
      try {
        setLoading(true);
        const response = await instance.get("/cards");
        if (response.data) {
          setCards(response.data);
          // console.log("Cards: ", response.data);
          message.success("Cards fetched successfully");
          setLoading(false);
        } else {
          // console.error("Error fetching cards:", response.data.message);
          message.error("Cards couldn't be fetched");
        }
      } catch (error) {
        // console.error("Error fetching cards:", error);
        message.error("Cards couldn't be fetched");
      }
    };
    fetchCards();
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
    const previousTitleEn = sliders.find(
      (slider) => slider.id === editingItemId
    ).title_en;
    const previousTitleBn = sliders.find(
      (slider) => slider.id === editingItemId
    ).title_bn;
    const previousDescriptionEn = sliders.find(
      (slider) => slider.id === editingItemId
    ).description_en;
    const previousDescriptionBn = sliders.find(
      (slider) => slider.id === editingItemId
    ).description_bn;
    const previousSliderType = sliders.find(
      (slider) => slider.id === editingItemId
    ).slider_type;
    const previousCardsIds = sliders.find(
      (slider) => slider.id === editingItemId
    ).card_ids;
    const previousMediaIds = sliders.find(
      (slider) => slider.id === editingItemId
    ).media_ids;

    try {
      const postData = {
        title_en: values.title_e ? values.title_e : previousTitleEn,
        title_bn: values.title_b ? values.title_b : previousTitleBn,
        description_en: values.description_en
          ? values.description_en
          : previousDescriptionEn,
        description_bn: values.description_bn
          ? values.description_bn
          : previousDescriptionBn,
        slider_type: values.slider_type
          ? values.slider_type
          : previousSliderType,
        card_ids: values.card_ids ? values.card_ids : previousCardsIds,
        media_ids: selectedMedia?.length > 0 ? selectedMedia : previousMediaIds,
      };
      console.log("Sending data: ", postData);
      const response = await instance.put(
        `/sliders/${editingItemId}`,
        postData
      );
      if (response.status === 200) {
        if (response?.data) {
          // api.info({
          //   message: `${response?.data?.message}`,
          //   top,
          // });
          message.success("Slider updated successfully");
          setResponseData(response);
        }
        setEditingItemId(null);
        setSelectedMedia([]);
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
                cards={cards}
              ></CreateSliderComponent>
            )}

            {loading ? (
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
                          <Form.Item
                            hasFeedback
                            label="Title English"
                            name="title_e"
                          >
                            <Input
                              placeholder="Enter title in English"
                              defaultValue={asset.title_en}
                            />
                          </Form.Item>
                          <Form.Item
                            hasFeedback
                            label="Title Bangla"
                            name="title_b"
                          >
                            <Input
                              placeholder="Enter title in Bangla"
                              defaultValue={asset.title_bn}
                            />
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
                          <Form.Item
                            hasFeedback
                            label="Slider type"
                            name="slider_type"
                          >
                            <Tabs
                              defaultActiveKey="image"
                              onChange={(key) => setSliderType(key)}
                            >
                              <Tabs.TabPane
                                tab="Image"
                                key="image"
                              ></Tabs.TabPane>
                              <Tabs.TabPane
                                tab="Card"
                                key="card"
                              ></Tabs.TabPane>
                            </Tabs>
                          </Form.Item>
                          {sliderType === "card" ? (
                            <Form.Item
                              hasFeedback
                              label="Select Card"
                              name="card_ids"
                            >
                              <Select
                                mode="multiple"
                                placeholder="Select a card"
                                style={{ width: "100%" }}
                              >
                                {cards.map((card) => (
                                  <Select.Option value={card.id} key={card.id}>
                                    {card.title_en}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                          ) : (
                            <Form.Item hasFeedback label="Media" name="title_m">
                              <Button
                                icon={<UploadOutlined />}
                                onClick={showModal}
                              >
                                Click to Select
                              </Button>
                            </Form.Item>
                          )}
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
                              width={"70%"}
                              title="Upload Media"
                              open={isModalVisible}
                              onOk={handleOk}
                              onCancel={handleCancel}
                              className="uploadMediaModal"
                            >
                              <MediaSelectionModal
                                currentMedia={asset?.medias}
                                selectedMedia={selectedMedia}
                                setSelectedMedia={setSelectedMedia}
                                isModalVisible={isModalVisible}
                                setIsModalVisible={setIsModalVisible}
                              />
                            </Modal>
                          </Form.Item>
                        </Form>
                      ) : (
                        <div
                          style={{
                            marginBottom: "5rem",
                            border: "1px solid #f0f0f0",
                            borderRadius: "10px",
                            padding: "2.4rem",
                            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                          }}
                        >
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
                                  style={{
                                    objectFit: "cover",
                                    borderRadius: 10,
                                  }}
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
                            <Button
                              onClick={() => handleEditClick(asset.id)}
                              style={{
                                backgroundColor: "var(--theme)",
                                borderColor: "var(--theme)",
                                color: "white",
                              }}
                            >
                              <EditOutlined /> Edit
                            </Button>
                            <Popconfirm
                              title="Are you sure delete this slider?"
                              okText="Yes"
                              cancelText="No"
                              onConfirm={(e) => handDeleteSlider(e, asset?.id)}
                            >
                              <Button danger>
                                <DeleteOutlined /> Delete
                              </Button>
                            </Popconfirm>
                          </Space>
                        </div>
                      )}
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sliders;
