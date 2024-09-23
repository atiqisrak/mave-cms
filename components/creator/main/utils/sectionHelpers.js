import generateRandomId from "./generateRandomId";

// Create a new section with default values
export const createSection = (title, type = "default") => {
  return {
    _id: generateRandomId(16),
    sectionTitle: title,
    type: type,
    data: [],
  };
};

// Find a section by ID within a page
export const findSectionById = (sections, sectionId) => {
  return sections.find((section) => section._id === sectionId);
};

// Update section data
export const updateSectionData = (section, newData) => {
  return {
    ...section,
    data: [...section.data, ...newData],
  };
};

// Remove a section by ID
export const removeSectionById = (sections, sectionId) => {
  return sections.filter((section) => section._id !== sectionId);
};
