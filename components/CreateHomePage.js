import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Select, message, Form } from "antd";
import MediaSelectionModal from "./MediaSelectionModal";

const { Option } = Select;

const CreateHomePage = ({
  visible,
  onCreate,
  onCancel,
  navbars,
  media,
  loading,
  sliders,
  cards,
  videos,
  footers,
}) => {
  const [formData, setFormData] = useState({
    navbar_id: "",
    slider_id: "",
    card_id: "",
    cards_id: [],
    media_id: "",
    media_ids: [],
    footer_id: "",
  });

  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const handleOk = () => {
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleFormChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleCreate = () => {
    if (!formData.navbar_id) {
      message.error("Please select a navbar.");
      return;
    }

    // You can add more validation as needed.

    onCreate(formData);
  };

  useEffect(() => {
    // Update formData with the selectedMedia in media_ids
    setFormData({
      ...formData,
      media_ids: selectedMedia,
    });
  }, [selectedMedia]);

  return (
    <Modal
      width="60%"
      open={visible}
      title="Create Homepage"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="create"
          type="primary"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create"}
        </Button>,
      ]}
    >
      <Form>
        {/* ---------- Navbar ----------- */}
        <div className="navbar">
          <h2>Navbar Section</h2>
          {/* <Select
            value={formData?.navbar_id}
            onChange={(value) => handleFormChange("navbar_id", value)}
            style={{ width: "100%" }}
            defaultValue="Select a navbar"
          >
            {navbars?.map((navbar) => (
              <Option key={navbar.id} value={navbar.id}>
                {navbar.id}
              </Option>
            ))}
          </Select> */}
          <Select
            showSearch
            value={formData?.navbar_id}
            onChange={(value) => handleFormChange("navbar_id", value)}
            style={{ width: "50vw" }}
            defaultValue="Select a navbar"
          >
            {navbars?.map((navbar) => (
              <Option key={navbar.id} value={navbar.id} large>
                <div
                  className="navbarList"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "1em 5em",
                    height: "100%",
                  }}
                >
                  <div className="logoColumn">
                    <img
                      src={`${MEDIA_URL}/${navbar.logo.file_path}`}
                      alt={navbar.logo.file_name}
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                  <div
                    className="menuColumn"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      className="menu"
                      style={{
                        display: "flex",
                        gap: "1em",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1.5em",
                        fontWeight: "600",
                      }}
                    >
                      {/* Render the menu items */}
                      {navbar.menu.menu_items?.map((menuItem) => (
                        <div key={menuItem.id}>
                          <a href={menuItem.link}>{menuItem.title}</a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        </div>

        {/* ---------- Slider ----------- */}
        <div className="slider">
          <h2>Slider Section</h2>
          {/* <Input
            placeholder="Slider ID"
            value={formData.slider_id}
            onChange={(e) => handleFormChange("slider_id", e.target.value)}
          /> */}
          <Select
            showSearch
            value={formData?.slider_id}
            onChange={(value) => handleFormChange("slider_id", value)}
            defaultValue="Select a slider"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "50vw",
            }}
          >
            {sliders?.map((slider) => (
              <Option key={slider.id} value={slider.id}>
                {slider.title_en}
              </Option>
            ))}
          </Select>
        </div>

        {/* ---------- Card ----------- */}
        <div className="card">
          <h2>Card Section</h2>
          {/* <Input
            placeholder="Card ID"
            value={formData.card_id}
            onChange={(e) => handleFormChange("card_id", e.target.value)}
          /> */}
          <Select
            showSearch
            value={formData?.card_id}
            onChange={(value) => handleFormChange("card_id", value)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "50vw",
            }}
            defaultValue="Select a card"
          >
            {cards?.map((card) => (
              <Option key={card.id} value={card.id}>
                <div
                  className="cardList"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "50vw",
                  }}
                >
                  {card.title_en}
                </div>
              </Option>
            ))}
          </Select>
        </div>

        {/* ---------- Cards ----------- */}
        <div className="cards">
          <h2>Cards Section</h2>

          <Select
            allowClear
            showSearch
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            mode="multiple"
            size="large"
            value={formData?.cards_id}
            onChange={(value) => handleFormChange("cards_id", value)}
            style={{
              width: "50vw",
            }}
            defaultValue="Select cards"
          >
            {cards?.map((card) => (
              <Option
                key={card.id}
                value={card.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {card.title_en}
              </Option>
            ))}
          </Select>
        </div>

        {/* ---------- Media ----------- */}
        <div className="media">
          <h2>Media Section</h2>
          {/* <Input
            placeholder="Media ID"
            value={formData.media_id}
            onChange={(e) => handleFormChange("media_id", e.target.value)}
          /> */}
          <Select
            showSearch
            value={formData?.media_id}
            onChange={(value) => handleFormChange("media_id", value)}
            style={{ width: "50vw" }}
            defaultValue="Select Video"
          >
            {videos?.map((video) => (
              <Option key={video.id} value={video.id}>
                <div
                  className="videoList"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "50vw",
                  }}
                >
                  {/* {video.file_name} */}
                  <video
                    autoPlay
                    muted
                    width="100%"
                    height="200"
                    objectFit="cover"
                    src={`${MEDIA_URL}/${video.file_path}`}
                  />
                </div>
              </Option>
            ))}
          </Select>
        </div>

        {/* ---------- Gallery ----------- */}
        <div className="media-ids">
          <h2>Media IDs</h2>
          <Button
            type="primary"
            onClick={() => setModalVisible(true)}
            style={{ marginTop: "1rem" }}
          >
            Update Gallery
          </Button>
          <Modal
            width={"60%"}
            title="Upload Media"
            open={modalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            className="uploadMediaModal"
          >
            <MediaSelectionModal
              media={media}
              visible={modalVisible}
              onCancel={() => setModalVisible(false)}
              selectedMedia={selectedMedia}
              setSelectedMedia={setSelectedMedia}
            />
          </Modal>
        </div>

        {/* ---------- Footer ----------- */}
        <div className="footer">
          <h2>Footer Section</h2>
          {/* <Input
            placeholder="Footer ID"
            value={formData.footer_id}
            onChange={(e) => handleFormChange("footer_id", e.target.value)}
          /> */}

          <Select
            showSearch
            value={formData?.footer_id}
            onChange={(value) => handleFormChange("footer_id", value)}
            defaultValue="Select a footer"
            style={{ width: "50vw" }}
          >
            {footers?.map((footer) => (
              <Option
                key={footer.id}
                value={footer.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "50vw",
                }}
              >
                {footer.title_en}
              </Option>
            ))}
          </Select>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateHomePage;
