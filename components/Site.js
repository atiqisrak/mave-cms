import { useEffect, useState } from "react";
import SiteContent from "./SiteContent";
import SiteContentV2 from "./SiteContentV2";

export default function Site({ children, collapsed, setCollapsed }) {
  const [userData, setUserData] = useState(null);
  const [v2Users, setV2Users] = useState([
    "atiqisrak@niloy.com",
    "lordofgalaxy@webable.digital",
    "shadab.mahbub@webable.digital",
    "tanvir.ahmed@webable.digital",
  ]);

  useEffect(() => {
    localStorage.getItem("user")
      ? setUserData(JSON.parse(localStorage.getItem("user")))
      : setUserData(null);
  }, []);

  console.log("userData", userData);

  return (
    <>
      {v2Users.includes(userData?.email) ? (
        <SiteContentV2 collapsed={collapsed} setCollapsed={setCollapsed} />
      ) : (
        <SiteContent collapsed={collapsed} setCollapsed={setCollapsed} />
      )}
    </>
  );
}
