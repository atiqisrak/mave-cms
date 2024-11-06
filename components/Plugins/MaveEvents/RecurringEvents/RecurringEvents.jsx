// components/Plugins/MaveEvents/RecurringEvents/RecurringEvents.jsx

import React, { useState } from "react";
import { Form, Radio, DatePicker, Button } from "antd";
import dayjs from "dayjs";

const RecurringEvents = ({ onSetRecurring }) => {
  const [recurrence, setRecurrence] = useState("none");
  const [recurrenceEnd, setRecurrenceEnd] = useState(null);

  const handleRecurrenceChange = (e) => {
    setRecurrence(e.target.value);
  };

  const handleSubmit = () => {
    onSetRecurring({
      recurrence,
      recurrenceEnd: recurrenceEnd ? recurrenceEnd.toISOString() : null,
    });
  };

  return (
    <Form layout="vertical">
      <Form.Item label="Recurring Event">
        <Radio.Group onChange={handleRecurrenceChange} value={recurrence}>
          <Radio value="none">None</Radio>
          <Radio value="daily">Daily</Radio>
          <Radio value="weekly">Weekly</Radio>
          <Radio value="monthly">Monthly</Radio>
        </Radio.Group>
      </Form.Item>

      {recurrence !== "none" && (
        <Form.Item label="Recurrence End Date">
          <DatePicker onChange={(date) => setRecurrenceEnd(date)} />
        </Form.Item>
      )}

      {recurrence !== "none" && (
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>
            Set Recurrence
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

export default RecurringEvents;
