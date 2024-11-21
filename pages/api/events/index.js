// pages/api/events/index.js

import { v4 as uuidv4 } from "uuid";

let events = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    const { type } = req.query;
    if (type && type !== "Event") {
      return res.status(400).json({ message: "Invalid type parameter" });
    }
    const filteredEvents = type
      ? events.filter((event) => event.type === type)
      : events;
    return res.status(200).json(filteredEvents);
  }

  if (req.method === "POST") {
    const event = req.body;
    event.id = events.length + 1;
    event._id = uuidv4();
    events.push(event);
    return res.status(201).json(event);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
