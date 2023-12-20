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
}) => {
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  return (
    <div>
      {section?.map((item, index) => (
        <section>
          {(() => {
            switch (item?.type) {
              case "navbar":
                return (
                  <NavbarParser
                    item={item}
                    editMode={editMode}
                    onNavbarSelect={onNavbarSelect}
                  />
                );
              case "card":
                return (
                  <CardParser
                    item={item}
                    editMode={editMode}
                    onCardSelect={onCardSelect}
                  />
                );
              case "title":
                return (
                  <TitleParser
                    item={item}
                    editMode={editMode}
                    onTitleChange={onTitleChange}
                  />
                );
              case "description":
                return (
                  <DescriptionParser
                    item={item}
                    editMode={editMode}
                    onDescriptionChange={onDescriptionChange}
                  />
                );
              case "press_release":
                return (
                  <PressReleaseParser
                    item={item}
                    editMode={editMode}
                    onPressReleaseSelect={onPressReleaseSelect}
                  />
                );
              case "media":
                return (
                  <MediaParser
                    item={item}
                    editMode={editMode}
                    onMediaSelect={onMediaSelect}
                  />
                );
              case "inner-section":
                return <InnerSectionParser item={item} editMode={editMode} />;
              case "footer":
                return <FooterParser item={item} editMode={editMode} />;
              case "gas":
                return <GasParser item={item} editMode={editMode} />;
              case "slider":
                return (
                  <SliderParser
                    item={item}
                    editMode={editMode}
                    onSliderSelect={onSliderSelect}
                  />
                );
              case "menu":
                return (
                  <MenuParser
                    item={item}
                    editMode={editMode}
                    onMenuSelect={onMenuSelect}
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
