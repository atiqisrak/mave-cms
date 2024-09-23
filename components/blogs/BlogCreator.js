import { Breadcrumb, Button, Input, Select, Spin, Switch } from "antd";
import React, { useEffect, useState } from "react";
import BlogEditor from "./BlogEditor";
import instance from "../../axios";
import router from "next/router";
import { FileImageTwoTone, RobotOutlined } from "@ant-design/icons";
import Image from "next/image";
import SingleMediaSelect from "../SingleMediaSelect";

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
  const [featuredImage, setFeaturedImage] = useState(null); //featured image id
  const [mediaSelectionVisible, setMediaSelectionVisible] = useState(false);
  const MEDIA_URL = process.env.NEXT_PUBLIC_MEDIA_URL;
  const [hovered, setHovered] = useState(false);

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

  const [mediaAssets, setMediaAssets] = useState(null);

  const fetchMediaAssets = async () => {
    try {
      const response = await instance.get("/media");
      if (response.status === 200) {
        setMediaAssets(response.data);
      } else {
        console.error("Error fetching media assets: ", response.data);
      }
    } catch (error) {
      console.error("Error fetching media assets: ", error);
    }
  };

  useEffect(() => {
    fetchMediaAssets();
    setLoading(false);
  }, [mediaSelectionVisible]);

  console.log("Media Assets: ", mediaAssets);

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
            _category: "root",
            data: [
              {
                type: "description",
                value: content,
              },
              {
                type: "media",
                id: featuredImage,
              },
            ],
          },
        ],
      });
      if (response.status === 200) {
        console.log("Blog created successfully: ", response.data);
        fetchBlogs();
        router.push("/blogs");
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
        <h1
          style={{
            color: "var(--themes)",
          }}
        >
          Create a blog
        </h1>
      </center>
      <div
        style={{
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Breadcrumb
          style={{
            alignSelf: "flex-start",
            cursor: "pointer",
          }}
        >
          <Breadcrumb.Item
            onClick={() => {
              router.push("/");
            }}
          >
            Home
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              router.push("/blogs");
            }}
          >
            Blogs
          </Breadcrumb.Item>
          <Breadcrumb.Item
            onClick={() => {
              router.push("#");
            }}
          >
            Create Blog
          </Breadcrumb.Item>
        </Breadcrumb>
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

        {/* Create Blog */}
        <div
          className="Thumbnail"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row-reverse",
            gap: "1rem",
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <h2
            style={{
              position: "absolute",
              zIndex: 1,
              backgroundColor: "#ffffff90",
              fontWeight: "500",
              fontSize: "2rem",
              textAlign: "center",
              lineHeight: "2rem",
              padding: "1rem 2rem",
              borderRadius: "10px",
              border: "1px solid #f0f0f0",
              cursor: "pointer",
              display: hovered ? "block" : "none",
            }}
            onClick={() => {
              setMediaSelectionVisible(true);
            }}
          >
            Select Feature Image
          </h2>

          <Image
            src={
              featuredImage
                ? `${MEDIA_URL}/${
                    featuredImage
                      ? mediaAssets.find((item) => item.id === featuredImage)
                          .file_path
                      : "/images/Image_Placeholder.png"
                  }`
                : "/images/Image_Placeholder.png"
            }
            alt="Featured Image"
            width={600}
            height={300}
            objectFit={featuredImage ? "cover" : "contain"}
            style={{
              borderRadius: "20px",
              border: "1px solid var(--borderNormal)",
              filter: hovered ? "brightness(0.7) blur(1px)" : "none",
              cursor: "pointer",
            }}
            onClick={() => {
              setMediaSelectionVisible(true);
            }}
          />
        </div>

        {mediaSelectionVisible && (
          <SingleMediaSelect
            open={mediaSelectionVisible}
            setVisible={setMediaSelectionVisible}
            setSelectedMediaId={setFeaturedImage}
            onMediaSelect={(mediaId) => {
              setFeaturedImage(mediaId);
            }}
            onCancel={() => {
              setMediaSelectionVisible(false);
            }}
          />
        )}
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

            <Input.TextArea
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
