import { Button } from "antd";
import router from "next/router";
import MaveFormsList from "../../components/formbuilder/MaveFormsList";

export default function FormBuilder() {
  return (
    <div className="ViewContainer">
      <center>
        <h1>Welcome to the Mave Form Builder</h1>
      </center>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2rem",
          marginTop: "2rem",
        }}
      >
        <Button
          style={{
            backgroundColor: "var(--themes)",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            padding: "1.5rem 2rem",
          }}
          onClick={() => {
            router.push("/formbuilder/create-form");
          }}
        >
          Create Form
        </Button>

        <Button
          style={{
            backgroundColor: "var(--theme)",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            padding: "1.5rem 2rem",
          }}
          onClick={() => {
            router.push("/formbuilder/mave-forms-showcase");
          }}
        >
          View Forms
        </Button>
      </div>
      <div>
        <MaveFormsList />
      </div>
    </div>
  );
}
