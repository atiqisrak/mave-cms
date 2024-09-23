import React from "react";
import TitleComponent from "../components/TitleComponent";
import MediaComponent from "../components/MediaComponent";
import MenuComponent from "../components/MenuComponent";
import SliderComponent from "../components/SliderComponent";
import CardComponent from "../components/CardComponent";
import FormComponent from "../components/FormComponent";
import FooterComponent from "../components/FooterComponent";
import EventComponent from "../components/EventComponent";

// Mapping component types to their respective component
const componentMap = {
  title: TitleComponent,
  media: MediaComponent,
  menu: MenuComponent,
  slider: SliderComponent,
  card: CardComponent,
  form: FormComponent,
  footer: FooterComponent,
  event: EventComponent,
};

const ComponentParser = ({ componentData, editMode, ...props }) => {
  if (!componentData || !componentData.type) return null;

  // Dynamically pick the component from the map
  const Component = componentMap[componentData.type];

  // Render the component if it's available in the map
  return Component ? (
    <Component data={componentData} editMode={editMode} {...props} />
  ) : (
    <div>Unknown component type: {componentData.type}</div>
  );
};

export default ComponentParser;
