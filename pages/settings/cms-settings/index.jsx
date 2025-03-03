// pages/settings/index.js

import React, { useEffect, useState } from "react";
import { Tabs, Spin, message } from "antd";
import SettingsFormWrapper from "../../../components/CMSSettings/SettingsFormWrapper";
import Head from "next/head";
import instance from "../../../axios";

const { TabPane } = Tabs;

const CMSSettingsPage = () => {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch settings from the backend API
  const fetchSettings = async () => {
    try {
      const response = await instance.get("/settings");
      console.log("Settings response data:", response.data);

      // Adjust the path based on your response structure
      const data = Array.isArray(response.data)
        ? response.data
        : response.data.settings || [];
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
      message.error("Failed to load settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // Show spinner if loading or if settings are empty
  if (loading || (Array.isArray(settings) && settings.length <= 0)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin tip="Loading Settings..." size="large" />
      </div>
    );
  }

  // Optionally, display a message if settings is not an array or is empty
  if (!loading && (!Array.isArray(settings) || settings.length <= 0)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-500">No settings available.</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Settings - Mave CMS</title>
      </Head>
      <div className="mavecontainer settings-tabs">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <Tabs
          defaultActiveKey={settings[0]?.type || "general-settings"}
          type="card"
          tabPosition="left"
          className="bg-white p-6 rounded-lg min-h-screen"
        >
          {Array.isArray(settings) &&
            settings.map((setting) => (
              <TabPane tab={setting.config?.name} key={setting.type}>
                <SettingsFormWrapper
                  type={setting.type}
                  config={setting.config}
                  id={setting.id}
                />
              </TabPane>
            ))}
        </Tabs>
      </div>
    </>
  );
};

export default CMSSettingsPage;
