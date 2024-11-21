// pages/events/[eventId].jsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import instance from "../../axios";

const EventDetailPage = () => {
  const router = useRouter();
  const { eventId } = router.query;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    if (eventId) {
      instance
        .get(`/api/events/${eventId}`)
        .then((response) => {
          setEvent(response.data);
        })
        .catch((error) => {
          console.error("Error fetching event:", error);
        });
    }
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold">{event.title}</h1>
      <p className="text-gray-600">{event.shortDescription}</p>
      {/* Add more event details as needed */}
    </div>
  );
};

export default EventDetailPage;
