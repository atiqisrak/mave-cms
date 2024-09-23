import React, { useState, useEffect } from "react";
import { Button, Spin, message } from "antd";
import EditorLayout from "./layouts/EditorLayout";
import SectionParser from "./parsers/SectionParser";
import AddComponentModal from "./modals/AddComponentModal";
import { fetchPages, updatePage } from "./utils/api";
import { createSection } from "./utils/sectionHelpers";
import generateRandomId from "./utils/generateRandomId";

const PageEditor = ({ pageId }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState("");

  // Fetch page data by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchPages();
        const page = response.find((p) => p._id === pageId);
        setPageData(page);
      } catch (error) {
        message.error("Error fetching page data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [pageId]);

  // Save page after editing
  const handleSavePage = async () => {
    try {
      await updatePage(pageId, pageData);
      message.success("Page saved successfully");
    } catch (error) {
      message.error("Error saving page");
    }
  };

  // Add a new section
  const handleAddSection = () => {
    const newSection = createSection(newSectionTitle);
    setPageData((prevData) => ({
      ...prevData,
      body: [...prevData.body, newSection],
    }));
    setModalVisible(false);
    setNewSectionTitle("");
  };

  // Delete a section
  const handleDeleteSection = (sectionId) => {
    setPageData((prevData) => ({
      ...prevData,
      body: prevData.body.filter((section) => section._id !== sectionId),
    }));
  };

  // Add new component to a section
  const handleAddComponent = (componentType, sectionId) => {
    const sectionIndex = pageData.body.findIndex(
      (section) => section._id === sectionId
    );
    if (sectionIndex !== -1) {
      const newComponent = {
        _id: generateRandomId(16),
        type: componentType,
        data: {}, // Placeholder for component-specific data
      };
      const updatedSections = [...pageData.body];
      updatedSections[sectionIndex].data.push(newComponent);
      setPageData((prevData) => ({
        ...prevData,
        body: updatedSections,
      }));
    }
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <EditorLayout>
      <div>
        <Button
          type="primary"
          style={{ marginBottom: "16px" }}
          onClick={() => setModalVisible(true)}
        >
          Add Section
        </Button>
        <Button type="primary" onClick={handleSavePage}>
          Save Page
        </Button>
        <div>
          {pageData?.body?.map((section) => (
            <SectionParser
              key={section._id}
              section={section}
              editMode={editMode}
              onDelete={() => handleDeleteSection(section._id)}
              onAddComponent={(componentType) =>
                handleAddComponent(componentType, section._id)
              }
            />
          ))}
        </div>
      </div>

      <AddComponentModal
        open={modalVisible}
        onClose={() => setModalVisible(false)}
        onAddSection={handleAddSection}
        newSectionTitle={newSectionTitle}
        setNewSectionTitle={setNewSectionTitle}
      />
    </EditorLayout>
  );
};

export default PageEditor;
