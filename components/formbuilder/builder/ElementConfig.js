// components/formbuilder/builder/ElementConfig.js
import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";

const ElementConfig = ({ element, onUpdate }) => {
  const [label, setLabel] = useState(element.label);
  const [placeholder, setPlaceholder] = useState(element.placeholder || "");
  const [options, setOptions] = useState(element.options || []);
  const [divisionLabel, setDivisionLabel] = useState(
    element.divisionLabel || "Select Division"
  );
  const [districtLabel, setDistrictLabel] = useState(
    element.districtLabel || "Select District"
  );

  // Send updated props to the parent whenever local states change
  useEffect(() => {
    onUpdate({
      ...element,
      label,
      placeholder,
      options,
      divisionLabel,
      districtLabel,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, placeholder, options, divisionLabel, districtLabel]);

  const addOption = () => {
    const newOption = { _id: Date.now().toString(), title: "", value: "" };
    setOptions((prev) => [...prev, newOption]);
  };

  const updateOption = (idx, field, value) => {
    setOptions((prev) => {
      const updated = [...prev];
      updated[idx][field] = value;
      return updated;
    });
  };

  const removeOption = (idx) => {
    setOptions((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <label className="block font-semibold mb-1">Label</label>
      <Input
        className="mb-4"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <label className="block font-semibold mb-1">Placeholder</label>
      <Input
        className="mb-4"
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
      />

      {/* If it's a radio or select, manage 'options' */}
      {element.element_type === "input" && element.input_type === "radio" && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Radio Options</label>
          {options.map((opt, idx) => (
            <div key={opt._id} className="flex items-center mb-2 gap-2">
              <Input
                placeholder="Title"
                value={opt.title}
                onChange={(e) => updateOption(idx, "title", e.target.value)}
              />
              <Input
                placeholder="Value"
                value={opt.value}
                onChange={(e) => updateOption(idx, "value", e.target.value)}
              />
              <Button danger onClick={() => removeOption(idx)}>
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addOption}>Add Option</Button>
        </div>
      )}

      {element.element_type === "select" && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Select Options</label>
          {options.map((opt, idx) => (
            <div key={opt._id} className="flex items-center mb-2 gap-2">
              <Input
                placeholder="Title"
                value={opt.title}
                onChange={(e) => updateOption(idx, "title", e.target.value)}
              />
              <Input
                placeholder="Value"
                value={opt.value}
                onChange={(e) => updateOption(idx, "value", e.target.value)}
              />
              <Button danger onClick={() => removeOption(idx)}>
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addOption}>Add Option</Button>
        </div>
      )}

      {/* If it's a location element, manage labels for division/district */}
      {element.element_type === "location" && (
        <>
          <label className="block font-semibold mb-1">Division Label</label>
          <Input
            className="mb-4"
            value={divisionLabel}
            onChange={(e) => setDivisionLabel(e.target.value)}
          />
          <label className="block font-semibold mb-1">District Label</label>
          <Input
            className="mb-4"
            value={districtLabel}
            onChange={(e) => setDistrictLabel(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default ElementConfig;
