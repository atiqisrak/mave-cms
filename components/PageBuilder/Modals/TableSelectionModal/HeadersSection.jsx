// TableSelectionModal/HeadersSection.jsx

import React from "react";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const { Title } = Typography;

/** Reorders a generic array by dragging from one index to another. */
const reorderArray = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/** Reorder the columns in each row's data. */
const reorderColumnsInRows = (rows, sourceIndex, destinationIndex) => {
  return rows.map((row) => {
    const newRow = Array.from(row);
    const [removed] = newRow.splice(sourceIndex, 1);
    newRow.splice(destinationIndex, 0, removed);
    return newRow;
  });
};

const HeadersSection = ({
  headers,
  setHeaders,
  visibleColumns,
  setVisibleColumns,
  rows,
  setRows,
}) => {
  // Add a new header and a parallel visibility flag
  const addHeader = () => {
    setHeaders([...headers, `Column ${headers.length + 1} Heading`]);
    setVisibleColumns([...visibleColumns, true]);
    // Also add an empty cell to each row
    setRows(rows.map((r) => [...r, ""]));
  };

  // Remove a header & its visibility
  const removeHeader = (index) => {
    const newHeaders = headers.filter((_, i) => i !== index);
    const newVisible = visibleColumns.filter((_, i) => i !== index);
    // Also remove that column from each row
    const newRows = rows.map((r) => {
      const newRow = [...r];
      newRow.splice(index, 1);
      return newRow;
    });

    setHeaders(newHeaders);
    setVisibleColumns(newVisible);
    setRows(newRows);
  };

  // Update the header text
  const updateHeader = (value, index) => {
    const newHeaders = [...headers];
    newHeaders[index] = value;
    setHeaders(newHeaders);
  };

  // Toggle a column's visibility
  const toggleVisibility = (index, checked) => {
    const updatedVisible = [...visibleColumns];
    updatedVisible[index] = checked;
    setVisibleColumns(updatedVisible);
  };

  // Handle drag-and-drop reordering
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    if (sourceIndex === destIndex) return;

    // Reorder the headers & the visibility array
    const reorderedHeaders = reorderArray(headers, sourceIndex, destIndex);
    const reorderedVisible = reorderArray(
      visibleColumns,
      sourceIndex,
      destIndex
    );
    // Also reorder columns in each row
    const reorderedRows = reorderColumnsInRows(rows, sourceIndex, destIndex);

    setHeaders(reorderedHeaders);
    setVisibleColumns(reorderedVisible);
    setRows(reorderedRows);
  };

  return (
    <>
      <Title level={4}>Columns</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-headers">
          {(provided) => (
            <div className="flex flex-row">
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {headers.map((header, index) => (
                  <Draggable
                    key={`header-${index}`}
                    draggableId={`header-${index}`}
                    index={index}
                  >
                    {(providedDraggable) => (
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: 8,
                          ...providedDraggable.draggableProps.style,
                        }}
                      >
                        {/* Header Text */}
                        <Form.Item
                          name={`header_${index}`}
                          initialValue={header}
                          rules={[
                            {
                              required: true,
                              message: "Header cannot be empty.",
                            },
                          ]}
                          style={{ marginBottom: 0 }}
                        >
                          <Input
                            style={{ width: 180, marginRight: 8 }}
                            placeholder={`Column ${index + 1} Heading`}
                            onChange={(e) =>
                              updateHeader(e.target.value, index)
                            }
                          />
                        </Form.Item>

                        {/* Visibility */}
                        <Checkbox
                          checked={visibleColumns[index]}
                          onChange={(e) =>
                            toggleVisibility(index, e.target.checked)
                          }
                          style={{ marginRight: 8 }}
                        >
                          Visible
                        </Checkbox>

                        {/* Remove Button */}
                        {headers.length > 1 && (
                          <Button
                            icon={<MinusOutlined />}
                            danger
                            type="text"
                            onClick={() => removeHeader(index)}
                          />
                        )}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button type="dashed" icon={<PlusOutlined />} onClick={addHeader}>
        Add Column
      </Button>
    </>
  );
};

export default HeadersSection;
