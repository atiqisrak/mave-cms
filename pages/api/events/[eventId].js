// pages/api/events/[eventId].js

import { v4 as uuidv4 } from "uuid";

let events = [];

export default function handler(req, res) {
  const { eventId } = req.query;
  const eventIndex = events.findIndex(
    (event) => event.id === parseInt(eventId)
  );

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (req.method === "GET") {
    return res.status(200).json(events[eventIndex]);
  }

  if (req.method === "PUT") {
    const updatedEvent = { ...events[eventIndex], ...req.body };
    events[eventIndex] = updatedEvent;
    return res.status(200).json(updatedEvent);
  }

  if (req.method === "DELETE") {
    events.splice(eventIndex, 1);
    return res.status(204).end();
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
