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
import { Button } from "antd";
import EventParser from "./EventParser";
import FormParser from "./FormParser";
import { DeleteFilled } from "@ant-design/icons";

const ComponentParse = ({
  section,
  sectionId,
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
}) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const handleComponentChange = (index, updatedComponent) => {
    if (onUpdateSectionData) {
      // console.log("updatedComponent", updatedComponent);
      const updatedSection = section ? [...section] : [];
      updatedSection[index] = updatedComponent;

      // console.log("Updated Section: ", updatedSection);
      onUpdateSectionData(updatedSection);
      setNewData(updatedSection);
      setSectionData(updatedSection);
    }
  };

  // const sectionData = section + sectionId;
  const sectionData =
  {
    id: sectionId,
    data: section,
  };


  const renderComponent = (item, index) => {
    switch (item?.type) {
      case "title":
        return (
          <TitleParser
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
            item={item}
            editMode={editMode}
            onDescriptionChange={(value, type) => onDescriptionChange(index, value, type)}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
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
            item={item}
            editMode={editMode}
            onCardSelect={onCardSelect}
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
          <FormParser
            item={item}
            editMode={editMode}
            onFormSelect={onFormSelect}
            onUpdateComponent={(updatedComponent) =>
              handleComponentChange(index, updatedComponent)
            }
          />
        );
      default:
        return <h1>{item.type}</h1>;
    }
  };

  return (
    <div>
      {console.log("Current Section ID: ", sectionData?.id)}
      {console.log("Current Section Data: ", sectionData?.data)}
      {/* {section?.map((item, index) => ( */}
      {/* {sectionData?.data?.map((item, index) => (
        <section key={index}>
          {
            editMode && (
              <Button
                style={{
                  position: "absolute",
                  right: "-20px",
                  marginTop: "20px",
                  zIndex: "1000",
                  color: "red",
                }}
                icon={<DeleteFilled />}
                onClick={() => {
                  console.log("Deleting component: ", item);
                  console.log("Delete Index: ", index);
                  onDeleteComponent(item, index);
                }}
              />
            )
          }
          {renderComponent(item, index)}

        </section>
      ))} */}
      {/* Render Section data and assign delete button beside each element to delete component and send section id also */}
      {sectionData?.data?.map((item, index) => (
        <section key={index}>
          {
            editMode && (
              <Button
                style={{
                  position: "absolute",
                  right: "-20px",
                  marginTop: "20px",
                  zIndex: "1000",
                  color: "red",
                }}
                icon={<DeleteFilled />}
                onClick={() => {
                  // console.log("nn Deleting component: ", item);
                  console.log("nn Delete Index: ", index);
                  console.log("nn Section ID: ", sectionData?.id);
                  onDeleteComponent({ componentIndex: index, sectionId: sectionData?.id });
                }}
              />
            )
          }
          {renderComponent(item, index)}

        </section>
      ))}
    </div>
  );
};

export default ComponentParse;
