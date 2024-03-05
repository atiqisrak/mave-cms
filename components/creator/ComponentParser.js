import React, { useState, useEffect } from "react";
import NavbarParser from "./NavbarParser";
import CardParser from "./CardParser";
import TitleParser from "./TitleParser";
import DescriptionParser from "./DescriptionParser";
import PressReleaseParser from "./PressReleaseParser";
import MediaParser from "./MediaParser";
import InnerSectionParser from "./InnerSectionParser";
import SliderParser from "./SliderParser";
import GasParser from "./GasParser";
import FooterParser from "./FooterParser";
import MenuParser from "./MenuParser";
import { Button, Popconfirm } from "antd";
import EventParser from "./EventParser";
import FormParser from "./FormParser";
import { DeleteFilled } from "@ant-design/icons";

const ComponentParse = ({
  sectionId,
  section,
  editMode,
  setEditMode,
  onNavbarSelect,
  onCardSelect,
  onMediaSelect,
  onEventSelect,
  onMenuSelect,
  onTitleChange,
  onDescriptionChange,
  onSliderSelect,
  onPressReleaseSelect,
  onUpdateSectionData,
  onFormSelect,
  onFooterSelect,
  setNewData,
  setSectionData,
  onDeleteComponent,
  setMediaId,
}) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  console.log("sdfgsdfgsdfg: ");
  const handleComponentChange = (index, updatedComponent) => {
    if (onUpdateSectionData) {
      console.log("updatedComponent", updatedComponent);
      const updatedSection = section ? [...section] : [];
      updatedSection[index] = updatedComponent;

      onUpdateSectionData(updatedSection);
      setNewData(updatedSection);
      setSectionData(updatedSection);
    }
  };

  const sectionData = {
    id: sectionId,
    data: section,
  };

  const renderComponent = (item, index) => {
    switch (item?.type) {
      case "navbar":
        return (
          <NavbarParser
            item={item}
            editMode={editMode}
            onNavbarSelect={onNavbarSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "card":
        return (
          <CardParser
            niloy={index}
            sectionId={section?._id}
            item={item}
            editMode={editMode}
            onCardSelect={onCardSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "title":
        return (
          <TitleParser
            key={index}
            item={item}
            editMode={editMode}
            onTitleChange={(value, type) => onTitleChange(index, value, type)}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "description":
        return (
          <DescriptionParser
            key={index}
            item={item}
            editMode={editMode}
            setEditMode={setEditMode}
            onDescriptionChange={(value, type) =>
              onDescriptionChange(index, value, type)
            }
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "press_release":
        return (
          <PressReleaseParser
            item={item}
            editMode={editMode}
            onPressReleaseSelect={onPressReleaseSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "footer":
        return (
          <FooterParser
            item={item}
            editMode={editMode}
            onFooterSelect={onFooterSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "media":
        return (
          <MediaParser
            item={item}
            editMode={editMode}
            onMediaSelect={onMediaSelect}
            setMediaId={setMediaId}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "event":
        return (
          <EventParser
            item={item}
            editMode={editMode}
            onEventSelect={onEventSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "inner-section":
        return (
          <InnerSectionParser
            item={item}
            editMode={editMode}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "gas":
        return (
          <GasParser
            item={item}
            editMode={editMode}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "slider":
        return (
          <SliderParser
            item={item}
            editMode={editMode}
            onSliderSelect={onSliderSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      case "menu":
        return (
          <MenuParser
            item={item}
            editMode={editMode}
            onMenuSelect={onMenuSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );

      case "form":
        return (
          <div style={{ display: "flex" }}>
            <FormParser
              item={item}
              editMode={editMode}
              onFormSelect={onFormSelect}
              onUpdateComponent={(updatedComponent) =>
                handleComponentChange(index, updatedComponent)
              }
            />
          </div>
        );
      default:
        return <h1>{item.type}</h1>;
    }
  };

  return (
    <div>
      {section &&
        sectionData?.data?.map((item, index) => (
          <section key={index}>
            {editMode && (
              <Popconfirm
                title="Are you sure to delete this component?"
                onConfirm={() =>
                  onDeleteComponent({
                    componentIndex: index,
                    sectionId: sectionData?.id,
                  })
                }
                okText="Yes"
                cancelText="No"
              >
                <Button
                  style={{
                    position: "absolute",
                    right: "-20px",
                    marginTop: "20px",
                    zIndex: "1000",
                    color: "red",
                  }}
                  icon={<DeleteFilled />}
                />
              </Popconfirm>
            )}
            {renderComponent(item, index)}
          </section>
        ))}
    </div>
  );
};

export default ComponentParse;
