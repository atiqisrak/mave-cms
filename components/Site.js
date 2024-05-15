import { useEffect, useState } from "react";
import SiteContent from "./SiteContent";
import SiteContentV2 from "./SiteContentV2";

export default function Site({ children, collapsed, setCollapsed }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    localStorage.getItem("user") &&
      setUserData(JSON.parse(localStorage.getItem("user")));
  }, []);

  console.log("userData", userData);

  return (
    <>
      {/* <SiteContent collapsed={collapsed} setCollapsed={setCollapsed} /> */}
      <SiteContentV2 collapsed={collapsed} setCollapsed={setCollapsed} />
    </>
  );
}
