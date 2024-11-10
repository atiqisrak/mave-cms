# Project Template Guide for Mave CMS

This document provides a structured template for organizing projects using Mave CMS. It ensures consistency, scalability, and ease of collaboration when developing and managing content or features.

---

## Project Overview

### **Project Name**

- Example: `E-Commerce CMS`

### **Project Description**

- A brief summary of the project.
- Example: "An e-commerce platform for managing products, orders, and customer data with AI-powered analytics and customizable themes."

### **Key Features**

1. AI-powered product recommendations.
2. Customizable templates for product listings.
3. Advanced search with Elasticsearch integration.

---

## Project Structure

### **Frontend (Next.js)**

Organize components, pages, and styles systematically:

```
src/
├── components/    # Reusable UI components
├── pages/         # Next.js page files
├── styles/        # Tailwind and Ant Design styling
├── contexts/      # Context API for global state
├── hooks/         # Custom React hooks
├── utils/         # Helper functions and utilities
```

#### **Example: Components Directory**

```
components/
├── Navbar.jsx
├── Footer.jsx
├── ProductCard.jsx
├── Sidebar.jsx
```

### **Backend (Laravel)**

Define business logic, database interactions, and APIs:

```
app/
├── Controllers/   # Handles HTTP requests
├── Models/        # Database models
├── Services/      # Business logic
├── Repositories/  # Data management layer
├── Policies/      # Authorization rules
```

---

## API Endpoints

### **REST Endpoints**

| Method | Endpoint             | Description                |
| ------ | -------------------- | -------------------------- |
| GET    | `/api/products`      | Fetch a list of products   |
| POST   | `/api/products`      | Add a new product          |
| PUT    | `/api/products/{id}` | Update an existing product |
| DELETE | `/api/products/{id}` | Delete a product           |

### **GraphQL**

#### Query Example

```graphql
query GetProducts {
  products {
    id
    name
    price
    description
  }
}
```

#### Mutation Example

```graphql
mutation AddProduct($input: ProductInput!) {
  addProduct(input: $input) {
    id
    name
  }
}
```

---

## Components and Customization

### **Custom Models (DIY CMS)**

- Define custom models (e.g., `Product`, `Category`):
  - Example fields: `name`, `description`, `price`, `category_id`.
- Use the DIY CMS generator in Mave to create models and APIs dynamically.

### **Page Builder**

- Create and design pages using the drag-and-drop interface.
- Add components like **Navbar**, **Slider**, **Product Grid**, and **Footer**.

---

## Styling and Themes

### **Styling Frameworks**

- Use **Tailwind CSS** for utility-first styling.
- Leverage **Ant Design** components for complex UI elements.

### **Custom Themes**

- Store custom themes in `src/styles/themes/`.
- Example: `dark-theme.css`, `light-theme.css`.

---

## Deployment Instructions

### **Local Development**

1. Start the backend server:
   ```bash
   php artisan serve
   ```
2. Start the frontend server:
   ```bash
   npm run dev
   ```
3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://127.0.0.1:8000`

### **Production**

1. Build the frontend:
   ```bash
   npm run build
   ```
2. Deploy the backend:
   - Use Docker, Nginx, or AWS Elastic Beanstalk for hosting.

---

## Testing

### **Frontend**

- Write unit tests using **Jest**.
- Example test structure:
  ```
  tests/
  ├── components/
  │   ├── Navbar.test.jsx
  │   ├── ProductCard.test.jsx
  └── pages/
      └── HomePage.test.jsx
  ```

### **Backend**

- Use Laravel's built-in testing tools:
  ```bash
  php artisan test
  ```

---

## Team Roles

| Role                | Responsibilities                                  |
| ------------------- | ------------------------------------------------- |
| **Project Manager** | Define goals, timelines, and oversee the project. |
| **Frontend Dev**    | Develop UI components and integrate APIs.         |
| **Backend Dev**     | Develop business logic and manage databases.      |
| **QA Engineer**     | Test features and ensure code quality.            |

---

## Key Milestones

| Milestone            | Expected Date | Status      |
| -------------------- | ------------- | ----------- |
| Project Kickoff      | 2024-01-10    | Complete    |
| API Development      | 2024-01-20    | In Progress |
| Frontend Integration | 2024-02-01    | Pending     |
| Testing Phase        | 2024-02-15    | Pending     |
| Final Deployment     | 2024-03-01    | Pending     |

---

## Notes

- Always use environment variables to store sensitive data (e.g., API keys).
- Refer to the [GOVERNANCE.md](./GOVERNANCE.md) for contribution guidelines.
- For questions, contact [support@mave.ethertech.ltd](mailto:support@mave.ethertech.ltd).
