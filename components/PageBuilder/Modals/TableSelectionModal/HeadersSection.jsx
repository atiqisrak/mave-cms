// TableSelectionModal/HeadersSection.jsx

import React from "react";
import { Form, Input, Button, Typography, Checkbox } from "antd";
import { PlusOutlined, MinusOutlined, DragOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

const { Title } = Typography;

/** Helper to reorder an array by dragging an item from one index to another. */
const reorderArray = (array, startIndex, endIndex) => {
  const result = Array.from(array);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/** Reorder columns in each row of the table data. */
const reorderColumnsInRows = (rows, sourceIndex, destIndex) => {
  return rows.map((row) => {
    const newRow = [...row];
    const [removed] = newRow.splice(sourceIndex, 1);
    newRow.splice(destIndex, 0, removed);
    return newRow;
  });
};

const HeadersSection = ({
  headers, // array of { id, name }
  setHeaders,
  visibleColumns, // array of booleans
  setVisibleColumns,
  rows, // array of arrays
  setRows,
  filterColumns, // array of header names
  setFilterColumns,
}) => {
  // Add a new column
  const addHeader = () => {
    // 1) Add a new header object
    const newHeader = { id: uuidv4(), name: `Column ${headers.length + 1}` };
    setHeaders([...headers, newHeader]);

    // 2) Make it visible by default
    setVisibleColumns([...visibleColumns, true]);

    // 3) Also append an empty cell to every row
    const updatedRows = rows.map((r) => [...r, ""]);
    setRows(updatedRows);
  };

  // Remove a column at index
  const removeHeader = (index) => {
    // 1) Remove from headers
    const newHeaders = headers.filter((_, i) => i !== index);
    // 2) Remove from visibleColumns
    const newVisible = visibleColumns.filter((_, i) => i !== index);
    // 3) Remove that column from each row
    const newRows = rows.map((r) => {
      const rowCopy = [...r];
      rowCopy.splice(index, 1);
      return rowCopy;
    });

    setHeaders(newHeaders);
    setVisibleColumns(newVisible);
    setRows(newRows);
  };

  // Update the header text
  const updateHeaderName = (value, index) => {
    const oldName = headers[index].name;
    const updated = [...headers];
    updated[index] = { ...updated[index], name: value };
    setHeaders(updated);

    if (filterColumns.includes(oldName)) {
      const newFilterColumns = filterColumns.map((fc) =>
        fc === oldName ? value : fc
      );
      setFilterColumns(newFilterColumns);
    }
  };

  // Toggle a column’s visibility
  const toggleColumnVisibility = (index, checked) => {
    const updatedVis = [...visibleColumns];
    updatedVis[index] = checked;
    setVisibleColumns(updatedVis);
  };

  // Reorder columns when user drags
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;

    // Reorder the headers
    const reorderedHeaders = reorderArray(
      headers,
      source.index,
      destination.index
    );
    // Reorder the visibility array
    const reorderedVisible = reorderArray(
      visibleColumns,
      source.index,
      destination.index
    );
    // Reorder the columns in rows
    const reorderedRows = reorderColumnsInRows(
      rows,
      source.index,
      destination.index
    );

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
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="bg-gray-200 p-4 rounded-lg flex flex-row flex-wrap gap-4"
            >
              {headers.map((colObj, index) => (
                <Draggable
                  key={colObj.id} // stable unique key
                  draggableId={colObj.id}
                  index={index}
                >
                  {(providedDraggable) => (
                    <div className="flex justify-between items-center bg-white my-2 rounded-lg py-2 px-4 gap-2">
                      <div
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={{
                          ...providedDraggable.draggableProps.style,
                        }}
                        className="flex items-center gap-2"
                      >
                        {/* Header text input */}
                        <Form.Item
                          name={`header_${index}`}
                          initialValue={colObj.name}
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
                            placeholder={`Column ${index + 1}`}
                            onChange={(e) =>
                              updateHeaderName(e.target.value, index)
                            }
                          />
                        </Form.Item>

                        {/* Visibility checkbox */}
                        <Checkbox
                          checked={visibleColumns[index]}
                          onChange={(e) =>
                            toggleColumnVisibility(index, e.target.checked)
                          }
                          style={{ marginRight: 8 }}
                        >
                          Visible
                        </Checkbox>

                        {/* Remove button */}
                        {headers.length > 1 && (
                          <Button
                            icon={<MinusOutlined />}
                            danger
                            onClick={() => removeHeader(index)}
                          />
                        )}
                      </div>
                      <Button
                        icon={<DragOutlined />}
                        style={{ cursor: "grab" }}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button type="dashed" onClick={addHeader} icon={<PlusOutlined />}>
        Add Column
      </Button>
    </>
  );
};

export default HeadersSection;
