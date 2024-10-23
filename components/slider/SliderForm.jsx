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
}) => {
  const [isModalVisible, setIsModalVisible] = useState(isFormVisible);
  const [cards, setCards] = useState([]);

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

  const handleTypeChange = (value) => {
    setType(value);
    form.setFieldsValue({ type: value });
    if (value === "image") {
      setSelectedCards([]);
    } else {
      setSelectedMedia([]);
    }
  };

  const handleSubmit = async (values) => {
    const updatedSlider = {
      title_en: values.title_en,
      title_bn: values.title_bn,
      description_en: values.description_en,
      description_bn: values.description_bn,
      type: values.type,
      media_ids: selectedMedia,
      card_ids: selectedCards,
    };

    try {
      if (editingItemId) {
        const response = await instance.put(
          `/sliders/${editingItemId}`,
          updatedSlider
        );
        if (response.status === 200) {
          message.success("Slider updated successfully.");
          fetchSliders();
          onCancelEdit();
        }
      } else {
        const response = await instance.post("/sliders", updatedSlider);
        if (response.status === 201) {
          message.success("Slider created successfully.");
          fetchSliders();
          form.resetFields();
          setSelectedMedia([]);
          setSelectedCards([]);
        }
      }
    } catch (error) {
      message.error("Failed to submit slider.");
    }
  };

  return (
    <Modal
      title={editingItemId ? "Edit Slider" : "Add Slider"}
      open={isFormVisible}
      onCancel={!isFormVisible}
      footer={null}
      width={800}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ type: "image" }}
        className="bg-white p-6 rounded-lg shadow-md mb-6"
      >
        <Form.Item
          label="Title English"
          name="title_en"
          rules={[
            { required: true, message: "Please enter the title in English." },
          ]}
        >
          <Input placeholder="Enter title in English" />
        </Form.Item>
        <Form.Item
          label="Title Bangla"
          name="title_bn"
          rules={[
            { required: true, message: "Please enter the title in Bangla." },
          ]}
        >
          <Input placeholder="Enter title in Bangla" />
        </Form.Item>
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
        <Form.Item
          label="Slider Type"
          name="type"
          rules={[
            { required: true, message: "Please select the slider type." },
          ]}
        >
          <Tabs defaultActiveKey="image" onChange={handleTypeChange} centered>
            <TabPane tab="Image" key="image" />
            <TabPane tab="Card" key="card" />
          </Tabs>
        </Form.Item>
        {type === "image" ? (
          <Form.Item label="Media">
            <Button
              icon={<UploadOutlined />}
              onClick={() => setIsModalVisible(true)}
              className="mavebutton"
            >
              Select Media
            </Button>
            {selectedMedia.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-4">
                {selectedMedia.map((media) => (
                  <div key={media.id} className="relative">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${media.file_path}`}
                      alt={media.file_name}
                      width={100}
                      height={100}
                      className="rounded-md"
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
            )}
          </Form.Item>
        ) : (
          <Form.Item label="Select Cards">
            <Select
              mode="multiple"
              placeholder="Select cards"
              value={selectedCards}
              onChange={setSelectedCards}
              className="w-full"
            >
              {cards.map((card) => (
                <Option key={card.id} value={card.id}>
                  {card.title_en}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
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
        <MediaSelectionModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectMedia={(media) => setSelectedMedia(media)}
          selectionMode="multiple"
        />
      </Form>
    </Modal>
  );
};

export default SliderForm;
