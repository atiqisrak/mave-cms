import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Carousel,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Tabs,
  Typography,
} from "antd";
import Image from "next/image";
import RichTextEditor from "./RichTextEditor";
import MediaSelectionModal from "./MediaSelectionModal";
import { useEffect, useState } from "react";
import instance from "../axios";

export default function ImageSliders({
  sliders,
  CustomNextArrow,
  CustomPrevArrow,
  MEDIA_URL,
  handleEditClick,
  handleCancelEdit,
  handDeleteSlider,
  editingItemId,
  form,
  cards,
  showModal,
  isModalVisible,
  setIsModalVisible,
  handleOk,
  handleCancel,
  selectedMedia,
  setSelectedMedia,
  setType,
  type,
  fetchSliders,
}) {
  const { Title } = Typography;
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();
  const [editMode, setEditMode] = useState(false);

  const handleTypeChange = (value) => {
    setType(value);
    form.setFieldsValue({ type: value });
    value === "card" && form.setFieldsValue({ media_ids: [], medias: [] });
  };

  useEffect(() => {
    setType("image");
  }, []);

  const handleSubmit = async ({ slider, values }) => {
    setLoading(true);

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
        setEditMode(false);
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

  if (loading) {
    return <Spin />;
  }

  return (
    <div>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))",
          gap: "1rem",
        }}
      >
        {sliders &&
          sliders.map((slider, index) => (
            <div>
              {editMode && editingItemId === slider.id ? (
                <Form
                  form={form}
                  name="edit_slider"
                  onFinish={
                    handleSubmit
                      ? (values) => handleSubmit({ slider, values })
                      : null
                  }
                  style={{
                    marginTop: "10em",
                    maxWidth: 600,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2rem",
                  }}
                  layout="vertical"
                  autoComplete="off"
                >
                  <Form.Item hasFeedback label="Title English" name="title_en">
                    <Input
                      placeholder="Enter title in English"
                      defaultValue={slider.title_en}
                    />
                  </Form.Item>
                  <Form.Item hasFeedback label="Title Bangla" name="title_bn">
                    <Input
                      placeholder="Enter title in Bangla"
                      defaultValue={slider.title_bn}
                    />
                  </Form.Item>
                  <Form.Item
                    hasFeedback
                    label="Description English"
                    name="description_en"
                  >
                    <RichTextEditor
                      value={slider.description_en}
                      defaultValue={slider.description_en}
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
                      value={slider.description_bn}
                      defaultValue={slider.description_bn}
                      editMode={true}
                      onChange={(value) =>
                        form.setFieldsValue({ description_bn: value })
                      }
                    />
                  </Form.Item>
                  <Form.Item hasFeedback label="Slider type" name="type">
                    <Tabs
                      defaultActiveKey="image"
                      onChange={(value) => handleTypeChange(value)}
                      hasFeedback
                      label="Slider Type"
                      name="type"
                      animated
                      centered
                    >
                      <Tabs.TabPane
                        tab="Image"
                        key="image"
                        value="image"
                      ></Tabs.TabPane>
                      <Tabs.TabPane
                        tab="Card"
                        key="card"
                        value="card"
                      ></Tabs.TabPane>
                    </Tabs>
                  </Form.Item>
                  {type === "card" ? (
                    <Form.Item hasFeedback label="Select Card" name="card_ids">
                      <Select
                        mode="multiple"
                        placeholder="Select a card"
                        style={{ width: "100%" }}
                      >
                        {cards?.map((card) => (
                          <Select.Option value={card.id} key={card.id}>
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
                        currentMedia={slider?.medias}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                        // isModalVisible={isModalVisible}
                        // setIsModalVisible={setIsModalVisible}
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
                    {slider?.medias?.map((img, index) => (
                      <div key={index}>
                        <Image
                          src={`${MEDIA_URL}/${img?.file_path}`}
                          alt={slider.file_name}
                          width={400}
                          height={400}
                          objectFit="contain"
                          style={{
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
                    <Title level={4}>Title: {slider?.title_en}</Title>
                    <Title level={5}>শিরোনাম: {slider?.title_bn}</Title>
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
                      onClick={() => {
                        setEditMode(true);
                        handleEditClick(slider.id);
                      }}
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
                      onConfirm={(e) => handDeleteSlider(e, slider?.id)}
                    >
                      <Button danger>
                        <DeleteOutlined /> Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                </div>
              )}
            </div>
          ))}
      </Row>
    </div>
  );
}
