// components/PageBuilder/Sections/Section.jsx

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import SectionHeader from "./SectionHeader";
import ComponentList from "../Components/ComponentList";

const Section = ({ section, index, sections, setSections }) => {
  const updateSection = (updatedSection) => {
    const newSections = [...sections];
    newSections[index] = updatedSection;
    setSections(newSections);
  };

  const deleteSection = () => {
    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);
  };

  return (
    <Draggable draggableId={section._id} index={index}>
      {(provided) => (
        <div
          className="section bg-white shadow-md rounded-md p-4 mb-4"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <SectionHeader
            section={section}
            updateSection={updateSection}
            deleteSection={deleteSection}
            dragHandleProps={provided.dragHandleProps}
          />
          <ComponentList
            components={section.data}
            setComponents={(newComponents) => {
              const updatedSection = { ...section, data: newComponents };
              updateSection(updatedSection);
            }}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Section;
