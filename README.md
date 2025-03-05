# YAPP (Yet Another Private Platform)

## Overview
YAPP is a real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring real-time messaging, user authentication, and a customizable theme system.

## Features
- 🔐 User authentication (signup/login)
- 💬 Real-time messaging using Socket.IO
- 🌈 Multiple theme options
- 👤 User profiles with avatar support
- 🟢 Online/offline status indicators
- 📱 Responsive design

## Tech Stack
### Frontend
- React with Vite
- Zustand for state management
- Socket.IO client for real-time communication
- TailwindCSS + DaisyUI for styling
- React Router for navigation
- Axios for API requests

### Backend
- Node.js + Express
- MongoDB with Mongoose
- Socket.IO for real-time features
- JWT for authentication
- Cookie-based sessions

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB instance
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/yapp.git
cd yapp
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Environment Setup
```bash
# In backend directory, create .env file
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

4. Start the development servers
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

## Project Structure

### Frontend
```
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── pages/          # Route components
│   ├── store/          # Zustand state management
│   ├── lib/            # Utilities and configurations
│   └── App.jsx         # Main application component
```

### Backend
```
backend/
├── src/
│   ├── controllers/    # Route controllers
│   ├── models/        # MongoDB models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   └── index.js       # Entry point
```

## Features in Detail

### Authentication
- JWT-based authentication
- Secure password hashing
- Protected routes
- Persistent sessions

### Real-time Chat
- Instant message delivery
- Online status updates
- Message history
- User typing indicators

### Theme System
- Multiple built-in themes
- Theme persistence
- Real-time theme switching

## Deployment
The application is configured for deployment on Render.com with the following structure:

```6:6:frontend/src/store/useAuthStore.js
const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
```


## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.
