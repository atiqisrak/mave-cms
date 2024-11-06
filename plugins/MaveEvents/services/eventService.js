// plugins/MaveEvents/services/eventService.js

import instance from "../../../axios";

const getAllEvents = async () => {
  // const response = await instance.get("/pages?type=Event");
  const allpages = await instance.get("/pages");
  const events = allpages.data.filter((page) => page.type === "Event");
  console.log("events", events);
  return events;
};

const getEventById = async (eventId) => {
  const response = await instance.get(`/pages/${eventId}`);
  return response.data;
};

const createEvent = async (eventData) => {
  const response = await instance.post("/pages", {
    type: "Event",
    ...eventData,
  });
  return response.data;
};

const updateEvent = async (eventId, updatedData) => {
  const response = await instance.put(`/pages/${eventId}`, updatedData);
  return response.data;
};

const deleteEvent = async (eventId) => {
  const response = await instance.delete(`/pages/${eventId}`);
  return response.data;
};

export default {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
};
