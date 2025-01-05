// pages/formbuilder/index.js
import { Button } from "antd";
import router from "next/router";
import MaveFormsShowcase from "./mave-forms-showcase";
import { FormBuilderProvider } from "../../src/context/FormBuilderContext";

export default function FormBuilder() {
  return (
    <FormBuilderProvider>
      <div className="container mx-auto py-8">
        <center>
          <h1 className="text-theme text-2xl font-bold mb-4">
            Welcome to the Mave Form Builder
          </h1>
        </center>

        <div className="flex justify-center gap-8 mb-8">
          <Button
            className="bg-theme text-white text-xl font-bold py-2 px-6 hover:opacity-90"
            onClick={() => {
              router.push("/formbuilder/create-form");
            }}
          >
            Create Form
          </Button>
        </div>

        {/* Showcase of existing forms */}
        <MaveFormsShowcase />
      </div>
    </FormBuilderProvider>
  );
}
