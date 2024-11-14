// components/Blog/SEOFields.jsx

import React from "react";
import { Input, Select } from "antd";

const { Option } = Select;

const SEOFields = ({ seo, setSeo }) => {
  return (
    <div className="flex flex-col space-y-4">
      <Input
        placeholder="Enter SEO title"
        className="text-lg font-medium"
        value={seo.seoTitle}
        onChange={(e) => setSeo({ ...seo, seoTitle: e.target.value })}
      />
      <Input.TextArea
        placeholder="Enter SEO description"
        className="text-lg font-medium"
        rows={3}
        value={seo.seoDescription}
        onChange={(e) => setSeo({ ...seo, seoDescription: e.target.value })}
      />
      <Select
        mode="tags"
        placeholder="Enter SEO keywords"
        className="text-lg font-medium"
        value={seo.seoKeywords}
        onChange={(value) => setSeo({ ...seo, seoKeywords: value })}
      >
        {/* Optionally, predefined keywords can be added here */}
      </Select>
    </div>
  );
};

export default SEOFields;
