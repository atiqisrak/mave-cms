# Dependencies for Mave CMS

This document outlines the dependencies used in Mave CMS, categorized into **Production Dependencies** and **Development Dependencies**. Each dependency is accompanied by a brief explanation of its purpose.

---

## Table of Contents

1. [Production Dependencies](#production-dependencies)
2. [Development Dependencies](#development-dependencies)

---

## Production Dependencies

| Dependency                        | Version  | Purpose                                                                 |
| --------------------------------- | -------- | ----------------------------------------------------------------------- |
| **@ant-design/icons**             | ^5.2.6   | Icon library for use with Ant Design components.                        |
| **@cloudinary/url-gen**           | ^1.21.0  | Cloudinary integration for optimized image and video transformations.   |
| **@fortawesome/fontawesome-free** | ^6.6.0   | Icon library for adding vector icons to the UI.                         |
| **@google/generative-ai**         | ^0.8.0   | Google’s generative AI integration for advanced AI-powered features.    |
| **@react-google-maps/api**        | ^2.20.3  | API for integrating Google Maps in React applications.                  |
| **@react-pdf-viewer/core**        | ^3.12.0  | Core functionality for rendering and interacting with PDF files.        |
| **@react-pdf-viewer/thumbnail**   | ^3.12.0  | Thumbnail preview for PDFs.                                             |
| **@tinymce/tinymce-react**        | ^5.0.1   | TinyMCE integration for a powerful WYSIWYG text editor.                 |
| **ace-builds**                    | ^1.36.3  | Browser-based code editor for syntax highlighting and editing.          |
| **ajv**                           | ^8.17.1  | JSON schema validator for form validation and API request validation.   |
| **ajv-formats**                   | ^3.0.1   | Adds support for additional formats (e.g., email, date) to `ajv`.       |
| **antd**                          | ^5.19.0  | Ant Design library for UI components.                                   |
| **apexcharts**                    | ^3.53.0  | Charting library for data visualization.                                |
| **axios**                         | ^1.6.7   | HTTP client for making API requests.                                    |
| **cloudinary**                    | ^2.5.1   | Cloudinary SDK for media management and transformation.                 |
| **croppie**                       | ^2.6.5   | Image cropping library for user-friendly media editing.                 |
| **dayjs**                         | ^1.11.10 | Lightweight library for parsing, validating, and formatting dates.      |
| **dotenv**                        | ^16.3.1  | Environment variable management.                                        |
| **form-data**                     | ^4.0.0   | Library to handle form submissions with file uploads.                   |
| **formidable**                    | ^3.5.2   | Node.js library for parsing form submissions.                           |
| **froala-editor**                 | ^4.2.0   | Feature-rich WYSIWYG editor for text editing.                           |
| **http-proxy-middleware**         | ^3.0.0   | Proxying middleware for handling API requests in development.           |
| **imagemin**                      | ^8.0.1   | Image optimization library to reduce file size.                         |
| **js-yaml**                       | ^4.1.0   | YAML parser and stringifier for handling YAML files in Doc to API.      |
| **lodash**                        | ^4.17.21 | Utility library for common JavaScript operations.                       |
| **lottie-react**                  | ^2.4.0   | React wrapper for Lottie animations.                                    |
| **lottie-web**                    | ^5.12.2  | Library for rendering Lottie animations in the browser.                 |
| **marked**                        | ^12.0.2  | Markdown parser and compiler.                                           |
| **moment**                        | ^2.29.4  | Library for date manipulation (legacy support).                         |
| **next**                          | ^12.3.4  | Next.js framework for server-side rendering and static site generation. |
| **next-transpile-modules**        | ^10.0.1  | Allows transpiling of third-party modules in a Next.js project.         |
| **openai**                        | ^4.70.2  | OpenAI SDK for integrating GPT models.                                  |
| **papaparse**                     | ^5.4.1   | CSV parser for handling tabular data.                                   |
| **pluralize**                     | ^8.0.0   | Pluralization utility for naming conventions.                           |
| **prismjs**                       | ^1.29.0  | Syntax highlighting library for code blocks.                            |
| **quill**                         | ^1.3.7   | Rich text editor for enhanced text editing.                             |
| **react**                         | 18.2.0   | Core React library for building user interfaces.                        |
| **react-ace**                     | ^12.0.0  | React wrapper for the Ace code editor.                                  |
| **react-apexcharts**              | ^1.4.1   | React wrapper for ApexCharts library.                                   |
| **react-beautiful-dnd**           | ^13.1.1  | Drag-and-drop interface for React applications.                         |
| **react-copy-to-clipboard**       | ^5.1.0   | Utility for copying text to the clipboard in React apps.                |
| **react-countup**                 | ^6.5.3   | Animated number counter for React.                                      |
| **react-dnd**                     | ^16.0.1  | Drag-and-drop library for React.                                        |
| **react-dnd-html5-backend**       | ^16.0.1  | HTML5 backend for React DnD.                                            |
| **react-dom**                     | 18.2.0   | React DOM library for rendering React components in the browser.        |
| **react-easy-crop**               | ^5.0.5   | React component for cropping media files.                               |
| **react-froala-wysiwyg**          | ^4.2.0   | React wrapper for Froala WYSIWYG editor.                                |
| **react-google-charts**           | ^4.0.1   | Google Charts wrapper for React.                                        |
| **react-helmet**                  | ^6.1.0   | Manage document head in React.                                          |
| **react-lazyload**                | ^3.2.1   | Lazy loading of React components and images.                            |
| **react-markdown**                | ^9.0.1   | Markdown rendering in React applications.                               |
| **react-pdf**                     | ^7.7.1   | Display PDFs in React applications.                                     |
| **react-quill**                   | ^2.0.0   | React wrapper for the Quill editor.                                     |
| **react-slick**                   | ^0.30.2  | Carousel component for React applications.                              |
| **react-syntax-highlighter**      | ^15.6.1  | Syntax highlighting for code blocks in React.                           |
| **react-text-to-speech**          | ^0.14.5  | Text-to-speech functionality for accessibility.                         |
| **react-to-print**                | ^2.14.15 | Print functionality for React components.                               |
| **react-virtualized**             | ^9.22.5  | High-performance React components for rendering large lists and tables. |
| **recharts**                      | ^2.12.7  | Charts and graphs for React applications.                               |
| **remark-gfm**                    | ^4.0.0   | GitHub Flavored Markdown support for `react-markdown`.                  |
| **slick-carousel**                | ^1.8.1   | Core library for creating carousels in web applications.                |
| **swr**                           | ^2.2.5   | React hook for data fetching with caching.                              |
| **uuid**                          | ^10.0.0  | Generates unique IDs for components and data.                           |
| **yup**                           | ^1.4.0   | Schema validation library for form handling.                            |

---

## Development Dependencies

| Dependency                  | Version  | Purpose                                                               |
| --------------------------- | -------- | --------------------------------------------------------------------- |
| **@tailwindcss/line-clamp** | ^0.4.4   | Utility for clamping text to a specific number of lines.              |
| **autoprefixer**            | ^10.4.20 | Adds vendor prefixes to CSS rules for cross-browser compatibility.    |
| **eslint**                  | 8.49.0   | Linting tool for JavaScript code.                                     |
| **eslint-config-next**      | 13.4.19  | ESLint rules specific to Next.js projects.                            |
| **postcss**                 | ^8.4.47  | CSS transformation tool used with Tailwind CSS.                       |
| **tailwindcss**             | ^3.4.14  | Utility-first CSS framework for designing responsive user interfaces. |

---

## Notes

- Dependencies are managed via `npm`.
- Development dependencies are only required during the development process and are not included in production builds.

For additional details or updates, refer to the `package.json` file in the repository.
