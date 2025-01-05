// components/formbuilder/builder/ElementConfig.js
import React, { useEffect, useState } from "react";
import { Button } from "antd";

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
    setOptions([...options, newOption]);
  };

  const updateOption = (index, field, value) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
  };

  const removeOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  return (
    <div className="bg-gray-100 p-4 rounded mb-4">
      <label className="block font-semibold mb-1">Label</label>
      <input
        className="border rounded w-full p-2 mb-4"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <label className="block font-semibold mb-1">Placeholder</label>
      <input
        className="border rounded w-full p-2 mb-4"
        value={placeholder}
        onChange={(e) => setPlaceholder(e.target.value)}
      />

      {element.element_type === "input" && element.input_type === "radio" && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">Radio Options</label>
          {options.map((option, index) => (
            <div key={option._id} className="flex items-center mb-2 gap-2">
              <input
                className="border rounded p-2"
                placeholder="Title"
                value={option.title}
                onChange={(e) => updateOption(index, "title", e.target.value)}
              />
              <input
                className="border rounded p-2"
                placeholder="Value"
                value={option.value}
                onChange={(e) => updateOption(index, "value", e.target.value)}
              />
              <Button danger onClick={() => removeOption(index)}>
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
          {options.map((option, index) => (
            <div key={option._id} className="flex items-center mb-2 gap-2">
              <input
                className="border rounded p-2"
                placeholder="Title"
                value={option.title}
                onChange={(e) => updateOption(index, "title", e.target.value)}
              />
              <input
                className="border rounded p-2"
                placeholder="Value"
                value={option.value}
                onChange={(e) => updateOption(index, "value", e.target.value)}
              />
              <Button danger onClick={() => removeOption(index)}>
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={addOption}>Add Option</Button>
        </div>
      )}

      {element.element_type === "location" && (
        <>
          <label className="block font-semibold mb-1">Division Label</label>
          <input
            className="border rounded w-full p-2 mb-4"
            value={divisionLabel}
            onChange={(e) => setDivisionLabel(e.target.value)}
          />
          <label className="block font-semibold mb-1">District Label</label>
          <input
            className="border rounded w-full p-2 mb-4"
            value={districtLabel}
            onChange={(e) => setDistrictLabel(e.target.value)}
          />
        </>
      )}
    </div>
  );
};

export default ElementConfig;
