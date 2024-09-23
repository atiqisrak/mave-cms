import { useState } from "react";
import { Button, Input, Radio, Select, Switch, message } from "antd";
import Modal from "antd/lib/modal/Modal";
import SingleMediaSelect from "./SingleMediaSelect";
import RichTextEditor from "./RichTextEditor";
import instance from "../axios";

const CreateCardForm = ({
  onCreateCard,
  onCancel,
  media,
  pages,
  fetchCards,
  setIsCreateCardFormVisible,
}) => {
  const [formData, setFormData] = useState({
    title_en: "",
    title_bn: "",
    description_en: "",
    description_bn: "",
    page_name: "",
    link_url: "/",
    status: true,
    media_ids: null,
  });

  const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState(null);
  const [pageSelected, setPageSelected] = useState(false);
  const [linkType, setLinkType] = useState("page");
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  const handleFieldChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handlePageChange = (page) => {
    setPageSelected(true);
    setLinkType("page");
    setFormData((prevFormData) => ({
      ...prevFormData,
      page_name: page.page_name_en,
      link_url: `/${page.slug}?page_id=${
        page.id
      }&pageName=${page.page_name_en.replace(/\s/g, "-")}`,
    }));
  };

  const handleCreateCard = async () => {
    try {
      const response = await instance.post("/cards", formData);

      if (response.status === 200) {
        onCreateCard(response.data);
        setFormData({
          title_en: "",
          title_bn: "",
          description_en: "",
          description_bn: "",
          page_name: "",
          link_url: "/",
          status: true,
          media_ids: null,
        });
        console.log("Card created successfully");
      } else {
        console.error("Error creating card:", response.data.message);
      }
      // console.log("Sending data: ", formData);
    } catch (error) {
      console.error("Error creating card:", error);
    }
    fetchCards();
    setIsCreateCardFormVisible(false);
  };

  const handleAddMediaToCard = (selectedMediaId) => {
    setSelectedMediaId(selectedMediaId);
    setFormData({
      ...formData,
      media_ids: selectedMediaId,
    });
    setMediaSelectionVisible(false);
  };

  return (
    <Modal
      title="Create New Card"
      open={true}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="create" type="primary" onClick={handleCreateCard}>
          Create Card
        </Button>,
      ]}
      width={1200}
    >
      {console.log("Pages: ", pages)}
      <h2>Title</h2>
      <Input
        placeholder="Title (English)"
        value={formData.title_en}
        onChange={(e) => handleFieldChange("title_en", e.target.value)}
      />
      <h2>শিরোনাম</h2>
      <Input
        placeholder="Title (Bengali)"
        value={formData.title_bn}
        onChange={(e) => handleFieldChange("title_bn", e.target.value)}
      />
      <h2>Description</h2>
      <RichTextEditor
        value={formData.description_en}
        editMode={true}
        onChange={(value) => handleFieldChange("description_en", value)}
      />
      <h2>বর্ণনা</h2>
      <RichTextEditor
        value={formData.description_bn}
        editMode={true}
        onChange={(value) => handleFieldChange("description_bn", value)}
      />
      <h2>Page</h2>
      <Select
        showSearch
        style={{ width: "100%", margin: "1em 0" }}
        placeholder="Select a page"
        optionFilterProp="children"
        onChange={(value) => {
          const selectedPage = pages.find(
            (page) => page.page_name_en === value
          );
          handlePageChange(selectedPage);
        }}
      >
        {pages.map((page) => (
          <Select.Option key={page.id} value={page.page_name_en}>
            {page.page_name_en}
          </Select.Option>
        ))}
      </Select>

      {pageSelected && (
        <div>
          <h2>Link URL</h2>
          <Radio.Group
            onChange={(e) => {
              setLinkType(e.target.value);
              if (e.target.value === "page") {
                const selectedPage = pages.find(
                  (page) => page.page_name_en === formData.page_name
                );
                handlePageChange(selectedPage);
              } else if (e.target.value === "independent") {
                handleFieldChange("link_url", "https://");
              }
            }}
            value={linkType}
          >
            <Radio value="page">Page Link</Radio>
            <Radio value="independent">Independent Link</Radio>
          </Radio.Group>

          {linkType === "independent" && (
            <Input
              placeholder="https://"
              value={formData.link_url}
              onChange={(e) => handleFieldChange("link_url", e.target.value)}
            />
          )}
        </div>
      )}

      <br />
      <br />
      <br />
      <Button
        type="primary"
        style={{ marginRight: "1rem", height: "inherit" }}
        onClick={() => setMediaSelectionVisible(true)}
      >
        {selectedMediaId ? (
          <img
            src={`${MEDIA_URL}/${
              media.find((item) => item.id === selectedMediaId).file_path
            }`}
            height={150}
            width={150}
            style={{ objectFit: "cover", borderRadius: 10 }}
          />
        ) : (
          <img
            src="/images/Image_Placeholder.png"
            height={150}
            width={150}
            style={{ objectFit: "cover", borderRadius: 10 }}
          />
        )}
      </Button>
      <SingleMediaSelect
        open={mediaSelectionVisible}
        onCancel={() => setMediaSelectionVisible(false)}
        onMediaSelect={handleAddMediaToCard}
        media={media}
      />
    </Modal>
  );
};

export default CreateCardForm;
