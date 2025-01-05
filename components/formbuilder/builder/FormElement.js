// components/formbuilder/builder/FormElement.js
import React, { useRef, useState } from "react";
import { Button, Radio, Select, Input, Popconfirm } from "antd";
import { useDrag, useDrop } from "react-dnd";
import ElementConfig from "./ElementConfig";
import LocationFetcher from "../LocationFetcher";

const { TextArea } = Input;
const { Option } = Select;

const FormElement = ({ element, index, moveElement, onUpdateElement }) => {
  const ref = useRef(null);
  const [configVisible, setConfigVisible] = useState(false);

  // DRAG - for reordering existing elements
  const [{ isDragging }, dragRef] = useDrag({
    type: "formElement",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // DROP - accept "formElement" for reordering
  const [, dropRef] = useDrop({
    accept: "formElement",
    hover: (draggedItem) => {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveElement(dragIndex, hoverIndex);
      // Update the dragged item's index so it doesn't keep reordering
      draggedItem.index = hoverIndex;
    },
  });

  dragRef(dropRef(ref));

  const handleRemove = () => onUpdateElement(null, index);

  const handleConfigChange = (updatedElement) => {
    onUpdateElement(updatedElement, index);
  };

  // Display a simple preview
  const renderPreview = () => {
    switch (element.element_type) {
      case "input":
        if (element.input_type === "radio") {
          return (
            <Radio.Group>
              {element.options?.map((opt) => (
                <Radio key={opt._id} value={opt.value}>
                  {opt.title}
                </Radio>
              ))}
            </Radio.Group>
          );
        }
        if (["submit", "save", "reset"].includes(element.input_type)) {
          return (
            <Button disabled>{element.placeholder || element.label}</Button>
          );
        }
        return (
          <Input
            type={element.input_type}
            placeholder={element.placeholder}
            disabled
          />
        );
      case "textarea":
        return <TextArea placeholder={element.placeholder} rows={3} disabled />;
      case "select":
        return (
          <Select
            placeholder={element.placeholder}
            disabled
            style={{ width: "100%" }}
          >
            {element.options?.map((opt) => (
              <Option key={opt._id} value={opt.value}>
                {opt.title}
              </Option>
            ))}
          </Select>
        );
      case "location":
        return (
          <LocationFetcher
            divisionLabel={element.divisionLabel}
            districtLabel={element.districtLabel}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={ref}
      className={`border rounded p-4 mb-2 bg-white transition-shadow cursor-move ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-lg">{element.label}</h4>
        <div className="flex items-center gap-2">
          <Button
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setConfigVisible(!configVisible);
            }}
          >
            {configVisible ? "Hide Config" : "Show Config"}
          </Button>
          <Popconfirm
            title="Remove this item?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
            okText="Yes"
            cancelText="No"
          >
            <Button size="small" danger>
              Remove
            </Button>
          </Popconfirm>
        </div>
      </div>
      <div className="my-2">{renderPreview()}</div>

      {configVisible && (
        <ElementConfig element={element} onUpdate={handleConfigChange} />
      )}
    </div>
  );
};

export default FormElement;
