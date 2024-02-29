// Import necessary components and icons
import React, { useState, useRef } from "react";
import { Button, Upload, message, Slider } from "antd";
import { UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import Croppie from 'croppie'; // Import Croppie library
import 'croppie/croppie.css'; // Import Croppie styles

const InfluencerTemplate = () => {
    const [image, setImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    const [mergedImage, setMergedImage] = useState(null);
    const [scaleFactor, setScaleFactor] = useState(1);
    const canvasRef = useRef(null);
    const [croppieInstance, setCroppieInstance] = useState(null);

    // Initialize Croppie instance
    const initializeCroppie = () => {
        const croppie = new Croppie(document.getElementById('croppie-container'), {
            viewport: { width: 200, height: 250, type: 'square' },
            boundary: { width: 300, height: 450 },
            enableZoom: true,
            enableOrientation: true,
            quality: 1
        });
        setCroppieInstance(croppie);
    };

    // Handle image change event
    const handleImageChange = (info) => {
        if (info.file.status === 'done') {
            const reader = new FileReader();
            reader.onload = () => {
                if (croppieInstance) {
                    croppieInstance.bind({
                        url: reader.result
                    });
                }
            };
            reader.readAsDataURL(info.file.originFileObj);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    // Handle cropping event
    const handleCrop = () => {
        if (croppieInstance) {
            croppieInstance.result({
                type: 'base64',
                size: { width: 200, height: 250 },
                format: 'png'
            }).then((dataImg) => {
                setCroppedImage(dataImg);
            });
        }
    };

    // Handle submission of the cropped image
    const handleSubmit = () => {
        // Perform any action you want with the cropped image, such as saving it to a server
        // For now, let's set it as the merged image
        setMergedImage(croppedImage);
    };

    return (
        <div className="InfluencerTemplate" style={{
            marginTop: "2rem",
            padding: "2rem",
            border: "1px solid var(--gray)",
            borderRadius: "5px",
        }}>
            <Upload.Dragger
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "1em",
                }}
            >
                <p className="ant-upload-drag-icon">
                    <UploadOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">Support for a single upload.</p>
            </Upload.Dragger>

            <div className="flexed-evenly">
                <div>
                    <h2>Uploaded Image</h2>
                    <div id="croppie-container" style={{ width: '300px', height: '450px' }} />
                </div>

                <div>
                    <Button type="primary" onClick={handleCrop}>
                        Crop Image
                    </Button>
                    <Button type="primary" onClick={handleSubmit} disabled={!croppedImage}>
                        Submit Cropped Image
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default InfluencerTemplate;
