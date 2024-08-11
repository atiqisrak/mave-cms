import React from "react";
import { Typography, Divider, Card } from "antd";

const { Title, Paragraph, Text } = Typography;

const codeStyle = {
  backgroundColor: "#f5f5f5",
  padding: "15px",
  borderRadius: "5px",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap",
};

const IssueTemplate = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>GitHub Issue Templates</Title>
      <Divider />

      <Card
        title="[BUG] - Bug Report"
        bordered={false}
        style={{ marginBottom: "20px" }}
      >
        <Paragraph>
          <pre style={codeStyle}>
            {`---
name: Bug Report
about: Create a report to help us improve
title: "[BUG] - "
labels: bug
assignees: ''

---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Environment (please complete the following information):**
 - OS: [e.g., Windows, macOS, Linux]
 - Browser [e.g., Chrome, Firefox, Safari]
 - Node.js version [e.g., 14.x, 16.x]
 - NPM version [e.g., 6.x, 7.x]
 - MAVE CMS version [e.g., 1.0.0]
 - Database: [e.g., MySQL, PostgreSQL]

**Additional context**
Add any other context about the problem here.
---
`}
          </pre>
        </Paragraph>
      </Card>

      <Card
        title="[FEATURE] - Feature Request"
        bordered={false}
        style={{ marginBottom: "20px" }}
      >
        <Paragraph>
          <pre style={codeStyle}>
            {`---
name: Feature Request
about: Suggest an idea for this project
title: "[FEATURE] - "
labels: enhancement
assignees: ''

---

**Is your feature request related to a problem? Please describe.**
A clear and concise description of what the problem is. Ex. I'm always frustrated when [...]

**Describe the solution you'd like**
A clear and concise description of what you want to happen.

**Describe alternatives you've considered**
A clear and concise description of any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots about the feature request here.
---
`}
          </pre>
        </Paragraph>
      </Card>

      <Card title="[DOC] - Documentation Update" bordered={false}>
        <Paragraph>
          <pre style={codeStyle}>
            {`---
name: Documentation Update
about: Suggest an improvement or addition to the documentation
title: "[DOC] - "
labels: documentation
assignees: ''

---

**Is this documentation update related to an existing part of the documentation? Please describe.**
A clear and concise description of what the existing documentation is and what improvements or additions are needed.

**Describe the content or changes you'd like**
A clear and concise description of what content or changes you would like to see.

**Additional context**
Add any other context or screenshots about the documentation update here.
---
`}
          </pre>
        </Paragraph>
      </Card>
    </div>
  );
};

export default IssueTemplate;
