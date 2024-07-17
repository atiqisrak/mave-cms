import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import router from "next/router";
import { DndProvider } from "react-dnd";
import FormBuilder from "../../components/formbuilder/builder/FormBuilder";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function CreateForm() {
  return (
    <div className="ViewContainer">
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}
        items={[
          {
            title: <HomeOutlined />,
            href: "/",
          },
          {
            title: "Form Builder",
            href: "/formbuilder",
          },
          {
            title: "Create Form",
          },
        ]}
      />
      <DndProvider backend={HTML5Backend}>
        <FormBuilder />
      </DndProvider>
    </div>
  );
}
