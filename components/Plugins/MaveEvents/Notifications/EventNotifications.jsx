// components/Plugins/MaveEvents/Notifications/EventNotifications.jsx

import React, { useContext, useEffect } from "react";
import { MaveEventsContext } from "../../../../src/context/Plugins/MaveEventsContext";
import { notification } from "antd";

const EventNotifications = () => {
  const { events } = useContext(MaveEventsContext);

  useEffect(() => {
    // Example: Notify users of upcoming events
    events.forEach((event) => {
      const eventDate = new Date(event.startTime);
      const now = new Date();
      const diffInMs = eventDate - now;
      const diffInMinutes = diffInMs / (1000 * 60);

      if (diffInMinutes > 0 && diffInMinutes < 60) {
        // Notify for events starting within the next hour
        notification.info({
          message: `Upcoming Event: ${event.title}`,
          description: `Your event "${event.title}" starts at ${new Date(
            event.startTime
          ).toLocaleTimeString()}.`,
        });
      }
    });
  }, [events]);

  return null; // This component doesn't render anything
};

export default EventNotifications;
