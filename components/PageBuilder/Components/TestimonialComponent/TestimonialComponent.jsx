// components/PageBuilder/Components/TestimonialComponent/TestimonialComponent.jsx

import React, { useState, useEffect } from "react";
import {
  Button,
  Select,
  Space,
  Modal,
  Form,
  Input,
  Rate,
  message,
  Tooltip,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import TestimonialItem from "./TestimonialItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MediaSelectionModal from "../../Modals/MediaSelectionModal";
import Image from "next/image";

const { Option } = Select;

const TestimonialComponent = ({
  component,
  updateComponent,
  deleteComponent,
}) => {
  const [testimonials, setTestimonials] = useState(
    component._mave?.testimonials || []
  );
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [currentEdit, setCurrentEdit] = useState(null);
  const [layout, setLayout] = useState(component._mave?.layout || "carousel"); // 'carousel' or 'grid'
  const [font, setFont] = useState(component._mave?.font || "Arial");
  const [color, setColor] = useState(component._mave?.color || "#000000");
  const [background, setBackground] = useState(
    component._mave?.background || "#ffffff"
  );
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [form] = Form.useForm();
  const [editForm] = Form.useForm();

  useEffect(() => {
    updateComponent({
      ...component,
      _mave: {
        testimonials,
        layout,
        font,
        color,
        background,
      },
    });
  }, [
    testimonials,
    layout,
    font,
    color,
    background,
    updateComponent,
    component,
  ]);

  // Slider settings for carousel layout
  const sliderSettings = {
    dots: true,
    infinite: testimonials.length > 3,
    speed: 500,
    slidesToShow: testimonials.length >= 3 ? 3 : testimonials.length,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, // Mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Handle adding a new testimonial
  const handleAddTestimonial = () => {
    setIsAddModalVisible(true);
    form.resetFields();
    setSelectedImage(null);
  };

  const handleAddSubmit = (values) => {
    const newTestimonial = {
      id: Date.now(),
      quote: values.quote,
      author: values.author,
      rating: values.rating,
      image: selectedImage, // URL of the selected image
    };
    setTestimonials([...testimonials, newTestimonial]);
    setIsAddModalVisible(false);
    message.success("Testimonial added successfully.");
  };

  // Handle editing an existing testimonial
  const handleEditTestimonial = (testimonial) => {
    setCurrentEdit(testimonial);
    setIsEditModalVisible(true);
    editForm.setFieldsValue({
      quote: testimonial.quote,
      author: testimonial.author,
      rating: testimonial.rating,
      image: testimonial.image,
    });
    setSelectedImage(testimonial.image);
  };

  const handleEditSubmit = (values) => {
    const updatedTestimonial = {
      ...currentEdit,
      quote: values.quote,
      author: values.author,
      rating: values.rating,
      image: selectedImage,
    };
    setTestimonials(
      testimonials.map((t) =>
        t.id === updatedTestimonial.id ? updatedTestimonial : t
      )
    );
    setIsEditModalVisible(false);
    setCurrentEdit(null);
    message.success("Testimonial updated successfully.");
  };

  // Handle deleting a testimonial
  const handleDeleteTestimonial = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this testimonial?",
      onOk: () => {
        setTestimonials(testimonials.filter((t) => t.id !== id));
        message.success("Testimonial deleted successfully.");
      },
    });
  };

  // Handle layout change
  const handleLayoutChange = (value) => {
    setLayout(value);
  };

  // Handle font change
  const handleFontChange = (value) => {
    setFont(value);
  };

  // Handle text color change
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  // Handle background color change
  const handleBackgroundChange = (e) => {
    setBackground(e.target.value);
  };

  // Handle image selection for add
  const handleSelectImage = (media) => {
    if (media.length > 0) {
      setSelectedImage(media[0].file_path); // Adjust based on your media object structure
      message.success("Image selected successfully.");
      setIsImageModalVisible(false);
    }
  };

  // Handle image selection for edit
  const handleEditSelectImage = (media) => {
    if (media.length > 0) {
      setSelectedImage(media[0].file_path); // Adjust based on your media object structure
      message.success("Image selected successfully.");
      setIsImageModalVisible(false);
      editForm.setFieldsValue({ image: media[0].file_path });
    }
  };

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      <Space direction="vertical" style={{ width: "100%" }}>
        {/* Header */}
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Testimonial Component</h3>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={handleAddTestimonial}
            className="flex items-center"
          >
            Add Testimonial
          </Button>
        </div>

        {/* Configuration Options */}
        <div className="flex flex-wrap gap-4">
          <Select
            value={layout}
            onChange={handleLayoutChange}
            style={{ width: 150 }}
          >
            <Option value="carousel">Carousel</Option>
            <Option value="grid">Grid</Option>
          </Select>
          <Select
            value={font}
            onChange={handleFontChange}
            style={{ width: 150 }}
          >
            <Option value="Arial">Arial</Option>
            <Option value="Helvetica">Helvetica</Option>
            <Option value="Times New Roman">Times New Roman</Option>
            <Option value="Georgia">Georgia</Option>
            <Option value="Verdana">Verdana</Option>
            {/* Add more fonts as needed */}
          </Select>
          <div className="flex items-center">
            <label htmlFor="color" className="mr-2">
              Text Color:
            </label>
            <input
              id="color"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-10 h-10 border rounded-md"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="background" className="mr-2">
              Background:
            </label>
            <input
              id="background"
              type="color"
              value={background}
              onChange={handleBackgroundChange}
              className="w-10 h-10 border rounded-md"
            />
          </div>
        </div>

        {/* Testimonials Display */}
        {testimonials.length > 0 ? (
          layout === "carousel" ? (
            <Slider {...sliderSettings}>
              {testimonials.map((testimonial) => (
                <TestimonialItem
                  key={testimonial.id}
                  testimonial={testimonial}
                  onEdit={() => handleEditTestimonial(testimonial)}
                  onDelete={() => handleDeleteTestimonial(testimonial.id)}
                  font={font}
                  color={color}
                  background={background}
                />
              ))}
            </Slider>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {testimonials.map((testimonial) => (
                <TestimonialItem
                  key={testimonial.id}
                  testimonial={testimonial}
                  onEdit={() => handleEditTestimonial(testimonial)}
                  onDelete={() => handleDeleteTestimonial(testimonial.id)}
                  font={font}
                  color={color}
                  background={background}
                />
              ))}
            </div>
          )
        ) : (
          <p>No testimonials added. Click "Add Testimonial" to get started.</p>
        )}
      </Space>

      {/* Add Testimonial Modal */}
      <Modal
        title="Add Testimonial"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        footer={null}
        destroyOnClose
      >
        <Form layout="vertical" form={form} onFinish={handleAddSubmit}>
          <Form.Item
            label="Quote"
            name="quote"
            rules={[{ required: true, message: "Please enter the quote." }]}
          >
            <Input.TextArea rows={4} placeholder="Enter customer quote" />
          </Form.Item>
          <Form.Item
            label="Author"
            name="author"
            rules={[
              { required: true, message: "Please enter the author's name." },
            ]}
          >
            <Input placeholder="Enter author's name" />
          </Form.Item>
          <Form.Item label="Rating" name="rating" initialValue={5}>
            <Rate />
          </Form.Item>
          <Form.Item label="Image" name="image">
            {selectedImage ? (
              <div className="mb-4">
                <Image
                  //   src={selectedImage}
                  src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedImage}`}
                  alt="Selected"
                  className="w-full h-32 object-cover rounded-md"
                  width={250}
                  height={200}
                  objectFit="cover"
                />
              </div>
            ) : null}
            <Button onClick={() => setIsImageModalVisible(true)}>
              Select Image
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Testimonial
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Testimonial Modal */}
      <Modal
        title="Edit Testimonial"
        open={isEditModalVisible}
        onCancel={() => {
          setIsEditModalVisible(false);
          setCurrentEdit(null);
          setSelectedImage(null);
        }}
        footer={null}
        destroyOnClose
      >
        {currentEdit && (
          <Form layout="vertical" form={editForm} onFinish={handleEditSubmit}>
            <Form.Item
              label="Quote"
              name="quote"
              rules={[{ required: true, message: "Please enter the quote." }]}
            >
              <Input.TextArea rows={4} placeholder="Enter customer quote" />
            </Form.Item>
            <Form.Item
              label="Author"
              name="author"
              rules={[
                { required: true, message: "Please enter the author's name." },
              ]}
            >
              <Input placeholder="Enter author's name" />
            </Form.Item>
            <Form.Item label="Rating" name="rating">
              <Rate />
            </Form.Item>
            <Form.Item label="Image" name="image">
              {selectedImage ? (
                <div className="mb-4">
                  <Image
                    // src={selectedImage}
                    src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedImage}`}
                    alt="Selected"
                    className="w-full h-32 object-cover rounded-md"
                    width={250}
                    height={200}
                    objectFit="cover"
                  />
                </div>
              ) : null}
              <Button onClick={() => setIsImageModalVisible(true)}>
                Change Image
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update Testimonial
              </Button>
            </Form.Item>
          </Form>
        )}
      </Modal>

      {/* Media Selection Modal for Add */}
      <MediaSelectionModal
        isVisible={isImageModalVisible}
        onClose={() => setIsImageModalVisible(false)}
        onSelectMedia={handleSelectImage}
        selectionMode="single"
      />

      {/* Media Selection Modal for Edit */}
      <MediaSelectionModal
        isVisible={isImageModalVisible && isEditModalVisible}
        onClose={() => setIsImageModalVisible(false)}
        onSelectMedia={handleEditSelectImage}
        selectionMode="single"
      />
    </div>
  );
};

export default TestimonialComponent;
