const express = require('express');
const cors = require('cors');
const OutfitRecommender = require('./recommender');

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize recommender
const recommender = new OutfitRecommender();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/avatars', (req, res) => {
  const avatars = [
    {
      id: 1,
      type: 'boy',
      name: 'Boy Avatar',
      image: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Daniel&backgroundColor=a855f7,9333ea,7e22ce&radius=50'
    },
    {
      id: 2,
      type: 'girl',
      name: 'Girl Avatar',
      image: 'https://api.dicebear.com/7.x/big-smile/svg?seed=Isabella&backgroundColor=38bdf8,0ea5e9,0284c7&radius=50'
    }
  ];
  res.json(avatars);
});

// Outfit Recommendation endpoint
app.post('/api/recommend-outfit', (req, res) => {
  try {
    const formData = req.body;
    
    // Validate required fields
    const requiredFields = ['gender', 'skinTone', 'height', 'bodyType', 'occasion', 'season'];
    const missingFields = requiredFields.filter(field => !formData[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missingFields
      });
    }
    
    // Get recommendations
    const recommendations = recommender.getRecommendations(formData);
    
    // Add timestamp
    recommendations.timestamp = new Date().toISOString();
    recommendations.userProfile = formData;
    
    res.json(recommendations);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({
      error: 'Failed to generate recommendations',
      message: error.message
    });
  }
});

app.get('/', (req, res) => {
  res.json({ message: 'Avatar API Server Running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
