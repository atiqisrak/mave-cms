// components/PageBuilder/Sections/SectionList.jsx

import React from "react";
import Section from "./Section";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const SectionList = ({ sections, setSections }) => {
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedSections = Array.from(sections);
    const [movedSection] = reorderedSections.splice(result.source.index, 1);
    reorderedSections.splice(result.destination.index, 0, movedSection);

    setSections(reorderedSections);
  };

  const addSection = () => {
    const newSection = {
      _id: uuidv4(),
      sectionTitle: "New Section",
      data: [],
    };
    setSections([...sections, newSection]);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-sections" type="SECTION">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {sections.map((section, index) => (
                <Section
                  key={section._id}
                  section={section}
                  index={index}
                  sections={sections}
                  setSections={setSections}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={addSection}
        block
        className="mb-4"
      >
        Add Section
      </Button>
    </div>
  );
};

export default SectionList;
