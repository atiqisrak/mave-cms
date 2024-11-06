import MapBD from "../../components/formbuilder/MapBD";

export default function MapView() {
  return (
    <div
      className="mavecontainer"
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <center>
        <h1
          style={{
            marginBottom: "2rem",
          }}
        >
          Welcome to Bangladesh Map
        </h1>
        <MapBD />
      </center>
    </div>
  );
}
