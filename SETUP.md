# Quick Setup Guide

## Step 1: Install Dependencies
```bash
npm install
```

## Step 2: Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Enable the following services:
   - **Firestore Database**: Create database in test mode (you can secure it later)
   - **Storage**: Enable Firebase Storage
   - **Authentication**: Optional, for future admin features

4. Get your Firebase config:
   - Go to Project Settings > General
   - Scroll down to "Your apps"
   - Click on the web icon (</>) to add a web app
   - Copy the `firebaseConfig` object

5. Update `src/services/firebase.js` with your config:
```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
}
```

## Step 3: Firestore Database Rules

Set up basic security rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all approved businesses
    match /businesses/{businessId} {
      allow read: if resource.data.approved == true;
      allow create: if request.auth != null || true; // Allow anyone to create (for demo)
      allow update, delete: if request.auth != null; // Only authenticated users can update/delete
    }
    
    // Allow read access to all approved properties
    match /properties/{propertyId} {
      allow read: if resource.data.approved == true;
      allow create: if request.auth != null || true;
      allow update, delete: if request.auth != null;
    }
  }
}
```

## Step 4: Storage Rules

Set up Firebase Storage rules:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /businesses/{businessId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null || true; // Adjust based on your needs
    }
    match /properties/{propertyId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null || true;
    }
  }
}
```

## Step 5: Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Step 6: Test the Application

1. **Home Page**: Navigate to `/` - You should see the hero section and featured businesses
2. **Categories**: Navigate to `/categories` - Browse and filter businesses
3. **Add Business**: Navigate to `/add-business` - Test the registration form
4. **Real Estate**: Navigate to `/real-estate` - View property listings
5. **Dark Mode**: Click the theme toggle in the navbar

## Troubleshooting

### Firebase Connection Issues
- Verify your Firebase config is correct
- Check that Firestore and Storage are enabled
- Ensure your database rules allow read/write operations

### Images Not Loading
- Check Firebase Storage rules
- Verify image URLs are correct
- For local development, you may need to use placeholder images

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 16+)
- Verify all dependencies are installed

## Next Steps

1. **Customize Branding**: Update colors, logo, and content in the components
2. **Add Authentication**: Implement user login for admin features
3. **Set Up Admin Dashboard**: Create admin panel for business approval
4. **Configure Email**: Set up email notifications for quote requests
5. **Add Google Maps**: Get API key and integrate in Contact page
6. **Deploy**: Deploy to Vercel, Netlify, or Firebase Hosting

## Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag and drop the 'dist' folder to Netlify
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
npm run build
firebase deploy
```

## Support

For issues or questions, refer to the main README.md file.


