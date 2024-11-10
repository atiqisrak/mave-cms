# INSTALLATION GUIDE

Welcome to the installation guide for **Mave CMS**! Follow the steps below to set up Mave CMS on your local machine or production server.

---

## System Requirements

### Minimum Requirements:

- **CPU**: 2 cores
- **RAM**: 4 GB
- **Storage**: 20 GB SSD
- **Operating System**: Ubuntu 18.04+, Windows 10+, macOS 10.15+
- **Browser**: Any modern browser (e.g., Google Chrome)

### Recommended Requirements:

- **CPU**: 4 cores
- **RAM**: 8 GB
- **Storage**: 50 GB SSD
- **Operating System**: Ubuntu 20.04+, Windows 11, macOS 11+
- **Browser**: Latest version of Google Chrome

---

## Prerequisites

Before installation, ensure the following tools are installed on your system:

- **Node.js** (v16.0.0 or higher): [Download](https://nodejs.org/)
- **Laravel** (v9.0 or higher): [Laravel Installation](https://laravel.com/docs/9.x/installation)
- **MySQL** (v5.7 or higher): [Download](https://dev.mysql.com/downloads/)
- **Git**: [Download](https://git-scm.com/)
- **Composer**: [Download](https://getcomposer.org/)
- **NPM** or **Yarn**: [NPM](https://www.npmjs.com/) | [Yarn](https://yarnpkg.com/)

---

## Installation Steps

### 1. Clone the Repository

Clone the Mave CMS repository from GitHub:

```bash
git clone https://github.com/ether-technologies/mave-cms.git
cd mave-cms
```

---

### 2. Install Dependencies

#### Frontend (Next.js)

Install frontend dependencies:

```bash
npm install
```

#### Backend (Laravel)

Install backend dependencies:

```bash
composer install
```

---

### 3. Configure Environment Variables

1. Copy the `.env.example` file to `.env`:

   ```bash
   cp .env.example .env
   ```

2. Edit the `.env` file and set up the required environment variables:
   ```plaintext
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=mave
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

---

### 4. Generate Application Key

Generate the Laravel application key:

```bash
php artisan key:generate
```

---

### 5. Run Database Migrations

Run the database migrations to set up the schema:

```bash
php artisan migrate
```

---

### 6. Start the Development Server

#### Frontend (Next.js)

```bash
npm run dev
```

#### Backend (Laravel)

```bash
php artisan serve
```

---

### 7. Access Mave CMS

- **Frontend**: Open your browser and navigate to `http://localhost:3000`.
- **Backend API**: Visit `http://127.0.0.1:8000`.

---

## Additional Steps (Optional)

### Link Public Storage

To enable media management, create a symbolic link for storage:

```bash
php artisan storage:link
```

---

### Seed the Database

For sample data:

```bash
php artisan db:seed
```

---

## Troubleshooting

### Common Issues:

1. **Error: npm install fails**

   - Ensure the correct Node.js version is installed.
   - Clear the npm cache:
     ```bash
     npm cache clean --force
     ```

2. **Database connection error**

   - Verify database credentials in the `.env` file.
   - Ensure the MySQL server is running.

3. **Laravel-related errors**
   - Refresh the autoload files:
     ```bash
     composer dump-autoload
     ```

---

## Docker Installation (Optional)

For Docker-based deployment, refer to the `DOCKER.md` file for detailed instructions.

---

## Support

If you encounter any issues, please contact us at [support@mave.ethertech.ltd](mailto:support@mave.ethertech.ltd).

---

Thank you for choosing **Mave CMS**! 🎉
