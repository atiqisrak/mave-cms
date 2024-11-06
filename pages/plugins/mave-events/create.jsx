// pages/plugins/mave-events/create.jsx

import React from "react";
import { Card } from "antd";
import EventForm from "../../../components/Plugins/MaveEvents/EventForm/EventForm";

const CreateEventPage = () => {
  return (
    <div className="p-4">
      <Card title="Create New Event">
        <EventForm />
      </Card>
    </div>
  );
};

export default CreateEventPage;
