// components/events/PreviewDrawer.jsx

import { Drawer, Button } from "antd";

const PreviewDrawer = ({ visible, onClose, onEdit, onPublish, eventData }) => {
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
          <div className="mb-4">
            <h2 className="text-2xl font-bold">{eventData?.title}</h2>
            <p className="text-gray-600">{eventData?.shortDescription}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Full Description</h3>
            <div
              dangerouslySetInnerHTML={{ __html: eventData?.fullDescription }}
            />
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Date & Time</h3>
            <p>
              {eventData?.date} at {eventData?.time}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Location</h3>
            <p>{eventData?.locationType}</p>
            {eventData?.locationType === "On-Site" ||
            eventData?.locationType === "Both" ? (
              <>
                <p>Venue: {eventData?.venue}</p>
                <p>Coordinates: {eventData?.mapCoordinates}</p>
              </>
            ) : null}
            {eventData?.locationType === "Online" ||
            eventData?.locationType === "Both" ? (
              <>
                <p>Online Link: {eventData?.onlineLink}</p>
                <p>Attendee Limit: {eventData?.attendeeLimit}</p>
              </>
            ) : null}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Agendas</h3>
            {eventData?.agendas?.map((agenda, index) => (
              <div key={index} className="mb-2">
                <p>
                  <strong>{agenda?.timeDuration}</strong>: {agenda?.topic}
                </p>
                {agenda?.description && <p>{agenda?.description}</p>}
                <p>Speaker: {agenda?.speaker}</p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Ticketing</h3>
            <p>Ticketing Option: {eventData?.ticketing}</p>
            <p>On-Site Price: ${eventData?.pricing?.onSite}</p>
            <p>Online Price: ${eventData?.pricing?.online}</p>
            <p>Booking Duration: {eventData?.bookingDuration}</p>
            <h4 className="text-lg font-semibold">Promo Codes</h4>
            {eventData?.promoCodes?.map((promo, index) => (
              <div key={index} className="mb-2">
                <p>Code: {promo?.code}</p>
                <p>Usage Limit: {promo?.usageLimit}</p>
                <p>
                  Discount: {promo?.discountType} - {promo?.discountValue}
                </p>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold">Organizer</h3>
            <p>
              Name:{" "}
              {eventData?.organizerSelection === "existing"
                ? eventData?.existingOrganizerId
                : eventData?.newOrganizer?.name}
            </p>
            {eventData?.organizerSelection === "new" && (
              <>
                <p>Country: {eventData?.newOrganizer?.country}</p>
                <p>Description: {eventData?.newOrganizer?.shortDescription}</p>
              </>
            )}
          </div>
          <div className="flex justify-end space-x-2">
            <Button onClick={onEdit}>Edit</Button>
            <Button type="primary" onClick={onPublish}>
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
