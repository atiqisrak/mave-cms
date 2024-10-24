// components/cards/CardsPreviewModal.jsx

import React, { useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Table,
  message,
  Switch,
} from "antd";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";
import RichTextEditor from "../RichTextEditor";
import Image from "next/image";

const { Option } = Select;

const CardsPreviewModal = ({
  visible,
  onCancel,
  selectedCard,
  isEditing,
  setIsEditing,
  form,
  handleSaveEdit,
  handleEditCard,
  handleCancelEdit,
  pages,
  media,
}) => {
  const [isMediaModalVisible, setIsMediaModalVisible] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaSelect = (mediaItem) => {
    setSelectedMedia(mediaItem);
    form.setFieldsValue({ media_ids: mediaItem.id });
    setIsMediaModalVisible(false);
  };

  const data = selectedCard
    ? [
        {
          key: "1",
          infoType: "Title (English)",
          details: selectedCard.title_en,
        },
        {
          key: "2",
          infoType: "Title (Alternate)",
          details: selectedCard.title_bn,
        },
        {
          key: "3",
          infoType: "Description (English)",
          details: (
            <div
              dangerouslySetInnerHTML={{ __html: selectedCard.description_en }}
            />
          ),
        },
        {
          key: "4",
          infoType: "Description (Alternate)",
          details: (
            <div
              dangerouslySetInnerHTML={{ __html: selectedCard.description_bn }}
            />
          ),
        },
        {
          key: "5",
          infoType: "Media",
          details: (
            <Image
              src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${
                media.find((m) => m.id === selectedCard.media_ids)?.file_path
              }`}
              alt="Card Media"
              width={200}
              height={150}
              objectFit="cover"
            />
          ),
        },
        {
          key: "6",
          infoType: "Page Name",
          details: selectedCard.page_name || "N/A",
        },
        {
          key: "7",
          infoType: "Link URL",
          details: selectedCard.link_url,
        },
        {
          key: "8",
          infoType: "Status",
          details: selectedCard.status === 1 ? "Active" : "Inactive",
        },
      ]
    : [];

  const columns = [
    {
      title: "Info Type",
      dataIndex: "infoType",
      key: "infoType",
      width: "30%",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
    },
  ];

  return (
    <Modal
      title={isEditing ? "Edit Card" : "Card Details"}
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      {selectedCard && (
        <>
          {isEditing ? (
            <Form form={form} layout="vertical" onFinish={handleSaveEdit}>
              <Form.Item
                label="Title (English)"
                name="title_en"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title in English",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Title (Alternate)"
                name="title_bn"
                rules={[
                  {
                    required: true,
                    message: "Please enter the title in Alternate",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description (English)"
                name="description_en"
                rules={[
                  {
                    required: true,
                    message: "Please enter the description in English",
                  },
                ]}
              >
                <RichTextEditor
                  value={selectedCard.description_en}
                  onChange={(value) =>
                    form.setFieldsValue({ description_en: value })
                  }
                  defaultValue={selectedCard.description_en}
                  editMode={true}
                />
              </Form.Item>

              <Form.Item
                label="Description (Alternate)"
                name="description_bn"
                rules={[
                  {
                    required: true,
                    message: "Please enter the description in Alternate",
                  },
                ]}
              >
                <RichTextEditor
                  value={selectedCard.description_bn}
                  onChange={(value) =>
                    form.setFieldsValue({ description_bn: value })
                  }
                  defaultValue={selectedCard.description_bn}
                  editMode={true}
                />
              </Form.Item>

              <Form.Item name="media_ids" hidden>
                <Input type="hidden" />
              </Form.Item>

              <Form.Item label="Media" required>
                <div className="flex flex-col">
                  <Button onClick={() => setIsMediaModalVisible(true)}>
                    Change Media
                  </Button>
                  <div className="flex justify-between">
                    <div className="mt-2">
                      <h3 className="my-5 font-bold">Current Media</h3>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${
                          media.find((m) => m.id === selectedCard.media_ids)
                            ?.file_path
                        }`}
                        alt="Current Media"
                        width={200}
                        height={150}
                        objectFit="cover"
                        className="rounded-lg"
                      />
                    </div>
                    {selectedMedia && (
                      <div className="mt-2">
                        <h3 className="my-5 font-bold">Changed Media</h3>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia.file_path}`}
                          alt="Selected Media"
                          width={200}
                          height={150}
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Form.Item>

              <Form.Item
                label="Page Name"
                name="page_name"
                rules={[{ required: true, message: "Please select a page" }]}
              >
                <Select placeholder="Select Page" allowClear>
                  {pages
                    ?.filter((page) => page.page_name_en)
                    .map((page) => (
                      <Select.Option
                        key={page.page_name_en}
                        value={page.page_name_en}
                      >
                        {page.page_name_en}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Link URL"
                name="link_url"
                rules={[
                  { required: true, message: "Please enter the link URL" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Status"
                name="status"
                valuePropName="checked"
                rules={[{ required: true, message: "Please select a status" }]}
              >
                <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
              </Form.Item>

              <Form.Item>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={handleCancelEdit}
                    className="mavecancelbutton"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="mavebutton"
                  >
                    Save Changes
                  </Button>
                </div>
              </Form.Item>

              {/* Media Selection Modal */}
              <MediaSelectionModal
                isVisible={isMediaModalVisible}
                onClose={() => setIsMediaModalVisible(false)}
                onSelectMedia={handleMediaSelect}
                selectionMode="single"
              />
            </Form>
          ) : (
            <>
              <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                showHeader={false}
              />
              <div className="flex justify-end mt-4">
                <Button
                  type="primary"
                  onClick={handleEditCard}
                  className="mavebutton"
                >
                  Edit
                </Button>
              </div>
            </>
          )}
        </>
      )}
    </Modal>
  );
};

export default CardsPreviewModal;
