// components/events/OrganizerInfo.jsx

import { Form, Select, Input, Button } from "antd";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import MediaSelectionModal from "../PageBuilder/Modals/MediaSelectionModal";

const { Option } = Select;

const OrganizerInfo = ({ form }) => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleMediaSelect = (media) => {
    form.setFieldsValue({
      newOrganizer: {
        logo: media.id,
      },
    });
    setIsMediaModalOpen(false);
  };

  return (
    <>
      <Form.Item
        name="organizerSelection"
        label="Select Organizer"
        rules={[{ required: true, message: "Please select an organizer" }]}
      >
        <Select placeholder="Select an organizer">
          <Option value="existing">Existing Organizer</Option>
          <Option value="new">Create New Organizer</Option>
        </Select>
      </Form.Item>

      <Form.Item
        shouldUpdate={(prev, current) =>
          prev.organizerSelection !== current.organizerSelection
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const selection = getFieldValue("organizerSelection");
          if (selection === "existing") {
            return (
              <Form.Item
                name="existingOrganizerId"
                label="Existing Organizer"
                rules={[
                  {
                    required: true,
                    message: "Please select an existing organizer",
                  },
                ]}
              >
                <Select placeholder="Select existing organizer">
                  <Option value="301">Tech Innovators Inc.</Option>
                  <Option value="302">Future Tech Events</Option>
                </Select>
              </Form.Item>
            );
          }
          if (selection === "new") {
            return (
              <>
                <Form.Item
                  name={["newOrganizer", "name"]}
                  label="Organizer Name"
                  rules={[
                    { required: true, message: "Please enter organizer name" },
                  ]}
                >
                  <Input placeholder="Enter organizer name" />
                </Form.Item>
                <Form.Item
                  name={["newOrganizer", "logo"]}
                  label="Organizer Logo"
                  rules={[
                    { required: true, message: "Please select organizer logo" },
                  ]}
                >
                  <Button onClick={() => setIsMediaModalOpen(true)}>
                    Select Logo
                  </Button>
                </Form.Item>
                <Form.Item
                  name={["newOrganizer", "country"]}
                  label="Country"
                  rules={[{ required: true, message: "Please select country" }]}
                >
                  <Select placeholder="Select country">
                    <Option value="United States">United States</Option>
                    <Option value="Canada">Canada</Option>
                    <Option value="United Kingdom">United Kingdom</Option>
                    {/* Add more countries as needed */}
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["newOrganizer", "shortDescription"]}
                  label="Short Description"
                  rules={[
                    {
                      required: true,
                      message: "Please enter a short description",
                    },
                  ]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Enter short description"
                  />
                </Form.Item>
              </>
            );
          }
          return null;
        }}
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

export default OrganizerInfo;
