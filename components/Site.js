import React from "react";
import SiteContent from "./SiteContent"; // Use the merged SiteContent

export default function Site({ children }) {
  return <SiteContent>{children}</SiteContent>;
}
