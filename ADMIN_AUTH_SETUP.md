# Admin Authentication Setup Guide

## Overview

The admin panel now requires Firebase Authentication. Users must log in with email and password to access admin features.

## Firebase Authentication Setup

### Step 1: Enable Authentication in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Navigate to **Authentication** in the left sidebar
4. Click **Get Started** (if not already enabled)
5. Go to the **Sign-in method** tab
6. Enable **Email/Password** provider:
   - Click on "Email/Password"
   - Toggle "Enable" to ON
   - Click **Save**

### Step 2: Create Admin User

1. In Firebase Console, go to **Authentication** > **Users** tab
2. Click **Add user**
3. Enter an email address (e.g., `admin@yourdomain.com`)
4. Enter a secure password
5. Click **Add user**

**Important**: Save these credentials securely - you'll need them to log in!

### Step 3: (Optional) Restrict Admin Access

You can restrict admin access to specific email addresses by:

1. Creating a custom claim in Firebase (requires Cloud Functions)
2. Or checking email addresses in your code
3. Or using Firebase Security Rules to restrict access

## Accessing the Admin Panel

1. Navigate to the secure admin URL:
   ```
   http://localhost:5173/manage-a7f3b9c2d4e1f6g8h2j4k6m8/dashboard
   ```

2. You'll be redirected to the login page if not authenticated

3. Enter your admin email and password

4. Once logged in, you'll have access to:
   - Dashboard
   - Business Management
   - Pending Approvals

## Security Features

✅ **Secure URL Path** - Non-guessable admin URL  
✅ **Firebase Authentication** - Email/password login required  
✅ **Protected Routes** - All admin pages require authentication  
✅ **Auto-redirect** - Unauthenticated users see login page  
✅ **Session Management** - Login persists across page refreshes  
✅ **Logout Functionality** - Secure logout with confirmation

## Logout

Click the **Logout** button in the admin navbar. You'll be redirected to the login page.

## Troubleshooting

### "No account found with this email"
- Verify the email address is correct
- Check that the user exists in Firebase Console > Authentication > Users

### "Incorrect password"
- Reset the password in Firebase Console if needed
- Or create a new admin user

### Login page not showing
- Check that Firebase Authentication is enabled
- Verify your Firebase config in `src/services/firebase.js` is correct
- Check browser console for errors

### Can't access admin after login
- Clear browser cache and cookies
- Check that you're using the correct secure URL path
- Verify Firebase Auth is properly initialized

## Production Recommendations

For production deployment, consider:

1. **Environment Variables**: Store Firebase config in environment variables
2. **Custom Claims**: Use Firebase Custom Claims to assign admin roles
3. **IP Whitelisting**: Restrict admin access to specific IP addresses
4. **2FA**: Add two-factor authentication for additional security
5. **Audit Logging**: Log all admin actions for security auditing
6. **Rate Limiting**: Prevent brute force attacks on login

## Files Created

- `src/services/authService.js` - Authentication service functions
- `src/contexts/AuthContext.jsx` - Authentication context provider
- `src/pages/admin/AdminLogin.jsx` - Login page component
- `src/components/ProtectedRoute.jsx` - Route protection component

## Next Steps

1. Enable Firebase Authentication in your Firebase project
2. Create your first admin user
3. Test the login flow
4. Customize the admin path in `src/config/adminConfig.js` if desired
5. Deploy and test in production

