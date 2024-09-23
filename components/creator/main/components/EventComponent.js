import React from "react";
import { List, Typography } from "antd";

const { Text } = Typography;

const EventComponent = ({ data, editMode, onEventChange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {editMode ? (
        <div>
          <input
            type="text"
            value={data.eventTitle}
            onChange={(e) =>
              onEventChange({ ...data, eventTitle: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
            placeholder="Event Title"
          />
          <textarea
            value={data.eventDescription}
            onChange={(e) =>
              onEventChange({ ...data, eventDescription: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
            placeholder="Event Description"
          />
        </div>
      ) : (
        <List.Item>
          <List.Item.Meta
            title={<Text strong>{data.eventTitle}</Text>}
            description={data.eventDescription}
          />
        </List.Item>
      )}
    </div>
  );
};

export default EventComponent;
