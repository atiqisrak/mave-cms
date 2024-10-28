// components/PageBuilder/Components/AccordionComponent.jsx

import React, { useState, useEffect } from "react";
import { Button, Modal, Typography, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import AccordionSelectionModal from "../Modals/AccordionSelectionModal/AccordionSelectionModal";
import { Collapse } from "antd";

const { Panel } = Collapse;
const { Title } = Typography;

const AccordionComponent = ({
  component,
  updateComponent,
  deleteComponent,
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
          />
        ) : null}
      </Panel>
    ));
  };

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
          />
          <Button icon={<DeleteOutlined />} onClick={handleDelete} danger />
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
      <AccordionSelectionModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSelectAccordion={handleSelectAccordion}
        initialData={accordionData}
      />
    </div>
  );
};

export default AccordionComponent;
