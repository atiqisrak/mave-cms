import React, { useState } from "react";
import ImageConverter from "./ImageConverter";
import BackgroundRemover from "./BackgroundRemover";
import MeetingScheduler from "./MeetingScheduler";
import { Modal } from "antd";

const ToolEngine = ({
    showImageConverter,
    setshowImageConverter,
    showBackgroundRemover,
    setShowBackgroundRemover,
    showMeetingScheduler,
    setShowMeetingScheduler
}) => {
    return (
        <>
            {/* Image converter */}
            <Modal
                width={1000}
                title="Image Converter"
                open={showImageConverter}
                onCancel={() => setshowImageConverter(false)}
                footer={null}
            >
                <ImageConverter />
            </Modal>

            {/* Background remover */}
            <Modal
                width={1000}
                title="Background Remover"
                open={showBackgroundRemover}
                onCancel={() => setShowBackgroundRemover(false)}
                footer={null}
            >
                <BackgroundRemover />
            </Modal>

            {/* Meeting scheduler */}
            <Modal
                width={1000}
                title="Meeting Scheduler"
                open={showMeetingScheduler}
                onCancel={() => setShowMeetingScheduler(false)}
                footer={null}
            >
                <MeetingScheduler />
            </Modal>
        </>
    );
};

// Custom styles
const styles = {
    mave_modal: {
        width: "80%",
        margin: "auto",
        marginTop: "1rem",
        borderRadius: "10px",
    },
};

export default ToolEngine;
