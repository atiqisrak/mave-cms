import ModelCreator from "../components/diycms/ModelCreator";

export default function DIYCMS() {
  return (
    <div className="ViewContentContainer">
      <h1>Welcome to Ether Labs</h1>
      <p>
        This is a DIY CMS (Content Management System) where you can create your
        own models and fields and generate SQL queries for them. This is a
        simple example of how you can create a CMS from scratch using React and
        Ant Design.
      </p>
      <div style={{ marginTop: "2rem" }}>
        <ModelCreator />
      </div>
    </div>
  );
}
