import React from "react";
import { Layout, Breadcrumb, Button, Tabs } from "antd";
import Installation from "../../components/documentation/Installation";
import Dependency from "../../components/documentation/Dependency";
import Features from "../../components/documentation/Features";
import Support from "../../components/documentation/Support";
import Privacy from "../../components/documentation/Privacy";
import Licensing from "../../components/documentation/Licensing";
import UserGuideline from "../../components/documentation/UserGuideline";
import TermsandConditions from "../../components/documentation/TermsandConditions";
import Contributing from "../../components/documentation/Contributing";
import IssueTemplate from "../../components/documentation/IssueTemplate";
import PullRequestTemplatePage from "../../components/documentation/PullRequestTemplate";
import CodeOfConduct from "../../components/documentation/CodeOfConduct";
import { HomeOutlined } from "@ant-design/icons";

const Documentation = () => {
  const { Content } = Layout;
  return (
    <div className="ViewContainer ViewContentContainer">
      <Layout
        style={{
          padding: "0 24px 24px",
          marginBottom: "2rem",
          backgroundColor: "transparent",
        }}
      >
        <Breadcrumb
          style={{
            margin: "16px 0",
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          <Breadcrumb.Item>
            <Button icon={<HomeOutlined />} type="link" href="/" />
          </Breadcrumb.Item>
          <Breadcrumb.Item>User Manual</Breadcrumb.Item>
          <Breadcrumb.Item>Documentation</Breadcrumb.Item>
        </Breadcrumb>

        <Content
          style={{
            padding: "24px",
            margin: 0,
            minHeight: 280,
            backgroundColor: "#fff",
            borderRadius: "8px",
          }}
        >
          <h1
            style={{
              fontSize: "1.8rem",
              fontWeight: 600,
              marginBottom: "1.5rem",
              textAlign: "center",
            }}
          >
            Content Management Settings
          </h1>
          <Tabs
            tabPosition="left"
            centered
            defaultActiveKey="1"
            type="card"
            style={{
              marginBottom: "3rem",
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "2rem",
            }}
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
            <Tabs.TabPane tab="Terms and Conditions" key="8">
              <TermsandConditions />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Contributing" key="9">
              <Contributing />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Issue Template" key="10">
              <IssueTemplate />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Pull Request Template" key="11">
              <PullRequestTemplatePage />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Code of Conduct" key="12">
              <CodeOfConduct />
            </Tabs.TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
};

export default Documentation;
