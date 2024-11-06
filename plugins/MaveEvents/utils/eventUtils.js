// plugins/MaveEvents/utils/eventUtils.js

export const formatEventData = (rawData) => {
  // Transform raw event data from the page builder into a usable format
  return {
    id: rawData.id,
    title:
      rawData.body
        .find((section) => section.sectionTitle === "Event Details")
        ?.data.find((item) => item.type === "title")?.value || "",
    description:
      rawData.body
        .find((section) => section.sectionTitle === "Event Details")
        ?.data.find((item) => item.type === "description")?.value || "",
    startTime:
      rawData.body
        .find((section) => section.sectionTitle === "Event Schedule")
        ?.data.find((item) => item.type === "datetime")?.value || "",
    endTime:
      rawData.body
        .find((section) => section.sectionTitle === "Event Schedule")
        ?.data.find((item) => item.type === "datetime")?.endValue || "",
    location:
      rawData.body
        .find((section) => section.sectionTitle === "Event Location")
        ?.data.find((item) => item.type === "location")?.value || "",
    isOnline:
      rawData.body
        .find((section) => section.sectionTitle === "Event Type")
        ?.data.find((item) => item.type === "toggle")?.value || false,
    googleMeetLink:
      rawData.body
        .find((section) => section.sectionTitle === "Online Details")
        ?.data.find((item) => item.type === "googleMeet")?.value || "",
    status: rawData.status || "Scheduled",
  };
};
