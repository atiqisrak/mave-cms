// components/doctoapi/PreviewComponents/JsonPreview.js

import React from "react";
import { Card } from "antd";

const JsonPreview = ({ payload }) => {
  return (
    <Card title="JSON Preview" bordered={false} className="mt-6">
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </Card>
  );
};

export default JsonPreview;
