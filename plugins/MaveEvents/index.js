// plugins/MaveEvents/index.js

import React from "react";
import EventProvider from "../../components/Plugins/MaveEvents/EventProvider";

const MaveEventsPlugin = ({ children }) => {
  return <EventProvider>{children}</EventProvider>;
};

export default MaveEventsPlugin;
