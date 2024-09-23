import React from "react";
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
import EventParser from "./EventParser";
import FormParser from "./FormParser";
import { Button, Popconfirm } from "antd";
import { DeleteFilled } from "@ant-design/icons";

const componentMap = {
  navbar: NavbarParser,
  card: CardParser,
  title: TitleParser,
  description: DescriptionParser,
  press_release: PressReleaseParser,
  media: MediaParser,
  inner_section: InnerSectionParser,
  slider: SliderParser,
  gas: GasParser,
  footer: FooterParser,
  menu: MenuParser,
  event: EventParser,
  form: FormParser,
};

const ComponentParse = ({
  sectionId,
  section = [],
  editMode,
  onUpdateSectionData,
  onDeleteComponent,
  ...componentCallbacks
}) => {
  const handleComponentChange = (index, updatedComponent) => {
    const updatedSection = [...section];
    updatedSection[index] = updatedComponent;
    onUpdateSectionData && onUpdateSectionData(updatedSection);
  };

  const renderComponent = (item, index) => {
    const Component = componentMap[item?.type] || (() => <h1>{item?.type}</h1>);
    return (
      <Component
        key={index}
        item={item}
        editMode={editMode}
        onUpdateComponent={(updatedComponent) =>
          handleComponentChange(index, updatedComponent)
        }
        {...componentCallbacks}
      />
    );
  };

  return (
    <div>
      {section.map((item, index) => (
        <section key={index}>
          {editMode && (
            <Popconfirm
              title="Are you sure you want to delete this component?"
              onConfirm={() =>
                onDeleteComponent({ componentIndex: index, sectionId })
              }
            >
              <Button icon={<DeleteFilled />} type="primary" danger />
            </Popconfirm>
          )}
          {renderComponent(item, index)}
        </section>
      ))}
    </div>
  );
};

export default ComponentParse;
