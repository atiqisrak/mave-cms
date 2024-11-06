// components/Plugins/MaveEvents/EventForm/EventForm.jsx

import React, { useContext, useState } from "react";
import { Form, Input, DatePicker, Switch, Button, Select } from "antd";
import { MaveEventsContext } from "../../../../context/Plugins/MaveEventsContext";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

const { TextArea } = Input;
const { Option } = Select;

const EventForm = ({ existingEvent }) => {
  const { createEvent, updateEvent } = useContext(MaveEventsContext);
  const router = useRouter();
  const [form] = Form.useForm();
  const [isOnline, setIsOnline] = useState(
    existingEvent ? existingEvent.isOnline : false
  );
  const [googleMeetLink, setGoogleMeetLink] = useState(
    existingEvent ? existingEvent.googleMeetLink : ""
  );

  const onFinish = async (values) => {
    const eventData = {
      page_name_en: values.title,
      body: [
        {
          _id: "event-details",
          sectionTitle: "Event Details",
          data: [
            { type: "title", _id: "title", value: values.title },
            {
              type: "description",
              _id: "description",
              value: values.description,
            },
          ],
        },
        {
          _id: "event-schedule",
          sectionTitle: "Event Schedule",
          data: [
            {
              type: "datetime",
              _id: "startTime",
              value: values.startTime.toISOString(),
              endValue: values.endTime.toISOString(),
            },
          ],
        },
        {
          _id: "event-type",
          sectionTitle: "Event Type",
          data: [{ type: "toggle", _id: "isOnline", value: isOnline }],
        },
        ...(isOnline
          ? [
              {
                _id: "online-details",
                sectionTitle: "Online Details",
                data: [
                  {
                    type: "googleMeet",
                    _id: "googleMeetLink",
                    value: googleMeetLink,
                  },
                ],
              },
            ]
          : [
              {
                _id: "event-location",
                sectionTitle: "Event Location",
                data: [
                  { type: "location", _id: "location", value: values.location },
                ],
              },
            ]),
      ],
      additional: [
        {
          metaTitle: values.title,
          metaDescription: values.description,
          keywords: values.keywords
            ? values.keywords.split(",").map((k) => k.trim())
            : [],
        },
      ],
      status: 1,
    };

    try {
      if (existingEvent) {
        await updateEvent(existingEvent.id, eventData);
      } else {
        await createEvent(eventData);
      }
      router.push("/plugins/mave-events");
    } catch (error) {
      console.error("Error saving event:", error);
    }
  };

  const handleOnlineToggle = (checked) => {
    setIsOnline(checked);
  };

  const handleGoogleLoginSuccess = (tokenResponse) => {
    // Handle Google Meet link generation using the token
    // This would typically involve calling your backend to create a Google Meet link
    // For simplicity, we'll mock the link
    const generatedLink = "https://meet.google.com/xyz-abc-def";
    setGoogleMeetLink(generatedLink);
  };

  const handleGoogleLoginFailure = () => {
    console.error("Google Login Failed");
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        title: existingEvent ? existingEvent.title : "",
        description: existingEvent ? existingEvent.description : "",
        startTime: existingEvent ? dayjs(existingEvent.startTime) : null,
        endTime: existingEvent ? dayjs(existingEvent.endTime) : null,
        location: existingEvent ? existingEvent.location : "",
        keywords: existingEvent ? existingEvent.keywords.join(", ") : "",
      }}
    >
      <Form.Item
        label="Event Title"
        name="title"
        rules={[{ required: true, message: "Please input the event title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          { required: true, message: "Please input the event description!" },
        ]}
      >
        <TextArea rows={4} />
      </Form.Item>

      <Form.Item
        label="Start Time"
        name="startTime"
        rules={[{ required: true, message: "Please select the start time!" }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="End Time"
        name="endTime"
        rules={[{ required: true, message: "Please select the end time!" }]}
      >
        <DatePicker showTime />
      </Form.Item>

      <Form.Item
        label="Is Online Event?"
        name="isOnline"
        valuePropName="checked"
      >
        <Switch checked={isOnline} onChange={handleOnlineToggle} />
      </Form.Item>

      {isOnline ? (
        <>
          <Form.Item
            label="Google Meet Link"
            name="googleMeetLink"
            rules={[
              {
                required: true,
                message: "Please generate a Google Meet link!",
              },
            ]}
          >
            <Input value={googleMeetLink} readOnly />
          </Form.Item>
          {!googleMeetLink && (
            <Button type="primary" onClick={() => handleGoogleLoginSuccess()}>
              Generate Google Meet Link
            </Button>
          )}
        </>
      ) : (
        <Form.Item
          label="Location"
          name="location"
          rules={[
            { required: true, message: "Please input the event location!" },
          ]}
        >
          <Input />
        </Form.Item>
      )}

      <Form.Item label="Keywords (comma separated)" name="keywords">
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {existingEvent ? "Update Event" : "Create Event"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
