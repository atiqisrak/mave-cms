// components/PageBuilder/Modals/ComponentSelectorModal.jsx

import React from "react";
import { Modal, List, Button, Drawer } from "antd";
import Image from "next/image";

const componentOptions = [
  { type: "title", name: "Title", icon: "/icons/mave/font.svg" },
  { type: "description", name: "Paragraph", icon: "/icons/mave/paragraph.svg" },
  { type: "media", name: "Media", icon: "/icons/mave/media.svg" },
  { type: "menu", name: "Menu", icon: "/icons/mave/menus.svg" },
  { type: "navbar", name: "Navbar", icon: "/icons/mave/navbar.svg" },
  { type: "slider", name: "Slider", icon: "/icons/mave/slider.svg" },
  { type: "card", name: "Card", icon: "/icons/mave/cards.svg" },
  { type: "footer", name: "Footer", icon: "/icons/mave/footer.svg" },
  { type: "video", name: "Video", icon: "/icons/mave/video.svg" },
  { type: "table", name: "Table", icon: "/icons/mave/table.svg" },
  { type: "accordion", name: "Accordion", icon: "/icons/mave/accordion.svg" },
  { type: "button", name: "Button", icon: "/icons/mave/button.svg" },
  { type: "gallery", name: "Gallery", icon: "/icons/mave/gallery.svg" },
  { type: "google-map", name: "Google Map", icon: "/icons/mave/map.svg" },
];

const ComponentSelectorModal = ({ isVisible, onClose, onSelectComponent }) => {
  const handleSelect = (componentType) => {
    const newComponent = { type: componentType };
    onSelectComponent(newComponent);
    onClose();
  };

  return (
    <Drawer
      title="Select Component Type"
      open={isVisible}
      onClose={onClose}
      placement="right"
    >
      <div className="grid grid-cols-2 gap-4">
        {componentOptions.map((component) => (
          <div
            key={component.type}
            className="flex flex-col items-center justify-center cursor-pointer border border-gray-200 rounded-lg p-4 hover:bg-theme"
            onClick={() => handleSelect(component.type)}
          >
            <Image
              src={component.icon}
              width={48}
              height={48}
              alt={component.name}
            />
            <p className="mt-2 text-md font-semibold">{component.name}</p>
          </div>
        ))}
      </div>
    </Drawer>
  );
};

export default ComponentSelectorModal;
