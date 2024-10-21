// components/PageBuilder/Components/ComponentRenderer.jsx

import React from "react";
import TextComponent from "./TextComponent";
import ParagraphComponent from "./ParagraphComponent";
import MediaComponent from "./MediaComponent";
import MenuComponent from "./MenuComponent";
import NavbarComponent from "./NavbarComponent";
import SliderComponent from "./SliderComponent";
import CardComponent from "./CardComponent";
import FooterComponent from "./FooterComponent";

const ComponentRenderer = ({ component, index, components, setComponents }) => {
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

  switch (component.type) {
    case "title":
      return (
        <>
          {console.log("TextComponent: ", component)}
          <TextComponent
            component={component}
            updateComponent={updateComponent}
            deleteComponent={deleteComponent}
          />
        </>
      );
    case "description":
      return (
        <ParagraphComponent
          component={component}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      );
    case "media":
      return (
        <MediaComponent
          component={component}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      );
    case "menu":
      return (
        <MenuComponent
          component={component}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      );
    case "navbar":
      return (
        <NavbarComponent
          component={component}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      );
    case "slider":
      return (
        <SliderComponent
          component={component}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      );
    case "card":
      return (
        <CardComponent
          component={component}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      );
    case "footer":
      return (
        <FooterComponent
          component={component}
          updateComponent={updateComponent}
          deleteComponent={deleteComponent}
        />
      );
    default:
      return <div>Unknown component type: {component.type}</div>;
  }
};

export default ComponentRenderer;
