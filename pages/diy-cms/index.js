import { Button } from "antd";
import ModelsShowcase from "../../components/diycms/ModelsShowcase";

import { useRouter } from "next/router";
export default function DIYCMS() {
  const router = useRouter();
  return (
    <div className="ViewContentContainer">
      <center>
        <h1>Welcome to the Mave DIY CMS</h1>
      </center>
      <p style={{ textAlign: "center", fontSize: "1.2rem", padding: "2rem 0" }}>
        This is a DIY CMS (Content Management System) where you can create your
        own models and fields and generate SQL queries for them. This is a
        simple example of how you can create a CMS from scratch using React and
        Ant Design.
      </p>

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
            backgroundColor: "var(--theme)",
            color: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            padding: "1.5rem 2rem",
          }}
          onClick={() => {
            router.push("/diy-cms/lets-do-it");
          }}
        >
          Create My Own CMS
        </Button>
      </div>
      <ModelsShowcase />
    </div>
  );
}
