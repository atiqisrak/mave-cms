// pages/diy-cms/lets-do-it.js

import { Breadcrumb } from "antd";
import ModelCreator from "../../components/diycms/ModelCreator";
import { HomeFilled } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LetsDoIt() {
  const router = useRouter();
  const [refreshMenu, setRefreshMenu] = useState(false);

  const handleModelCreated = () => {
    // Toggle refreshMenu to trigger refetch in SideMenuItems
    setRefreshMenu((prev) => !prev);
  };

  return (
    <div className="mavecontainer">
      <Breadcrumb
        style={{
          marginBottom: "1em",
          cursor: "pointer",
        }}
      >
        <Breadcrumb.Item
          onClick={() => {
            router.push("/");
          }}
        >
          <HomeFilled />
        </Breadcrumb.Item>
        <Breadcrumb.Item
          onClick={() => {
            router.push("/diy-cms");
          }}
        >
          DIY CMS
        </Breadcrumb.Item>
        <Breadcrumb.Item>Let's Do It</Breadcrumb.Item>
      </Breadcrumb>
      <ModelCreator onModelCreated={handleModelCreated} />
    </div>
  );
}
