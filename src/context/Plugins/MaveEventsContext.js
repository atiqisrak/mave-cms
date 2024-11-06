// context/Plugins/MaveEventsContext.js

import React, { createContext, useState, useEffect } from "react";
import eventService from "../../../plugins/MaveEvents/services/eventService";

export const MaveEventsContext = createContext();

export const MaveEventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
    setLoading(false);
  };

  const createEvent = async (eventData) => {
    try {
      const newEvent = await eventService.createEvent(eventData);
      setEvents([...events, newEvent]);
    } catch (error) {
      console.error("Error creating event:", error);
      throw error;
    }
  };

  const updateEvent = async (eventId, updatedData) => {
    try {
      const updatedEvent = await eventService.updateEvent(eventId, updatedData);
      setEvents(
        events.map((event) => (event.id === eventId ? updatedEvent : event))
      );
    } catch (error) {
      console.error("Error updating event:", error);
      throw error;
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await eventService.deleteEvent(eventId);
      setEvents(events.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
      throw error;
    }
  };

  return (
    <MaveEventsContext.Provider
      value={{
        events,
        loading,
        fetchEvents,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </MaveEventsContext.Provider>
  );
};
