import { Button, Col, Image, Input, Modal, Row, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import ToolEngine from "./ToolEngine";
import { LockOutlined } from "@ant-design/icons";

const ToolsMarketplace = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showImageConverter, setshowImageConverter] = useState(false);
  const [showImageOptimizer, setShowImageOptimizer] = useState(false);
  const [showBackgroundRemover, setShowBackgroundRemover] = useState(false);
  const [showMeetingScheduler, setShowMeetingScheduler] = useState(false);
  const [toolsData, setToolsData] = useState(tools);

  // ---------- Premium user ----------
  const [userData, setUserData] = useState({});
  const [roles, setRoles] = useState([
    { id: 1, u_id: "9zrsdrfhw8", name: "Super Admin" },
    { id: 2, u_id: "y8wewowlhl", name: "Admin" },
    { id: 3, u_id: "btrq7wcnsv", name: "Editor" },
    { id: 4, u_id: "lf0kaur5u4", name: "User" },
    { id: 5, u_id: "c66aaozpxq", name: "Guest" },
  ]);

  const [roles2, setRoles2] = useState([
    { id: 1, u_id: "y8wewowlhl", name: "Admin" },
    { id: 2, u_id: "btrq7wcnsv", name: "Editor" },
    { id: 3, u_id: "lf0kaur5u4", name: "User" },
    { id: 4, u_id: "c66aaozpxq", name: "Guest" },
  ]);

  const isSuperAdmin = userData?.role_id === 1;
  const isAdmin = userData?.role_id === 2;

  const premiumUser = isSuperAdmin || isAdmin;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
      // console.log("User Data: ", JSON.parse(storedUser));
    }
  }, []);
  useEffect(() => {
    if (userData?.role_id == 1 || userData?.role_id == 2) {
      const fetchUsers = async () => {
        setLoading(true);
        try {
          const res = await instance.get("/admin/users");
          setUsers(res.data);
          // console.log("All Users: ", res.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      };
      fetchUsers();
    }
  }, [userData]);

  //   const boomButton = () => {

  // ---------- Premium user ----------
  const categories = [
    "All",
    "Image Editing",
    "File Management",
    "AI",
    "Productivity",
    "Marketing",
    "Communication",
  ];

  const tools = [
    {
      id: "m_t_0001",
      title: "Image Converter",
      description:
        "Convert images to different formats such as JPEG, PNG, GIF, BMP, and more. This tool allows users to easily convert images from one format to another without losing quality.",
      image: "/images/mave_logo.png",
      premium: 0,
      category: ["Image Editing", "File Management"],
    },
    {
      id: "m_t_0002",
      title: "Image Optimizer",
      description:
        "Optimize images to reduce their file size without significantly affecting their visual quality. This tool is useful for improving website performance by reducing page load times.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Image Editing"],
    },
    {
      id: "m_t_0003",
      title: "File Converter",
      description:
        "Convert various types of files to different formats. Supported file types include documents, images, videos, and audio files. Users can easily convert files to formats compatible with different software applications.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["File Management"],
    },
    {
      id: "m_t_0004",
      title: "ChatGPT",
      description:
        "Chat with an AI-powered virtual assistant to get answers to questions, receive recommendations, or engage in natural language conversations. ChatGPT uses advanced natural language processing algorithms to understand and respond to user input.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["AI", "Communication"],
    },
    {
      id: "m_t_0005",
      title: "Remove Image Background",
      description:
        "Remove the background from images with precision and ease. This tool uses advanced algorithms to automatically detect and remove the background from images, allowing users to isolate objects or people.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Image Editing"],
    },
    {
      id: "m_t_0006",
      title: "Meeting Scheduler",
      description:
        "Schedule meetings and appointments with ease. This tool allows users to view their calendar, check availability, and send meeting invitations to participants. It integrates with popular calendar platforms such as Google Calendar and Microsoft Outlook.",
      image: "/images/Google_Meet_icon.svg",
      premium: premiumUser ? 1 : 0,
      category: ["Productivity", "Communication"],
    },
    {
      id: "m_t_0007",
      title: "Notes",
      description:
        "Take and organize notes for personal or professional use. This tool provides a simple and intuitive interface for creating, editing, and organizing notes. Users can categorize notes, add tags, and set reminders.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Productivity"],
    },
    {
      id: "m_t_0008",
      title: "Translator",
      description:
        "Translate text from one language to another quickly and accurately. This tool supports translation between multiple languages and offers features such as text-to-speech and language detection. It's useful for communication and language learning.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Productivity", "Language"],
    },
    {
      id: "m_t_0009",
      title: "Image Watermark",
      description:
        "Add watermarks to images to protect copyrights or branding. This tool allows users to customize the watermark's text, font, size, color, and opacity. It's useful for photographers, artists, and businesses.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Image Editing", "Security"],
    },
    {
      id: "m_t_0010",
      title: "Image Resizer",
      description:
        "Resize images to specific dimensions or percentages. This tool allows users to resize images while maintaining aspect ratios to prevent distortion. It's useful for optimizing images for websites, social media, and email.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Image Editing"],
    },
    {
      id: "m_t_0011",
      title: "Video Converter",
      description:
        "Convert videos to different formats such as MP4, AVI, MOV, and more. This tool supports batch conversion and offers options to adjust video settings such as resolution, frame rate, and bitrate.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Video Editing", "File Management"],
    },
    {
      id: "m_t_0012",
      title: "Backup & Restore",
      description:
        "Backup and restore data to prevent loss of important files and information. This tool allows users to create backups of files, folders, and entire systems, and restore them in case of data loss or system failure.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Data Management", "Security"],
    },
    {
      id: "m_t_0013",
      title: "Password Generator",
      description:
        "Generate strong and secure passwords to protect accounts and sensitive information. This tool creates random passwords with customizable criteria such as length, complexity, and character sets.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Security"],
    },
    {
      id: "m_t_0014",
      title: "QR Code Generator",
      description:
        "Generate QR codes for websites, contact information, Wi-Fi networks, and more. This tool allows users to customize QR code designs and track scan analytics. It's useful for marketing, advertising and information sharing.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Marketing", "Advertising"],
    },
    {
      id: "m_t_0015",
      title: "SEO Analyzer",
      description:
        "Analyze the search engine optimization (SEO) of websites to improve their visibility and ranking in search engine results. This tool provides insights into on-page and off-page SEO factors, keyword analysis, backlink profiles, and more.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Marketing", "Web Development"],
    },
    {
      id: "m_t_0016",
      title: "Social Media Scheduler",
      description:
        "Schedule and automate posts on social media platforms such as Facebook, Twitter, LinkedIn, and Instagram. This tool allows users to plan their social media content in advance, track engagement metrics, and optimize posting times.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Social Media", "Marketing"],
    },
    {
      id: "m_t_0017",
      title: "Invoice Generator",
      description:
        "Generate professional invoices for billing clients and customers. This tool allows users to customize invoice templates with their branding, add line items, calculate totals, and send invoices directly to recipients.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Finance", "Business"],
    },
    {
      id: "m_t_0018",
      title: "Survey and Poll Creator",
      description:
        "Create surveys and polls to gather feedback, opinions, and insights from respondents. This tool offers a variety of question types, customizable survey designs, and analytics dashboards to analyze responses.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Research", "Feedback"],
    },
    {
      id: "m_t_0019",
      title: "Augmented Reality (AR) Product Viewer",
      description:
        "View products in augmented reality (AR) to visualize how they would look in real-world environments. This tool allows users to interact with virtual 3D models of products and explore their features from different angles.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["E-commerce", "Technology"],
    },
    {
      id: "m_t_0020",
      title: "Customer Support Chatbot",
      description:
        "Automate customer support with an AI-powered chatbot that can answer common questions, provide assistance, and resolve issues. This tool uses natural language processing to understand customer inquiries and deliver relevant responses.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Customer Service", "AI"],
    },
    {
      id: "m_t_0021",
      title: "API Marketplace",
      description:
        "Access a marketplace of APIs (Application Programming Interfaces) to integrate third-party services and functionalities into applications and websites. This tool provides developers with a catalog of APIs for various purposes such as payments, maps, weather, and more.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Development", "Integration"],
    },
    {
      id: "m_t_0022",
      title: "ATS (Applicant Tracking System)",
      description:
        "Track and manage job applications throughout the hiring process. This tool allows recruiters and hiring managers to post job openings, receive applications, screen candidates, schedule interviews, and make hiring decisions.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["HR", "Recruitment"],
    },
    {
      id: "m_t_0023",
      title: "LMS (Learning Management System)",
      description:
        "Manage online learning and training programs for educational institutions, businesses, and organizations. This tool provides features for course creation, content delivery, student enrollment, progress tracking, and assessment.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Education", "Training"],
    },
    {
      id: "m_t_0024",
      title: "Email Marketing",
      description:
        "Send targeted marketing emails to subscribers and customers to promote products, services, and events. This tool offers features for email campaign creation, audience segmentation, automation, analytics, and reporting.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Marketing", "Communication"],
    },
    {
      id: "m_t_0025",
      title: "Tool Name",
      description: "Description of the tool.",
      image: "/images/mave_logo.png",
      premium: premiumUser ? 1 : 0,
      category: ["Category1", "Category2"],
    },
  ];

  const handleSearch = (value) => {
    if (value === "") {
      setToolsData(tools);
    } else {
      const filteredData = tools.filter((mytool) =>
        mytool.title.toLowerCase().includes(value.toLowerCase())
      );
      setToolsData(filteredData);
    }
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  useEffect(() => {
    if (selectedCategory === "All") {
      setToolsData(tools);
    } else {
      const filteredData = tools.filter((tool) =>
        tool.category.includes(selectedCategory)
      );
      setToolsData(filteredData);
    }
  }, [selectedCategory, toolsData]);

  return (
    <div>
      <center>
        <h1
          style={{
            // gradient font color
            color: "var(--theme)",
          }}
        >
          Tools Marketplace
        </h1>
      </center>
      <div
        style={{
          margin: "2em 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          className="flexed-center"
          style={{
            gap: "1em",
          }}
        >
          <h3>Find the right tools for your needs</h3>
          <Input
            placeholder="Search tools..."
            style={{ width: "200px", marginRight: "10px" }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <div>
          <span>Category: </span>
          <Select
            defaultValue="All"
            style={{ width: 120 }}
            onChange={handleCategoryChange}
          >
            {categories?.map((category, index) => (
              <Select.Option key={index} value={category}>
                {category}
              </Select.Option>
            ))}
          </Select>
        </div>
      </div>
      <Row gutter={[16, 16]} style={{ margin: "4em 0" }}>
        {toolsData &&
          toolsData?.map((tool, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <div
                style={{
                  padding: "1em",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  border: "1px solid #f0f0f0",
                  borderRadius: "15px",
                  height: "100%",
                  gap: "1em",
                }}
              >
                <Image
                  src={tool.image}
                  alt={tool.title}
                  width={100}
                  height={100}
                  objectFit="cover"
                  preview={false}
                />
                <div
                  style={{
                    margin: "1em 0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1em",
                  }}
                >
                  <h3>{tool.title}</h3>
                  <p
                    style={{
                      textAlign: "justify",
                    }}
                  >
                    {tool.description}
                  </p>
                </div>
                {premiumUser && tool.premium === 1 ? null : null}
              </div>
            </Col>
          ))}
      </Row>
      <ToolEngine
        showImageConverter={showImageConverter}
        setshowImageConverter={setshowImageConverter}
        showImageOptimizer={showImageOptimizer}
        setShowImageOptimizer={setShowImageOptimizer}
        showBackgroundRemover={showBackgroundRemover}
        setShowBackgroundRemover={setShowBackgroundRemover}
        showMeetingScheduler={showMeetingScheduler}
        setShowMeetingScheduler={setShowMeetingScheduler}
      />
    </div>
  );
};

export default ToolsMarketplace;
