// components/Blog/BlogFormFields.jsx

import React from "react";
import { Input, Select, Switch } from "antd";
import SEOFields from "./SEOFields";

const { Option } = Select;

const BlogFormFields = ({
  meta,
  setMeta,
  seo,
  setSeo,
  seoEnabled,
  setSeoEnabled,
  blog_categories,
  blog_tags,
}) => {
  const { title_en, title_bn, category, tags } = meta;

  return (
    <div className="flex flex-col space-y-6">
      {/* Blog Titles */}
      <Input
        placeholder="Enter blog title"
        className="text-lg font-medium"
        value={title_en}
        onChange={(e) => setMeta({ ...meta, title_en: e.target.value })}
      />
      <Input
        placeholder="Enter blog title in Bangla"
        className="text-lg font-medium"
        value={title_bn}
        onChange={(e) => setMeta({ ...meta, title_bn: e.target.value })}
      />

      {/* Category Selection */}
      <Select
        placeholder="Select blog category"
        className="text-lg font-medium"
        value={category}
        onChange={(value) => setMeta({ ...meta, category: value })}
        showSearch
      >
        {blog_categories.map((cat) => (
          <Option key={cat.id} value={cat.value}>
            {cat.name}
          </Option>
        ))}
      </Select>

      {/* Tags Selection */}
      <Select
        mode="tags"
        placeholder="Select blog tags"
        className="text-lg font-medium"
        value={tags}
        onChange={(value) => setMeta({ ...meta, tags: value })}
        showSearch
      >
        {blog_tags.map((tag) => (
          <Option key={tag.id} value={tag.value}>
            {tag.name}
          </Option>
        ))}
      </Select>

      {/* SEO Toggle */}
      <div className="flex items-center">
        <Switch
          checkedChildren="SEO Enabled"
          unCheckedChildren="SEO Disabled"
          checked={seoEnabled}
          onChange={(checked) => setSeoEnabled(checked)}
          className="mr-4"
        />
        <span className="text-lg font-medium">Enable SEO</span>
      </div>

      {/* SEO Fields */}
      {seoEnabled && <SEOFields seo={seo} setSeo={setSeo} />}
    </div>
  );
};

export default BlogFormFields;
