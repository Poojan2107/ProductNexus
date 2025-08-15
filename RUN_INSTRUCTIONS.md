# Product Nexus - Setup Instructions

## Quick Start

### Option 1: Manual Start (Recommended)
1. **Start JSON Server (Backend)**
   - Open a new terminal/PowerShell window
   - Run: `npx json-server --watch db.json --port 5000`
   - Keep this terminal open

2. **Start React App (Frontend)**
   - Open another terminal/PowerShell window 
   - Run: `npm run dev`
   - Your app will be available at `http://localhost:5173/`

### Option 2: Using Batch File (Windows)
1. Double-click `start-server.bat` to start JSON Server
2. In another terminal, run: `npm run dev`

## Features Fixed ✅

- ✅ **Button Animation**: Fixed glow effect that was hiding text
- ✅ **Login Page**: Centered all buttons for better UX  
- ✅ **Color Scheme**: Changed from green to sleek black & white techy theme
- ✅ **Footer**: Updated with "Product Nexus" branding and catchy tagline
- ✅ **API Connection**: Improved error handling for server connectivity

## App Features

- 🔐 **Authentication**: Login/Register with Firebase
- 📦 **Product Management**: Add, edit, delete, and view products
- 🎨 **Modern UI**: Black & white techy design with smooth animations
- 📱 **Responsive**: Works on desktop and mobile devices
- ⚡ **Fast**: Built with React + Vite for optimal performance

## Troubleshooting

**"Failed to fetch products"?**
- Make sure JSON Server is running on port 5000
- Check if `db.json` exists with sample data
- Try restarting both servers

**Port conflicts?**
- JSON Server uses port 5000
- React dev server uses port 5173
- Make sure these ports are available

---

**Product Nexus** - Where Products Meet Perfection ✨
