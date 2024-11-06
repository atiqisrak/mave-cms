// components/Plugins/MaveEvents/RSVP/RSVPButton.jsx

import React, { useState } from "react";
import { Button, Modal, Radio, message } from "antd";
import eventService from "../../../../plugins/MaveEvents/services/eventService";

const RSVPButton = ({ eventId }) => {
  const [visible, setVisible] = useState(false);
  const [rsvp, setRsvp] = useState("Attending");

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      await eventService.rsvpEvent(eventId, rsvp);
      message.success("RSVP successful!");
      setVisible(false);
    } catch (error) {
      console.error("Error RSVPing:", error);
      message.error("Failed to RSVP. Please try again.");
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        RSVP
      </Button>
      <Modal
        title="RSVP to Event"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Submit"
      >
        <Radio.Group onChange={(e) => setRsvp(e.target.value)} value={rsvp}>
          <Radio value="Attending">Attending</Radio>
          <Radio value="Maybe">Maybe</Radio>
          <Radio value="Not Attending">Not Attending</Radio>
        </Radio.Group>
      </Modal>
    </>
  );
};

export default RSVPButton;
