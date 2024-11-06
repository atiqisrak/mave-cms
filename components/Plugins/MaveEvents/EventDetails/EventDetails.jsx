// components/Plugins/MaveEvents/EventDetails/EventDetails.jsx

import React, { useContext, useEffect, useState } from "react";
import { MaveEventsContext } from "../../../../context/Plugins/MaveEventsContext";
import { useRouter } from "next/router";
import { Card, Tag, Spin, Button } from "antd";
import dayjs from "dayjs";
import RSVPButton from "../RSVP/RSVPButton";
import Link from "next/link";

const EventDetails = () => {
  const { events, loading } = useContext(MaveEventsContext);
  const router = useRouter();
  const { eventId } = router.query;
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
    <Card title={event.title} extra={<RSVPButton eventId={event.id} />}>
      <p>{event.description}</p>
      <p>
        <strong>Start:</strong>{" "}
        {dayjs(event.startTime).format("MMMM D, YYYY h:mm A")}
      </p>
      <p>
        <strong>End:</strong>{" "}
        {dayjs(event.endTime).format("MMMM D, YYYY h:mm A")}
      </p>
      <p>
        <strong>Type:</strong>
        {event.isOnline ? (
          <Tag color="blue">Online</Tag>
        ) : (
          <Tag color="green">On-Site</Tag>
        )}
      </p>
      {event.isOnline ? (
        <p>
          <strong>Google Meet Link:</strong>{" "}
          <Link
            href={event.googleMeetLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {event.googleMeetLink}
          </Link>
        </p>
      ) : (
        <p>
          <strong>Location:</strong> {event.location}
        </p>
      )}
      <p>
        <strong>Status:</strong>
        <Tag
          color={
            event.status === "Scheduled"
              ? "green"
              : event.status === "Postponed"
              ? "orange"
              : "red"
          }
        >
          {event.status}
        </Tag>
      </p>
    </Card>
  );
};

export default EventDetails;
