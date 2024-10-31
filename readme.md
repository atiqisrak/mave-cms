<h1 align="center">Mave CMS 🚀</h1>

<p align="center">
  <a href="https://mavecms.com/">🌐 Website</a> •
  <a href="mailto:support@mavecms.com">✉️ Email</a> •
  <a href="https://github.com/atiqisrak/mave-cms">💼 GitHub</a>
</p>

<p align="center">
  A Flexible, Scalable, and Open-Source Headless CMS Built on MACH Architecture
</p>

![GitHub Repo stars](https://img.shields.io/github/stars/atiqisrak/mave-cms?style=social)
![GitHub issues](https://img.shields.io/github/issues/atiqisrak/mave-cms)
![GitHub license](https://img.shields.io/github/license/atiqisrak/mave-cms)
![GitHub forks](https://img.shields.io/github/forks/atiqisrak/mave-cms?style=social)

---

### 🌟 About Mave CMS

**Mave CMS** is a **flexible**, **scalable**, and **open-source** headless Content Management System designed with modern web technologies and adhering to the **MACH** architecture principles. Tailored for developers and content creators, Mave CMS offers a versatile and collaborative platform for managing content across various applications.

---

### 🛠️ Features

#### **1. Customizable Component-Based Page Builder**

- **Dynamic Page Builder:** Add, edit, delete, and duplicate over 16 components seamlessly.
- **Components Include:**
  - **Basic Components:** Title, Paragraph, Media, Menu, Navbar, Slider, Card, Footer.
  - **Pro Components:** Video, Table, Accordion, Button, Gallery, Google Map, Icon List, Testimonial.
- **Top Component Builders & Management:** Menu Items, Menu, Navbar, Footer, Media Library, Card, Slider.

#### **2. Robust Media Management**

- **Media Selection Modal:** Select, upload, and integrate various media types with single and multiple selection modes.
- **User-Friendly Interface:** Smooth media handling without disrupting the workflow.

#### **3. Advanced Features**

- **AI Chat Integration:** "Talk to AI" feature for interactive assistance.
- **DIY CMS:** Custom model generator allowing users to tailor the CMS for specific needs like e-commerce, blogs, or news portals.
- **Form Builder:** Create and manage custom forms within the CMS.
- **Doc to API:** Converts user-written or uploaded YAML files into CMS pages automatically.

#### **4. Technology Stack and CI/CD Pipeline Integration**

- **Frontend:**
  - **React & Next.js:** Interactive and server-rendered interfaces.
  - **Ant Design & Tailwind CSS:** Consistent and responsive UI design.
  - **Next.js Image Component:** Optimizes image handling.
- **Backend:**
  - **Laravel & MySQL:** Robust backend operations and data management.
- **Version Control:** Hosted on a **public GitHub repository** to facilitate collaboration.
- **CI/CD Pipeline:**
  - **Jenkins:** Automated builds, tests, and deployments.
  - **Hosted on Nginx Server:** Secures Jenkins access and integrates with Github via webhooks.
  - **Alternative Tools Considered:** Drone CI and GitLab CI/CD, but Jenkins was selected for its flexibility.

#### **5. Open-Source and MACH Architecture**

- **Microservices:** Modular and independently operating components for scalability.
- **API-First:** Comprehensive APIs for easy integration with frontend frameworks and third-party services.
- **Cloud-Native:** Optimized for modern cloud infrastructures, ensuring high availability and resilience.
- **Headless:** Decouples backend management from frontend presentation, offering flexibility across platforms.

#### **6. Collaboration and Customization**

- **Next.js Without TypeScript:** Lower barrier to entry, allowing developers with basic Next.js knowledge to contribute.
- **Public GitHub Repository:** Encourages community collaboration and contributions.
- **Well-Structured Documentation:** Integrated within the CMS, providing guidelines for usage and collaboration.
- **Theme Customization:** Developers can create and customize themes to fit various design requirements.

#### **7. Security and Best Practices**

- **Data Security:** Secure credential storage, SSL certificates, role-based access control, and regular updates.
- **Responsive Design:** Ensures all components function correctly across different devices and screen sizes.
- **Privacy Compliance:** Adheres to GDPR and CCPA regulations, with a comprehensive privacy policy detailing data collection and usage.

---

### 📦 Installation

#### **Minimum Requirements:**

- **CPU:** 2 cores
- **RAM:** 4 GB
- **Storage:** 20 GB SSD
- **Operating System:** Ubuntu 18.04+, Windows 10+, macOS 10.15+
- **Browser:** Modern browsers with V8 engine (e.g., Google Chrome, Chromium)

#### **Recommended Requirements:**

- **CPU:** 4 cores
- **RAM:** 8 GB
- **Storage:** 50 GB SSD
- **Operating System:** Ubuntu 20.04+, Windows 11, macOS 11+
- **Browser:** Latest version of Google Chrome

#### **Installation Steps:**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/atiqisrak/mave-cms.git
   ```
2. **Navigate to the Project Directory:**
   ```bash
   cd mave-cms
   ```
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Configure Environment Variables:**
   - Duplicate `.env.example` to `.env` and update the necessary configurations.
5. **Run Migrations:**
   ```bash
   php artisan migrate
   ```
6. **Start the Development Server:**
   ```bash
   npm run dev
   ```
7. **Access the CMS:**
   - Open your browser and navigate to `http://localhost:3000`

---

### 🛠️ Technologies & Tools

<p>
  <img alt="React" src="https://img.shields.io/badge/-React-61DAFB?style=flat-square&logo=React&logoColor=black" />
  <img alt="Next.js" src="https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=Next.js&logoColor=white" />
  <img alt="Ant Design" src="https://img.shields.io/badge/-Ant%20Design-0170FE?style=flat-square&logo=ant-design&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/-Tailwind%20CSS-38B2AC?style=flat-square&logo=Tailwind-CSS&logoColor=white" />
  <img alt="Laravel" src="https://img.shields.io/badge/-Laravel-FF2D20?style=flat-square&logo=Laravel&logoColor=white" />
  <img alt="MySQL" src="https://img.shields.io/badge/-MySQL-4479A1?style=flat-square&logo=MySQL&logoColor=white" />
  <img alt="Jenkins" src="https://img.shields.io/badge/-Jenkins-D24939?style=flat-square&logo=Jenkins&logoColor=white" />
  <img alt="Nginx" src="https://img.shields.io/badge/-Nginx-269539?style=flat-square&logo=Nginx&logoColor=white" />
  <img alt="GitHub" src="https://img.shields.io/badge/-GitHub-181717?style=flat-square&logo=GitHub&logoColor=white" />
  <img alt="Github" src="https://img.shields.io/badge/-Github-0052CC?style=flat-square&logo=Github&logoColor=white" />
  <img alt="Docker" src="https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" />
  <img alt="GraphQL" src="https://img.shields.io/badge/-GraphQL-E10098?style=flat-square&logo=GraphQL&logoColor=white" />
  <img alt="PHP" src="https://img.shields.io/badge/-PHP-777BB4?style=flat-square&logo=PHP&logoColor=white" />
</p>

---

### 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. **Fork the Project**
2. **Create your Feature Branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your Changes**
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. **Push to the Branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

### 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

![License](https://img.shields.io/github/license/atiqisrak/mave-cms)

---

### 📫 Get in Touch

<p>
  <a href="mailto:support@mavecms.com"><img alt="Email" src="https://img.shields.io/badge/Email-D14836?style=flat-square&logo=Gmail&logoColor=white" /></a>
  <a href="https://github.com/atiqisrak/mave-cms"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white" /></a>
  <a href="https://mavecms.com/"><img alt="Website" src="https://img.shields.io/badge/Website-4285F4?style=flat-square&logo=Google-Chrome&logoColor=white" /></a>
</p>

---

<p align="center">
  <img src="https://github-readme-stats.vercel.app/api?username=atiqisrak&show_icons=true&theme=radical" alt="GitHub Stats" />
</p>

<p align="center">
  <img src="https://github-readme-streak-stats.herokuapp.com/?user=atiqisrak&theme=radical" alt="GitHub Streak" />
</p>

---

### ⚡ Fun Fact

- 🤖 **AI-Powered:** Integrates AI for interactive assistance and enhanced user experience.
- 🌱 **Community Driven:** Open-source and built for collaboration, welcoming developers from around the world to contribute and innovate.

<!--
**atiqisrak/mave-cms** is a ✨ _special_ ✨ repository because its `README.md` (this file) appears on your GitHub profile.

Feel free to customize this README as you see fit!
-->
