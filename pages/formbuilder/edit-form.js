import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import FormEditor from "../../components/formbuilder/builder/FormEditor";
import { useRouter } from "next/router";

export default function EditForm() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div
      className="formbuilder"
      style={{
        padding: "2% 0 0 10%",
      }}
    >
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
            title: "Edit Form",
          },
        ]}
      />
      <DndProvider backend={HTML5Backend}>
        <FormEditor formId={id} />
      </DndProvider>
    </div>
  );
}
