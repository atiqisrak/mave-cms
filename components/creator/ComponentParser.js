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

const ComponentParse = ({
  section,
  editMode,
  onNavbarSelect,
  onCardSelect,
  onMediaSelect,
  onMenuSelect,
  onTitleChange,
  onDescriptionChange,
  onSliderSelect,
  onPressReleaseSelect,
  onUpdateSectionData,
}) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  // Callback function to update section data
  const handleComponentChange = (index, updatedComponent) => {
    if (onUpdateSectionData) {
      onUpdateSectionData(index, updatedComponent);
    }
  };

  return (
    <div>
      {section?.map((item, index) => (
        <section key={index}>
          {(() => {
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
                    item={item}
                    editMode={editMode}
                    onTitleChange={onTitleChange}
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
                    onDescriptionChange={onDescriptionChange}
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
              case "footer":
                return (
                  <FooterParser
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
              default:
                return <h1>{item.type}</h1>;
            }
          })()}
        </section>
      ))}
    </div>
  );
};

export default ComponentParse;
