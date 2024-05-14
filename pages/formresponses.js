import { Col, Modal, Row, Tabs, message, Button, Select, Input } from "antd";
import React, { useState, useEffect } from "react";
import DealershipRequests from "../components/DealershipRequests";
import AllOrders from "../components/AllOrders";
import ContactUsResponses from "../components/ContactUsResponses";
import SystemDemand from "../components/SystemDemand";

const FormResponses = () => {
  return (
    <div className="ViewContainer">
      <div className="ViewContentContainer">
        <h1>Form Responses</h1>
        <div
          style={{
            paddingTop: "3em",
          }}
        >
          {/* <Tabs defaultActiveKey="1" type="card" size="large">
                        <Tabs.TabPane tab="Contact Us" key="1">
                            <ContactUsResponses />
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="System Demand" key="2">
                            <SystemDemand />
                        </Tabs.TabPane>
                    </Tabs> */}
          <ContactUsResponses />
        </div>
      </div>
    </div>
  );
};

export default FormResponses;
