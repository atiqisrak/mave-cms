import React from "react";
import { Tabs } from "antd";
import Installation from "../../components/documentation/Installation";
import Dependency from "../../components/documentation/Dependency";
import Features from "../../components/documentation/Features";
import Support from "../../components/documentation/Support";
import Privacy from "../../components/documentation/Privacy";
import Licensing from "../../components/documentation/Licensing";
import UserGuideline from "../../components/documentation/UserGuideline";

const Documentation = () => {
  return (
    <div className="ViewContainer">
      <Tabs
        // tabPosition="left"
        centered
        defaultActiveKey="1"
        type="card"
        style={{ marginBottom: "3rem" }}
      >
        <Tabs.TabPane tab="Installation" key="1">
          <Installation />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Dependency" key="2">
          <Dependency />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Features" key="3">
          <Features />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Support" key="4">
          <Support />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Privacy" key="5">
          <Privacy />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Licensing" key="6">
          <Licensing />
        </Tabs.TabPane>
        <Tabs.TabPane tab="User Guideline" key="7">
          <UserGuideline />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Documentation;
