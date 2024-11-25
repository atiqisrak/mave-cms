// components/Events/EventsForm.jsx

import { useState, useEffect } from "react";
import { Form, Button, Steps, message } from "antd";
import BasicDetails from "./BasicDetails";
import DescriptionAndAgendas from "./DescriptionAndAgendas";
import TicketingDetails from "./TicketingDetails";
import OrganizerInfo from "./OrganizerInfo";
import PreviewDrawer from "./PreviewDrawer";
import instance from "../../axios";
import dayjs from "dayjs";

const { Step } = Steps;

const EventsForm = ({ eventData }) => {
  console.log("Event Data:", eventData);
  const [current, setCurrent] = useState(0);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [form] = Form.useForm();

  const isEditMode = !!eventData;

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
      await form.validateFields();
      const values = form.getFieldsValue(true);

      if (!values.date || !values.time) {
        message.error("Event date and time are required.");
        return;
      }

      // Process date and time using dayjs
      const eventDate = values.date.format("YYYY-MM-DD");
      const eventTime = values.time.format("h:mm A");

      // Process bookingDuration
      const bookingStart = values.bookingDuration
        ? values.bookingDuration[0].format("YYYY-MM-DD HH:mm A")
        : null;
      const bookingEnd = values.bookingDuration
        ? values.bookingDuration[1].format("YYYY-MM-DD HH:mm A")
        : null;

      // Process agendas
      const agendas = values.agendas
        ? values.agendas.map((agenda) => ({
            ...agenda,
            startTime: agenda.startTime.format("HH:mm"),
            endTime: agenda.endTime.format("HH:mm"),
          }))
        : [];

      const payload = {
        type: "Event",
        slug: values.title.toLowerCase().replace(/\s+/g, "-"),
        favicon_id: 10,
        page_name_en: values.title,
        page_name_bn: values.title,
        additional: [
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
            _id: "71cfce51-cb18-475d-8216-b875ae3ae8c6",
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
                date: eventDate,
                time: eventTime,
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
              // Include any other relevant fields from values here
            ],
          },
          {
            _id: "25a2aaf6-b501-44b6-a572-269b2c916c44",
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
                agendaItems: agendas,
              },
            ],
          },
          {
            _id: "5a2aaf6-b501-44b6-a572-26e2c916c44",
            sectionTitle: "Ticketing Details",
            _category: "root",
            data: [
              {
                type: "ticketTypes",
                _id: "ticketTypes-" + Date.now(),
                ticketOptions: values.ticketTypes,
              },
              {
                type: "bookingDuration",
                _id: "bookingDuration-" + Date.now(),
                bookingStart: bookingStart,
                bookingEnd: bookingEnd,
              },
              {
                type: "promoCodes",
                _id: "promoCodes-" + Date.now(),
                promoList: values.promoCodes,
              },
            ],
          },
          {
            _id: "5a2aaf6-b501-44b6-a572-26e64916c44",
            sectionTitle: "Organizer Information",
            _category: "root",
            data: [
              {
                type: "organizer",
                _id: "organizer-" + Date.now(),
                organizerSelection: values.organizerSelection,
                ...(values.organizerSelection === "existing"
                  ? { existingOrganizerId: values.existingOrganizerId }
                  : {}),
                ...(values.organizerSelection === "new"
                  ? { newOrganizer: values.newOrganizer }
                  : {}),
              },
            ],
          },
          // Add any additional sections as needed
        ],
        status: 1,
      };

      if (isEditMode) {
        const response = await instance.put(`/pages/${eventData.id}`, payload);
        if (response.status === 200) {
          message.success("Event updated successfully");
          form.resetFields();
          setCurrent(0);
          setPreviewVisible(false);
        } else {
          console.error("Unexpected response status:", response.status);
          message.error("Failed to update event");
        }
      } else {
        const response = await instance.post("/pages", payload);
        if (response.status === 201) {
          message.success("Event published successfully");
          form.resetFields();
          setCurrent(0);
          setPreviewVisible(false);
          localStorage.removeItem("eventFormData");
        } else {
          console.error("Unexpected response status:", response.status);
          message.error("Failed to publish event");
        }
      }
    } catch (error) {
      if (error.response) {
        console.error("Server responded with error:", error.response.data);
        message.error(
          `Failed to ${isEditMode ? "update" : "publish"} event: ${
            error.response.data.message || error.response.statusText
          }`
        );
      } else if (error.request) {
        console.error("No response received:", error.request);
        message.error(
          `Failed to ${isEditMode ? "update" : "publish"} event: No response from server`
        );
      } else {
        console.error("Error during request:", error.message);
        message.error(
          `Failed to ${isEditMode ? "update" : "publish"} event: ${error.message}`
        );
      }
    }
  };

  // Function to save form data to localStorage
  const saveFormDataToLocalStorage = (allValues) => {
    if (!isEditMode) {
      const formData = { ...allValues };

      // Convert dayjs objects to strings
      if (formData.date) {
        formData.date = formData.date.toISOString();
      }
      if (formData.time) {
        formData.time = formData.time.format("HH:mm");
      }
      if (formData.bookingDuration) {
        formData.bookingDuration = [
          formData.bookingDuration[0].toISOString(),
          formData.bookingDuration[1].toISOString(),
        ];
      }
      if (formData.agendas) {
        formData.agendas = formData.agendas.map((agenda) => ({
          ...agenda,
          startTime: agenda.startTime.format("HH:mm"),
          endTime: agenda.endTime.format("HH:mm"),
        }));
      }

      localStorage.setItem("eventFormData", JSON.stringify(formData));
    }
  };

  useEffect(() => {
    if (isEditMode && eventData) {
      // Map eventData to form fields
      const formValues = {};

      formValues.title = eventData.page_name_en;

      const basicDetailsSection = eventData.body.find(
        (section) => section.sectionTitle === "Basic Event Details"
      );
      if (basicDetailsSection) {
        basicDetailsSection.data.forEach((item) => {
          switch (item.type) {
            case "title":
              formValues.title = item.value;
              break;
            case "description":
              formValues.shortDescription = item.value;
              break;
            case "media":
              formValues.coverImage = item.id;
              break;
            case "dateTime":
              formValues.date = dayjs(item.date);
              formValues.time = dayjs(item.time, "h:mm A");
              break;
            case "locationType":
              formValues.locationType = item.value;
              break;
            case "ticketing":
              formValues.ticketing = item.value;
              break;
            // Include other cases as needed
          }
        });
      }

      const overviewSection = eventData.body.find(
        (section) => section.sectionTitle === "Event Overview and Agendas"
      );
      if (overviewSection) {
        overviewSection.data.forEach((item) => {
          switch (item.type) {
            case "fullDescription":
              formValues.fullDescription = item.value;
              break;
            case "venueDetails":
              formValues.venue = item.venue;
              formValues.mapCoordinates = item.mapCoordinates;
              break;
            case "onlineDetails":
              formValues.onlineLink = item.onlineLink;
              formValues.attendeeLimit = item.attendeeLimit;
              break;
            case "agendas":
              formValues.agendas = item.agendaItems.map((agenda) => ({
                ...agenda,
                startTime: dayjs(agenda.startTime, "HH:mm"),
                endTime: dayjs(agenda.endTime, "HH:mm"),
              }));
              break;
            // Include other cases as needed
          }
        });
      }

      const ticketingSection = eventData.body.find(
        (section) => section.sectionTitle === "Ticketing Details"
      );
      if (ticketingSection) {
        ticketingSection.data.forEach((item) => {
          switch (item.type) {
            case "ticketTypes":
              formValues.ticketTypes = item.ticketOptions;
              break;
            case "bookingDuration":
              formValues.bookingDuration = [
                dayjs(item.bookingStart),
                dayjs(item.bookingEnd),
              ];
              break;
            case "promoCodes":
              formValues.promoCodes = item.promoList;
              break;
            // Include other cases as needed
          }
        });
      }

      const organizerSection = eventData.body.find(
        (section) => section.sectionTitle === "Organizer Information"
      );
      if (organizerSection) {
        organizerSection.data.forEach((item) => {
          if (item.type === "organizer") {
            formValues.organizerSelection = item.organizerSelection;
            if (item.organizerSelection === "existing") {
              formValues.existingOrganizerId = item.existingOrganizerId;
            } else if (item.organizerSelection === "new") {
              formValues.newOrganizer = item.newOrganizer;
            }
          }
        });
      }

      // Set form values
      form.setFieldsValue(formValues);
    } else if (!isEditMode) {
      // Load data from localStorage for new event
      const savedData = localStorage.getItem("eventFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        // Convert date strings back to dayjs objects
        if (parsedData.date) {
          parsedData.date = dayjs(parsedData.date);
        }
        if (parsedData.time) {
          parsedData.time = dayjs(parsedData.time, "h:mm A");
        }
        if (parsedData.bookingDuration) {
          parsedData.bookingDuration = [
            dayjs(parsedData.bookingDuration[0]),
            dayjs(parsedData.bookingDuration[1]),
          ];
        }
        if (parsedData.agendas) {
          parsedData.agendas = parsedData.agendas.map((agenda) => ({
            ...agenda,
            startTime: dayjs(agenda.startTime, "HH:mm"),
            endTime: dayjs(agenda.endTime, "HH:mm"),
          }));
        }

        form.setFieldsValue(parsedData);
      }
    }
  }, [eventData, form, isEditMode]);

  useEffect(() => {
    if (!isEditMode) {
      const handleBeforeUnload = () => {
        const formData = form.getFieldsValue();

        // Convert dayjs objects to strings
        if (formData.date) {
          formData.date = formData.date.toISOString();
        }
        if (formData.time) {
          formData.time = formData.time.format("HH:mm");
        }
        if (formData.bookingDuration) {
          formData.bookingDuration = [
            formData.bookingDuration[0].toISOString(),
            formData.bookingDuration[1].toISOString(),
          ];
        }
        if (formData.agendas) {
          formData.agendas = formData.agendas.map((agenda) => ({
            ...agenda,
            startTime: agenda.startTime.format("HH:mm"),
            endTime: agenda.endTime.format("HH:mm"),
          }));
        }

        localStorage.setItem("eventFormData", JSON.stringify(formData));
      };

      window.addEventListener("beforeunload", handleBeforeUnload);
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [form, isEditMode]);

  return (
    <div className="bg-white rounded-lg p-10">
      <Steps
        current={current}
        onChange={(value) => setCurrent(value)}
        className="mb-6"
      >
        {steps.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <Form
        form={form}
        layout="vertical"
        className="mb-6"
        onValuesChange={(changedValues, allValues) => {
          if (!isEditMode) {
            saveFormDataToLocalStorage(allValues);
          }
        }}
      >
        {steps[current].content}
      </Form>
      <div className="flex justify-between">
        {current > 0 && (
          <Button className="mavecancelbutton" onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button className="mavebutton" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            className="mavebutton"
            onClick={() => {
              openPreview();
            }}
          >
            Preview
          </Button>
        )}
      </div>
      <PreviewDrawer
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        onEdit={() => setPreviewVisible(false)}
        onPublish={handlePublish}
        eventData={form.getFieldsValue(true)}
        isEditMode={isEditMode}
      />
    </div>
  );
};

export default EventsForm;
