import React from "react";
import { Card } from "antd";

const CardComponent = ({ data, editMode, onCardChange }) => {
  return (
    <div style={{ marginBottom: "16px" }}>
      {editMode ? (
        <div>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onCardChange({ ...data, title: e.target.value })}
            style={{
              width: "100%",
              padding: "8px",
              marginBottom: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
            placeholder="Card Title"
          />
          <textarea
            value={data.description}
            onChange={(e) =>
              onCardChange({ ...data, description: e.target.value })
            }
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
            }}
            placeholder="Card Description"
          />
        </div>
      ) : (
        <Card title={data.title} bordered={false}>
          <p>{data.description}</p>
        </Card>
      )}
    </div>
  );
};

export default CardComponent;
