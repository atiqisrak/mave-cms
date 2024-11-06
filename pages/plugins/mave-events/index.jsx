// pages/plugins/mave-events/index.jsx

import React from "react";
import { Button } from "antd";
import Link from "next/link";
import CalendarView from "../../../components/Plugins/MaveEvents/Calendar/CalendarView";
import EventList from "../../../components/Plugins/MaveEvents/EventList/EventList";
import EventNotifications from "../../../components/Plugins/MaveEvents/Notifications/EventNotifications";
import Reminders from "../../../components/Plugins/MaveEvents/Reminders/Reminders";

const EventsPage = () => {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events</h1>
        <Link href="/plugins/mave-events/create">
          <Button type="primary">Create Event</Button>
        </Link>
      </div>
      <CalendarView />
      <EventList />
      <EventNotifications />
      <Reminders />
    </div>
  );
};

export default EventsPage;
