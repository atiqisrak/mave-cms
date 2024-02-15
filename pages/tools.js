import { Button, Col, Image, Row, message } from "antd";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import ImageConverter from "../components/tools/ImageConverter";
import { LockOutlined } from "@ant-design/icons";
import ImageOptimizer from "../components/tools/ImageOptimizer";


const Tools = () => {
    const [showImageToWebPConverter, setShowImageToWebPConverter] = useState(false);
    const [showImageOptimizer, setShowImageOptimizer] = useState(false);
    const router = useRouter();

    const tools = [
        {
            title: "Image Converter",
            description: "Convert images to different formats",
            image: "/images/mave_logo.png",
            onClick: () => setShowImageToWebPConverter(true),
            premium: 0
        },
        {
            title: "Image Optimizer",
            description: "Optimize images",
            image: "/images/mave_logo.png",
            onClick: () => setShowImageOptimizer(true),
            // onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
        {
            title: "File Converter",
            description: "Convert files to different formats",
            image: "/images/mave_logo.png",
            onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
        {
            title: "ChatGPT",
            description: "Chat with AI",
            image: "/images/mave_logo.png",
            onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
        {
            title: "Remove Image Background",
            description: "Remove background from images",
            image: "/images/mave_logo.png",
            onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
        {
            title: "Meeting Scheduler",
            description: "Schedule meetings",
            image: "/images/mave_logo.png",
            onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
        {
            title: "Notes",
            description: "Take notes",
            image: "/images/mave_logo.png",
            onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
        {
            title: "Translator",
            description: "Translate text",
            image: "/images/mave_logo.png",
            onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
        {
            title: "Image Watermark",
            description: "Add watermark to images",
            image: "/images/mave_logo.png",
            onClick: () => message.info("Please purchase premium to use this tool"),
            premium: 1
        },
    ]

    return (
        <div className="ViewContainer">
            <div className="ViewContentContainer">
                <h1>Tools</h1>
                <center><p style={{
                    fontSize: "2.5em",
                    fontWeight: "bold",
                    color: "var(--theme)",
                }}>Coming soon...</p></center>

                {/* 4 column cards of tools */}
                <Row gutter={[16, 16]} style={{
                    margin: "4em 0",
                }}>
                    {tools.map((tool, index) => (
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
                                }}
                            >
                                <Image
                                    src={tool.image}
                                    alt={tool.title}
                                    width={100}
                                    height={100}
                                    objectFit="cover"
                                />
                                <div style={{ margin: "1em 0" }}>
                                    <h3>{tool.title}</h3>
                                    <p>{tool.description}</p>
                                </div>
                                <Button type="primary"
                                    icon={tool.premium === 1 ? <LockOutlined /> : null}
                                    onClick={tool.onClick}
                                    style={{
                                        backgroundColor: tool.premium === 1 ? "var(--theme)" : "blue",
                                    }}
                                >
                                    {tool.premium === 1 ? "Premium" : "Open"}
                                </Button>
                            </div>
                        </Col>
                    ))}
                </Row>

                {/* Image converter */}
                {showImageToWebPConverter && (
                    <>
                        <ImageConverter />
                        <Button
                            type="primary"
                            onClick={() => setShowImageToWebPConverter(false)
                            }>
                            Close
                        </Button>
                    </>
                )}

                {/* Image optimizer */}
                {showImageOptimizer && (
                    <ImageOptimizer />
                )}
            </div>
        </div>
    );
}

export default Tools;