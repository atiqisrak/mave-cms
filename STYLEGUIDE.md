# Mave CMS Style Guide

This document outlines the coding and design standards for Mave CMS. Following this guide ensures consistency, readability, and maintainability across the project.

---

## Table of Contents

1. [General Guidelines](#general-guidelines)
2. [Frontend Code Style](#frontend-code-style)
3. [Backend Code Style](#backend-code-style)
4. [Component Development](#component-development)
5. [Folder Structure](#folder-structure)
6. [Styling Standards](#styling-standards)
7. [Commit Messages](#commit-messages)
8. [Code Review Checklist](#code-review-checklist)

---

## General Guidelines

- Write **clean, self-documenting code** with meaningful variable and function names.
- Use **comments sparingly** to explain complex logic, not obvious code.
- Follow **DRY (Don't Repeat Yourself)** and **KISS (Keep It Simple, Stupid)** principles.
- Prioritize **performance and security** in all code.

---

## Frontend Code Style

### Language and Framework

- Use **JavaScript** (ES6+ features) for all frontend code.
- Framework: **Next.js**.
- Styling: **Tailwind CSS** and **Ant Design**.

### Standards

1. **Formatting**:

   - Use **Prettier** for code formatting:
     ```bash
     npm run lint -- --fix
     ```
   - Indentation: 2 spaces.
   - Line length: Max 120 characters.

2. **React Components**:

   - Use **functional components**.
   - Name components in **PascalCase**:
     ```javascript
     const MyComponent = () => { ... };
     export default MyComponent;
     ```

3. **Props**:

   - Destructure props for cleaner code.
     ```javascript
     const MyComponent = ({ title, description }) => { ... };
     ```

4. **State Management**:

   - Use **React Context** or **SWR** for global state.
   - Avoid prop drilling by using context APIs.

5. **Error Handling**:
   - Wrap API calls in try-catch blocks.
   - Display user-friendly error messages.

---

## Backend Code Style

### Language and Framework

- Use **PHP** with the **Laravel** framework.
- Database: **MySQL**.

### Standards

1. **Formatting**:

   - Follow **PSR-12** coding standards.
   - Use 4 spaces for indentation.

2. **Controllers**:

   - Keep controllers focused on routing logic.
   - Delegate business logic to **Services** or **Repositories**.

3. **Models**:

   - Use meaningful model names in **Singular** form (e.g., `Post`, `User`).
   - Add proper relationships:
     ```php
     public function posts()
     {
         return $this->hasMany(Post::class);
     }
     ```

4. **Validation**:

   - Use **Form Requests** for validation.
     ```php
     $this->validate($request, [
         'title' => 'required|string|max:255',
     ]);
     ```

5. **Security**:
   - Always sanitize user input.
   - Use prepared statements for database queries.

---

## Component Development

### Naming Convention

- Use **PascalCase** for filenames and component names:

```

components/
├── Navbar.jsx
├── Footer.jsx

```

### File Organization

- **One component per file**.
- Export default components:

```javascript
export default function Button() { ... }
```

### Testing

- Write unit tests for all components using **Jest**.

---

## Folder Structure

### Frontend

```
/src
├── components    # Reusable components
├── pages         # Next.js page files
├── styles        # Tailwind and custom styles
├── hooks         # Custom React hooks
├── contexts      # Context providers
├── utils         # Utility functions
```

### Backend

```
/app
├── Controllers   # HTTP Controllers
├── Models        # Eloquent Models
├── Services      # Business Logic
├── Repositories  # Data Access
├── Policies      # Authorization Logic
```

---

## Styling Standards

1. **Tailwind CSS**:

   - Use utility-first classes for styling.
   - Group related classes:
     ```html
     <div class="p-4 bg-gray-100 rounded-lg shadow-md">...</div>
     ```

2. **Ant Design**:

   - Use Ant Design components for complex UI elements (e.g., forms, tables).
   - Customize themes via the Ant Design configuration.

3. **Custom Styles**:
   - Place custom styles in `styles/` and follow BEM naming conventions.

---

## Commit Messages

Follow the **Conventional Commits** specification for consistent commit messages:

```
<type>(<scope>): <description>
```

### Types

- **feat**: A new feature.
- **fix**: A bug fix.
- **docs**: Documentation updates.
- **style**: Code style changes (no functionality changes).
- **refactor**: Code refactoring.
- **test**: Adding or updating tests.
- **chore**: Maintenance or tool-related changes.

### Example:

```
feat(page-builder): add drag-and-drop functionality
fix(auth): resolve token expiration issue
```

---

## Code Review Checklist

Before submitting your code for review:

1. **Linting**: Ensure no linting errors.
2. **Tests**: Add or update tests for your changes.
3. **Documentation**: Update relevant documentation if needed.
4. **Performance**: Test for performance bottlenecks.
5. **Security**: Ensure there are no security vulnerabilities.

---

## Tools

- **Prettier**: For consistent code formatting.
- **ESLint**: For JavaScript linting.
- **PHP-CS-Fixer**: For Laravel code styling.
- **Jest**: For unit testing.

---

Following this style guide ensures that Mave CMS maintains high standards of quality, readability, and collaboration.
