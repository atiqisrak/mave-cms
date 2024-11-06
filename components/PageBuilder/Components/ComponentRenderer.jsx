// components/PageBuilder/Components/ComponentRenderer.jsx

import React, { useState } from "react";
import TextComponent from "./TextComponent";
import ParagraphComponent from "./ParagraphComponent";
import MediaComponent from "./MediaComponent";
import MenuComponent from "./MenuComponent";
import NavbarComponent from "./NavbarComponent";
import SliderComponent from "./SliderComponent";
import CardComponent from "./CardComponent";
import FooterComponent from "./FooterComponent";
import VideoComponent from "./VideoComponent";
import TableComponent from "./TableComponent";
import AccordionComponent from "./AccordionComponent";
import ButtonComponent from "./ButtonComponent";
import GalleryComponent from "./GalleryComponent";
import GoogleMapComponent from "./GoogleMapComponent";
import IconListComponent from "./IconListComponent/IconListComponent";
import TestimonialComponent from "./TestimonialComponent/TestimonialComponent";

const COMPONENT_MAP = {
  title: TextComponent,
  description: ParagraphComponent,
  media: MediaComponent,
  menu: MenuComponent,
  navbar: NavbarComponent,
  slider: SliderComponent,
  card: CardComponent,
  footer: FooterComponent,
  video: VideoComponent,
  table: TableComponent,
  accordion: AccordionComponent,
  button: ButtonComponent,
  gallery: GalleryComponent,
  "google-map": GoogleMapComponent,
  iconlist: IconListComponent,
  testimonial: TestimonialComponent,
};

const ComponentRenderer = ({
  component,
  index,
  components,
  setComponents,
  preview = false,
}) => {
  const updateComponent = (updatedComponent) => {
    const newComponents = [...components];
    newComponents[index] = updatedComponent;
    setComponents(newComponents);
  };

  const deleteComponent = () => {
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setComponents(newComponents);
  };

  const SpecificComponent = COMPONENT_MAP[component.type];

  if (!SpecificComponent) {
    return <div>Unknown component type: {component.type}</div>;
  }

  return (
    <div className="relative border border-gray-300 p-4 mb-4">
      <SpecificComponent
        component={component}
        updateComponent={updateComponent}
        deleteComponent={deleteComponent}
        preview={preview}
      />
    </div>
  );
};

export default ComponentRenderer;
