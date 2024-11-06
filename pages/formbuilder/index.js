import { Button } from "antd";
import router from "next/router";
import MaveFormsList from "../../components/formbuilder/MaveFormsList";
import MaveFormsShowcase from "./mave-forms-showcase";

export default function FormBuilder() {
  return (
    <div className="mavecontainer">
      <center>
        <h1 className="text-theme text-2xl font-bold">
          Welcome to the Mave Form Builder
        </h1>
      </center>

      <div className="flex justify-center gap-8 mt-8">
        <Button
          className="bg-theme text-white text-xl font-bold py-6 px-8"
          onClick={() => {
            router.push("/formbuilder/create-form");
          }}
        >
          Create Form
        </Button>
      </div>
      <div>
        <MaveFormsShowcase />
      </div>
    </div>
  );
}
