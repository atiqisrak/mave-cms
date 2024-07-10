import Head from "next/head";
import PulseDashboard from "../../components/apimonitoringtools/PulseDashboard";

const Pulse = () => {
  return (
    <div
      style={{
        padding: "3vh 0 0 8vw",
      }}
    >
      <PulseDashboard />
    </div>
  );
};

export default Pulse;
