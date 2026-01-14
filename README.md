# Thob 3D Studio - Avatar Customization Platform

A full-stack web application for 3D avatar customization with AI-powered outfit recommendations.

## Project Structure

```
thob/
├── client/                 
│   ├── src/
│   │   ├── components/    
│   │   ├── pages/         
│   │   └── assets/        
│   └── package.json
├── server/                
│   ├── index.js          
│   ├── recommender.js    
│   └── package.json
└── vercel.json           
```

## Features

- 3D Avatar Customization (Boy/Girl)
- Real-time color and outfit changes
- AI-Powered Outfit Recommendations
- Wishlist functionality with local storage
- Responsive black and white design
- Three.js 3D rendering

## Technologies Used

**Frontend**
- React 18
- Three.js with React Three Fiber
- React Router DOM
- Vite

**Backend**
- Node.js
- Express
- CORS
- Custom AI Recommendation Engine

## Setup Instructions

### Backend Setup

1. Navigate to server directory:
```bash
cd server
npm install
npm start
```
Server runs on http://localhost:5000

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
npm install
npm run dev
```
Frontend runs on http://localhost:5173

## Deployment

This project is configured for Vercel deployment:

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

## API Endpoints

- POST /api/recommend-outfit - Get AI outfit recommendations
- GET /api/avatars - Get available avatars

## How to Use

1. Select Boy or Girl avatar from home page
2. Customize colors and outfits in 3D view
3. Get outfit recommendations based on your profile
4. Add recommendations to wishlist
5. View and manage wishlist items

