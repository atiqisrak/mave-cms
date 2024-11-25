// components/Events/RenderEvents.jsx

import React from "react";
import { Spin } from "antd";
import EventCard from "./EventCard";

const RenderEvents = ({
  events = [],
  handleEditEvent,
  handleExpand,
  expandedEventId,
  handleDeleteEvent,
  handleEditEventInfo,
}) => {
  return (
    <div>
      {events.length > 0 ? (
        <div className="columns-1 gap-4 xl:columns-2 2xl:columns-2">
          {events.map((event) => (
            <div className="break-inside-avoid" key={event.id}>
              <EventCard
                event={event}
                handleEditEvent={handleEditEvent}
                handleExpand={handleExpand}
                expandedEventId={expandedEventId}
                handleDeleteEvent={handleDeleteEvent}
                handleEditEventInfo={handleEditEventInfo}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default RenderEvents;
