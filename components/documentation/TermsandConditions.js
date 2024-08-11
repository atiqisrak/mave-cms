import React from "react";
import { Typography, Divider } from "antd";

const { Title, Paragraph, Text } = Typography;

const TermsandConditions = () => {
  return (
    <Typography style={{ padding: "20px" }}>
      <Title>MAVE CMS Terms and Conditions</Title>
      <Divider />

      <Title level={2}>Introduction</Title>
      <Paragraph>
        Welcome to MAVE CMS, a service provided by Ether Technologies Ltd.
        ("we", "our", "us"). These Terms and Conditions ("Terms") govern your
        use of MAVE CMS ("Service"). By accessing or using our Service, you
        agree to comply with and be bound by these Terms. If you do not agree to
        these Terms, please do not use our Service.
      </Paragraph>

      <Title level={2}>Company Details</Title>
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

      <Title level={2}>User Obligations and Responsibilities</Title>
      <Title level={3}>Account Registration</Title>
      <Paragraph>
        <Text strong>Registration Information:</Text> When registering for an
        account, you must provide accurate and complete information, including
        your name, email address, phone number, profession, company name, team
        size managing MAVE CMS, number of monthly traffic the CMS will serve,
        and agreement to in-app purchases.
        <br />
        <Text strong>Eligibility:</Text> By registering for an account, you
        confirm that you are at least 18 years old and have the legal capacity
        to enter into these Terms.
      </Paragraph>

      <Title level={3}>User Conduct</Title>
      <Paragraph>
        <Text strong>Acceptable Use:</Text> You agree to use the Service only
        for lawful purposes and in accordance with these Terms. You must not:
        <ul>
          <li>
            Engage in any illegal activities or promote violence or
            discrimination.
          </li>
          <li>Harass, threaten, or defraud other users.</li>
          <li>
            Upload or distribute viruses, malware, or other harmful software.
          </li>
          <li>
            Attempt to gain unauthorized access to the Service or other users'
            accounts.
          </li>
        </ul>
      </Paragraph>

      <Title level={2}>Service Usage</Title>
      <Title level={3}>Service Availability</Title>
      <Paragraph>
        <Text strong>Availability:</Text> We strive to maintain the availability
        of the Service but do not guarantee uninterrupted access. There may be
        temporary downtime for maintenance or technical issues.
        <br />
        <Text strong>Disclaimer:</Text> We are not responsible for any loss or
        damage resulting from Service interruptions or downtime.
      </Paragraph>

      <Title level={3}>Modifications to the Service</Title>
      <Paragraph>
        <Text strong>Changes:</Text> We reserve the right to modify or
        discontinue the Service at any time without prior notice. Significant
        changes will be communicated to users through the Service or via email.
      </Paragraph>

      <Title level={2}>Payments and Fees</Title>
      <Title level={3}>Pricing and Payment Terms</Title>
      <Paragraph>
        <Text strong>Pricing:</Text> Our pricing structures and payment terms
        are detailed on our website. By using the Service, you agree to the
        specified pricing and payment terms.
        <br />
        <Text strong>Refunds:</Text> Refund policies are specified on our
        website. Generally, refunds are not provided for services rendered
        unless required by law.
      </Paragraph>

      <Title level={3}>In-App Purchases</Title>
      <Paragraph>
        <Text strong>Handling:</Text> In-app purchases are handled through the
        Service. By making an in-app purchase, you agree to the specific terms
        associated with that purchase.
      </Paragraph>

      <Title level={2}>Intellectual Property</Title>
      <Title level={3}>Ownership</Title>
      <Paragraph>
        <Text strong>Rights:</Text> Ether Technologies Ltd. owns all
        intellectual property rights to the content and software provided by
        MAVE CMS. Users are granted a limited, non-exclusive, and
        non-transferable license to use the Service.
        <br />
        <Text strong>Licensing:</Text> Users may not copy, modify, distribute,
        or create derivative works based on our content or software without our
        explicit permission.
      </Paragraph>

      <Title level={3}>User-Generated Content</Title>
      <Paragraph>
        <Text strong>Rights Retained:</Text> Users retain ownership of the
        content they create using the Service. By using the Service, you grant
        us a non-exclusive, worldwide, royalty-free license to use, reproduce,
        modify, and distribute your content within the Service.
        <br />
        <Text strong>Usage:</Text> We may use user-generated content for
        promotional purposes or to improve the Service.
      </Paragraph>

      <Title level={2}>Disclaimers and Limitations of Liability</Title>
      <Title level={3}>Disclaimers</Title>
      <Paragraph>
        <Text strong>Accuracy and Reliability:</Text> The Service is provided
        "as is" without any warranties of accuracy, reliability, or suitability
        for a particular purpose.
        <br />
        <Text strong>Liability:</Text> We are not liable for any indirect,
        incidental, or consequential damages arising from your use of the
        Service.
      </Paragraph>

      <Title level={3}>Indemnification</Title>
      <Paragraph>
        <Text strong>Indemnity:</Text> You agree to indemnify and hold us
        harmless from any claims, damages, or expenses arising from your use of
        the Service or violation of these Terms.
      </Paragraph>

      <Title level={2}>Termination</Title>
      <Title level={3}>Termination of Accounts</Title>
      <Paragraph>
        <Text strong>Circumstances:</Text> We may terminate or suspend your
        account if you violate these Terms or engage in prohibited activities.
        <br />
        <Text strong>Process:</Text> Upon termination, you will lose access to
        your account and any content stored within it.
      </Paragraph>

      <Title level={2}>Governing Law and Dispute Resolution</Title>
      <Title level={3}>Governing Law</Title>
      <Paragraph>
        <Text strong>Jurisdiction:</Text> These Terms are governed by the laws
        of Bangladesh. Any disputes arising from these Terms will be subject to
        the exclusive jurisdiction of the courts in Dhaka, Bangladesh.
      </Paragraph>

      <Title level={3}>Dispute Resolution</Title>
      <Paragraph>
        <Text strong>Resolution Process:</Text> In the event of a dispute, we
        encourage users to contact us to seek an amicable resolution. If a
        resolution cannot be reached, disputes will be resolved through
        arbitration in accordance with the rules of the Bangladesh International
        Arbitration Centre (BIAC).
      </Paragraph>

      <Title level={2}>Miscellaneous</Title>
      <Title level={3}>Updates to Terms and Conditions</Title>
      <Paragraph>
        <Text strong>Review and Updates:</Text> We may update these Terms from
        time to time. Users will be notified of significant changes through the
        Service or via email. Continued use of the Service constitutes
        acceptance of the updated Terms.
      </Paragraph>

      <Title level={3}>Miscellaneous Provisions</Title>
      <Paragraph>
        <Text strong>Severability:</Text> If any provision of these Terms is
        found to be unenforceable, the remaining provisions will continue in
        effect.
        <br />
        <Text strong>Entire Agreement:</Text> These Terms constitute the entire
        agreement between you and Ether Technologies Ltd. regarding the use of
        the Service.
      </Paragraph>

      <Title level={2}>Contact Information</Title>
      <Paragraph>
        If you have any questions or concerns about these Terms, please contact
        us at:
      </Paragraph>
      <Paragraph>
        Ether Support Team
        <br />
        Email: <a href="mailto:support@mavecms.com">support@mavecms.com</a>
      </Paragraph>
    </Typography>
  );
};

export default TermsandConditions;
