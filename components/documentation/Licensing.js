import React from "react";
import { Typography, Divider, List } from "antd";

const { Title, Paragraph, Text } = Typography;

const Licensing = () => {
  const clauses = [
    {
      title: "1. Contact Information Requirement",
      content: (
        <>
          Users must provide the following contact information when downloading
          or modifying the Software:
          <List
            dataSource={[
              "Full Name",
              "Email Address",
              "Phone Number",
              "Profession",
              "Company Name",
              "Team Size managing MAVE CMS",
              "Monthly Traffic Volume the CMS will serve",
              "Agreement to in-app purchases",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </>
      ),
    },
    {
      title: "2. License Key for Modifications",
      content: (
        <Paragraph>
          Users are required to complete a form either on the download page or
          during the installation of MAVE CMS. A license key will be issued and
          delivered via email. Any form of code modification necessitates a
          valid license key.
        </Paragraph>
      ),
    },
    {
      title: "3. Data Usage",
      content: (
        <Paragraph>
          Collected contact information will be utilized for the following
          purposes:
          <List
            dataSource={[
              "Enhancing service quality",
              "Supporting the ongoing development of MAVE CMS",
              "Communicating updates, support information, and other relevant notices",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Paragraph>
      ),
    },
    {
      title: "4. Privacy Compliance",
      content: (
        <Paragraph>
          Ether Technologies complies with all relevant privacy regulations,
          including the General Data Protection Regulation (GDPR) and the
          California Consumer Privacy Act (CCPA). Collected data will be
          securely stored and used solely for the purposes outlined in this
          license. Users retain the right to:
          <List
            dataSource={[
              "Request access to their personal data",
              "Request corrections to any inaccurate data",
              "Request the deletion of their data at any time",
            ]}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />
        </Paragraph>
      ),
    },
    {
      title: "5. Modification Tracking",
      content: (
        <Paragraph>
          Users are required to document any code modifications and provide a
          summary of these changes alongside the license key. Ether Technologies
          reserves the right to review these modifications for compliance with
          the terms of this license.
        </Paragraph>
      ),
    },
    {
      title: "6. Attribution",
      content: (
        <Paragraph>
          Users must retain the original copyright notice and this permission
          notice in all copies or substantial portions of the Software. Any
          distribution of modified versions of the Software requires prior
          contact with Ether Technologies to obtain a distributor's license.
        </Paragraph>
      ),
    },
    {
      title: "7. Support and Warranty",
      content: (
        <Paragraph>
          The Software is provided "as is", without warranty of any kind, either
          express or implied, including but not limited to the implied
          warranties of merchantability, fitness for a particular purpose, and
          noninfringement. Ether Technologies offers support for the Software on
          a best-effort basis. Users requiring guaranteed support may contact
          Ether Technologies to arrange a support agreement.
        </Paragraph>
      ),
    },
    {
      title: "8. Distribution",
      content: (
        <Paragraph>
          Users are allowed to distribute the Software, provided that they first
          contact Ether Technologies to obtain a distributor's license and
          adhere to all the terms outlined in this license. Distribution of
          modified versions of the Software also requires a valid license key as
          described in the Modification section above.
        </Paragraph>
      ),
    },
  ];

  return (
    <Typography>
      <Title
        style={{
          textAlign: "center",
          marginBottom: "1rem",
        }}
      >
        MAVE CMS License Agreement
      </Title>
      <Divider />
      <Title level={2}>MIT License</Title>
      <Paragraph>
        Copyright (c) {new Date().getFullYear()} Ether Technologies
      </Paragraph>
      <Paragraph>
        Permission is hereby granted, free of charge, to any person obtaining a
        copy of this software and associated documentation files (the
        "Software"), to deal in the Software without restriction, including
        without limitation the rights to use, copy, modify, merge, publish,
        distribute, sublicense, and/or sell copies of the Software, and to
        permit persons to whom the Software is furnished to do so, subject to
        the following conditions:
      </Paragraph>
      <Paragraph>
        The above copyright notice and this permission notice shall be included
        in all copies or substantial portions of the Software.
      </Paragraph>
      <Title level={2}>Custom Clauses</Title>
      {clauses?.map((clause, index) => (
        <React.Fragment key={index}>
          <Title level={4}>{clause.title}</Title>
          {clause.content}
        </React.Fragment>
      ))}
      <Divider />
      <Title level={2}>Disclaimer</Title>
      <Paragraph>
        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
        OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
        MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.
        IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
        CLAIM, DAMAGES, OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
        TORT, OR OTHERWISE, ARISING FROM, OUT OF, OR IN CONNECTION WITH THE
        SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
      </Paragraph>
    </Typography>
  );
};

export default Licensing;
