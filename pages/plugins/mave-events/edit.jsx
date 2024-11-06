// pages/plugins/mave-events/edit.jsx

import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { Card, Spin } from "antd";
import EventForm from "../../../components/Plugins/MaveEvents/EventForm/EventForm";
import { MaveEventsContext } from "../../../context/Plugins/MaveEventsContext";

const EditEventPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const { events, loading } = useContext(MaveEventsContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (!loading && events.length > 0 && eventId) {
      const foundEvent = events.find((e) => e.id === parseInt(eventId));
      setEvent(foundEvent);
    }
  }, [loading, events, eventId]);

  if (loading || !event) {
    return <Spin />;
  }

  return (
    <div className="p-4">
      <Card title="Edit Event">
        <EventForm existingEvent={event} />
      </Card>
    </div>
  );
};

export default EditEventPage;
