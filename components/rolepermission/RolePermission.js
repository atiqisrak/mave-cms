import {
  BlockOutlined,
  CheckCircleOutlined,
  PlusCircleOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Button, Select, Tabs } from "antd";
import RoleTable from "./role/RoleTable";
import TopNav from "./TopNav";
import PermissionTable from "./permission/PermissionTable";

export default function RolePermission({ activeTab, setActiveTab }) {
  return (
    <div>
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Table */}
      <div>
        {activeTab === "role" && <RoleTable />}
        {activeTab === "permission" && <PermissionTable />}
      </div>
    </div>
  );
}
