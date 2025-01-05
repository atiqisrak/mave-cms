// pages/formbuilder/edit-form.js
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormEditor from "../../components/formbuilder/builder/FormEditor";
import { useRouter } from "next/router";
import { FormBuilderProvider } from "../../src/context/FormBuilderContext";

export default function EditForm() {
  const router = useRouter();
  const { id } = router.query;

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
              title: "Edit Form",
            },
          ]}
        />

        <DndProvider backend={HTML5Backend}>
          <FormEditor formId={id} />
        </DndProvider>
      </div>
    </FormBuilderProvider>
  );
}
