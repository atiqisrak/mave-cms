import React from "react";
import { Layout } from "antd";
// import Sidebar from "./Sidebar";
// import Header from "./Header";

const { Content } = Layout;

const EditorLayout = ({ children }) => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* <Sidebar /> */}
      <Layout>
        {/* <Header /> */}
        <Content style={{ padding: "20px", background: "#fff" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default EditorLayout;
