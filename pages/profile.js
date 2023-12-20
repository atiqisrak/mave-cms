import { CheckOutlined, CloseOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import { useContext } from "react";
import GLOBAL_CONTEXT from "../src/context/context";

const Profile = () => {
  const { user } = useContext(GLOBAL_CONTEXT);

  const userData = JSON.parse(localStorage.getItem("user"));
  return (
    <>
      <div className="ViewContainer">
        <div className="ViewContentContainer">
          {/* {console.log("User Data", userData)} */}
          <div className="user">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
              width={50}
              alt=""
            />
            <h2 style={{ textAlign: "center" }}>{userData.name}</h2>
            <p>Admin</p>
          </div>
          <hr />
          <div className="profileContainer" style={{ marginTop: "1rem" }}>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{ display: "flex", alignItems: "center" }}
            >
              <Col span={20}>
                <div className="item1">
                  <label style={{ color: "#F1612A", fontWeight: 700 }}>
                    Name :{" "}
                  </label>
                  |
                  <p className="top1">
                    {userData.name ? userData.name : "Admin User"}
                  </p>
                </div>
              </Col>
              <Col
                span={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: ".5rem",
                  columnGap: ".5rem",
                  rowGap: "1rem",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "var(--theme)",
                    borderColor: "var(--theme)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    marginRight: "1em",
                    paddingBottom: "1.8em",
                  }}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              </Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Col span={20}>
                <div className="item2">
                  <label style={{ color: "#F1612A", fontWeight: 700 }}>
                    Email :
                  </label>
                  |
                  <p className="top2">
                    {userData.email ? userData.email : "Admin Email"}
                  </p>
                </div>
              </Col>
              <Col
                span={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: ".5rem",
                  columnGap: ".5rem",
                  rowGap: "1rem",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "var(--theme)",
                    borderColor: "var(--theme)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    marginRight: "1em",
                    paddingBottom: "1.8em",
                  }}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              </Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Col span={20}>
                <div className="item3">
                  <label style={{ color: "#F1612A", fontWeight: 700 }}>
                    Phone :
                  </label>
                  |
                  <p className="top3">
                    {userData.phone ? userData.phone : "Admin Phone"}
                  </p>
                </div>
              </Col>
              <Col
                span={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: ".5rem",
                  columnGap: ".5rem",
                  rowGap: "1rem",
                }}
              >
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "var(--theme)",
                    borderColor: "var(--theme)",
                    color: "white",
                    borderRadius: "10px",
                    fontSize: "1.2em",
                    marginRight: "1em",
                    paddingBottom: "1.8em",
                  }}
                  icon={<EditOutlined />}
                >
                  Edit
                </Button>
              </Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Col span={20}>
                <div className="item4">
                  <label style={{ color: "#F1612A", fontWeight: 700 }}>
                    Roles :
                  </label>
                  |<p className="top4">Admin</p>
                </div>
              </Col>
              <Col
                span={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: ".5rem",
                  columnGap: ".5rem",
                  rowGap: "1rem",
                }}
              ></Col>
            </Row>
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              <Col span={20}>
                <div className="item5">
                  <label style={{ color: "#F1612A", fontWeight: 700 }}>
                    Permissions :
                  </label>
                  |<p className="top5">All</p>
                </div>
              </Col>
              <Col
                span={4}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: ".5rem",
                  columnGap: ".5rem",
                  rowGap: "1rem",
                }}
              ></Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
