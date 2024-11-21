// components/events/BasicDetails.jsx

import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Radio,
  Select,
  Button,
} from "antd";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";
import Image from "next/image";

const { TextArea } = Input;
const { Option } = Select;

const BasicDetails = ({ form }) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState([]);

  const handleMediaSelect = (media) => {
    form.setFieldsValue({
      coverImage: media.id,
    });
    setSelectedMedia([media]);
    setIsMediaModalOpen(false);
  };

  useEffect(() => {
    // Reset cover image preview when form resets
    return () => {
      form.setFieldsValue({ coverImage: null });
      setSelectedMedia([]);
    };
  }, [form]);

  return (
    <>
      <Form.Item
        name="coverImage"
        label="Cover Image"
        rules={[{ required: true, message: "Please select a cover image" }]}
      >
        <Button onClick={() => setIsMediaModalOpen(true)}>
          Select Cover Image
        </Button>
      </Form.Item>
      {console.log("Selected Media", selectedMedia && selectedMedia[0]?.[0])}
      {selectedMedia.length > 0 && (
        <Image
          src={`${process.env.NEXT_PUBLIC_MEDIA_URL}/${selectedMedia[0]?.[0]?.file_path}`}
          alt="Selected Cover Image"
          width={300}
          height={150}
          className="mt-4"
        />
      )}

      <Form.Item
        name="title"
        label="Event Title"
        rules={[{ required: true, message: "Please enter the event title" }]}
      >
        <Input placeholder="Enter event title" />
      </Form.Item>

      <Form.Item
        name="shortDescription"
        label="Short Description"
        rules={[
          { required: true, message: "Please enter a short description" },
          { max: 140, message: "Maximum 140 characters allowed" },
        ]}
      >
        <TextArea
          rows={4}
          placeholder="Enter short description (max 140 characters)"
        />
      </Form.Item>

      <Form.Item
        name="date"
        label="Event Date"
        rules={[{ required: true, message: "Please select the event date" }]}
      >
        <DatePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="time"
        label="Event Time"
        rules={[{ required: true, message: "Please select the event time" }]}
      >
        <TimePicker style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        name="locationType"
        label="Location Type"
        rules={[{ required: true, message: "Please select the location type" }]}
      >
        <Radio.Group>
          <Radio value="On-Site">On-Site</Radio>
          <Radio value="Online">Online</Radio>
          <Radio value="Both">Both</Radio>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="ticketing"
        label="Ticketing Options"
        rules={[
          {
            required: true,
            message: "Please select at least one ticketing option",
          },
        ]}
      >
        <Select mode="multiple" placeholder="Select ticketing options">
          <Option value="No Ticket">No Ticket</Option>
          <Option value="Free">Free</Option>
          <Option value="Paid">Paid</Option>
        </Select>
      </Form.Item>

      <MediaSelectionModal
        isVisible={isMediaModalOpen}
        onSelectMedia={handleMediaSelect}
        onClose={() => setIsMediaModalOpen(false)}
        selectionMode="single"
        initialSelectedMedia={selectedMedia}
      />
    </>
  );
};

export default BasicDetails;
