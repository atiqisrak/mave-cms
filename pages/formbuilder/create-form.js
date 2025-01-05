// pages/formbuilder/create-form.js
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormBuilder from "../../components/formbuilder/builder/FormBuilder";
import { FormBuilderProvider } from "../../src/context/FormBuilderContext";

export default function CreateForm() {
  return (
    <FormBuilderProvider>
      <div className="mx-auto px-4 py-6">
        <Breadcrumb
          className="mb-4"
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
    </FormBuilderProvider>
  );
}
