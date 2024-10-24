// components/slider/SliderForm.jsx

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, Tabs, Space, message, Modal } from "antd";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";
import RichTextEditor from "../RichTextEditor";
import instance from "../../axios";
import Image from "next/image";

const { Option } = Select;
const { TabPane } = Tabs;

const SliderForm = ({
  form,
  type,
  setType,
  selectedMedia,
  setSelectedMedia,
  selectedCards,
  setSelectedCards,
  editingItemId,
  fetchSliders,
  onCancelEdit,
  isFormVisible,
  setIsFormVisible,
}) => {
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [cards, setCards] = useState([]);

  // Define selectionMode as a constant
  const selectionMode = "multiple";

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await instance.get("/cards");
        if (response.data) {
          setCards(response.data);
        }
      } catch (error) {
        message.error("Failed to fetch cards.");
      }
    };
    fetchCards();
  }, []);

  // Ensure that when the form is closed, the media modal is also closed
  useEffect(() => {
    if (!isFormVisible) {
      setIsMediaModalVisible(false);
    }
  }, [isFormVisible]);

  // Prepopulate form fields and selections when editing
  useEffect(() => {
    if (editingItemId) {
      const populateForm = async () => {
        try {
          const response = await instance.get(`/sliders/${editingItemId}`);
          const slider = response.data;
          if (slider) {
            form.setFieldsValue({
              title_en: slider.title_en,
              title_bn: slider.title_bn,
              description_en: slider.description_en,
              description_bn: slider.description_bn,
              type: slider.type,
            });
            setSelectedMedia(slider.medias || []);
            setSelectedCards(slider.card_ids || []);
            setType(slider.type);
          }
        } catch (error) {
          message.error("Failed to fetch slider details.");
        }
      };
      populateForm();
    } else {
      // Reset form when creating a new slider
      form.resetFields();
      setSelectedMedia([]);
      setSelectedCards([]);
      setType("image");
    }
  }, [editingItemId, form, setType]);

  const handleTypeChange = (value) => {
    setType(value);
    form.setFieldsValue({ type: value });

    if (value === "image") {
      setSelectedCards([]);
    } else if (value === "card") {
      setSelectedMedia([]);
    }
  };

  const handleSubmit = async (values) => {
    const payload = {
      title_en: values.title_en,
      title_bn: values.title_bn,
      description_en: values.description_en,
      description_bn: values.description_bn,
      type: values.type,
    };

    if (values.type === "image") {
      payload.media_ids = selectedMedia.map((media) => media.id);
      // Ensure card_ids are cleared
      payload.card_ids = [];
    } else if (values.type === "card") {
      payload.card_ids = selectedCards;
      // Ensure media_ids are cleared
      payload.media_ids = [];
    }

    try {
      if (editingItemId) {
        const response = await instance.put(
          `/sliders/${editingItemId}`,
          payload
        );
        if (response.status === 200) {
          message.success("Slider updated successfully.");
          fetchSliders();
          onCancelEdit();
          setIsFormVisible(false);
        }
      } else {
        const response = await instance.post("/sliders", payload);
        if (response.status === 201) {
          message.success("Slider created successfully.");
          fetchSliders();
          form.resetFields();
          setSelectedMedia([]);
          setSelectedCards([]);
          setType("image");
          setIsFormVisible(false);
        }
      }
    } catch (error) {
      message.error("Failed to submit slider.");
    }
  };

  // Placeholder images
  const imagePlaceholder = "/images/Image_Placeholder.png";
  const cardPlaceholder = "/images/Card_Placeholder.png";

  return (
    <Modal
      title={editingItemId ? "Edit Slider" : "Add Slider"}
      open={isFormVisible}
      onCancel={onCancelEdit}
      footer={null}
      width={800}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ type: "image" }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        {/* Title in English */}
        <Form.Item
          label="Title English"
          name="title_en"
          rules={[
            { required: true, message: "Please enter the title in English." },
          ]}
        >
          <Input placeholder="Enter title in English" />
        </Form.Item>

        {/* Title in Bangla */}
        <Form.Item
          label="Title Bangla"
          name="title_bn"
          rules={[
            { required: true, message: "Please enter the title in Bangla." },
          ]}
        >
          <Input placeholder="Enter title in Bangla" />
        </Form.Item>

        {/* Description in English */}
        <Form.Item
          label="Description English"
          name="description_en"
          rules={[
            {
              required: true,
              message: "Please enter the description in English.",
            },
          ]}
        >
          <RichTextEditor editMode={true} />
        </Form.Item>

        {/* Description in Bangla */}
        <Form.Item
          label="Description Bangla"
          name="description_bn"
          rules={[
            {
              required: true,
              message: "Please enter the description in Bangla.",
            },
          ]}
        >
          <RichTextEditor editMode={true} />
        </Form.Item>

        {/* Slider Type */}
        <Form.Item
          label="Slider Type"
          name="type"
          rules={[
            { required: true, message: "Please select the slider type." },
          ]}
        >
          <Tabs
            activeKey={type}
            onChange={handleTypeChange}
            centered
            type="card"
          >
            <TabPane tab="Image" key="image" />
            <TabPane tab="Card" key="card" />
          </Tabs>
        </Form.Item>

        {/* Media Selection for Image Sliders */}
        {type === "image" ? (
          <Form.Item label="Media">
            <Button
              icon={<UploadOutlined />}
              onClick={() => setIsMediaModalVisible(true)}
              className="mavebutton"
            >
              Select Media
            </Button>
            {selectedMedia.length > 0 ? (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {selectedMedia.map((media) => (
                  <div key={media?.id} className="relative">
                    <Image
                      src={
                        media?.file_path
                          ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`
                          : imagePlaceholder
                      }
                      alt={media?.file_name || "Image Unavailable"}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                      fallback={imagePlaceholder}
                    />
                    <Button
                      type="text"
                      icon={<CloseCircleOutlined className="text-red-500" />}
                      onClick={() =>
                        setSelectedMedia(
                          selectedMedia.filter((m) => m.id !== media.id)
                        )
                      }
                      className="absolute top-0 right-0"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-4 text-gray-500">No media selected.</div>
            )}
          </Form.Item>
        ) : (
          /* Card Selection for Card Sliders */
          <Form.Item label="Select Cards">
            <Select
              mode="multiple"
              placeholder="Select cards"
              value={selectedCards}
              onChange={setSelectedCards}
              className="w-full"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {cards.length > 0 ? (
                cards.map((card) => (
                  <Option key={card.id} value={card.id}>
                    {card.title_en || "Title Unavailable"}
                  </Option>
                ))
              ) : (
                <Option disabled>No cards available</Option>
              )}
            </Select>
            {selectedCards.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {selectedCards.map((cardId) => {
                  const card = cards.find((c) => c.id === cardId);
                  return (
                    <div key={cardId} className="relative">
                      <Image
                        src={
                          card?.media_files?.file_path
                            ? `${process.env.NEXT_PUBLIC_MEDIA_URL}/${card.media_files.file_path}`
                            : cardPlaceholder
                        }
                        alt={card?.title_en || "Card Unavailable"}
                        width={100}
                        height={100}
                        className="rounded-md object-cover"
                        fallback={cardPlaceholder}
                      />
                      <Button
                        type="text"
                        icon={<CloseCircleOutlined className="text-red-500" />}
                        onClick={() =>
                          setSelectedCards(
                            selectedCards.filter((id) => id !== cardId)
                          )
                        }
                        className="absolute top-0 right-0"
                      />
                      <div className="mt-1 text-center text-sm">
                        {card?.title_en || "Title Unavailable"}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Form.Item>
        )}

        {/* Form Actions */}
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" className="bg-blue-500">
              {editingItemId ? "Update Slider" : "Create Slider"}
            </Button>
            {editingItemId && (
              <Button onClick={onCancelEdit} danger>
                Cancel
              </Button>
            )}
          </Space>
        </Form.Item>

        {/* Media Selection Modal */}
        <MediaSelectionModal
          isVisible={isMediaModalVisible}
          onClose={() => setIsMediaModalVisible(false)}
          onSelectMedia={(media) => {
            // Replace the entire selectedMedia array when selection is updated
            if (selectionMode === "single") {
              setSelectedMedia([media]);
            } else {
              setSelectedMedia(media); // 'media' is an array of selected media objects
            }
          }}
          selectionMode={selectionMode}
          initialSelectedMedia={selectedMedia}
        />
      </Form>
    </Modal>
  );
};

export default SliderForm;
