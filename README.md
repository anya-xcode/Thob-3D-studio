# Avatar Selection App

A full-stack web application with React frontend and Node.js backend for selecting boy/girl avatars.

## Project Structure

```
thob/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── AvatarSelector.jsx
│   │   │   └── AvatarSelector.css
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
└── server/          # Node.js backend
    ├── index.js
    └── package.json
```

## Setup Instructions

### Backend Setup
1. Navigate to server directory:
   ```bash
   cd server
   ```

2. Start the server:
   ```bash
   npm start
   ```
   Server will run on http://localhost:5000

### Frontend Setup
1. Navigate to client directory:
   ```bash
   cd client
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```
   Frontend will run on http://localhost:5173

## Features

- ✅ React frontend with Vite
- ✅ Node.js/Express backend
- ✅ Avatar selection (Boy/Girl)
- ✅ Beautiful gradient UI
- ✅ Responsive design
- ✅ API integration with fallback
- ✅ Uses DiceBear API for avatar generation

## How to Use

1. Start both backend and frontend servers
2. Open http://localhost:5173 in your browser
3. Click on Boy or Girl avatar to select
4. Your selection will be displayed below

## Technologies Used

- **Frontend**: React, Vite, CSS3
- **Backend**: Node.js, Express, CORS
- **Avatar API**: DiceBear Avatars
