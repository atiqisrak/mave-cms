import React from "react";
import DraggableElement from "./DraggableElement";
import {
  EditOutlined,
  MailOutlined,
  NumberOutlined,
  LockOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CheckOutlined,
  SwapOutlined,
  AlignLeftOutlined,
  UploadOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

import { Card } from "antd";

const elements = [
  {
    type: "input",
    label: "Text Input",
    icon: <EditOutlined />,
    element_type: "input",
    input_type: "text",
    placeholder: "Enter your text",
  },
  {
    type: "input",
    label: "Email",
    icon: <MailOutlined />,
    element_type: "input",
    input_type: "email",
    placeholder: "Enter your email",
  },
  {
    type: "input",
    label: "Number",
    icon: <NumberOutlined />,
    element_type: "input",
    input_type: "number",
    placeholder: "Enter a number",
  },
  {
    type: "input",
    label: "Password",
    icon: <LockOutlined />,
    element_type: "input",
    input_type: "password",
    placeholder: "Enter a password",
  },
  {
    type: "input",
    label: "Phone",
    icon: <PhoneOutlined />,
    element_type: "input",
    input_type: "phone",
    placeholder: "Enter a phone number",
  },
  {
    type: "input",
    label: "Date",
    icon: <CalendarOutlined />,
    element_type: "input",
    input_type: "date",
    placeholder: "Select a date",
  },
  {
    type: "input",
    label: "Radio",
    icon: <CheckOutlined />,
    element_type: "input",
    input_type: "radio",
    placeholder: null,
    options: [
      // { _id: "option1", title: "Option 1", value: "option_1" },
      // { _id: "option2", title: "Option 2", value: "option_2" },
    ],
  },
  {
    type: "select",
    label: "Select",
    icon: <SwapOutlined />,
    element_type: "select",
    placeholder: "Select an option",
    options: [
      // { _id: "option1", title: "Option 1", value: "option_1" },
      // { _id: "option2", title: "Option 2", value: "option_2" },
    ],
  },
  {
    type: "location",
    label: "Location",
    icon: <EnvironmentOutlined />,
    element_type: "location",
  },
  {
    type: "textarea",
    label: "Textarea",
    icon: <AlignLeftOutlined />,
    element_type: "textarea",
    placeholder: "Enter your message",
  },
  {
    type: "file",
    label: "File Upload",
    icon: <UploadOutlined />,
    element_type: "input",
    input_type: "file",
    placeholder: "Upload a file",
  },
  {
    type: "input",
    label: "Submit",
    icon: <CheckOutlined />,
    element_type: "input",
    input_type: "submit",
    placeholder: null,
    default_value: "Submit",
  },
];

const ElementPanel = () => {
  return (
    <Card
      className="element-panel bg-themetransparent py-4 
      rounded-md h-5/6 border-2 border-theme border-l-2 
      border-t-2 border-b-2 overflow-y-auto"
    >
      <center>
        <h3 className="text-black text-2xl font-bold mb-5">Elements</h3>
      </center>
      {elements?.map((element, index) => (
        <DraggableElement key={index} element={element} />
      ))}
    </Card>
  );
};

export default ElementPanel;
