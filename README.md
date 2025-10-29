# Product Nexus 🚀

**Where Products Meet Perfection**

A modern, terminal-inspired product management application built with the MERN stack. Product Nexus provides a sleek, dark-themed interface for managing your product catalog with full CRUD operations and JWT-based user authentication.

## 🌟 Features

- **🔐 User Authentication**: Secure login and registration using JWT tokens
- **📦 Product Management**: Complete CRUD operations (Create, Read, Update, Delete)
- **🎨 Terminal-Inspired UI**: Modern dark theme with techy aesthetics
- **📱 Responsive Design**: Works seamlessly across desktop and mobile devices
- **🗄️ MongoDB Database**: Robust NoSQL database for data persistence
- **⚡ Fast Performance**: Built with Vite for lightning-fast development and builds
- **🌐 Live Deployment**: Deployed on GitHub Pages for easy access

## 🛠️ Tech Stack

### Frontend
- **React 19+** with Vite
- **React Router** for client-side routing
- **CSS3** with custom dark theme and animations
- **Context API** for state management

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

### Deployment
- **GitHub Pages** for frontend deployment
- **MongoDB Atlas** for cloud database
- **Git** for version control

## 🚀 Live Demo

**[Visit Product Nexus](https://poojan2107.github.io/ProductNexus)**

## 📋 Product Features

### Product Management

- ➕ **Add Products**: Create new products with name, price, category, subcategory, and description
- 👁️ **View Products**: Browse all products in a responsive card grid layout
- ✏️ **Edit Products**: Update existing product information
- 🗑️ **Delete Products**: Remove products with confirmation dialogs
- 🔍 **Product Details**: View detailed product information
- 🔍 **Search & Filter**: Search by name, category, or subcategory
- 💰 **Price Filtering**: Filter products by minimum and maximum price
- 📊 **Sorting**: Sort by name or price (ascending/descending)

### User Experience

- 🔑 **Secure Authentication**: Register new accounts or login to existing ones
- 🛡️ **Protected Routes**: Only authenticated users can access product management
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Real-time Updates**: Instant UI updates after operations
- 🎨 **Dark Theme**: Terminal-inspired aesthetic with smooth animations

## 🏗️ Project Structure

```
product/
├── backend/                    # Express.js backend
│   ├── models/                 # MongoDB models
│   │   ├── User.js            # User schema
│   │   └── Product.js         # Product schema
│   ├── routes/                 # API routes
│   │   ├── auth.js            # Authentication routes
│   │   └── products.js        # Product CRUD routes
│   ├── middleware/             # Custom middleware
│   │   └── auth.js            # JWT authentication middleware
│   ├── server.js              # Main server file
│   └── package.json           # Backend dependencies
├── src/                       # React frontend
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx         # Navigation bar with auth controls
│   │   ├── Footer.jsx         # Application footer
│   │   ├── Card.css           # Product card styling
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── pages/                 # Main application pages
│   │   ├── Login.jsx          # User login page
│   │   ├── Register.jsx       # User registration page
│   │   ├── ProductList.jsx    # Main products dashboard
│   │   ├── AddProduct.jsx     # Add new product form
│   │   ├── EditProduct.jsx    # Edit existing product
│   │   ├── ViewProduct.jsx    # Product detail view
│   │   ├── Profile.jsx        # User profile management
│   │   ├── Dashboard.jsx      # User dashboard
│   │   └── NotFound.jsx       # 404 error page
│   ├── services/              # API and external services
│   │   └── api.js             # Backend API calls
│   ├── providers/             # React context providers
│   │   └── AuthProvider.jsx   # Authentication context
│   ├── contexts/              # React contexts
│   │   └── NotificationContext.jsx # Notification system
│   ├── hooks/                 # Custom React hooks
│   │   └── useAuth.js         # Authentication hook
│   └── styles/                # CSS styling files
├── public/                    # Static assets
├── index.html                 # Main HTML file
├── package.json               # Frontend dependencies
├── vite.config.js             # Vite configuration
└── README.md                  # Project documentation
```

## 🎨 Design Philosophy

Product Nexus embraces a **terminal-inspired aesthetic** with:

- 🖤 **Dark Theme**: Easy on the eyes with high contrast
- ⚡ **Techy Vibes**: Monospace fonts and terminal-like elements
- 🎯 **Minimalist UI**: Clean, focused interface without clutter
- 🌈 **Smooth Animations**: Subtle transitions and hover effects
- 📐 **Grid Layouts**: Organized, responsive card-based design

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Poojan2107/ProductNexus.git
   cd ProductNexus
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Set up environment variables**

   Create a `.env` file in the `backend` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

6. **Start the frontend development server**
   ```bash
   # In a new terminal, from the root directory
   npm run dev
   ```

7. **Open your browser**

   Navigate to `http://localhost:5177` to access the application.

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/status` - Check auth status
- `PUT /api/auth/profile/:id` - Update user profile

### Products
- `GET /api/products` - Get all products for authenticated user
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

## 👨‍💻 Developer

**Product Management App Built By Poojan Shrivastav.**

---

### 🔗 Links

- **Live Demo**: https://poojan2107.github.io/ProductNexus
- **Repository**: https://github.com/Poojan2107/ProductNexus

---

_Built with ❤️ using the MERN stack and modern web technologies._
