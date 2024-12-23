import React, { useState, useEffect } from "react";
import { Button, Modal, Popconfirm, Input, Radio, Select, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  ExportOutlined,
} from "@ant-design/icons";
import RichTextEditor from "../../RichTextEditor";
import instance from "../../../axios";

/**
 * TitleDescriptionComponent
 *
 * Props:
 * - component._mave contains {
 *     title,        // string
 *     altTitle,     // string
 *     description,  // HTML string
 *     altDescription, // HTML string
 *     linkType,     // "page" | "independent"
 *     link,         // string (if independent)
 *     linkPageId,   // number (if page)
 *   }
 * - preview: boolean (if true, just display read-only mode)
 * - updateComponent: function(componentData)
 * - deleteComponent: function()
 * - pages: array of page objects (like [{id, page_name_en, slug}, ...])
 */
const TitleDescriptionComponent = ({
  component,
  updateComponent,
  deleteComponent,
  preview = false,
}) => {
  // Local form data
  const [isEditing, setIsEditing] = useState(false);
  const [pages, setPages] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    altTitle: "",
    description: "",
    altDescription: "",
    linkType: "independent",
    link: "",
    linkPageId: null,
  });

  // Fetch pages on mount
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const { data } = await instance.get("/pages");
        setPages(data);
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    };
    fetchPages();
  }, []);

  // On mount or whenever component changes, sync local state
  useEffect(() => {
    if (component?._mave) {
      const {
        title = "",
        altTitle = "",
        description = "",
        altDescription = "",
        linkType = "independent",
        link = "",
        linkPageId = null,
      } = component._mave;
      setFormData({
        title,
        altTitle,
        description,
        altDescription,
        linkType,
        link,
        linkPageId,
      });
    }
  }, [component]);

  // ---------------------
  //   HANDLERS
  // ---------------------
  const handleDelete = () => {
    deleteComponent();
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleDiscard = () => {
    // Reset to original
    if (component?._mave) {
      const orig = component._mave;
      setFormData({
        title: orig.title || "",
        altTitle: orig.altTitle || "",
        description: orig.description || "",
        altDescription: orig.altDescription || "",
        linkType: orig.linkType || "independent",
        link: orig.link || "",
        linkPageId: orig.linkPageId || null,
      });
    }
    setIsEditing(false);
    message.info("Changes discarded.");
  };

  const handleSave = () => {
    // Validate required fields
    if (!formData.title.trim()) {
      Modal.error({ title: "Validation Error", content: "Title is required." });
      return;
    }
    // If linkType="page", build link from the selected page (like in CreateCardForm).
    let finalLink = formData.link;
    if (formData.linkType === "page") {
      const selectedPage = pages.find((p) => p.id === formData.linkPageId);
      if (!selectedPage) {
        Modal.error({
          title: "Validation Error",
          content: "Please select a page.",
        });
        return;
      }
      finalLink = `/${selectedPage.slug}?page_id=${selectedPage.id}&pageName=${selectedPage.page_name_en}`;
    } else {
      // If independent, just use what's typed in formData.link
      if (!formData.link.trim()) {
        Modal.error({
          title: "Validation Error",
          content: "Please enter a valid link.",
        });
        return;
      }
    }

    // Construct new _mave object
    const newMaveData = {
      ...formData,
      link: finalLink,
    };

    // Update parent component data
    updateComponent({
      ...component,
      _mave: newMaveData,
    });

    message.success("Data updated successfully.");
    setIsEditing(false);
  };

  // Update local form fields
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // If in preview mode, show read-only
  if (preview) {
    const {
      title,
      altTitle,
      description,
      altDescription,
      linkType,
      link,
      linkPageId,
    } = formData;
    return (
      <div className="border p-4 rounded-md bg-gray-50">
        <h3 className="text-xl font-semibold mb-2">Title & Description</h3>
        {/* Title + Alt Title */}
        <div className="text-theme font-bold">
          {title || "No Title"}
          {altTitle ? ` / ${altTitle}` : ""}
        </div>
        {/* Description */}
        <div
          className="mt-2"
          dangerouslySetInnerHTML={{ __html: description || "No Description" }}
        />
        {/* Alt Description */}
        {altDescription && (
          <div
            className="mt-2 italic"
            dangerouslySetInnerHTML={{ __html: altDescription }}
          />
        )}
        {/* Link info */}
        {link && (
          <p className="mt-2">
            <strong>Link: </strong>
            {linkType === "page" ? (
              <>
                Page #{linkPageId} → <span>{link}</span>
              </>
            ) : (
              <span>{link}</span>
            )}
          </p>
        )}
      </div>
    );
  }

  // Otherwise, show editing or display mode
  const {
    title,
    altTitle,
    description,
    altDescription,
    linkType,
    link,
    linkPageId,
  } = formData;

  return (
    <div className="border p-4 rounded-md bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Title & Description Component</h3>
        <div>
          {!isEditing ? (
            <>
              {component?._mave && (
                <Button
                  icon={<ExportOutlined />}
                  onClick={handleEditClick}
                  className="mavebutton"
                >
                  Change
                </Button>
              )}
              <Popconfirm
                title="Are you sure you want to delete this component?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  icon={<DeleteOutlined />}
                  className="mavecancelbutton"
                />
              </Popconfirm>
            </>
          ) : (
            <>
              <Button
                icon={<CheckOutlined />}
                onClick={handleSave}
                className="mavebutton"
              >
                Done
              </Button>
              <Button
                icon={<CloseOutlined />}
                onClick={handleDiscard}
                className="mavecancelbutton"
              >
                Discard
              </Button>
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Title */}
          <div>
            <label className="font-semibold">Title</label>
            <Input
              value={title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Enter title..."
              className="mb-2"
            />
          </div>
          {/* Alt Title */}
          <div>
            <label className="font-semibold">Alt Title</label>
            <Input
              value={altTitle}
              onChange={(e) => handleChange("altTitle", e.target.value)}
              placeholder="Enter alt title..."
              className="mb-2"
            />
          </div>

          {/* Description (Rich Text) */}
          <div className="md:col-span-2">
            <label className="font-semibold">Description</label>
            <RichTextEditor
              placeholder="Enter description..."
              onChange={(html) => handleChange("description", html)}
              //   value={description}
              defaultValue={description}
              editMode={true}
            />
          </div>

          {/* Alt Description (Rich Text) */}
          <div className="md:col-span-2">
            <label className="font-semibold">Alt Description</label>
            <RichTextEditor
              placeholder="Enter alt description..."
              onChange={(html) => handleChange("altDescription", html)}
              //   value={altDescription}
              defaultValue={altDescription}
              editMode={true}
            />
          </div>

          {/* Link Type (Radio) */}
          <div>
            <label className="font-semibold">Link Type</label>
            <Radio.Group
              onChange={(e) => handleChange("linkType", e.target.value)}
              value={linkType}
              className="mt-1 block"
            >
              <Radio value="page">Page Link</Radio>
              <Radio value="independent">Independent Link</Radio>
            </Radio.Group>
          </div>

          {/* If linkType=page → show page dropdown, else input */}
          {linkType === "page" ? (
            <div>
              <label className="font-semibold">Select Page</label>
              <Select
                placeholder="Select a Page"
                allowClear
                showSearch
                value={linkPageId || undefined}
                onChange={(value) => handleChange("linkPageId", value)}
                className="w-full mt-1"
              >
                {pages?.map((p) => (
                  <Select.Option key={p.id} value={p.id}>
                    {p.page_name_en}
                  </Select.Option>
                ))}
              </Select>
            </div>
          ) : (
            <div>
              <label className="font-semibold">Link (URL)</label>
              <Input
                placeholder="e.g. https://example.com or /some-path"
                value={link}
                onChange={(e) => handleChange("link", e.target.value)}
              />
            </div>
          )}
        </div>
      ) : component?._mave ? (
        <div>
          {/* Display Mode */}
          <p className="mb-1 text-lg font-bold">
            {title || "No Title"}
            {altTitle ? ` / ${altTitle}` : ""}
          </p>
          {/* Description */}
          <div
            dangerouslySetInnerHTML={{
              __html: description || "No Description",
            }}
          />
          {/* Alt Description */}
          {altDescription && (
            <div
              className="italic mt-2"
              dangerouslySetInnerHTML={{ __html: altDescription }}
            />
          )}
          {/* Link info */}
          {link && (
            <p className="mt-2">
              <strong>Link: </strong>
              {linkType === "page" && linkPageId ? `${link}` : link}
            </p>
          )}
        </div>
      ) : (
        // If no data yet, prompt user to create
        <Button
          icon={<EditOutlined />}
          onClick={handleEditClick}
          className="mavebutton w-fit"
        >
          Add Title & Description
        </Button>
      )}
    </div>
  );
};

export default TitleDescriptionComponent;
