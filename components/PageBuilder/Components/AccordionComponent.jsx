// components/PageBuilder/Components/AccordionComponent.jsx

import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, message, Collapse } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AccordionSelectionModal from "../Modals/AccordionSelectionModal/AccordionSelectionModal";

const { Panel } = Collapse;
const { Title } = Typography;

const AccordionComponent = ({
  component,
  updateComponent,
  deleteComponent,
  preview = false, // New prop with default value
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accordionData, setAccordionData] = useState(component._mave || []);
  const [activeKeys, setActiveKeys] = useState([]);

  useEffect(() => {
    setAccordionData(component._mave || []);
  }, [component._mave]);

  const handleSelectAccordion = (newAccordionData) => {
    updateComponent({
      ...component,
      _mave: newAccordionData,
      id: component._id,
    });
    setAccordionData(newAccordionData);
    setIsModalVisible(false);
    message.success("Accordion updated successfully.");
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this component?",
      onOk: deleteComponent,
      okText: "Yes",
      cancelText: "No",
    });
  };

  const renderPanels = (data) => {
    return data?.map((item, index) => (
      <Panel header={item.title} key={index} forceRender>
        {item.contentType === "text" ? (
          <div
            dangerouslySetInnerHTML={{ __html: item.content }}
            className="accordion-content"
          />
        ) : item.contentType === "accordion" ? (
          <AccordionComponent
            component={{ _mave: item.nestedAccordion }}
            updateComponent={(updatedNested) => {
              const newData = [...accordionData];
              newData[index].nestedAccordion = updatedNested._mave;
              updateComponent({ ...component, _mave: newData });
            }}
            deleteComponent={() => {
              const newData = [...accordionData];
              newData.splice(index, 1);
              updateComponent({ ...component, _mave: newData });
            }}
            preview={preview} // Pass preview prop to nested AccordionComponent
          />
        ) : null}
      </Panel>
    ));
  };

  if (preview) {
    return (
      <div className="preview-accordion-component p-4 bg-gray-100 rounded-md">
        <Collapse
          accordion
          activeKey={activeKeys}
          onChange={(key) => setActiveKeys([key])}
          className="accordion-collapse"
        >
          {renderPanels(accordionData)}
        </Collapse>
      </div>
    );
  }

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      {/* Header with Component Title and Action Buttons */}
      <div className="flex justify-between items-center mb-4">
        <Title level={4}>Accordion Component</Title>
        <div>
          <Button
            icon={<EditOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="mr-2"
            disabled={preview}
          />
          <Button
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            danger
            disabled={preview}
          />
        </div>
      </div>

      {/* Accordion Display */}
      <Collapse
        accordion
        activeKey={activeKeys}
        onChange={(key) => setActiveKeys([key])}
        className="accordion-collapse"
      >
        {renderPanels(accordionData)}
      </Collapse>

      {/* Accordion Selection Modal */}
      {!preview && (
        <AccordionSelectionModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onSelectAccordion={handleSelectAccordion}
          initialData={accordionData}
        />
      )}
    </div>
  );
};

export default AccordionComponent;
