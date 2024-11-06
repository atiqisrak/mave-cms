// components/Plugins/MaveEvents/Reminders/Reminders.jsx

import React, { useEffect, useContext } from "react";
import { MaveEventsContext } from "../../../../src/context/Plugins/MaveEventsContext";
import { notification } from "antd";
import dayjs from "dayjs";

const Reminders = () => {
  const { events } = useContext(MaveEventsContext);

  useEffect(() => {
    const now = dayjs();
    events.forEach((event) => {
      const eventTime = dayjs(event.startTime);
      const diffInMinutes = eventTime.diff(now, "minute");

      if (diffInMinutes === 30) {
        // 30 minutes before event
        notification.info({
          message: `Upcoming Event: ${event.title}`,
          description: `Your event "${
            event.title
          }" starts at ${eventTime.format("h:mm A")}.`,
        });
      }
    });
  }, [events]);

  return null;
};

export default Reminders;
