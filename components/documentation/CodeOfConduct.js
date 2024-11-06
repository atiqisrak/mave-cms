import React from "react";
import { Typography, Divider, List } from "antd";

const { Title, Paragraph, Text, Link } = Typography;

const CodeOfConduct = () => {
  return (
    <Typography style={{ padding: "20px" }}>
      <Title>MAVE CMS Code of Conduct</Title>
      <Divider />

      <Title level={2}>Our Pledge</Title>
      <Paragraph>
        In the interest of fostering an open and welcoming environment, we, as
        contributors and maintainers, pledge to make participation in our
        project and our community a harassment-free experience for everyone,
        regardless of age, body size, disability, ethnicity, gender identity and
        expression, level of experience, nationality, personal appearance, race,
        religion, or sexual identity and orientation.
      </Paragraph>

      <Title level={2}>Our Standards</Title>
      <Paragraph>
        Examples of behavior that contributes to creating a positive environment
        include:
      </Paragraph>
      <List bulleted>
        <List.Item>Using welcoming and inclusive language</List.Item>
        <List.Item>
          Being respectful of differing viewpoints and experiences
        </List.Item>
        <List.Item>Gracefully accepting constructive criticism</List.Item>
        <List.Item>Focusing on what is best for the community</List.Item>
        <List.Item>Showing empathy towards other community members</List.Item>
      </List>

      <Paragraph>
        Examples of unacceptable behavior by participants include:
      </Paragraph>
      <List bulleted>
        <List.Item>
          The use of sexualized language or imagery and unwelcome sexual
          attention or advances
        </List.Item>
        <List.Item>
          Trolling, insulting/derogatory comments, and personal or political
          attacks
        </List.Item>
        <List.Item>Public or private harassment</List.Item>
        <List.Item>
          Publishing others’ private information, such as a physical or
          electronic address, without explicit permission
        </List.Item>
        <List.Item>
          Other conduct which could reasonably be considered inappropriate in a
          professional setting
        </List.Item>
      </List>

      <Title level={2}>Our Responsibilities</Title>
      <Paragraph>
        Project maintainers are responsible for clarifying the standards of
        acceptable behavior and are expected to take appropriate and fair
        corrective action in response to any instances of unacceptable behavior.
      </Paragraph>
      <Paragraph>
        Project maintainers have the right and responsibility to remove, edit,
        or reject comments, commits, code, wiki edits, issues, and other
        contributions that are not aligned with this Code of Conduct, or to ban
        temporarily or permanently any contributor for other behaviors that they
        deem inappropriate, threatening, offensive, or harmful.
      </Paragraph>

      <Title level={2}>Scope</Title>
      <Paragraph>
        This Code of Conduct applies both within project spaces and in public
        spaces when an individual is representing the project or its community.
        Examples of representing a project or community include using an
        official project email address, posting via an official social media
        account, or acting as an appointed representative at an online or
        offline event. Representation of a project may be further defined and
        clarified by project maintainers.
      </Paragraph>

      <Title level={2}>Enforcement</Title>
      <Paragraph>
        Instances of abusive, harassing, or otherwise unacceptable behavior may
        be reported by contacting the project team at{" "}
        <Link href="mailto:contact@example.com">contact@example.com</Link>. All
        complaints will be reviewed and investigated and will result in a
        response that is deemed necessary and appropriate to the circumstances.
        The project team is obligated to maintain confidentiality with regard to
        the reporter of an incident. Further details of specific enforcement
        policies may be posted separately.
      </Paragraph>
      <Paragraph>
        Project maintainers who do not follow or enforce the Code of Conduct in
        good faith may face temporary or permanent repercussions as determined
        by other members of the project’s leadership.
      </Paragraph>

      <Title level={2}>Enforcement Guidelines</Title>
      <Paragraph>
        Project maintainers will follow these Community Impact Guidelines in
        determining the consequences for any action they deem in violation of
        this Code of Conduct:
      </Paragraph>
      <Title level={3}>1. Correction</Title>
      <Paragraph>
        <Text strong>Community Impact:</Text> Use of inappropriate language or
        other behavior deemed unprofessional or unwelcome in the community.
        <br />
        <Text strong>Consequence:</Text> A private, written warning from project
        maintainers, providing clarity around the nature of the violation and an
        explanation of why the behavior was inappropriate. A public apology may
        be requested.
      </Paragraph>
      <Title level={3}>2. Warning</Title>
      <Paragraph>
        <Text strong>Community Impact:</Text> A violation through a single
        incident or series of actions.
        <br />
        <Text strong>Consequence:</Text> A warning with consequences for
        continued behavior. No interaction with the people involved, including
        unsolicited interaction with those enforcing the Code of Conduct, for a
        specified period of time. This includes avoiding interactions in
        community spaces as well as external channels like social media.
        Violating these terms may lead to a temporary or permanent ban.
      </Paragraph>
      <Title level={3}>3. Temporary Ban</Title>
      <Paragraph>
        <Text strong>Community Impact:</Text> A serious violation of community
        standards, including sustained inappropriate behavior.
        <br />
        <Text strong>Consequence:</Text> A temporary ban from any sort of
        interaction or public communication with the community for a specified
        period of time. No public or private interaction with the people
        involved, including unsolicited interaction with those enforcing the
        Code of Conduct, is allowed during this period. Violating these terms
        may lead to a permanent ban.
      </Paragraph>
      <Title level={3}>4. Permanent Ban</Title>
      <Paragraph>
        <Text strong>Community Impact:</Text> Demonstrating a pattern of
        violation of community standards, including sustained inappropriate
        behavior, harassment of an individual, or aggression towards or
        disparagement of classes of individuals.
        <br />
        <Text strong>Consequence:</Text> A permanent ban from any sort of public
        interaction within the project community.
      </Paragraph>

      <Title level={2}>Appeals Process</Title>
      <Paragraph>
        Any individual who feels that a decision made regarding the enforcement
        of this Code of Conduct is unjust or unfair may appeal to the project
        team. Appeals should be submitted to{" "}
        <Link href="mailto:contact@example.com">contact@example.com</Link> and
        will be reviewed by a panel of project maintainers.
      </Paragraph>

      <Title level={2}>Support for Affected Individuals</Title>
      <Paragraph>
        MAVE CMS is committed to providing support to individuals affected by
        violations of this Code of Conduct. If you feel unsafe or unwelcome,
        please reach out to{" "}
        <Link href="mailto:support@mavecms.com">support@mavecms.com</Link> for
        assistance.
      </Paragraph>

      <Title level={2}>Acknowledgements</Title>
      <Paragraph>
        This Code of Conduct is adapted from the Contributor Covenant, version
        2.0, available at{" "}
        <Link
          href="https://www.contributor-covenant.org/version/2/0/code_of_conduct.html"
          target="_blank"
        >
          https://www.contributor-covenant.org/version/2/0/code_of_conduct.html
        </Link>
        .<br />
        For answers to common questions about this code of conduct, see{" "}
        <Link href="https://www.contributor-covenant.org/faq" target="_blank">
          https://www.contributor-covenant.org/faq
        </Link>
        .
      </Paragraph>

      <Title level={2}>Regular Review and Updates</Title>
      <Paragraph>
        This Code of Conduct will be reviewed and updated regularly to ensure it
        remains relevant and effective. The project maintainers will be
        responsible for making these updates.
      </Paragraph>

      <Title level={2}>Contact Information</Title>
      <Paragraph>
        For any questions or concerns, please contact us at{" "}
        <Link href="mailto:support@mavecms.com">support@mavecms.com</Link>.
      </Paragraph>

      <Paragraph>
        Thank you for helping to make MAVE CMS a welcoming, friendly, and
        inclusive project for everyone.
      </Paragraph>
    </Typography>
  );
};

export default CodeOfConduct;
