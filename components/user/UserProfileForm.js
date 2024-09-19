// components/UserProfileForm.js
import { Input, Button, Select, Row, Col } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

const UserProfileForm = ({
  userData,
  modifiedData,
  handleInputChange,
  modifyMode,
  handleUpdateProfile,
  setModifyMode,
  canModifyUsers,
  validEmail,
  emailMessage,
}) => {
  return (
    <>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <div className="item1">
            <label>Name:</label> |
            {modifyMode ? (
              <Input
                defaultValue={userData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            ) : (
              <p>{userData.name || "Admin User"}</p>
            )}
          </div>
        </Col>
      </Row>
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col span={24}>
          <div className="item2">
            <label>Email:</label> |
            {modifyMode ? (
              <>
                <Input
                  defaultValue={userData.email}
                  onChange={(e) => {
                    handleInputChange("email", e.target.value);
                  }}
                />
                {!validEmail && <p style={{ color: "red" }}>{emailMessage}</p>}
              </>
            ) : (
              <p>{userData.email || "Admin Email"}</p>
            )}
          </div>
        </Col>
      </Row>
      {modifyMode && (
        <div style={{ marginTop: "1rem" }}>
          <Button
            type="primary"
            onClick={handleUpdateProfile}
            disabled={!validEmail}
            style={{ marginRight: "1rem" }}
          >
            <CheckOutlined /> Save
          </Button>
          <Button type="primary" danger onClick={() => setModifyMode(false)}>
            <CloseOutlined /> Cancel
          </Button>
        </div>
      )}
    </>
  );
};

export default UserProfileForm;
