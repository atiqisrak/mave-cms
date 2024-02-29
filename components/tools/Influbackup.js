import React, { useState, useRef } from "react";
import { Button, Upload, message, Slider } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";

const InfluencerTemplate = () => {
    const [image, setImage] = useState(null);
    const [mergedImage, setMergedImage] = useState(null);
    const [scaleFactor, setScaleFactor] = useState(1);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const canvasRef = useRef(null);

    const mergeImages = (uploadedImg) => {
        if (!uploadedImg) {
            return;
        }

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Load the frame image
        const frameImg = new Image();
        frameImg.src = "/images/influencertemplate.png"; // Replace with the path to your frame image
        frameImg.onload = () => {
            // Once the frame image is loaded, draw it on the canvas
            canvas.width = frameImg.width;
            canvas.height = frameImg.height;
            ctx.drawImage(frameImg, 0, 0);

            // Calculate scaled dimensions
            const scaledWidth = uploadedImg.width * scaleFactor;
            const scaledHeight = uploadedImg.height * scaleFactor;

            // Calculate position to center the scaled image
            const x = (canvas.width - scaledWidth) / 2;
            const y = (canvas.height - scaledHeight) / 2;

            // Draw the uploaded image with scaled size
            ctx.drawImage(uploadedImg, x, y, scaledWidth, scaledHeight);
            ctx.drawImage(frameImg, 0, 0);
            // Set the merged image as the result
            setMergedImage(canvas.toDataURL("image/png"));
        };
    };

    const handleImageChange = (info) => {
        if (info.file.status === "done") {
            const uploadedImg = new Image();
            uploadedImg.src = URL.createObjectURL(info.file.originFileObj);
            uploadedImg.onload = () => {
                mergeImages(uploadedImg);
            };
            setImage(uploadedImg);
        } else if (info.file.status === "error") {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const handleMouseDrag = (e) => {
        if (image) {
            setImagePosition({
                // x: e.clientX - canvasRef.current.offsetLeft,
                // y: e.clientY - canvasRef.current.offsetTop,
                x: e.nativeEvent.offsetX - (image.width * scaleFactor) / 2,
                y: e.nativeEvent.offsetY - (image.height * scaleFactor) / 2,
            });
        }
    };

    const handleScaleChange = (value) => {
        setScaleFactor(value);
        mergeImages(image); // Merge images again when scale changes
    };

    const handleDownload = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href = mergedImage;
        downloadLink.download = "I_am_Techno.png"; // Set the file name
        downloadLink.click();
    };

    return (
        <div className="InfluencerTemplate" style={{
            marginTop: "2rem",
            padding: "2rem",
            border: "1px solid var(--gray)",
            borderRadius: "5px",
        }}>
            <Upload
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                showUploadList={false}
            >
                <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>

            <div className="flexed-evenly">
                <div>
                    <h2>Uploaded Image</h2>
                    {image && (
                        <img
                            src={image.src}
                            alt="Uploaded"
                            style={{ maxWidth: "300px", height: "auto" }}
                        />
                    )}
                </div>

                <div>
                    <canvas
                        onMouseMove={handleMouseDrag}
                        ref={canvasRef}
                        style={{ display: "none" }} />
                    {mergedImage && (
                        <div className="Preview">
                            <h2>Merged Image</h2>
                            <img
                                src={mergedImage}
                                alt="Merged"
                                style={{ maxWidth: "350px", height: "auto" }}
                            />
                        </div>
                    )}
                    <div style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "1em",
                    }}>
                        <h3>Scale</h3>
                        <Slider
                            min={0.1}
                            max={2}
                            step={0.1}
                            onChange={handleScaleChange}
                            value={scaleFactor}
                            style={{ width: "80%" }}
                            disabled={!image} // Disable slider if no image is uploaded
                        />
                    </div>
                    <Button type="primary" onClick={handleDownload} disabled={!mergedImage}>
                        <DownloadOutlined />
                        Download
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default InfluencerTemplate;
