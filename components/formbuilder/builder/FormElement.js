// components/formbuilder/builder/FormElement.js
import React, { useRef, useState } from "react";
import { Button, Radio, Select, Input, Popconfirm, Upload } from "antd";
import { useDrag, useDrop } from "react-dnd";
import ElementConfig from "./ElementConfig";
import LocationFetcher from "../LocationFetcher";

const { TextArea } = Input;
const { Option } = Select;

const FormElement = ({
  element,
  index,
  moveElement = () => {},
  onUpdateElement = () => {},
}) => {
  const ref = useRef(null);
  const [configVisible, setConfigVisible] = useState(false);

  // DRAG - for reordering existing elements (in edit mode)
  const [{ isDragging }, dragRef] = useDrag({
    type: "formElement",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // DROP - accept "formElement" for reordering (in edit mode)
  const [, dropRef] = useDrop({
    accept: "formElement",
    hover: (draggedItem) => {
      if (!ref.current) return;
      const dragIndex = draggedItem.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveElement(dragIndex, hoverIndex);
      draggedItem.index = hoverIndex;
    },
  });

  // If this is the preview drawer, moveElement may be no-op
  dragRef(dropRef(ref));

  const handleRemove = () => onUpdateElement(null, index);

  const handleConfigChange = (updatedElement) => {
    onUpdateElement(updatedElement, index);
  };

  // Render a read-only field using Ant Design
  const renderPreview = () => {
    switch (element.element_type) {
      case "input": {
        if (element.input_type === "radio") {
          return (
            <Radio.Group disabled>
              {element.options?.map((opt) => (
                <Radio key={opt._id} value={opt.value}>
                  {opt.title}
                </Radio>
              ))}
            </Radio.Group>
          );
        }
        if (element.input_type === "file") {
          // For preview only, we can show a disabled Upload or Input
          return (
            <Upload disabled>
              <Button>Upload (Disabled Preview)</Button>
            </Upload>
          );
        }
        if (["submit", "save", "reset"].includes(element.input_type)) {
          return (
            <Button disabled>
              {element.placeholder || element.label || "Button"}
            </Button>
          );
        }
        // else text, email, number, password, tel, date
        return (
          <Input
            type={element.input_type}
            placeholder={element.placeholder}
            disabled
          />
        );
      }

      case "textarea":
        return <TextArea placeholder={element.placeholder} rows={3} disabled />;

      case "select":
        return (
          <Select
            placeholder={element.placeholder}
            disabled
            style={{ width: "100%" }}
            // For preview, we don't handle onChange
          >
            {element.options?.map((opt) => (
              <Option key={opt._id} value={opt.value}>
                {opt.title}
              </Option>
            ))}
          </Select>
        );

      case "location":
        // Show disabled location fetcher or a read-only representation
        return (
          <LocationFetcher
            divisionLabel={element.divisionLabel}
            districtLabel={element.districtLabel}
          />
        );

      case "button":
        // Some forms store button as separate element_type
        return (
          <Button disabled>
            {element.placeholder || element.label || "Button"}
          </Button>
        );

      default:
        return <p className="text-gray-500 italic">Unknown element type</p>;
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

      {/* Config panel for editing element metadata */}
      {configVisible && (
        <ElementConfig element={element} onUpdate={handleConfigChange} />
      )}
    </div>
  );
};

export default FormElement;
