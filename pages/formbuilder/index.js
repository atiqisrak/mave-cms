import { Button } from "antd";
import router from "next/router";

export default function FormBuilder() {
  return (
    <div className="ViewContainer">
      <h1>Welcome to the Mave Form Builder</h1>
      <Button
        onClick={() => {
          router.push("/formbuilder/create-form");
        }}
      >
        Create Form
      </Button>

      <Button
        onClick={() => {
          router.push("/formbuilder/create-form");
        }}
      >
        View Forms
      </Button>
    </div>
  );
}
