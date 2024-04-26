import { Button, Input, Select, Spin, Switch } from "antd";
import React, { useEffect, useState } from "react";
import BlogEditor from "./BlogEditor";
import TextArea from "antd/es/input/TextArea";
import instance from "../../axios";
import router from "next/router";
import { RobotOutlined } from "@ant-design/icons";

const BlogCreator = ({ creatorMode, setCreatorMode, fetchBlogs }) => {
  const blog_categories = [
    {
      id: 1,
      name: "News",
      value: "news",
    },
    {
      id: 2,
      name: "Tech",
      value: "tech",
    },
    {
      id: 3,
      name: "Health",
      value: "health",
    },
    {
      id: 4,
      name: "Sports",
      value: "sports",
    },
    {
      id: 5,
      name: "Entertainment",
      value: "entertainment",
    },
    {
      id: 6,
      name: "Science",
      value: "science",
    },
  ];
  const blog_tags = [
    {
      id: 1,
      name: "News",
      value: "news",
      related: [3, 4, 6],
      color: "red",
    },
    {
      id: 2,
      name: "Tech",
      value: "tech",
      related: [1, 2, 3, 4, 5, 6],
      color: "blue",
    },
    {
      id: 3,
      name: "Health",
      value: "health",
      related: [1, 2, 3, 4, 5, 6],
      color: "green",
    },
    {
      id: 4,
      name: "Sports",
      value: "sports",
      related: [1, 2, 3, 4, 5, 6],
      color: "yellow",
    },
    {
      id: 5,
      name: "Entertainment",
      value: "entertainment",
      related: [1, 2, 3, 4, 5, 6],
      color: "purple",
    },
    {
      id: 6,
      name: "Science",
      value: "science",
      related: [1, 2, 3, 4, 5, 6],
      color: "orange",
    },
  ];
  const [loading, setLoading] = useState(true);
  const [seoEnabled, setSeoEnabled] = useState(false);
  const [meta, setMeta] = useState({
    title_en: "",
    title_bn: "",
    category: "",
    tags: [],
  });
  const [seo, setSeo] = useState({
    seoTitle: "",
    seoDescription: "",
    seoKeywords: "",
  });
  const [content, setContent] = useState("");

  useEffect(() => {
    setLoading(false);
  }, []);

  const { title_en, title_bn, category, tags } = meta;
  const { seoTitle, seoDescription, seoKeywords } = seo;

  const generateId = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const slugify = (text) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };

  const postBlog = async () => {
    setLoading(true);
    try {
      const response = await instance.post("/pages", {
        page_name_en: title_en,
        page_name_bn: title_bn,
        type: "Blog",
        slug: slugify(title_en),
        head: {
          seoTitle: seoTitle,
          seoDescription: seoDescription,
          seoKeywords: seoKeywords,
        },
        additional: {
          category: category,
          tags: tags,
        },
        body: [
          {
            _id: generateId(18),
            type: "blog-content",
            value: content,
          },
        ],
      });
      if (response.status === 200) {
        console.log("Blog created successfully: ", response.data);
        fetchBlogs();
      }
      console.log("Sending blog data: ", {
        title_en,
        title_bn,
        category,
        tags,
        seoTitle,
        seoDescription,
        seoKeywords,
        content,
      });
    } catch (error) {
      console.log("Error creating blog: ", error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="ViewContainer">
        <Spin />
      </div>
    );
  }

  return (
    <div className="ViewContainer">
      <center>
        <h1>Create a blog</h1>
      </center>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Button
          icon={<RobotOutlined />}
          style={{
            width: "fit-content",
            alignSelf: "flex-end",
            backgroundColor: "var(--theme)",
            color: "white",
            fontSize: "1rem",
            fontWeight: "bold",
            border: "none",
          }}
          onClick={() => {
            router.push("/write-ai");
          }}
        >
          Write with AI
        </Button>
        <Input
          placeholder="Enter blog title"
          style={{
            alignSelf: "flex-start",
            fontSize: "1rem",
            fontWeight: "500",
          }}
          value={title_en}
          onChange={(e) => {
            setMeta({ ...meta, title_en: e.target.value });
          }}
        />
        <Input
          placeholder="Enter blog title in Bangla"
          style={{
            alignSelf: "flex-start",
            fontSize: "1rem",
            fontWeight: "500",
          }}
          value={title_bn}
          onChange={(e) => {
            setMeta({ ...meta, title_bn: e.target.value });
          }}
        />
        <Select
          placeholder="Select blog category"
          style={{
            alignSelf: "flex-start",
            fontSize: "1rem",
            fontWeight: "500",
            width: "100%",
          }}
          onChange={(value) => {
            setMeta({ ...meta, category: value });
          }}
        >
          {blog_categories.map((category) => (
            <Select.Option key={category.id} value={category.value}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          mode="tags"
          placeholder="Select blog tags"
          style={{
            alignSelf: "flex-start",
            fontSize: "1rem",
            fontWeight: "500",
            width: "100%",
          }}
          onChange={(value) => {
            setMeta({ ...meta, tags: value });
          }}
        >
          {blog_tags.map((tag) => (
            <Select.Option key={tag.id} value={tag.value}>
              {tag.name}
            </Select.Option>
          ))}
        </Select>

        {/* SEO Toggle */}
        <Switch
          checkedChildren="SEO Enabled"
          unCheckedChildren="SEO Disabled"
          defaultChecked={seoEnabled}
          onChange={(checked) => {
            setSeoEnabled(checked);
          }}
          style={{
            alignSelf: "flex-start",
            fontSize: "1rem",
            fontWeight: "500",
            width: "fit-content",
          }}
        />
        {seoEnabled && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Input
              placeholder="Enter SEO title"
              style={{
                alignSelf: "flex-start",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              value={seo.seoTitle}
              onChange={(e) => {
                setSeo({ ...seo, seoTitle: e.target.value });
              }}
            />

            <TextArea
              placeholder="Enter SEO description"
              style={{
                alignSelf: "flex-start",
                fontSize: "1rem",
                fontWeight: "500",
              }}
              value={seo.seoDescription}
              onChange={(e) => {
                setSeo({ ...seo, seoDescription: e.target.value });
              }}
            />
            <Select
              mode="tags"
              placeholder="Enter SEO keywords"
              style={{
                alignSelf: "flex-start",
                fontSize: "1rem",
                fontWeight: "500",
                width: "100%",
              }}
              onChange={(value) => {
                setSeo({ ...seo, seoKeywords: value });
              }}
            />
          </div>
        )}

        {/* Blog Editor */}
        <BlogEditor
          content={content}
          setContent={setContent}
          onContentChange={(newContent) => setContent(newContent)}
        />
        <div
          style={{
            display: "flex",
            gap: "1rem",
            marginBottom: "4em",
          }}
        >
          <Button
            danger
            style={{
              width: "fit-content",
              alignSelf: "flex-end",
            }}
            onClick={() => {
              {
                setCreatorMode(!creatorMode);
                router.push("/blogs");
              }
            }}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "fit-content",
              alignSelf: "flex-end",
              backgroundColor: "var(--theme)",
              color: "white",
              fontSize: "1rem",
              fontWeight: "bold",
              border: "none",
            }}
            type="primary"
            onClick={() => {
              {
                setCreatorMode(!creatorMode);
                postBlog();
              }
            }}
          >
            Create Blog
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogCreator;
