import React, { useState, useEffect } from "react";
import { Row, Col, Button, Input, Select, Card, Image, Popconfirm } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SyncOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import MenuParser from "./MenuParser";
import instance from "../../axios";

const FooterParser = ({ item, editMode, onFooterSelect }) => {
  const { Option } = Select;
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [isCollapsed, setIsCollapsed] = useState(true);
  // const [id, setId] = useState(null);
  const [setectedFooter, setSelectedFooter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [footers, setFooters] = useState([]);

  const fetchFooter = async () => {
    try {
      setLoading(true);
      const response = await instance("/footers");
      if (response.data) {
        setFooters(response.data);
        console.log("Footers: ", response.data);
        setLoading(false);
      } else {
        message.error("Error fetching footers");
        console.error("Error fetching footers:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching footers:", error);
    }
  };

  useEffect(() => {
    if (editMode) {
      fetchFooter();
    }
  }, [editMode]);

  const [deleteConfirmationVisible, setDeleteConfirmationVisible] =
    useState(false);

  const handleFooterChange = (value) => {
    const selectedFooter = footers.find((footer) => footer.id === value);
    setSelectedFooter(value);
    onFooterSelect({ _mave: selectedFooter, type: "footer", id: value });
  };

  return (
    <>
      {item && editMode ? (
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a footer"
          optionFilterProp="children"
          onChange={handleFooterChange}
        >
          {footers?.map((footer) => (
            <Option value={footer?.id}>{footer?.title_en}</Option>
          ))}
        </Select>
      ) : (
        <>
          <div
            key={item.id}
            className="ViewContentContainer1"
            style={{
              backgroundColor: "#000530",
              padding: "3rem",
              color: "#ffff",
              marginBottom: "1rem",
            }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={8}>
                <img
                  src={`${MEDIA_URL}/${item?._mave?.logo?.file_path}`}
                  width={292}
                  alt=""
                />
                <div className="address1" style={{ marginTop: "2rem" }}>
                  <h4>{item?.address1_title_en}</h4>
                  <h4 style={{ color: "#c3c3c3" }}>
                    {item?.address1_description_en}
                  </h4>
                </div>
                <div className="address1" style={{ marginTop: "4rem" }}>
                  <h4>{item?.address2_title_en}</h4>
                  <h4 style={{ color: "#c3c3c3" }}>
                    {item?.address2_description_en}
                  </h4>
                </div>
              </Col>
              <Col span={4}>
                <h2>{item?._mave?.column2_menu?.name}</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    // border: "1px solid var(--themes)",
                    borderRadius: 10,
                    padding: "1em 2em",
                    margin: "1em 0",
                  }}
                >
                  <MenuParser item={item?._mave?.column2_menu} />
                </div>
              </Col>
              <Col span={6}>
                <h2>{item?._mave?.column3_menu?.name}</h2>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                    // border: "1px solid var(--themes)",
                    borderRadius: 10,
                    padding: "1em 2em",
                    margin: "1em 0",
                  }}
                >
                  <MenuParser item={item?._mave?.column3_menu} />
                </div>
                <h2 style={{ marginTop: ".5rem" }}>Parent Sites</h2>
                <div
                  className="img"
                  style={{
                    display: "flex",
                    justifyItems: "center",
                    columnGap: "1rem",
                    marginTop: "1rem",
                  }}
                >
                  <img
                    src={
                      "https://unitedaygaz.com/assets/images/icons/united-footer.svg"
                    }
                    alt=""
                    width={80}
                  />
                  <img
                    src={
                      "https://unitedaygaz.com/assets/images/icons/aygaz-footer.webp"
                    }
                    alt=""
                    width={80}
                  />
                </div>
                <img
                  src={
                    "https://unitedaygaz.com/assets/images/icons/koc-footer.webp"
                  }
                  alt=""
                  style={{ marginTop: "1rem" }}
                  width={80}
                />
              </Col>
              <Col span={6}>
                <h2>Member Of</h2>

                <img
                  src={
                    "https://unitedaygaz.com/assets/images/icons/wlpg-footer.webp"
                  }
                  style={{ color: "#c3c3c3", marginTop: ".5rem" }}
                  width={80}
                />
                <p
                  style={{
                    marginTop: ".5rem",
                    display: "flex",
                    justifyItems: "center",
                    columnGap: "1rem",
                  }}
                >
                  <img
                    src={"https://unitedaygaz.com/assets/images/icons/call.svg"}
                    width={30}
                  />{" "}
                  {item?.column4_description_en}
                </p>

                {/* <p style={{ color: "#c3c3c3", marginTop: ".5rem" }}>{item?.column4_description_en}</p> */}
              </Col>
              <Col span={24} style={{ marginTop: "1rem" }}>
                <hr style={{ backgroundColor: "#fff" }} />
                <div
                  className="buttom_menu"
                  style={{
                    display: "flex",
                    columnGap: "4rem",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <h4>© 2022 UNITED AYGAZ LPG LTD.</h4>
                  <div
                    style={{
                      display: "flex",
                      // flexDirection: "column",
                      gap: "1em",
                      // border: "1px solid var(--themes)",
                      borderRadius: 10,
                      padding: "1em 2em",
                      margin: "1em 0",
                    }}
                  >
                    <MenuParser item={item?._mave?.bottom_menu} />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
          {!isCollapsed && id === item.id && (
            <div className="ViewContentContainer1">
              <div>
                <hr />
                <div
                  className="update_area"
                  style={{ paddingTop: "1rem", marginBottom: "2rem" }}
                >
                  <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                    <Col span={8}>
                      <div className="content">
                        <h3>Selected Logo:</h3>
                        <br />
                        {/* Media view */}
                        {selectedMedia ? (
                          <Card size="small">
                            <Image
                              src={`${MEDIA_URL}/${selectedMedia.file_path}`}
                              alt={selectedMedia.title}
                              preview={false}
                              width={"100%"}
                              height={"100%"}
                              style={{
                                objectFit: "cover",
                                borderRadius: 10,
                                border:
                                  selectedMedia === selectedMedia.id
                                    ? "2px solid #1890ff"
                                    : "none",
                              }}
                            />
                            {/* <p>{selectedMedia.file_name}</p> */}
                          </Card>
                        ) : (
                          <Card size="small">
                            <Image
                              src={`${MEDIA_URL}/${item.logo.file_path}`}
                              alt={item.file_name}
                              preview={false}
                              width={"100%"}
                              height={"100%"}
                              style={{
                                objectFit: "cover",
                                borderRadius: 10,
                                border:
                                  selectedMedia === selectedMedia.id
                                    ? "2px solid #1890ff"
                                    : "none",
                              }}
                            />
                          </Card>
                        )}
                        <Button
                          type="primary"
                          onClick={handleOpenModal}
                          style={{ marginTop: "1rem" }}
                        >
                          Change Logo
                        </Button>

                        <MediaSelectionModal1
                          mediaList={mediaList}
                          visible={modalVisible}
                          onCancel={handleModalCancel}
                          onSelect={handleMediaSelect}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Title English:</h3>
                        <Input
                          value={formData.title_en}
                          onChange={(e) => handleChange(e, "title_en")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Title Bangla:</h3>
                        <Input
                          value={formData.title_bn}
                          onChange={(e) => handleChange(e, "title_bn")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Address1 Title English:</h3>
                        <Input
                          value={formData.address1_title_en}
                          onChange={(e) => handleChange(e, "address1_title_en")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Address1 Title Bangla:</h3>
                        <Input
                          value={formData.address1_title_bn}
                          onChange={(e) => handleChange(e, "address1_title_bn")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                    </Col>
                    <Col span={8}>
                      <div className="content">
                        <h3>Address1 Description English:</h3>
                        <Input.TextArea
                          rows={1}
                          value={formData.address1_description_en}
                          onChange={(e) =>
                            handleChange(e, "address1_description_en")
                          }
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Address1 Description Bangla:</h3>
                        <Input.TextArea
                          rows={2}
                          value={formData.address1_description_bn}
                          onChange={(e) =>
                            handleChange(e, "address1_description_bn")
                          }
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Address2 Title English:</h3>
                        <Input
                          value={formData.address2_title_en}
                          onChange={(e) => handleChange(e, "address2_title_en")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Address2 Title Bangla:</h3>
                        <Input
                          value={formData.address2_title_bn}
                          onChange={(e) => handleChange(e, "address2_title_bn")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Address2 Description English:</h3>
                        <Input.TextArea
                          rows={1}
                          value={formData.address2_description_en}
                          onChange={(e) =>
                            handleChange(e, "address2_description_en")
                          }
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Address2 Description Bangla:</h3>
                        <Input.TextArea
                          rows={1}
                          value={formData.address2_description_bn}
                          onChange={(e) =>
                            handleChange(e, "address2_description_bn")
                          }
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Column2 Menu:</h3>
                        <Select
                          showSearch
                          // mode="multiple"
                          placeholder="Select menu item"
                          style={{ width: "100%", marginTop: ".5rem" }}
                          value={
                            selectedItems
                              ? selectedItems
                              : item?.column2_menu?.name
                          } // Set the selected item from state
                          onChange={handleSelectChange} // Set the event handler
                        >
                          {menuData?.map((item) => (
                            <>
                              <Option key={item.id} value={item?.id}>
                                {item.name}
                              </Option>
                            </>
                          ))}
                        </Select>
                      </div>
                      <br />
                      <div className="content">
                        <h3>Column3 Menu:</h3>
                        <Select
                          showSearch
                          // mode="multiple"
                          placeholder="Select menu item"
                          style={{ width: "100%", marginTop: ".5rem" }}
                          value={
                            selectedItemsColumn3
                              ? selectedItemsColumn3
                              : item?.column3_menu?.name
                          } // Set the selected item from state
                          onChange={handleSelectChangeColumn3} // Set the event handler
                        >
                          {menuData?.map((item) => (
                            <>
                              <Option key={item.id} value={item?.id}>
                                {item.name}
                              </Option>
                            </>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="content">
                        <h3>Column4 Menu:</h3>
                        <Select
                          showSearch
                          // mode="multiple"
                          placeholder="Select menu item"
                          style={{ width: "100%", marginTop: ".5rem" }}
                          value={
                            selectedItemsColumn4
                              ? selectedItemsColumn4
                              : item?.column3_menu?.name
                          } // Set the selected item from state
                          onChange={handleSelectChangeColumn4} // Set the event handler
                        >
                          {menuData?.map((item) => (
                            <>
                              <Option key={item.id} value={item?.id}>
                                {item.name}
                              </Option>
                            </>
                          ))}
                        </Select>
                      </div>

                      <br />
                      <div className="content">
                        <h3>Column4 Title En:</h3>
                        <Input
                          value={formData.column4_title_en}
                          onChange={(e) => handleChange(e, "column4_title_en")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Column4 Title Bn:</h3>
                        <Input
                          value={formData.column4_title_bn}
                          onChange={(e) => handleChange(e, "column4_title_bn")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Column4 Text En:</h3>
                        <Input
                          value={formData.column4_text_en}
                          onChange={(e) => handleChange(e, "column4_text_en")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Column4 Text Bn:</h3>
                        <Input
                          value={formData.column4_text_bn}
                          onChange={(e) => handleChange(e, "column4_text_bn")}
                          style={{ marginTop: ".5rem" }}
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Column4 Description English:</h3>
                        <Input.TextArea
                          rows={2}
                          value={formData.column4_description_en}
                          onChange={(e) =>
                            handleChange(e, "column4_description_en")
                          }
                          style={{ marginTop: ".5rem" }}
                          type="number"
                        />
                      </div>
                      <br />

                      <div className="content">
                        <h3>Column4 Description Bangla:</h3>
                        <Input.TextArea
                          rows={1}
                          value={formData.column4_description_bn}
                          onChange={(e) =>
                            handleChange(e, "column4_description_bn")
                          }
                          style={{ marginTop: ".5rem" }}
                          type="number"
                        />
                      </div>
                      <br />
                      <div className="content">
                        <h3>Bottom Menu:</h3>
                        <Select
                          showSearch
                          // mode="multiple"
                          placeholder="Select menu item"
                          style={{ width: "100%", marginTop: ".5rem" }}
                          value={
                            selectedItemsBottom
                              ? selectedItemsBottom
                              : item?.bottom_menu?.name
                          } // Set the selected item from state
                          onChange={handleSelectChangeBottom} // Set the event handler
                        >
                          {menuData?.map((item) => (
                            <>
                              <Option key={item.id} value={item?.id}>
                                {item.name}
                              </Option>
                            </>
                          ))}
                        </Select>
                      </div>
                    </Col>
                    <Button
                      icon={<SyncOutlined />}
                      style={{
                        marginTop: "1rem",
                        marginLeft: "1rem",
                        backgroundColor: "var(--success)",
                        borderColor: "var(--success)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        marginRight: "1em",
                        paddingBottom: "1.8em",
                      }}
                      onClick={() => handleUpdate()}
                    >
                      Update
                    </Button>
                    <Button
                      style={{
                        marginTop: "1rem",
                        marginLeft: "1rem",
                        backgroundColor: "var(--themes)",
                        borderColor: "var(--themes)",
                        color: "white",
                        borderRadius: "10px",
                        fontSize: "1.2em",
                        paddingBottom: "1.8em",
                      }}
                      onClick={() => toggleCollapse(true)}
                    >
                      <CloseCircleOutlined />
                      Cancel
                    </Button>
                  </Row>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default FooterParser;
