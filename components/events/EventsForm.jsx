// components/events/EventsForm.jsx

import { useState } from "react";
import { Form, Button, Steps, message } from "antd";
import BasicDetails from "./BasicDetails";
import DescriptionAndAgendas from "./DescriptionAndAgendas";
import TicketingDetails from "./TicketingDetails";
import OrganizerInfo from "./OrganizerInfo";
import PreviewDrawer from "./PreviewDrawer";
import instance from "../../axios";

const { Step } = Steps;

const EventsForm = () => {
  const [current, setCurrent] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [form] = Form.useForm();

  const steps = [
    {
      title: "Basic Details",
      content: <BasicDetails form={form} />,
    },
    {
      title: "Description & Agendas",
      content: <DescriptionAndAgendas form={form} />,
    },
    {
      title: "Ticketing Details",
      content: <TicketingDetails form={form} />,
    },
    {
      title: "Organizer Information",
      content: <OrganizerInfo form={form} />,
    },
  ];

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch(() => {});
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const openPreview = () => {
    form
      .validateFields()
      .then(() => {
        setPreviewVisible(true);
      })
      .catch(() => {});
  };

  const handlePublish = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        type: "Event",
        head: [
          {
            pageType: "Event",
            metaTitle: values.title,
            metaDescription: values.shortDescription,
            keywords: [
              "Tech Conference",
              "2024",
              "Technology",
              "Workshops",
              "Networking",
            ],
            metaImage: values.coverImage,
            metaImageAlt: "Event Cover Image",
          },
        ],
        body: [
          {
            _id: "section-1",
            sectionTitle: "Basic Event Details",
            _category: "root",
            data: [
              {
                type: "title",
                _id: "title-" + Date.now(),
                value: values.title,
              },
              {
                type: "description",
                _id: "desc-" + Date.now(),
                value: values.shortDescription,
              },
              {
                type: "media",
                _id: "media-" + Date.now(),
                id: values.coverImage,
              },
              {
                type: "dateTime",
                _id: "datetime-" + Date.now(),
                date: values.date.format("YYYY-MM-DD"),
                time: values.time.format("hh:mm A"),
              },
              {
                type: "locationType",
                _id: "location-" + Date.now(),
                value: values.locationType,
              },
              {
                type: "ticketing",
                _id: "ticketing-" + Date.now(),
                value: values.ticketing,
                details: { onSite: true, online: true },
              },
            ],
          },
          {
            _id: "section-2",
            sectionTitle: "Event Overview and Agendas",
            _category: "root",
            data: [
              {
                type: "fullDescription",
                _id: "fullDesc-" + Date.now(),
                value: values.fullDescription,
              },
              ...(values.locationType === "On-Site" ||
              values.locationType === "Both"
                ? [
                    {
                      type: "venueDetails",
                      _id: "venue-" + Date.now(),
                      venue: values.venue,
                      address: values.venue,
                      mapCoordinates: values.mapCoordinates,
                    },
                  ]
                : []),
              ...(values.locationType === "Online" ||
              values.locationType === "Both"
                ? [
                    {
                      type: "onlineDetails",
                      _id: "online-" + Date.now(),
                      onlineLink: values.onlineLink,
                      attendeeLimit: values.attendeeLimit,
                    },
                  ]
                : []),
              {
                type: "agendas",
                _id: "agendas-" + Date.now(),
                agendaItems: values.agendas,
              },
            ],
          },
          {
            _id: "section-3",
            sectionTitle: "Ticketing Details",
            _category: "root",
            data: [
              {
                type: "ticketTypes",
                _id: "ticketTypes-" + Date.now(),
                ticketOptions: values.ticketTypes,
              },
              {
                type: "ticketPricing",
                _id: "ticketPricing-" + Date.now(),
                pricing: values.pricing,
              },
              {
                type: "bookingDuration",
                _id: "bookingDuration-" + Date.now(),
                bookingStart: values.bookingDuration.start,
                bookingEnd: values.bookingDuration.end,
              },
              {
                type: "promoCodes",
                _id: "promoCodes-" + Date.now(),
                promoList: values.promoCodes,
              },
            ],
          },
          {
            _id: "section-4",
            sectionTitle: "Organizer Information",
            _category: "root",
            data: [
              values.organizerSelection === "existing"
                ? {
                    type: "organizerSelection",
                    _id: "organizerSelection-" + Date.now(),
                    organizerId: values.existingOrganizerId,
                    organizerName: "Existing Organizer",
                    existing: true,
                  }
                : {
                    type: "newOrganizer",
                    _id: "newOrganizer-" + Date.now(),
                    name: values.newOrganizer.name,
                    logo: values.newOrganizer.logo,
                    country: values.newOrganizer.country,
                    shortDescription: values.newOrganizer.shortDescription,
                  },
            ],
          },
        ],
        additional: [
          {
            pageType: "Event",
            metaTitle: "Additional Event Details",
            metaDescription: "Detailed information about the event.",
            keywords: ["Event", "Tech", "Conference"],
            metaImage: values.coverImage,
            metaImageAlt: "Additional Event Image",
          },
        ],
        status: 1,
      };

      const response = await instance.post("/api/events", payload);
      if (response.status === 201) {
        message.success("Event published successfully");
        form.resetFields();
        setCurrent(0);
        setPreviewVisible(false);
      }
    } catch (error) {
      message.error("Failed to publish event");
    }
  };

  return (
    <>
      <Steps current={current} className="mb-6">
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form form={form} layout="vertical" className="mb-6">
        {steps[current].content}
      </Form>
      <div className="flex justify-between">
        {current > 0 && <Button onClick={() => prev()}>Previous</Button>}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={openPreview}>
            Preview
          </Button>
        )}
      </div>
      <PreviewDrawer
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        onEdit={() => setPreviewVisible(false)}
        onPublish={handlePublish}
        eventData={form.getFieldsValue()}
      />
    </>
  );
};

export default EventsForm;
