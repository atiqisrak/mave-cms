import { Form, Input, Button, Space, TimePicker } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import RichTextEditor from "../RichTextEditor";
import MapSelector from "./MapSelector";

const DescriptionAndAgendas = ({ form }) => {
  const handleLocationSelect = ({ lat, lng }) => {
    form.setFieldsValue({
      mapCoordinates: `${lat}, ${lng}`,
    });
  };

  return (
    <>
      <Form.Item
        preserve={true}
        name="fullDescription"
        label="Full Description"
        rules={[
          { required: true, message: "Please enter the full description" },
        ]}
      >
        <RichTextEditor editMode={true} />
      </Form.Item>

      <Form.Item
        preserve={true}
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
                preserve={true}
                name="venue"
                label="Venue"
                rules={[{ required: true, message: "Please enter the venue" }]}
              >
                <Input placeholder="Enter venue address" />
              </Form.Item>
              <Form.Item
                preserve={true}
                name="mapCoordinates"
                label="Select Location on Map"
                rules={[
                  {
                    required: true,
                    message: "Please select a location on the map",
                  },
                ]}
              >
                <MapSelector
                  onLocationSelect={handleLocationSelect}
                  initialPosition={
                    form.getFieldValue("mapCoordinates")
                      ? {
                          lat: parseFloat(
                            form
                              .getFieldValue("mapCoordinates")
                              .split(",")[0]
                              .trim()
                          ),
                          lng: parseFloat(
                            form
                              .getFieldValue("mapCoordinates")
                              .split(",")[1]
                              .trim()
                          ),
                        }
                      : null
                  }
                />
              </Form.Item>
            </>
          ) : null;
        }}
      </Form.Item>

      <Form.Item
        preserve={true}
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
                preserve={true}
                name="onlineLink"
                label="Online Link"
                rules={[
                  { required: true, message: "Please enter the online link" },
                ]}
              >
                <Input placeholder="Enter online meeting link (e.g., Zoom)" />
              </Form.Item>
              <Form.Item
                preserve={true}
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
            {fields.map(({ key, name, ...restField }, index) => (
              <div
                key={key}
                className={`p-4 mb-4 rounded-md ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                }`}
              >
                <Space align="baseline" className="flex flex-col mb-4">
                  <Form.Item
                    preserve={true}
                    {...restField}
                    name={[name, "startTime"]}
                    label="Start Time"
                    rules={[
                      {
                        required: true,
                        message: "Please select the start time",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value) {
                            return Promise.resolve();
                          }
                          if (name > 0) {
                            const prevEndTime = getFieldValue([
                              "agendas",
                              name - 1,
                              "endTime",
                            ]);
                            if (prevEndTime && value.isAfter(prevEndTime)) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error(
                                "Start time must be after previous agenda's end time"
                              )
                            );
                          }
                          return Promise.resolve();
                        },
                      }),
                    ]}
                  >
                    <TimePicker
                      format="h:mm A"
                      use12Hours
                      minuteStep={15}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    preserve={true}
                    {...restField}
                    name={[name, "endTime"]}
                    label="End Time"
                    dependencies={[[name, "startTime"]]}
                    rules={[
                      {
                        required: true,
                        message: "Please select the end time",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          const startTime = getFieldValue([
                            "agendas",
                            name,
                            "startTime",
                          ]);
                          if (!value || !startTime) {
                            return Promise.resolve();
                          }
                          if (value.isAfter(startTime)) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("End time must be after start time")
                          );
                        },
                      }),
                    ]}
                  >
                    <TimePicker
                      format="h:mm A"
                      use12Hours
                      minuteStep={15}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                  <Form.Item
                    preserve={true}
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
                    preserve={true}
                    {...restField}
                    name={[name, "description"]}
                    label="Description"
                  >
                    <Input.TextArea placeholder="Enter description (optional)" />
                  </Form.Item>
                  <Form.Item
                    preserve={true}
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
              </div>
            ))}
            <Form.Item preserve={true}>
              <Button
                // type="dashed"
                className="mavebutton"
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
