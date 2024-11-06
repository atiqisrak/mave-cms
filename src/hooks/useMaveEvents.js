// hooks/useMaveEvents.js

import { useContext } from "react";
import { MaveEventsContext } from "../context/Plugins/MaveEventsContext";

const useMaveEvents = () => {
  return useContext(MaveEventsContext);
};

export default useMaveEvents;
