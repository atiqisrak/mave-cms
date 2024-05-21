import { useEffect, useState } from "react";
import SiteContent from "./SiteContent";
import SiteContentV2 from "./SiteContentV2";

export default function Site({ children, collapsed, setCollapsed }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    localStorage.getItem("user")
      ? setUserData(JSON.parse(localStorage.getItem("user")))
      : setUserData(null);
  }, []);

  console.log("userData", userData);

  return (
    <>
      {(userData && userData?.email === "atiqisrak@niloy.com") ||
      userData?.email === "lordofgalaxy@webable.digital" ? (
        <SiteContentV2 collapsed={collapsed} setCollapsed={setCollapsed} />
      ) : (
        <SiteContent collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
    </>
  );
}
