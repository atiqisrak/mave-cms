// components/PageBuilder/Components/ComponentList.jsx

import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ComponentRenderer from "./ComponentRenderer";
import ComponentSelectorModal from "../Modals/ComponentSelectorModal";
import { v4 as uuidv4 } from "uuid";

const ComponentList = ({ components, setComponents }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedComponents = Array.from(components);
    const [movedComponent] = reorderedComponents.splice(result.source.index, 1);
    reorderedComponents.splice(result.destination.index, 0, movedComponent);

    setComponents(reorderedComponents);
  };

  const addComponent = (newComponent) => {
    newComponent._id = uuidv4();
    setComponents([...components, newComponent]);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-components" type="COMPONENT">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {components?.map((component, index) => (
                <Draggable
                  key={component._id || component.id}
                  draggableId={component?._id || component?.id?.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      className="component bg-gray-50 p-3 mb-2 rounded-md"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ComponentRenderer
                        component={component}
                        index={index}
                        components={components}
                        setComponents={setComponents}
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
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
        block
        className="mt-4"
      >
        Add Component
      </Button>
      <ComponentSelectorModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectComponent={addComponent}
      />
    </div>
  );
};

export default ComponentList;
