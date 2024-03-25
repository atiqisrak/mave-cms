import {
  Alert,
  Button,
  Col,
  Collapse,
  Form,
  Image,
  Input,
  Row,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import instance from "../axios";
import Loader from "../components/Loader";

const CreateSlider = () => {
  const [mediaAssets, setMediaAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [selectedMedia, setSelectedMedia] = useState([]); // Store selected media IDs
  const [form] = Form.useForm();
  const items = [
    {
      key: "1",
      label: "Select Media",
      children: (
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          {mediaAssets?.map((image, index) => (
            <Col key={index} span={6} style={{ marginTop: "1rem" }}>
              <div
                onClick={() => handleMediaClick(image)}
                style={{
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <Image
                  src={`${MEDIA_URL}/${image.file_path}`}
                  alt={image.file_name}
                  width={"100%"}
                  height={100}
                  style={{
                    objectFit: "cover",
                    borderRadius: 10,
                    border: selectedMedia.includes(image.id)
                      ? "2px solid #1890ff" // Add a border if selected
                      : "none",
                  }}
                  preview={false}
                />
                {selectedMedia.includes(image.id) && (
                  // Display a checkmark if selected
                  <div
                    style={{
                      position: "absolute",
                      top: "5px",
                      right: "5px",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            </Col>
          ))}
        </Row>
      ),
    },
  ];

  useEffect(() => {
    const fetchMediaAssets = async () => {
      try {
        setLoading(true);
        // const response = await axios.get(`${API_BASE_URL}/media`);
        const response = await instance("/media");
        if (response.data) {
          setMediaAssets(response.data);
          // console.log("Media Assets: ", response.data);
          // message.success("Media assets fetched successfully");
          setLoading(false);
        } else {
          // console.error("Error fetching media assets:", response.data.message);
          message.error("Media files couldn't be fetched");
        }
      } catch (error) {
        // console.error("Error fetching media assets:", error);
        message.error("Media files couldn't be fetched");
      }
    };

    fetchMediaAssets();
  }, []);
  const handleMediaClick = (image) => {
    const mediaId = image.id; // Assuming the image object has an 'id' property

    // Check if the media ID is already in the selectedMedia array
    if (selectedMedia.includes(mediaId)) {
      // If it's selected, remove it
      setSelectedMedia((prevSelectedMedia) =>
        prevSelectedMedia.filter((id) => id !== mediaId)
      );
    } else {
      // If it's not selected, add it
      setSelectedMedia((prevSelectedMedia) => [...prevSelectedMedia, mediaId]);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const postData = {
        title_en: values.title_e,
        title_bn: values.title_b,
        media_ids: selectedMedia, // Use the selectedMedia array in the POST data
      };
      // return;
      const response = await instance.post("/sliders", postData);
      if (response.status === 201) {
        // Handle successful response (e.g., show a success message)
        message.success("Slider created successfully");
        setLoading(false);
      } else {
        // Handle error response
        // console.error("Error creating slider:", response.data);
        message.error("Error creating slider");
      }
    } catch (error) {
      // console.error("Error creating slider:", error);
      message.error("Error creating slider");
    }
  };
  if (loading) {
    return <Loader></Loader>;
  }
  return (
    <div className="login-page">
      <div className="ViewContiner  media-area login-page-section">
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
            <Form.Item hasFeedback label="Media" name="title_m">
              <Collapse accordion ghost items={items}></Collapse>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%", backgroundColor: "#1890ff" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateSlider;
