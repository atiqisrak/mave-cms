// components/events/PreviewDrawer.jsx

import { Drawer, Button } from "antd";
import moment from "moment";

const PreviewDrawer = ({ visible, onClose, onEdit, onPublish, eventData }) => {
  const formatDate = (date, formatStr) => {
    if (!date) return "";
    const parsedDate = moment(date);
    if (!parsedDate.isValid()) {
      return "";
    }
    return parsedDate.format(formatStr);
  };

  return (
    <Drawer
      title="Preview Event"
      placement="right"
      onClose={onClose}
      open={visible}
      width={640}
    >
      {eventData ? (
        <>
          {/* Event Title and Short Description */}
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{eventData.title}</h2>
            <p className="text-gray-600">{eventData.shortDescription}</p>
          </div>

          {/* Full Description */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Full Description</h3>
            <div
              dangerouslySetInnerHTML={{ __html: eventData.fullDescription }}
            />
          </div>

          {/* Date & Time */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Date & Time</h3>
            <p>
              {formatDate(eventData.date, "YYYY-MM-DD")} at{" "}
              {formatDate(eventData.time, "h:mm A")}
            </p>
          </div>

          {/* Date & Time */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Date & Time</h3>
            <p>
              {eventData.date && eventData.date.format("YYYY-MM-DD")} at{" "}
              {eventData.time && eventData.time.format("h:mm A")}
            </p>
          </div>

          {/* Location Details */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Location</h3>
            <p>Type: {eventData.locationType}</p>
            {eventData.locationType === "On-Site" ||
            eventData.locationType === "Both" ? (
              <>
                <p>Venue: {eventData.venue}</p>
                <p>Coordinates: {eventData.mapCoordinates}</p>
              </>
            ) : null}
            {eventData.locationType === "Online" ||
            eventData.locationType === "Both" ? (
              <>
                <p>Online Link: {eventData.onlineLink}</p>
                <p>Attendee Limit: {eventData.attendeeLimit}</p>
              </>
            ) : null}
          </div>

          {/* Agendas */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Agendas</h3>
            {eventData.agendas?.map((agenda, index) => (
              <div key={index} className="mb-2">
                <p>
                  <strong>
                    {formatDate(agenda.startTime, "h:mm A")} -{" "}
                    {formatDate(agenda.endTime, "h:mm A")}
                  </strong>
                  : {agenda.topic}
                </p>
                {agenda.description && <p>{agenda.description}</p>}
                <p>Speaker: {agenda.speaker}</p>
              </div>
            ))}
          </div>

          {/* Ticketing Details */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Ticketing</h3>
            <p>Options: {eventData.ticketing?.join(", ")}</p>

            {/* Display each ticket type and price */}
            {eventData.ticketTypes?.map((ticket, index) => (
              <div key={index}>
                <p>
                  Type: {ticket.type}{" "}
                  {ticket.type !== "Free" && ticket.price
                    ? `- $${ticket.price}`
                    : ""}
                </p>
              </div>
            ))}

            {/* Booking Duration */}
            <p>
              Booking Duration:{" "}
              {eventData.bookingDuration
                ? `${formatDate(eventData.bookingDuration[0], "YYYY-MM-DD HH:mm A")} to ${formatDate(
                    eventData.bookingDuration[1],
                    "YYYY-MM-DD HH:mm A"
                  )}`
                : ""}
            </p>

            {/* Promo Codes */}
            {eventData.promoCodes?.length > 0 && (
              <>
                <h4 className="text-lg font-semibold">Promo Codes</h4>
                {eventData.promoCodes.map((promo, index) => (
                  <div key={index} className="mb-2">
                    <p>Code: {promo.code}</p>
                    <p>Usage Limit: {promo.usageLimit}</p>
                    <p>
                      Discount: {promo.discountType} - {promo.discountValue}
                    </p>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Organizer Information */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Organizer</h3>
            <p>
              Name:{" "}
              {eventData.organizerSelection === "existing"
                ? eventData.existingOrganizerId
                : eventData.newOrganizer?.name}
            </p>
            {eventData.organizerSelection === "new" && (
              <>
                <p>Country: {eventData.newOrganizer.country}</p>
                <p>Description: {eventData.newOrganizer.shortDescription}</p>
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-6">
            <Button onClick={onEdit} className="mavecancelbutton">
              Edit
            </Button>
            <Button className="mavebutton" onClick={onPublish}>
              Publish
            </Button>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Drawer>
  );
};

export default PreviewDrawer;
