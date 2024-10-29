// components/slider/SliderForm/SliderTypeTabs.jsx

import React from "react";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const SliderTypeTabs = ({ type, handleTypeChange }) => (
  <Tabs activeKey={type} onChange={handleTypeChange} centered type="card">
    <TabPane tab="Image" key="image" />
    <TabPane tab="Card" key="card" />
  </Tabs>
);

export default SliderTypeTabs;
