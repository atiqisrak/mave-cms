# TROUBLESHOOTING GUIDE

This troubleshooting guide provides solutions for common issues you may encounter while using Mave CMS. If your problem isn't listed here, feel free to reach out to [support@mave.ethertech.ltd](mailto:support@mave.ethertech.ltd).

---

## **Installation Issues**

### 1. **`npm install` fails**

**Cause:** Incorrect Node.js version or corrupted cache.  
**Solution:**

- Ensure you are using Node.js v16.0.0 or higher.
- Clear the npm cache:
  ```bash
  npm cache clean --force
  ```
- Delete the `node_modules` folder and `package-lock.json` file, then reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

### 2. **Database connection error**

**Cause:** Incorrect database credentials in `.env` or MySQL service not running.  
**Solution:**

1. Check your `.env` file:
   ```plaintext
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=mave
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```
2. Verify MySQL is running:
   ```bash
   systemctl status mysql
   ```
3. Restart MySQL if necessary:
   ```bash
   systemctl restart mysql
   ```

---

### 3. **`php artisan migrate` fails**

**Cause:** Database does not exist or insufficient permissions.  
**Solution:**

- Create the database manually:
  ```sql
  CREATE DATABASE mave;
  ```
- Verify the MySQL user has permissions for the database.

---

### 4. **Laravel application key error**

**Cause:** Application key not set.  
**Solution:**
Run the following command to generate the key:

```bash
php artisan key:generate
```

---

## **Runtime Issues**

### 1. **Frontend not loading**

**Cause:** Backend API is not running or incorrect API URL in `.env`.  
**Solution:**

1. Ensure the backend server is running:
   ```bash
   php artisan serve
   ```
2. Verify the `NEXT_PUBLIC_API_URL` in the `.env` file matches the backend URL:
   ```plaintext
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
   ```

---

### 2. **Media library not loading**

**Cause:** Storage not linked or incorrect permissions.  
**Solution:**

1. Link the storage:
   ```bash
   php artisan storage:link
   ```
2. Set the correct permissions for the storage folder:
   ```bash
   chmod -R 775 storage
   ```

---

### 3. **Error 404 on custom models**

**Cause:** Missing routes or migration issues.  
**Solution:**

1. Run migrations again:
   ```bash
   php artisan migrate
   ```
2. Clear and cache routes:
   ```bash
   php artisan route:clear
   php artisan route:cache
   ```

---

### 4. **Slow performance**

**Cause:** Large datasets, insufficient resources, or caching issues.  
**Solution:**

- Enable caching in Laravel:
  ```bash
  php artisan config:cache
  php artisan optimize
  ```
- Use Redis for caching (optional):
  - Install Redis and Laravel Redis package:
    ```bash
    composer require predis/predis
    ```
  - Update the `.env` file:
    ```plaintext
    CACHE_DRIVER=redis
    ```

---

## **Deployment Issues**

### 1. **SSL not working**

**Cause:** SSL certificate not configured properly.  
**Solution:**

1. Verify your SSL certificate files (e.g., `cert.pem`, `privkey.pem`).
2. Update your Nginx or Apache configuration to include SSL paths.
3. Restart the web server:
   ```bash
   sudo systemctl restart nginx
   ```

---

### 2. **Docker container fails to start**

**Cause:** Missing `.env` file or incorrect configurations.  
**Solution:**

1. Ensure the `.env` file exists in the project root.
2. Rebuild the Docker containers:
   ```bash
   docker-compose down
   docker-compose up --build
   ```

---

## **Debugging Tools**

### 1. **View Logs**

- **Laravel Logs:** Check `storage/logs/laravel.log` for backend errors.
- **Frontend Logs:** Use the browser's developer tools (Console tab).

### 2. **Clear Cache**

- Laravel Cache:
  ```bash
  php artisan cache:clear
  ```
- Browser Cache: Clear your browser cache or use incognito mode.

### 3. **Enable Debug Mode**

Set `APP_DEBUG=true` in `.env` to see detailed error messages during development.

---

## **Common Errors and Fixes**

### **Error:** `CSRF token mismatch`

**Cause:** Outdated session or incorrect API URL.  
**Solution:**

- Clear Laravel session files:
  ```bash
  php artisan session:clear
  ```
- Verify the `APP_URL` in `.env` matches the frontend URL.

---

### **Error:** `The POST method is not allowed`

**Cause:** CSRF middleware not bypassed for specific routes.  
**Solution:**

- Add routes to the `$except` array in `App\Http\Middleware\VerifyCsrfToken`:
  ```php
  protected $except = [
      'api/*',
  ];
  ```

---

### **Error:** `Cannot find module 'next'`

**Cause:** Missing `next` dependency in the frontend.  
**Solution:**

- Reinstall Next.js:
  ```bash
  npm install next
  ```

---

## Need More Help?

If the issue persists, contact us at [support@mave.ethertech.ltd](mailto:support@mave.ethertech.ltd) or open an issue on our [GitHub repository](https://github.com/ether-technologies/mave-cms/issues).
