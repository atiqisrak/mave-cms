import RoleTable from "./role/RoleTable";
import TopNav from "./TopNav";
import PermissionTable from "./permission/PermissionTable";

export default function RolePermission({
  activeTab,
  setActiveTab,
  roles,
  permissions,
  fetchRolesPermissions,
  loading,
}) {
  return (
    <div
      style={{
        marginBottom: "5rem",
      }}
    >
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Table */}
      <div>
        {activeTab === "role" && (
          <RoleTable
            roles={roles}
            permissions={permissions}
            fetchRolesPermissions={fetchRolesPermissions}
            loading={loading}
          />
        )}
        {activeTab === "permission" && (
          <PermissionTable
            permissions={permissions}
            fetchRolesPermissions={fetchRolesPermissions}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
}
