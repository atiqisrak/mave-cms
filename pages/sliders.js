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
  Segmented,
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
import ImageSliders from "../components/ImageSliders";
import CardSliders from "../components/CardSliders";

const Sliders = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sliders, setSliders] = useState([]);
  const [imageSliders, setImageSliders] = useState([]);
  const [cardSliders, setCardSliders] = useState([]);
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
  const [type, setType] = useState("image");

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

  const fetchSliders = async () => {
    try {
      setLoading(true);
      const response = await instance("/sliders");
      if (response.data) {
        setSliders(response.data?.sort((a, b) => b.id - a.id));

        response.data?.map((slider) => {
          if (slider.type === "card") {
            setCardSliders((prev) => [...prev, slider]);
          } else {
            setImageSliders((prev) => [...prev, slider]);
          }
        });
        setLoading(false);
      } else {
        message.error("Sliders couldn't be fetched");
      }
    } catch (error) {
      message.error("Sliders couldn't be fetched");
    }
  };

  const fetchCards = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/cards");
      if (response.data) {
        setCards(response.data);
        console.log("Cards fetched successfully");
        setLoading(false);
      } else {
        message.error("Cards couldn't be fetched");
      }
    } catch (error) {
      message.error("Cards couldn't be fetched");
    }
  };

  useEffect(() => {
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
    try {
      setLoading(true);
      const response = await instance.delete(`/sliders/${id}`);

      if (response?.data) {
        setResponseData(response?.data);
        console.log("Slider deleted successfully");
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

    const slider = sliders.find((slider) => slider.id === editingItemId);
    const updatedSlider = {
      title_en: values.title_en ? values.title_en : slider?.title_en,
      title_bn: values.title_bn ? values.title_bn : slider?.title_bn,
      description_en: values.description_en
        ? values.description_en
        : slider?.description_en,
      description_bn: values.description_bn
        ? values.description_bn
        : slider?.description_bn,
      type: values.type ? values.type : slider?.type,
      media_ids: selectedMedia.length ? selectedMedia : slider?.media_ids,
      card_ids: values.card_ids ? values.card_ids : slider?.card_ids,
    };

    try {
      const response = await instance.put(
        `/sliders/${editingItemId}`,
        updatedSlider
      );
      if (response.status === 200) {
        setResponse(response);
        setEditingItemId(null);
        setSelectedMedia([]);
        setLoading(false);
        window.location.reload();
      } else {
        console.error("Error updating slider:", response.data);
      }
    } catch (error) {
      console.error("Error updating slider:", error);
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
                  // paddingBottom: "1.8em",
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
                <>
                  <Tabs
                    defaultActiveKey="1"
                    type="card"
                    animated
                    centered
                    onChange={(key) => {
                      console.log(key);
                    }}
                    style={{
                      marginTop: "2rem",
                    }}
                  >
                    <Tabs.TabPane tab="Image Sliders" key="1">
                      <ImageSliders
                        sliders={imageSliders}
                        CustomNextArrow={CustomNextArrow}
                        CustomPrevArrow={CustomPrevArrow}
                        MEDIA_URL={MEDIA_URL}
                        handleEditClick={handleEditClick}
                        handleCancelEdit={handleCancelEdit}
                        handDeleteSlider={handDeleteSlider}
                        editingItemId={editingItemId}
                        handleSubmit={handleSubmit}
                        form={form}
                        cards={cards}
                        showModal={showModal}
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                        setType={setType}
                        type={type}
                        fetchSliders={fetchSliders}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Card Sliders" key="2">
                      <CardSliders
                        sliders={cardSliders}
                        CustomNextArrow={CustomNextArrow}
                        CustomPrevArrow={CustomPrevArrow}
                        MEDIA_URL={MEDIA_URL}
                        handleEditClick={handleEditClick}
                        handleCancelEdit={handleCancelEdit}
                        handDeleteSlider={handDeleteSlider}
                        editingItemId={editingItemId}
                        handleSubmit={handleSubmit}
                        form={form}
                        cards={cards}
                        showModal={showModal}
                        isModalVisible={isModalVisible}
                        setIsModalVisible={setIsModalVisible}
                        handleOk={handleOk}
                        handleCancel={handleCancel}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                        setType={setType}
                        type={type}
                        fetchSliders={fetchSliders}
                      />
                    </Tabs.TabPane>
                  </Tabs>
                  {/* </Segmented> */}
                </>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sliders;
