// pages/plugins/mave-events/[eventId].jsx

import React from "react";
import { useRouter } from "next/router";
import { Card, Spin } from "antd";
import EventDetails from "../../../components/Plugins/MaveEvents/EventDetails/EventDetails";
import { MaveEventsContext } from "../../../context/Plugins/MaveEventsContext";
import { useContext } from "react";

const EventDetailsPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { events, loading } = useContext(MaveEventsContext);

  if (loading) {
    return <Spin />;
  }

  const event = events.find((e) => e.id === parseInt(eventId));

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <div className="p-4">
      <EventDetails />
    </div>
  );
};

export default EventDetailsPage;
