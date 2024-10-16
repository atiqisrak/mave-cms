import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Input,
  Row,
  Select,
  Image,
  Carousel,
  message,
  Modal,
} from "antd";
import instance from "../axios";
import {
  CheckCircleFilled,
  CloseCircleFilled,
  DeleteFilled,
  EditOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import RichTextEditor from "../components/RichTextEditor";
import SingleMediaSelect from "../components/SingleMediaSelect";

const Gases = () => {
  const [loading, setLoading] = useState(false);
  const [gases, setGases] = useState([]);
  const [media, setMedia] = useState([]);
  const [updateResponse, setUpdateResponse] = useState(null);
  const [createMode, setCreateMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedPageId, setSelectedPageId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;

  const fetchGases = async () => {
    try {
      setLoading(true);
      const res = await instance.get("/gas");
      if (res.status === 200) {
        setGases(res.data);
        // console.log("Gases", res.data);
        // console.log("Gases fetched successfully");
      } else {
        message.error("Unable to fetch gases");
      }
      setLoading(false);
    } catch (err) {
      // console.log(err);
      message.error("Unable to fetch gases");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGases();
  }, [setUpdateResponse]);

  const fetchMedia = async () => {
    try {
      const res = await instance.get("/media");
      if (res.status === 200) {
        setMedia(res.data);
      } else {
        message.error("Unable to fetch media");
      }
    } catch (err) {
      // console.log(err);
      message.error("Unable to fetch media");
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await instance.delete(`/gas/${id}/`);
      if (res.status === 204) {
        console.log("Gas deleted successfully");
        setUpdateResponse(res);
      } else {
        message.error("Unable to delete gas");
      }
    } catch (err) {
      // console.log(err);
      message.error("Unable to delete gas");
    }
  };

  const handleCreate = async () => {
    try {
      const res = await instance.post("/gas", formData);
      if (res.status === 201) {
        console.log("Gas created successfully");
        setUpdateResponse(res);
        setCreateMode(false);
      } else {
        message.error("Unable to create gas");
      }
    } catch (err) {
      // console.log(err);
      message.error("Unable to create gas");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await instance.put(`/gas/${id}/`, formData);
      if (res.status === 200) {
        console.log("Gas updated successfully");
        setUpdateResponse(res);
        setEditMode(false);
      } else {
        message.error("Unable to update gas");
      }
    } catch (err) {
      // console.log(err);
      message.error("Unable to update gas");
    }
  };

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  const handleMediaSelect = (media) => {
    setFormData({ ...formData, media_mave: media.id });
    setModalVisible(false);
  };

  return (
    <>
      <div className="mavecontainer">
        <div
          className="PageHeader"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <h1>Gases</h1>
          {createMode ? (
            <Button
              danger
              style={{
                borderRadius: "10px",
                fontSize: "1.2em",
                marginRight: "1em",
                // paddingBottom: "1.8em",
              }}
              icon={<CloseCircleFilled />}
              onClick={() => setCreateMode(false)}
            >
              Cancel Create
            </Button>
          ) : (
            <Button
              type="primary"
              style={{
                backgroundColor: "var(--theme)",
                borderColor: "var(--theme)",
                color: "white",
                borderRadius: "10px",
                fontSize: "1.2em",
                marginRight: "1em",
                // paddingBottom: "1.8em",
              }}
              icon={<CheckCircleFilled />}
              onClick={() => setCreateMode(true)}
            >
              Create New
            </Button>
          )}
        </div>

        {createMode ? (
          <div className="PageBody">
            <Modal
              title="Create Gas"
              open={createMode}
              onOk={handleCreate}
              onCancel={() => setCreateMode(false)}
            >
              <Button
                type="primary"
                style={{
                  position: "initial",
                }}
                icon={<CheckCircleFilled />}
                onClick={handleOpenModal}
              >
                <Image
                  src={
                    formData?.media_mave
                      ? `${MEDIA_URL}/${formData?.media_mave?.file_path}`
                      : "/images/Image_Placeholder.png"
                  }
                  style={{
                    width: "200px",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: 20,
                  }}
                  preview={false}
                />
              </Button>

              <Input
                placeholder="Gas Type"
                value={formData?.type}
                onChange={(e) =>
                  setFormData({ ...formData, gas_type: e.target.value })
                }
              />
              <Input
                placeholder="Gas Weight"
                value={formData?.weight}
                onChange={(e) =>
                  setFormData({ ...formData, gas_weight: e.target.value })
                }
              />
              <Input
                placeholder="Unit Price"
                value={formData?.unit_price}
                onChange={(e) =>
                  setFormData({ ...formData, unit_price: e.target.value })
                }
              />
            </Modal>
          </div>
        ) : null}

        <div className="PageBody">
          <Row
            gutter={[16, 16]}
            style={{
              padding: "2em 0",
            }}
          >
            <Col span={4}>
              <h3>Gas Image</h3>
            </Col>
            <Col span={4}>
              <h3>Gas Type</h3>
            </Col>
            <Col span={4}>
              <h3>Gas Weight</h3>
            </Col>
            <Col span={4}>
              <h3>Unit Price</h3>
            </Col>
            <Col span={8}>
              <h3>Actions</h3>
            </Col>
          </Row>
          {gases?.map((gas, index) =>
            editMode && selectedPageId === gas.id ? (
              <Row
                gutter={[16, 16]}
                key={index}
                style={{
                  padding: "2em 0",
                }}
              >
                <Col span={4}>
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "var(--theme)",
                      borderColor: "var(--theme)",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      marginRight: "1em",
                      // paddingBottom: "1.8em",
                    }}
                    icon={<CheckCircleFilled />}
                    onClick={handleOpenModal}
                  >
                    Change Image
                  </Button>
                  <SingleMediaSelect
                    visible={modalVisible}
                    onCancel={handleModalCancel}
                    onMediaSelect={handleMediaSelect}
                    media={media}
                  />
                </Col>
                <Col span={4} className="flexed-center">
                  <Input
                    placeholder="Gas Type"
                    value={formData?.type}
                    onChange={(e) =>
                      setFormData({ ...formData, gas_type: e.target.value })
                    }
                  />
                </Col>
                <Col span={4} className="flexed-center">
                  <Input
                    placeholder="Gas Weight"
                    value={formData?.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, gas_weight: e.target.value })
                    }
                  />
                </Col>
                <Col span={4} className="flexed-center">
                  <Input
                    placeholder="Unit Price"
                    value={formData?.unit_price}
                    onChange={(e) =>
                      setFormData({ ...formData, unit_price: e.target.value })
                    }
                  />
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                      // paddingBottom: "1.8em",
                    }}
                    icon={<CheckCircleFilled />}
                    onClick={() => handleUpdate(gas.id)}
                  >
                    Update
                  </Button>
                  <Button
                    danger
                    style={{
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      marginRight: "1em",
                      // paddingBottom: "1.8em",
                    }}
                    icon={<CloseCircleFilled />}
                    onClick={() => {
                      setEditMode(false);
                      setSelectedPageId(null);
                    }}
                  >
                    Cancel
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row
                gutter={[16, 16]}
                key={index}
                style={{
                  padding: "2em 0",
                }}
              >
                <Col span={4}>
                  {gas.media_mave && gas.media_mave.length > 0 ? (
                    <Image
                      src={`${MEDIA_URL}/${gas?.media_mave?.file_path}`}
                      style={{
                        width: "12vw",
                        height: "10vw",
                        objectFit: "cover",
                        borderRadius: 20,
                      }}
                      preview={false}
                    />
                  ) : (
                    <img
                      src="/images/Image_Placeholder.png"
                      style={{
                        height: "100px",
                        width: "100px",
                        objectFit: "cover",
                        borderRadius: 10,
                      }}
                    />
                  )}
                </Col>
                <Col span={4} className="flexed-center">
                  <h3>{gas.type}</h3>
                </Col>
                <Col span={4} className="flexed-center">
                  <h3>{gas.weight}</h3>
                </Col>
                <Col span={4} className="flexed-center">
                  <h3>{gas.unit_price}</h3>
                </Col>
                <Col
                  span={8}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
                      // paddingBottom: "1.8em",
                    }}
                    icon={<EditOutlined />}
                    onClick={() => {
                      setEditMode(true);
                      setSelectedPageId(gas.id);
                      setFormData(gas);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    danger
                    style={{
                      borderRadius: "10px",
                      fontSize: "1.2em",
                      marginRight: "1em",
                      // paddingBottom: "1.8em",
                    }}
                    icon={<DeleteFilled />}
                    onClick={() => handleDelete(gas.id)}
                  >
                    Delete
                  </Button>
                </Col>
              </Row>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Gases;
