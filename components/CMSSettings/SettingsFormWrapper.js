// components/CMSSettings/SettingsFormWrapper.js

import React from "react";
import GeneralSettings from "./GeneralSettings";
import SEOSettings from "./SEOSettings";
import ContentSettings from "./ContentSettings";
import SecuritySettings from "./SecuritySettings";
import EmailSettings from "./EmailSettings";
import NotificationSettings from "./NotificationSettings";
import BackupSettings from "./BackupSettings";
import CacheSettings from "./CacheSettings";
import PerformanceSettings from "./PerformanceSettings";
import AnalyticsSettings from "./AnalyticsSettings";
import PaymentSettings from "./PaymentSettings";
import APISettings from "./APISettings";

const SettingsFormWrapper = ({ type, config, id }) => {
  switch (type) {
    case "general-settings":
      return <GeneralSettings config={config} id={id} />;
    case "seo-settings":
      return <SEOSettings config={config} id={id} />;
    case "content-settings":
      return <ContentSettings config={config} id={id} />;
    case "security-settings":
      return <SecuritySettings config={config} id={id} />;
    case "email-settings":
      return <EmailSettings config={config} id={id} />;
    case "notification-settings":
      return <NotificationSettings config={config} id={id} />;
    case "backup-settings":
      return <BackupSettings config={config} id={id} />;
    case "cache-settings":
      return <CacheSettings config={config} id={id} />;
    case "performance-settings":
      return <PerformanceSettings config={config} id={id} />;
    case "analytics-settings":
      return <AnalyticsSettings config={config} id={id} />;
    case "payment-settings":
      return <PaymentSettings config={config} id={id} />;
    case "api-settings":
      return <APISettings config={config} id={id} />;
    default:
      return <div>Unknown Settings Type</div>;
  }
};

export default SettingsFormWrapper;
