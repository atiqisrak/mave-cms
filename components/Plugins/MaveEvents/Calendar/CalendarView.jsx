// components/Plugins/MaveEvents/Calendar/CalendarView.jsx

import React, { useContext } from "react";
import { Calendar, Spin } from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { MaveEventsContext } from "../../../../src/context/Plugins/MaveEventsContext";

const CalendarView = () => {
  const { events, loading } = useContext(MaveEventsContext);

  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const dayEvents = events.filter((event) => {
      const eventDate = dayjs(event.startTime).format("YYYY-MM-DD");
      return eventDate === formattedDate;
    });

    return (
      <ul className="events">
        {dayEvents.map((event) => (
          <li key={event.id}>
            <Link href={`/plugins/mave-events/${event.id}`}>{event.title}</Link>
          </li>
        ))}
      </ul>
    );
  };

  if (loading) {
    return <Spin />;
  }

  return <Calendar cellRender={dateCellRender} />;
};

export default CalendarView;
