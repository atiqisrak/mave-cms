# USAGE GUIDE

Welcome to the usage guide for **Mave CMS**! This document will help you understand how to use Mave CMS effectively, from creating content to managing backend operations.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Using the Page Builder](#using-the-page-builder)
3. [Managing Media](#managing-media)
4. [Creating Custom Models (DIY CMS)](#creating-custom-models-diy-cms)
5. [Doc to API](#doc-to-api)
6. [Form Builder](#form-builder)
7. [User Management](#user-management)
8. [Analytics Dashboard](#analytics-dashboard)

---

## Getting Started

### Login

1. Access the admin panel at `http://localhost:3000/admin` (or your hosted URL).
2. Enter your credentials (default credentials are provided during setup).

### Dashboard

- After login, you’ll land on the **Dashboard**, where you can:
  - View content performance metrics.
  - Access quick links to frequently used features.
  - Monitor system updates and activity logs.

---

## Using the Page Builder

1. **Navigate to Page Builder**

   - Go to **Page Builder** from the sidebar.

2. **Create a New Page**

   - Click **+ Create New Page**.
   - Enter the page name and choose a layout.

3. **Add Components**

   - Drag and drop components (e.g., Title, Media, Navbar) from the left panel.
   - Customize component properties, such as text, images, or styles.

4. **Preview and Publish**
   - Use the **Preview** button to see how the page looks.
   - Click **Publish** to make the page live.

---

## Managing Media

1. **Open Media Library**

   - Navigate to **Media Library** from the sidebar.

2. **Upload Media**

   - Click **Upload Media** and select files from your device.
   - Supported formats: Images, videos, and documents.

3. **Organize Media**

   - Add tags to files for easier searchability.
   - Create folders to group related files.

4. **Insert Media into Pages**
   - While editing a page, use the **Media Selector** to choose files from the library.

---

## Creating Custom Models (DIY CMS)

1. **Access DIY CMS**

   - Go to **Custom Models** from the sidebar.

2. **Create a New Model**

   - Click **+ Add Model**.
   - Enter the model name (e.g., Products, BlogPosts).

3. **Add Fields**

   - Add fields like Text, Number, Boolean, or Relation (e.g., one-to-many).
   - Save the model to generate the corresponding API and database schema.

4. **Manage Data**
   - Use the auto-generated CRUD interface to add, edit, or delete entries for your custom model.

---

## Doc to API

1. **Upload a YAML/Markdown File**

   - Go to **Doc to API** from the sidebar.
   - Upload your document or write YAML in the editor.

2. **Generate API**
   - Click **Generate API** to create RESTful endpoints based on the document structure.
   - View and test the API from the provided documentation.

---

## Form Builder

1. **Create a New Form**

   - Navigate to **Forms** > **Create New Form**.
   - Drag and drop fields like Text, Email, Dropdown, or File Upload.

2. **Configure Settings**

   - Add validation rules (e.g., required fields, regex patterns).
   - Set up submission actions (e.g., email notifications, API calls).

3. **Embed the Form**
   - Copy the generated embed code or API endpoint to use the form in your website or application.

---

## User Management

1. **Add New Users**

   - Navigate to **Users** from the sidebar.
   - Click **+ Add User** and enter their details (name, email, role).

2. **Assign Roles and Permissions**

   - Choose from predefined roles (e.g., Admin, Editor, Viewer) or create custom roles.
   - Define permissions for each role, such as access to specific pages or features.

3. **Monitor User Activity**
   - View logs of user actions (e.g., content edits, page views) in the **Activity Logs** section.

---

## Analytics Dashboard

1. **Access the Dashboard**

   - Navigate to **Analytics** from the sidebar.

2. **View Metrics**

   - Monitor:
     - Page views
     - User engagement
     - Content performance

3. **Generate Reports**
   - Export data as CSV or PDF for deeper analysis.
   - Use filters to focus on specific pages, time ranges, or user segments.

---

## Advanced Features

### Multilingual Support

- Go to **Languages** in settings to enable and configure multilingual content.
- Translate content directly within the page builder.

### Real-Time Collaboration

- Invite team members to edit pages simultaneously.
- Use in-app comments to provide feedback during the editing process.

### Notifications

- Receive notifications for pending approvals, scheduled content, or system updates.

---

## Support and Documentation

If you have any questions or encounter issues, check out the following resources:

- [FAQ](./FAQ.md)
- [GitHub Issues](https://github.com/ether-technologies/mave-cms/issues)
- Email us at [support@mave.ethertech.ltd](mailto:support@mave.ethertech.ltd).

---

Thank you for choosing Mave CMS! 🎉
