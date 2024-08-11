import React from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;

const Privacy = () => {
  return (
    <Typography style={{ padding: "20px" }}>
      <Title>MAVE CMS Privacy Policy</Title>
      <Divider />

      <Title level={2}>Introduction</Title>
      <Paragraph>
        Ether Technologies Ltd. ("we", "our", "us") is committed to protecting
        and respecting your privacy. This Privacy Policy explains how we
        collect, use, store, and protect your personal information when you use
        MAVE CMS ("Service").
      </Paragraph>

      <Title level={2}>Contact Information</Title>
      <Paragraph>
        <Text strong>Company Name:</Text> Ether Technologies Ltd.
        <br />
        <Text strong>Address:</Text> 10/1A, Road-4, Gulshan-1, Dhaka-1229
        <br />
        <Text strong>Contact Person:</Text> Ether Support Team
        <br />
        <Text strong>Email:</Text>{" "}
        <a href="mailto:support@mavecms.com">support@mavecms.com</a>
      </Paragraph>

      <Title level={2}>Scope of the Policy</Title>
      <Paragraph>
        This Privacy Policy applies to all users of MAVE CMS and covers all
        services and products provided through our platform.
      </Paragraph>

      <Title level={2}>Data Collection</Title>
      <Title level={3}>Types of Data Collected</Title>
      <Paragraph>
        We may collect the following types of personal data:
        <ul>
          <li>
            Contact Information: Name, email address, phone number, profession,
            company name, team size managing MAVE CMS, number of monthly traffic
            the CMS will serve, and agreement to in-app purchases.
          </li>
          <li>
            Usage Data: Information about how you use our Service, including IP
            addresses, browser type, operating system, referring URLs, and pages
            visited.
          </li>
        </ul>
      </Paragraph>

      <Title level={3}>Methods of Data Collection</Title>
      <Paragraph>
        We collect data through:
        <ul>
          <li>
            Forms: When you fill out forms on our website or during the
            installation process.
          </li>
          <li>
            Automatic Data Collection: Cookies, analytics tools, and other
            technologies.
          </li>
        </ul>
      </Paragraph>

      <Title level={3}>Automatic Data Collection</Title>
      <Paragraph>
        We use cookies and similar technologies to collect usage data to enhance
        your experience on our platform. Cookies help us understand user
        behavior, track user interactions, and improve our services.
      </Paragraph>

      <Title level={2}>Data Usage</Title>
      <Title level={3}>Purpose of Data Collection</Title>
      <Paragraph>
        We use the collected data for various purposes:
        <ul>
          <li>To provide and maintain our Service</li>
          <li>To improve, personalize, and expand our Service</li>
          <li>To understand and analyze how you use our Service</li>
          <li>
            To develop new products, services, features, and functionality
          </li>
          <li>
            To communicate with you, either directly or through one of our
            partners, including for customer service, updates, and marketing
          </li>
          <li>To process transactions and manage your requests</li>
          <li>To find and prevent fraud</li>
        </ul>
      </Paragraph>

      <Title level={2}>Data Sharing</Title>
      <Paragraph>
        We may share your data with third parties in the following situations:
        <ul>
          <li>
            <Text strong>Service Providers:</Text> We may share your data with
            third-party service providers to perform tasks on our behalf, such
            as payment processing, data analysis, email delivery, hosting
            services, and customer service.
          </li>
          <li>
            <Text strong>Legal Requirements:</Text> We may disclose your data if
            required to do so by law or in response to valid requests by public
            authorities.
          </li>
        </ul>
      </Paragraph>

      <Title level={2}>Data Storage and Security</Title>
      <Title level={3}>Data Storage</Title>
      <Paragraph>
        We store your data on secure servers located in reputable data centers.
        Data retention periods are determined based on the type of data and the
        purpose for which it is collected.
      </Paragraph>

      <Title level={3}>Data Security</Title>
      <Paragraph>
        We employ a variety of security measures to protect your data, including
        encryption, access controls, and secure data storage technologies.
      </Paragraph>

      <Title level={2}>User Rights</Title>
      <Title level={3}>Access and Correction</Title>
      <Paragraph>
        You have the right to access and correct your personal data. You can
        request a copy of your data and update or correct inaccuracies.
      </Paragraph>

      <Title level={3}>Deletion and Objection</Title>
      <Paragraph>
        You have the right to request the deletion of your data or object to the
        processing of your data. To make such requests, please contact us at{" "}
        <a href="mailto:support@mavecms.com">support@mavecms.com</a>.
      </Paragraph>

      <Title level={2}>Compliance and Updates</Title>
      <Title level={3}>Legal Compliance</Title>
      <Paragraph>
        We comply with applicable data protection laws, including the General
        Data Protection Regulation (GDPR) and the California Consumer Privacy
        Act (CCPA). We ensure that your data is processed lawfully, fairly, and
        transparently.
      </Paragraph>

      <Title level={3}>Policy Updates</Title>
      <Paragraph>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on our website. You are
        advised to review this Privacy Policy periodically for any changes.
      </Paragraph>

      <Title level={2}>Third-Party Links</Title>
      <Paragraph>
        Our Service may contain links to third-party websites. We are not
        responsible for the privacy practices or content of these third-party
        sites. We encourage you to review the privacy policies of any
        third-party sites you visit.
      </Paragraph>

      <Title level={2}>Children’s Privacy</Title>
      <Paragraph>
        Our Service is not intended for use by children under the age of 13. We
        do not knowingly collect personal data from children under 13. If we
        become aware that we have collected personal data from a child under 13,
        we will take steps to delete such information from our servers.
      </Paragraph>

      <Title level={2}>International Data Transfers</Title>
      <Paragraph>
        We may transfer your data to countries outside of your residence for
        processing and storage. We take appropriate measures to ensure that your
        data is protected in accordance with this Privacy Policy during such
        transfers.
      </Paragraph>

      <Title level={2}>Contact Us</Title>
      <Paragraph>
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </Paragraph>
      <Paragraph>
        Ether Support Team
        <br />
        Email: <a href="mailto:support@mavecms.com">support@mavecms.com</a>
      </Paragraph>
    </Typography>
  );
};

export default Privacy;
