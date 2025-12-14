# All in Moris - Planning & Resource Platform

A modern, responsive multi-purpose planning and resource platform built with React. Connect with contractors, retailers, wholesalers, distributors, and service providers all in one place.

## Features

- 🔍 **Advanced Search**: Find businesses, services, and resources quickly
- 🏢 **Business Directory**: Browse verified businesses across multiple categories
- 🏠 **Real Estate**: Buy, rent, or sell properties
- 💼 **Corporate Services**: Specialized solutions for businesses
- ⭐ **Reviews & Ratings**: Make informed decisions with user reviews
- 📱 **Responsive Design**: Works seamlessly on all devices
- 🌓 **Dark/Light Mode**: Toggle between themes
- 📋 **Business Registration**: Easy onboarding for new businesses

## Technology Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router DOM
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage
- **Authentication**: Firebase Auth
- **Icons**: Lucide React
- **Styling**: CSS3 with CSS Variables

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for backend services)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd all-in-moris
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database
   - Enable Storage
   - Enable Authentication (optional for admin features)
   - Copy your Firebase configuration

4. Configure Firebase:
   - Open `src/services/firebase.js`
   - Replace the placeholder config with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   }
   ```

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

### Accessing the dev server from another device on the same LAN

If you want to view the site from a phone or another computer on the same network, run the dev server so it listens on your machine's network interface (this repository is configured to do that). Then:

1. Find your PC's local IP address (on Windows PowerShell):

```powershell
ipconfig | Select-String "IPv4 Address"
```

Look for the IPv4 address for the active network adapter (it typically looks like `192.168.x.y` or `10.x.y.z`).

2. Start the dev server (if not already running):

```powershell
npm run dev
```

3. From the other device open a browser and navigate to:

```
http://<YOUR_PC_IP>:5173
```

Replace `<YOUR_PC_IP>` with the IPv4 address you found in step 1. For example: `http://192.168.1.42:5173`.

Notes and troubleshooting

- Firewall: Windows Firewall may block incoming connections to the Vite dev server. If the other device can't connect, temporarily allow the port through the firewall or create an inbound rule for the port (5173) or for `node.exe`.
- Port in use: If 5173 is already in use, Vite will try another port; the terminal output will show which port is active. Use that port in the URL.
- Preview: To preview a production build on the LAN, run `npm run build` and then `npm run preview` and use the same `<YOUR_PC_IP>:<PORT>` URL shown by the preview command.
- Security: The dev server is intended for local development only. Avoid exposing it on public networks without proper protection.

## Project Structure

```
AllInMoris/
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── BusinessCard.jsx
│   │   ├── Filter.jsx
│   │   └── Modal.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Categories.jsx
│   │   ├── BusinessListing.jsx
│   │   ├── AddBusiness.jsx
│   │   ├── RealEstate.jsx
│   │   ├── CorporateServices.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── services/           # Firebase services
│   │   ├── firebase.js
│   │   ├── businessService.js
│   │   └── realEstateService.js
│   ├── contexts/           # React contexts
│   │   └── ThemeContext.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── package.json
├── vite.config.js
└── README.md
```

## Firebase Database Structure

### Collections

#### businesses
```javascript
{
  name: string,
  category: string,
  description: string,
  email: string,
  phone: string,
  location: string,
  website: string (optional),
  services: array,
  image: string (URL),
  portfolio: array (URLs),
  rating: number,
  reviews: array,
  views: number,
  featured: boolean,
  approved: boolean,
  createdAt: timestamp
}
```

#### properties
```javascript
{
  title: string,
  type: 'sale' | 'rent',
  price: number,
  location: string,
  description: string,
  image: string (URL),
  bedrooms: number (optional),
  bathrooms: number (optional),
  area: number (optional),
  approved: boolean,
  createdAt: timestamp
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Features in Detail

### Home Page
- Hero section with search functionality
- Quick category navigation
- Featured businesses showcase
- "How it works" section

### Categories Page
- Advanced filtering (category, location, price, rating)
- Sorting options (popular, rating, nearest, newest)
- Search functionality
- Responsive grid layout

### Business Listing Page
- Detailed business information
- Portfolio/gallery display
- Reviews and ratings
- Contact information
- Request quote functionality

### Add Business Page
- Comprehensive registration form
- Image upload for portfolio
- Service management
- Form validation

### Real Estate Section
- Buy, Rent, Sell tabs
- Property filtering
- Property cards with details
- Price formatting

### Corporate Services
- Event planning
- Office setup & expansion
- Resource planning
- Corporate partnerships

## Customization

### Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #10b981;
  --accent-color: #f59e0b;
  /* ... */
}
```

### Categories
Update categories in:
- `src/pages/Home.jsx` (quick categories)
- `src/pages/Categories.jsx` (filter categories)
- `src/pages/AddBusiness.jsx` (registration form)

## Future Enhancements

- [ ] User authentication and profiles
- [ ] Admin dashboard for business approval
- [ ] Payment integration for subscriptions
- [ ] Advanced search with AI recommendations
- [ ] Email notifications
- [ ] SMS notifications
- [ ] Mobile app (React Native)
- [ ] Analytics dashboard
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email info@allinmoris.com or visit our website.

## Acknowledgments

- React team for the amazing framework
- Firebase for backend services
- Lucide for beautiful icons
- All contributors and users


