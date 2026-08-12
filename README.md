# 🌍 WanderWise

### Discover. Explore. Experience.

WanderWise is a full-stack community-driven travel platform where users can discover tour packages, create and share their own trips, book travel packages, and manage their bookings.

The platform is designed to make travel planning more social, simple, and convenient by allowing travelers to both **discover trips** and **share their own experiences**.

---

## 🚀 Live Project

> Add your deployed frontend URL here after deployment.

**Live Demo:** Coming Soon

**GitHub:**  
https://github.com/Mohsinmohd29/WanderWise

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Protected routes
- Persistent login using local storage
- Automatic handling of expired/invalid tokens
- Logout functionality
- Toast notifications for authentication actions

---

### 🗺️ Explore Tour Packages

Users can:

- Browse available tour packages
- View detailed package information
- Explore destinations
- View package descriptions
- View pricing and duration
- View available seats
- View detailed trip itineraries
- View included features
- See the tour host

---

### 📦 Create & Manage Tour Packages

Authenticated users can create their own tour packages.

Package creators can add:

- Package title
- Destination
- Description
- Price
- Duration
- Available seats
- Package image
- Multi-day itinerary
- Included services/features

Package owners can also:

- View their packages
- Edit packages
- Delete packages
- Manage bookings made for their packages

Only the owner of a package can edit or delete it.

---

### 🎫 Booking System

Users can book tour packages by selecting:

- Number of travelers
- Travel date

The system automatically:

- Calculates the total price
- Checks seat availability
- Reduces available seats after booking
- Stores booking information
- Associates the booking with the logged-in user
- Associates the booking with the selected package

---

### 📋 My Bookings

Users can view their bookings and see information such as:

- Tour package
- Destination
- Travel date
- Number of travelers
- Price per person
- Total price
- Booking status

---

### 👥 Package Owner Booking Management

Package owners can view who has booked their packages.

Owners can see:

- Traveler name
- Traveler email
- Number of seats booked
- Travel date
- Booking details

This information is only accessible to the owner of the respective package.

---

### 🔒 Authorization & Security

WanderWise uses authentication and authorization to protect user actions.

Examples:

- Only authenticated users can create packages
- Only authenticated users can make bookings
- Only package owners can edit their packages
- Only package owners can delete their packages
- Only package owners can view bookings for their packages
- Protected API routes use JWT authentication

---

### 🔔 Toast Notifications

The application provides user-friendly notifications for important actions such as:

- Successful login
- Successful registration
- Logout
- Package creation
- Package editing
- Package deletion
- Booking confirmation
- Validation errors
- API errors

---

### 📱 Responsive UI

The frontend is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The interface uses a clean travel-focused design with responsive Bootstrap styling and custom CSS.

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- React Router
- Bootstrap
- React Toastify
- JavaScript
- HTML5
- CSS3

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS

## Cloud & Storage

- Cloudinary
- MongoDB Atlas

## Development Tools

- Git
- GitHub
- VS Code
- Nodemon

---

# 🏗️ Project Architecture

```text
WanderWise/
│
├── public/
│
├── src/
│   │
│   ├── components/
│   │   ├── auth/
│   │   ├── booking/
│   │   ├── AboutSection.jsx
│   │   ├── BookingCard.jsx
│   │   ├── Destinations.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── IncludedFeatures.jsx
│   │   ├── Itinerary.jsx
│   │   ├── Navbar.jsx
│   │   ├── PackageCard.jsx
│   │   ├── PackageHero.jsx
│   │   └── Packages.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Packages.jsx
│   │   ├── PackageDetails.jsx
│   │   ├── Booking.jsx
│   │   ├── Bookings.jsx
│   │   ├── PackageBookings.jsx
│   │   ├── CreatePackage.jsx
│   │   ├── EditPackage.jsx
│   │   ├── MyPackages.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   │
│   ├── services/
│   │   └── api.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
│
├── server/
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── bookingController.js
│   │   └── packageController.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Package.js
│   │   └── Booking.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── packageRoutes.js
│   │   └── bookingRoutes.js
│   │
│   ├── server.js
│   └── package.json
│
├── .gitignore
├── package.json
└── README.md