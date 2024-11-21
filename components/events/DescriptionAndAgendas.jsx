// components/events/DescriptionAndAgendas.jsx

import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor";
import { v4 as uuidv4 } from "uuid";

const DescriptionAndAgendas = ({ form }) => {
  return (
    <>
      <Form.Item
        name="fullDescription"
        label="Full Description"
        rules={[
          { required: true, message: "Please enter the full description" },
        ]}
      >
        <RichTextEditor editMode={true} />
      </Form.Item>

      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.locationType !== currentValues.locationType
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const locationType = getFieldValue("locationType");
          return locationType === "On-Site" || locationType === "Both" ? (
            <>
              <Form.Item
                name="venue"
                label="Venue"
                rules={[{ required: true, message: "Please enter the venue" }]}
              >
                <Input placeholder="Enter venue address" />
              </Form.Item>
              <Form.Item
                name="mapCoordinates"
                label="Map Coordinates"
                rules={[
                  { required: true, message: "Please provide map coordinates" },
                ]}
              >
                <Input placeholder="Latitude, Longitude" />
              </Form.Item>
            </>
          ) : null;
        }}
      </Form.Item>

      <Form.Item
        shouldUpdate={(prevValues, currentValues) =>
          prevValues.locationType !== currentValues.locationType
        }
        noStyle
      >
        {({ getFieldValue }) => {
          const locationType = getFieldValue("locationType");
          return locationType === "Online" || locationType === "Both" ? (
            <>
              <Form.Item
                name="onlineLink"
                label="Online Link"
                rules={[
                  { required: true, message: "Please enter the online link" },
                ]}
              >
                <Input placeholder="Enter online meeting link (e.g., Zoom)" />
              </Form.Item>
              <Form.Item
                name="attendeeLimit"
                label="Number of Attendees"
                rules={[
                  {
                    required: true,
                    message: "Please enter the number of attendees",
                  },
                ]}
              >
                <Input
                  type="number"
                  min={1}
                  placeholder="Enter attendee limit"
                />
              </Form.Item>
            </>
          ) : null;
        }}
      </Form.Item>

      <Form.List name="agendas">
        {(fields, { add, remove }) => (
          <>
            <label className="block text-lg font-medium mb-2">Agendas</label>
            {fields.map(({ key, name, ...restField }) => (
              <Space key={key} align="baseline" className="flex flex-col mb-4">
                <Form.Item
                  {...restField}
                  name={[name, "timeDuration"]}
                  label="Time Duration"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the time duration",
                    },
                  ]}
                >
                  <Input placeholder="e.g., 09:00 AM - 10:00 AM" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "topic"]}
                  label="Topic"
                  rules={[
                    { required: true, message: "Please enter the topic" },
                  ]}
                >
                  <Input placeholder="Enter topic" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "description"]}
                  label="Description"
                >
                  <Input.TextArea placeholder="Enter description (optional)" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "speaker"]}
                  label="Speaker"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the speaker name",
                    },
                  ]}
                >
                  <Input placeholder="Enter speaker name" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Agenda
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};

export default DescriptionAndAgendas;
