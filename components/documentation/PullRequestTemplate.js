import React from "react";
import { Typography, Divider, Card } from "antd";

const { Title, Paragraph } = Typography;

const codeStyle = {
  backgroundColor: "#f5f5f5",
  padding: "15px",
  borderRadius: "5px",
  fontFamily: "monospace",
  whiteSpace: "pre-wrap",
};

const PullRequestTemplatePage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Title>GitHub Pull Request Template</Title>
      <Divider />

      <Card title="[PR] - Pull Request" bordered={false}>
        <Paragraph>
          <pre style={codeStyle}>
            {`---
name: Pull Request
about: Submit changes to the codebase
title: "[PR] - "
labels: ''
assignees: ''
---

**Description**
A clear and concise description of what this pull request does. Include the motivation for the change and any relevant context.

**Related Issues**
Link to any related issues (e.g., "Fixes #123") or feature requests that this pull request addresses.

**Type of Change**
Please delete options that are not relevant.
- Bug fix (non-breaking change which fixes an issue)
- New feature (non-breaking change which adds functionality)
- Breaking change (fix or feature that would cause existing functionality to not work as expected)
- Documentation update
- Other (please describe):

**Checklist**
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] Any dependent changes have been merged and published in downstream modules

**Screenshots**
If applicable, add screenshots to help explain the changes made (e.g., UI changes).

**Additional Context**
Add any other context or information about the pull request here.
---
`}
          </pre>
        </Paragraph>
      </Card>
    </div>
  );
};

export default PullRequestTemplatePage;
