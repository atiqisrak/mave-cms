// components/Plugins/MaveEvents/EventProvider.jsx

import React from "react";
import { MaveEventsProvider } from "../../../src/context/Plugins/MaveEventsContext";

const EventProvider = ({ children }) => {
  return <MaveEventsProvider>{children}</MaveEventsProvider>;
};

export default EventProvider;
