// pages/events/create.jsx

import EventsForm from "../../components/events/EventsForm";

const CreateEventPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>
      <EventsForm />
    </div>
  );
};

export default CreateEventPage;
