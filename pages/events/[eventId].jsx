// pages/events/[eventId].jsx

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Spin, message } from "antd";
import instance from "../../axios";
import EventsForm from "../../components/events/EventsForm";

const EditEventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;

  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchEventData = async () => {
    if (!eventId) return;
    setLoading(true);
    try {
      const response = await instance.get(`/pages/${eventId}`);
      if (response.status === 200) {
        setEventData(response.data);
      } else {
        message.error("Failed to fetch event data.");
      }
    } catch (error) {
      console.error("Error fetching event data:", error);
      message.error("An error occurred while fetching event data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  if (loading || !eventData) {
    return (
      <div className="mavecontainer flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="mavecontainer bg-white p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Edit Event</h1>
      <EventsForm eventData={eventData} />
    </div>
  );
};

export default EditEventPage;
