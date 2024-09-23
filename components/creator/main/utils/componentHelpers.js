import generateRandomId from "./generateRandomId";

// Create a new component within a section
export const createComponent = (componentType, componentData = {}) => {
  return {
    _id: generateRandomId(16),
    type: componentType,
    ...componentData,
  };
};

// Update component data within a section
export const updateComponentData = (
  components,
  componentId,
  newComponentData
) => {
  return components.map((component) =>
    component._id === componentId
      ? { ...component, ...newComponentData }
      : component
  );
};

// Remove a component by ID
export const removeComponentById = (components, componentId) => {
  return components.filter((component) => component._id !== componentId);
};
