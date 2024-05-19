import {
  Col,
  Modal,
  Row,
  Tabs,
  message,
  Button,
  Select,
  Input,
  Switch,
} from "antd";
import React, { useState, useEffect } from "react";
import instance from "../axios";
import moment from "moment";
import {
  CiCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  CloseCircleOutlined,
  EditOutlined,
  EyeOutlined,
  FilterOutlined,
  OrderedListOutlined,
  ProfileOutlined,
  SearchOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [editModeOrderId, setEditModeOrderId] = useState(null);
  const [filterMode, setFilterMode] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [searchValue, setSearchValue] = useState("");

  const fetchAllOrders = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/formdata?form_id=1");
      if (response.status === 200) {
        setAllOrders(response.data);
        setLoading(false);
      } else {
        // console.log("Error: ", response);
        message.error("Error fetching data");
        setLoading(false);
      }
    } catch (error) {
      // console.log("Error: ", error);
      message.error("Error fetching data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleOrderClick = async (orderid) => {
    try {
      setLoading(true);
      const response = await instance.get("/formdata/" + orderid);
      if (response.status === 200) {
        setOrderDetails(response.data);
        setLoading(false);
        setSelectedOrder(response.data);
      } else {
        // console.log("Error: ", response);
        message.error("Error fetching data");
        setLoading(false);
      }
    } catch (error) {
      // console.log("Error: ", error);
      message.error("Error fetching data");
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderid, status) => {
    try {
      setLoading(true);
      const response = await instance.put("/formdata/" + orderid, {
        order_status: status,
      });
      if (response.status === 200) {
        console.log("Order Status Updated Successfully");
        setLoading(false);
        setEditMode(false);
        fetchAllOrders();
      } else {
        // console.log("Error: ", response);
        message.error("Error updating order status");
        setLoading(false);
        setEditMode(false);
      }
    } catch (error) {
      // console.log("Error: ", error);
      message.error("Error updating order status");
      setLoading(false);
      setEditMode(false);
    }
  };

  const OrderDetailModal = ({ orderDetails }) => {
    return (
      <Modal
        title="Order Details"
        open={selectedOrder}
        onOk={() => setSelectedOrder(null)}
        onCancel={() => setSelectedOrder(null)}
        footer={<Button onClick={() => setSelectedOrder(null)}>Close</Button>}
        width={1000}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          {orderDetails && (
            <>
              <Row
                gutter={[16, 16]}
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "1em 0",
                }}
              >
                <Col
                  span={12}
                  style={{
                    borderRight: "1px solid #ccc",
                  }}
                >
                  <h3>Customer Details</h3>
                </Col>
                <Col span={12}>
                  <h3>Order Details</h3>
                </Col>
              </Row>
              <Row
                gutter={[16, 16]}
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "1em 0",
                }}
              >
                <Col
                  span={12}
                  style={{
                    borderRight: "1px solid #ccc",
                  }}
                >
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Customer Name:{" "}
                      {orderDetails.customer_mave?.full_name
                        ? orderDetails.customer_mave?.full_name
                        : "N/A"}
                    </h4>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Customer Phone:{" "}
                      {orderDetails.customer_mave?.phone
                        ? orderDetails.customer_mave?.phone
                        : "N/A"}
                    </h4>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Customer Email:{" "}
                      {orderDetails.customer_mave?.email
                        ? orderDetails.customer_mave?.email
                        : "N/A"}
                    </h4>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Customer Address:{" "}
                      {orderDetails.customer_mave?.address_line_1
                        ? orderDetails.customer_mave?.address_line_1
                        : "N/A"}
                    </h4>
                  </Row>
                  {/* message */}
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                      display: "flex",
                      gap: "1em",
                      alignItems: "center",
                    }}
                  >
                    <h4>Message: </h4>
                    <p>
                      {orderDetails?.message ? orderDetails?.message : "N/A"}
                    </p>
                  </Row>
                </Col>
                <Col span={12}>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Order ID: {orderDetails.id ? orderDetails.id : "N/A"}
                    </h4>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Order Date:{" "}
                      {orderDetails.customer_mave?.created_at
                        ? moment(orderDetails.customer_mave?.created_at).format(
                            "DD/MM/YYYY"
                          )
                        : "N/A"}
                    </h4>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Gas Type:{" "}
                      {orderDetails.order_details?.type
                        ? orderDetails.order_details?.type === "cylinder_gas"
                          ? "Cylinder Gas"
                          : orderDetails.order_details?.type === "auto"
                          ? "Auto Gas"
                          : orderDetails.order_details?.type === "bulk"
                          ? "Bulk Gas"
                          : "N/A"
                        : "N/A"}
                    </h4>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                    }}
                  >
                    <h4>
                      Service Type:{" "}
                      {orderDetails.order_details?.type_of_service
                        ? orderDetails.order_details?.type_of_service
                        : "N/A"}
                    </h4>
                  </Row>
                  <Row
                    style={{
                      borderBottom: "1px solid #ccc",
                      padding: "1em 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "1em",
                    }}
                  >
                    <h4>Order Status: </h4>
                    {orderDetails.order_status ? (
                      <h3
                        style={{
                          color:
                            orderDetails.order_status === "Approved"
                              ? "green"
                              : orderDetails.order_status === "Declined"
                              ? "red"
                              : "orange",
                          backgroundColor:
                            orderDetails.order_status === "Approved"
                              ? "#e6ffe6"
                              : orderDetails.order_status === "Declined"
                              ? "#ffe6e6"
                              : "#ffffcc",
                          padding: "0.5em 1em",
                          borderRadius: "5px",
                          width: "fit-content",
                          border: "1px solid #ccc",
                        }}
                      >
                        {orderDetails.order_status
                          ? orderDetails.order_status
                          : "Pending"}
                      </h3>
                    ) : (
                      <h3
                        style={{
                          color: "orange",
                          backgroundColor: "#ffffcc",
                          padding: "0.5em 1em",
                          borderRadius: "5px",
                          width: "fit-content",
                          border: "1px solid #ccc",
                        }}
                      >
                        Pending
                      </h3>
                    )}
                  </Row>
                </Col>
              </Row>
              <Row
                style={{
                  width: "100%",
                  margin: "0 auto",
                }}
              >
                <h3>
                  Total Amount:{" "}
                  {orderDetails?.total_amount
                    ? orderDetails?.total_amount
                    : orderDetails?.order_details?.unit_price
                    ? orderDetails?.order_details?.unit_price
                    : "N/A"}
                </h3>
              </Row>
            </>
          )}
        </div>
      </Modal>
    );
  };

  // Sort by Date
  const sortByDate = (a, b) => {
    if (isAscending) {
      return new Date(a.created_at) - new Date(b.created_at);
    } else {
      return new Date(b.created_at) - new Date(a.created_at);
    }
  };

  // Sort by Name
  const sortByName = (a, b) => {
    if (isAscending) {
      return a.customer_mave?.full_name.localeCompare(
        b.customer_mave?.full_name
      );
    } else {
      return b.customer_mave?.full_name.localeCompare(
        a.customer_mave?.full_name
      );
    }
  };

  // Sort by Order ID
  const sortById = (a, b) => {
    if (isAscending) {
      return a.id - b.id;
    } else {
      return b.id - a.id;
    }
  };

  // Search by Name or Phone
  const searchByNameOrPhone = (e) => {
    const value = e.target.value;
    const filteredOrders = allOrders.filter((order) => {
      return (
        order.customer_mave?.full_name
          .toLowerCase()
          .includes(value.toLowerCase()) ||
        order.customer_mave?.phone.toLowerCase().includes(value.toLowerCase())
      );
    });
    setAllOrders(filteredOrders);
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
        "Order ID, Customer Name, Phone Number, Customer Email, Address, Order Date, Order Status, Gas Type, Service Type, Total Amount",
      ],
      filename = "orders.csv";
    allOrders.forEach((order) => {
      csvContent.push(
        [
          order.id,
          order.customer_mave?.full_name,
          order.customer_mave?.phone,
          order.customer_mave?.email,
          order.customer_mave?.address_line_1,
          order.created_at
            ? moment(order.created_at).format("DD/MM/YYYY")
            : "N/A",
          order.order_status,
          order.order_details?.type
            ? order.order_details?.type === "cylinder_gas"
              ? "Cylinder Gas"
              : order.order_details?.type === "auto"
              ? "Auto Gas"
              : order.order_details?.type === "bulk"
              ? "Bulk Gas"
              : "N/A"
            : "N/A",
          order.order_details?.type_of_service
            ? order.order_details?.type_of_service
            : "N/A",
          order.total_amount
            ? order.total_amount
            : order.order_details?.unit_price
            ? order.order_details?.unit_price
            : "N/A",
        ].join(",")
      );
    });

    // Download CSV file
    const download = (content, filename, contentType) => {
      const a = document.createElement("a");
      const file = new Blob([content], { type: contentType });
      a.href = URL.createObjectURL(file);
      a.download = filename;
      a.click();
    };
    download(csvContent.join("\n"), filename, "text/csv");
  };

  return (
    <div>
      <div>
        <div
          className="flexed-center"
          style={{
            gap: "1em",
          }}
        >
          {/* Download CSV */}
          <Button type="primary" onClick={() => exportToCSV()}>
            Download CSV
          </Button>
          <Input
            style={{
              width: "20em",
            }}
            allowClear
            placeholder="Search by name"
            prefix={<SearchOutlined />}
            onChange={(e) => {
              setSearchValue(e.target.value);
              searchByNameOrPhone(e);
            }}
          />
          <Button
            type="primary"
            onClick={() => {
              setSearchValue("");
              setSearchMode(false);
              fetchAllOrders();
            }}
          >
            Clear
          </Button>
        </div>
        <Row
          gutter={[16, 16]}
          style={{
            paddingTop: "3em",
          }}
        >
          <Col span={2}>
            <h3>Order ID</h3>
            <Switch
              checkedChildren={<SortAscendingOutlined />}
              unCheckedChildren={<SortDescendingOutlined />}
              onChange={(checked) => {
                setAllOrders(allOrders.sort(sortById));
                setIsAscending(checked);
              }}
              style={{
                marginLeft: "1em",
              }}
            />
          </Col>
          <Col span={5}>
            <h3>Customer Name</h3>
            <Switch
              checkedChildren={<SortAscendingOutlined />}
              unCheckedChildren={<SortDescendingOutlined />}
              onChange={(checked) => {
                setAllOrders(allOrders.sort(sortByName));
                setIsAscending(checked);
              }}
              style={{
                marginLeft: "1em",
              }}
            />
          </Col>
          <Col span={4}>
            <h3>Phone Number</h3>
          </Col>
          <Col span={4}>
            <h3>Order Date</h3>
            <Switch
              checkedChildren={<SortAscendingOutlined />}
              unCheckedChildren={<SortDescendingOutlined />}
              onChange={(checked) => {
                setAllOrders(allOrders.sort(sortByDate));
                setIsAscending(checked);
              }}
              style={{
                marginLeft: "1em",
              }}
            />
          </Col>
          <Col span={3}>
            <h3>Order Status</h3>
          </Col>
          <Col span={2}>
            <h3>Order Details</h3>
          </Col>
          <Col span={4}>
            <h3>Action</h3>
          </Col>
        </Row>

        {allOrders.map((order) => (
          <Row
            gutter={[16, 16]}
            key={order.id}
            style={{
              borderBottom: "1px solid #ccc",
              padding: "1em 0",
            }}
          >
            <Col span={2}>
              <h3>{order.id ? order.id : "N/A"}</h3>
            </Col>
            <Col span={5}>
              <p>
                {order.customer_mave?.full_name
                  ? order.customer_mave?.full_name
                  : "N/A"}
              </p>
            </Col>
            <Col span={4}>
              <p>
                {order.customer_mave?.phone
                  ? order.customer_mave?.phone
                  : "N/A"}
              </p>
            </Col>
            <Col span={4}>
              <h3>
                {order.created_at
                  ? moment(order.created_at).format("DD/MM/YYYY")
                  : "N/A"}
              </h3>
            </Col>
            <Col span={3}>
              <h3
                style={{
                  color:
                    order.order_status === "Approved"
                      ? "green"
                      : order.order_status === "Declined"
                      ? "red"
                      : "orange",
                  backgroundColor:
                    order.order_status === "Approved"
                      ? "#e6ffe6"
                      : order.order_status === "Declined"
                      ? "#ffe6e6"
                      : "#ffffcc",
                  padding: "0.5em 1em",
                  borderRadius: "5px",
                  width: "fit-content",
                  border: "1px solid #ccc",
                }}
              >
                {order.order_status ? order.order_status : "Pending"}
              </h3>
            </Col>
            <Col span={2}>
              <Button onClick={() => handleOrderClick(order.id)}>
                <EyeOutlined />
              </Button>
              {selectedOrder && (
                <OrderDetailModal orderDetails={orderDetails} />
              )}
            </Col>
            <Col span={4}>
              {editMode ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  <Select
                    defaultValue={order.order_status}
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => handleStatusChange(order.id, value)}
                  >
                    <Select.Option value="Approved">Approved</Select.Option>
                    <Select.Option value="Declined">Declined</Select.Option>
                    <Select.Option value="Pending">Pending</Select.Option>
                  </Select>
                  <Button danger onClick={() => setEditMode(false)}>
                    <CloseCircleFilled />
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button
                  style={{
                    color: "orange",
                    border: "1px solid orange",
                  }}
                  onClick={() => setEditMode(true)}
                >
                  <EditOutlined />
                  Edit
                </Button>
              )}
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
