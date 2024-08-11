import React from "react";
import { Typography, Divider, List } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const Contributing = () => {
  return (
    <Typography style={{ padding: "20px" }}>
      <Title>Contributing to MAVE CMS</Title>
      <Divider />

      <Title level={2}>Code of Conduct</Title>
      <Paragraph>
        We follow a Code of Conduct to foster an open and welcoming environment.
        Please read and adhere to our{" "}
        <Link href="/code-of-conduct" target="_blank">
          Code of Conduct
        </Link>{" "}
        to ensure a positive experience for all community members.
      </Paragraph>

      <Title level={2}>How to Contribute</Title>

      <Title level={3}>Reporting Issues</Title>
      <Paragraph>
        When reporting an issue, please include:
        <List bulleted>
          <List.Item>Your environment (OS, browser, Node.js version)</List.Item>
          <List.Item>Steps to reproduce the issue</List.Item>
          <List.Item>Expected and actual results</List.Item>
          <List.Item>Screenshots, if applicable</List.Item>
        </List>
        Use the provided issue template to standardize the reporting process.
      </Paragraph>

      <Title level={3}>Submitting Feature Requests</Title>
      <Paragraph>
        Feature requests are welcome. Please:
        <List bulleted>
          <List.Item>
            Check if the feature has already been requested by searching the
            issues.
          </List.Item>
          <List.Item>
            Provide a clear and detailed description of the feature.
          </List.Item>
          <List.Item>Explain why this feature would be beneficial.</List.Item>
        </List>
      </Paragraph>

      <Title level={3}>Branching and Workflow</Title>
      <Paragraph>
        We use the <Text code>main</Text> branch for production-ready code.
        <br />
        The <Text code>develop</Text> branch is for ongoing development.
        <br />
        Name your branches descriptively, e.g.,{" "}
        <Text code>feature/add-login</Text>, <Text code>bugfix/fix-navbar</Text>
        .
      </Paragraph>

      <Title level={3}>Commit Messages</Title>
      <Paragraph>
        Follow the{" "}
        <Link href="https://www.conventionalcommits.org/" target="_blank">
          Conventional Commits
        </Link>{" "}
        standard.
        <br />
        Use clear and concise commit messages.
        <br />
        Include relevant keywords like <Text code>fix</Text>,{" "}
        <Text code>feat</Text>, <Text code>docs</Text>, etc.
      </Paragraph>

      <Title level={3}>Pull Requests</Title>
      <Paragraph>
        Before submitting a pull request, ensure that:
        <List bulleted>
          <List.Item>
            Your code adheres to the project’s coding standards.
          </List.Item>
          <List.Item>All tests pass.</List.Item>
          <List.Item>Your changes are documented.</List.Item>
        </List>
        Submit pull requests to the <Text code>develop</Text> branch. Provide a
        clear description of your changes and link to any related issues.
      </Paragraph>

      <Title level={2}>Code Contribution Guidelines</Title>

      <Title level={3}>Coding Standards</Title>
      <Paragraph>
        Follow the coding standards and style guides for Next.js, Laravel, and
        MySQL.
        <br />
        Run linting and formatting tools (ESLint, Prettier, etc.) before
        committing your code.
      </Paragraph>

      <Title level={3}>Testing</Title>
      <Paragraph>
        Write unit and integration tests for your code.
        <br />
        Use appropriate testing frameworks (e.g., Jest for Next.js, PHPUnit for
        Laravel).
        <br />
        Ensure all tests pass before submitting a pull request.
      </Paragraph>

      <Title level={3}>Documentation</Title>
      <Paragraph>
        Update the documentation to reflect your changes.
        <br />
        Include comments in your code where necessary.
        <br />
        Update the relevant sections in the <Text code>README.md</Text> file if
        applicable.
      </Paragraph>

      <Title level={2}>Administrative Information</Title>

      <Title level={3}>Contribution License Agreement (CLA)</Title>
      <Paragraph>
        By contributing to MAVE CMS, you agree that your contributions will be
        licensed under the MIT License with custom clauses. No CLA is required
        at this time.
      </Paragraph>

      <Title level={3}>Recognition</Title>
      <Paragraph>
        We appreciate your contributions! All contributors will be listed in the{" "}
        <Text code>CONTRIBUTORS.md</Text> file and acknowledged in release
        notes.
      </Paragraph>

      <Title level={3}>Communication Channels</Title>
      <Paragraph>
        For help or questions, join our community on:
        <List bulleted>
          <List.Item>
            <Link href="https://slack.com/mavecms" target="_blank">
              Slack: MAVE CMS Slack
            </Link>
          </List.Item>
          <List.Item>
            <Link href="https://discord.com/mavecms" target="_blank">
              Discord: MAVE CMS Discord
            </Link>
          </List.Item>
          <List.Item>
            Mailing list:{" "}
            <Link href="mailto:mavecms@ethertech.com">
              mavecms@ethertech.com
            </Link>
          </List.Item>
        </List>
      </Paragraph>

      <Paragraph>
        Thank you for contributing to MAVE CMS! Your support and participation
        are crucial to the success of the project.
      </Paragraph>
    </Typography>
  );
};

export default Contributing;
