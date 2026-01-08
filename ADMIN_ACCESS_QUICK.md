# Quick Admin Access Guide

## How to Access the Admin Panel

### Step 1: Start Your Development Server
```bash
npm run dev
```

### Step 2: Navigate to Admin URL
Open your browser and go to:

**Main Admin Dashboard:**
```
http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/dashboard
```

### Step 3: Login
You'll be redirected to the login page. Enter your admin credentials:
- **Email**: Your admin email (set up in Firebase Authentication)
- **Password**: Your admin password

### All Admin Pages:

1. **Dashboard**: 
   ```
   http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/dashboard
   ```

2. **Business Management**: 
   ```
   http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/businesses
   ```

3. **Pending Approvals**: 
   ```
   http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/pending
   ```

4. **Contact Submissions**: 
   ```
   http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/contact-submissions
   ```

## Important Notes

⚠️ **The admin path is secure and non-guessable** - it's designed to be hard to find.

⚠️ **Authentication Required** - You must have a Firebase Auth account set up to access the admin panel.

⚠️ **Port Number** - If your dev server runs on a different port (not 5173), replace it in the URLs above.

## Setting Up Your First Admin User

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Authentication** > **Users**
3. Click **Add user**
4. Enter your email and password
5. Save these credentials - you'll need them to log in!

## Need to Change the Admin Path?

Edit `src/config/adminConfig.js` and change:
```javascript
export const ADMIN_BASE_PATH = '/manage-a7f3b9c2d4e1f6g8h2j4k6m8'
```

To your own secure path (make it long and random).

