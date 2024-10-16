import { Col, Modal, Row, Tabs, message, Button, Select, Input } from "antd";
import React, { useState, useEffect } from "react";
import DealershipRequests from "../components/DealershipRequests";
import AllOrders from "../components/AllOrders";
import ContactUsResponses from "../components/ContactUsResponses";

const Orders = () => {
  return (
    <div className="mavecontainer">
      <h1>Order Management</h1>
      <div
        style={{
          paddingTop: "3em",
        }}
      >
        <Tabs defaultActiveKey="1" type="card" size="large">
          <Tabs.TabPane tab="Order Placement" key="1">
            <AllOrders />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Dealership Opportunity" key="2">
            <DealershipRequests />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Orders;
