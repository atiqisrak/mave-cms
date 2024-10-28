import React, { useState } from "react";
import { Typography, List, Divider, Steps, Button } from "antd";

const { Title, Paragraph } = Typography;
const { Step } = Steps;

const Installation = () => {
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const steps = [
    {
      title: "System Requirements",
      content: (
        <div>
          <Title level={4}>Minimum Requirements:</Title>
          <List
            dataSource={[
              "CPU: 2 cores",
              "RAM: 4 GB",
              "Storage: 20 GB SSD",
              "Operating System: Ubuntu 18.04 or later, Windows 10 or later, macOS 10.15 or later",
              "Browser: Any modern browser with V8 rendering engine (e.g., Google Chrome, Chromium)",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
          <Title level={4}>Recommended Requirements:</Title>
          <List
            dataSource={[
              "CPU: 4 cores",
              "RAM: 8 GB",
              "Storage: 50 GB SSD",
              "Operating System: Ubuntu 20.04 or later, Windows 11, macOS 11 or later",
              "Browser: Latest version of Google Chrome",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      ),
    },
    {
      title: "Prerequisites",
      content: (
        <div>
          <Title level={4}>Prerequisites</Title>
          <List
            dataSource={[
              "Browser: Any modern browser with V8 rendering engine (e.g., Google Chrome, Chromium)",
              "Cloud Environment: Ensure you have access to a cloud environment where you can upload and extract files.",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </div>
      ),
    },
    {
      title: "Installation Steps",
      content: (
        <div>
          <Title level={4}>Installation Steps</Title>
          <Steps direction="vertical" current={3}>
            <Step
              title="Upload the ZIP file"
              description={
                <div>
                  <Paragraph>
                    Download the latest MAVE release ZIP file from our website.
                  </Paragraph>
                  <Paragraph>
                    Upload the ZIP file to your cloud environment.
                  </Paragraph>
                </div>
              }
            />
            <Step
              title="Extract the ZIP file"
              description={
                <Paragraph>
                  Navigate to the uploaded ZIP file and extract it in your cloud
                  environment.
                </Paragraph>
              }
            />
            <Step
              title="Initial Configuration"
              description={
                <div>
                  <Paragraph>
                    Access the extracted directory and open the MAVE
                    application.
                  </Paragraph>
                  <Paragraph>
                    Enter your license key when prompted to activate the
                    application.
                  </Paragraph>
                </div>
              }
            />
            <Step
              title="Complete"
              description={
                <Paragraph>Your MAVE instance is now up and running!</Paragraph>
              }
            />
          </Steps>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Steps current={current}>
        {steps?.map((item) => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content" style={{ marginTop: "24px" }}>
        {steps[current].content}
      </div>
      <div className="steps-action" style={{ marginTop: "24px" }}>
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
            Previous
          </Button>
        )}
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => alert("Installation Complete!")}
          >
            Done
          </Button>
        )}
      </div>
    </div>
  );
};

export default Installation;
