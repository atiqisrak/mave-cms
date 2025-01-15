# Mave CMS Architecture

This document provides a comprehensive overview of the architecture of Mave CMS, explaining its modular structure, core technologies, and system design principles.

---

## Table of Contents

1. [Overview](#overview)
2. [Core Technologies](#core-technologies)
3. [System Architecture](#system-architecture)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Design](#database-design)
7. [API Design](#api-design)
8. [Deployment Architecture](#deployment-architecture)
9. [Scalability and Extensibility](#scalability-and-extensibility)

---

## Overview

Mave CMS is a modern, AI-powered, headless CMS designed to streamline backend operations for organizations. Its architecture is built on the MACH principles:

- **Microservices**: Independent, modular services.
- **API-First**: REST and GraphQL APIs for seamless integration.
- **Cloud-Native**: Scalable deployment in cloud environments.
- **Headless**: Decoupled frontend and backend for flexibility.

---

## Core Technologies

### **Frontend**

- Framework: **Next.js**
- Language: **JavaScript (ES6+)**
- Styling: **Tailwind CSS** and **Ant Design**
- State Management: **React Context**, **SWR**

### **Backend**

- Framework: **Laravel**
- Language: **PHP**
- Database: **MySQL**
- Cache: **Redis** (optional for caching)

### **AI and Data Analysis**

- **OpenAI API** for content generation.
- **Google Generative AI** for advanced analytics.
- **ApexCharts** for visualizing data.

### **Infrastructure**

- Containerization: **Docker**
- CI/CD: **Jenkins**
- Web Server: **Nginx**

---

## System Architecture

```plaintext
User Interface (Frontend)
        ↓
API Gateway (REST/GraphQL)
        ↓
Backend Services (Laravel)
        ↓
Database (MySQL)
        ↓
Cache (Redis)
```

- **Frontend**: Responsible for the user interface, built with Next.js and styled using Tailwind CSS.
- **API Gateway**: Handles client requests and routes them to appropriate backend services.
- **Backend**: Laravel-based services manage business logic, authentication, and database interactions.
- **Database**: Stores content, user data, and configurations in a relational schema.
- **Cache**: Redis is optionally used for caching frequently accessed data.

---

## Frontend Architecture

### **Component Structure**

Mave CMS follows a modular approach:

```
src/
├── components/   # Reusable UI components
├── pages/        # Next.js pages
├── contexts/     # React Context for global state
├── hooks/        # Custom hooks for shared logic
├── utils/        # Helper functions
```

### **Component Lifecycle**

1. User interacts with the UI.
2. Data is fetched via APIs using **SWR** for caching.
3. UI updates dynamically based on the response.

### **Key Features**

- **Dynamic Page Builder**: Drag-and-drop components like Navbar, Media, and Sliders.
- **Form Builder**: Build and embed forms easily.
- **Live Previews**: Real-time preview of content changes.

---

## Backend Architecture

### **Layered Design**

Mave CMS backend is structured into logical layers:

```
app/
├── Controllers/   # Handles HTTP requests
├── Models/        # Eloquent ORM models
├── Services/      # Business logic
├── Repositories/  # Data abstraction layer
├── Policies/      # Authorization logic
```

### **Key Responsibilities**

- **Controllers**: Handle API requests and responses.
- **Services**: Contain business logic (e.g., content generation, form processing).
- **Repositories**: Interact with the database using Eloquent ORM.

---

## Database Design

### **Schema Overview**

- **Users**: Manages admin and contributor accounts.
- **Roles and Permissions**: Implements role-based access control (RBAC).
- **Pages**: Stores page data, including components and layouts.
- **Media**: Tracks uploaded media files with metadata (e.g., tags, formats).
- **Custom Models**: Dynamic schema for DIY CMS features.

#### Example: Users Table

| Field        | Type         | Description                |
| ------------ | ------------ | -------------------------- |
| `id`         | INT          | Primary Key                |
| `name`       | VARCHAR(255) | User's name                |
| `email`      | VARCHAR(255) | User's email               |
| `role_id`    | INT          | Foreign key to Roles table |
| `created_at` | TIMESTAMP    | Record creation timestamp  |
| `updated_at` | TIMESTAMP    | Record update timestamp    |

---

## API Design

### **REST API**

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| GET    | `/api/pages`     | Fetch all pages   |
| POST   | `/api/pages`     | Create a new page |
| PUT    | `/api/pages/:id` | Update a page     |
| DELETE | `/api/pages/:id` | Delete a page     |

### **GraphQL**

#### Query Example

```graphql
query GetPage($id: ID!) {
  page(id: $id) {
    title
    components {
      type
      data
    }
  }
}
```

#### Mutation Example

```graphql
mutation AddPage($input: PageInput!) {
  addPage(input: $input) {
    id
    title
  }
}
```

---

## Deployment Architecture

### **Local Development**

- **Frontend**: Runs on `http://localhost:3005` using `npm run dev`.
- **Backend**: Runs on `http://127.0.0.1:8000` using `php artisan serve`.

### **Production**

- Hosted on **Docker** containers for scalability.
- **Nginx** acts as a reverse proxy for both frontend and backend.
- **MySQL** for database, optionally with **Redis** for caching.

---

## Scalability and Extensibility

### **Scalability**

- **Horizontal Scaling**: Use Kubernetes or Docker Swarm to scale services.
- **Caching**: Reduce database load with Redis.

### **Extensibility**

1. **Plugins**:
   - Add custom functionality via a plugin architecture.
2. **Custom Components**:
   - Developers can add new frontend components with ease.
3. **Third-Party Integrations**:
   - Support for tools like Elasticsearch, RabbitMQ, and Stripe.

---

## Conclusion

The architecture of Mave CMS is designed for flexibility, scalability, and performance. By adhering to modern best practices, it ensures a seamless development and user experience.

For questions or suggestions, contact [support@mave.ethertech.ltd](mailto:support@mave.ethertech.ltd).
