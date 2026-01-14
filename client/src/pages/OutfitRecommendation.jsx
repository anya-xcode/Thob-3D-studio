import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OutfitRecommendation.css';

const OutfitRecommendation = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const [formData, setFormData] = useState({
    gender: '',
    skinTone: '',
    height: '',
    bodyType: '',
    occasion: '',
    season: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Use relative URL for Vercel deployment
      const apiUrl = window.location.hostname === 'localhost' 
        ? 'http://localhost:5000/api/recommend-outfit'
        : '/api/recommend-outfit';
        
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      alert('Failed to get recommendations. Please make sure the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      gender: '',
      skinTone: '',
      height: '',
      bodyType: '',
      occasion: '',
      season: ''
    });
    setRecommendations(null);
    setIsWishlisted(false);
  };

  const handleAddToWishlist = () => {
    // Store in localStorage
    const wishlist = JSON.parse(localStorage.getItem('outfitWishlist') || '[]');
    const newItem = {
      id: Date.now(),
      ...formData,
      recommendations,
      addedAt: new Date().toISOString()
    };
    wishlist.push(newItem);
    localStorage.setItem('outfitWishlist', JSON.stringify(wishlist));
    setIsWishlisted(true);
    alert('Added to wishlist!');
  };

  const handleApplyToAvatar = () => {
    if (recommendations) {
      // Navigate to avatar page with recommendations
      const avatarPath = formData.gender === 'male' ? '/boy-avatar' : '/girl-avatar';
      navigate(avatarPath, { state: { recommendations } });
    }
  };

  return (
    <div className="recommendation-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="recommendation-container">
        <h1>Outfit Recommendation</h1>
        <p className="subtitle">Get personalized outfit suggestions based on your features</p>

        <div className="content-grid">
          {/* Form Section */}
          <div className="form-section">
            <h2>Your Details</h2>
            <form onSubmit={handleSubmit}>
              
              <div className="form-group">
                <label htmlFor="gender">
                  Gender
                </label>
                <select 
                  id="gender" 
                  name="gender" 
                  value={formData.gender}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="skinTone">
                  Skin Tone
                </label>
                <select 
                  id="skinTone" 
                  name="skinTone" 
                  value={formData.skinTone}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Skin Tone</option>
                  <option value="fair">Fair</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="tan">Tan</option>
                  <option value="dark">Dark</option>
                  <option value="deep">Deep</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="height">
                  Height
                </label>
                <select 
                  id="height" 
                  name="height" 
                  value={formData.height}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Height</option>
                  <option value="short">Short (Under 5'4" / 163cm)</option>
                  <option value="average">Average (5'4" - 5'10" / 163-178cm)</option>
                  <option value="tall">Tall (Over 5'10" / 178cm)</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="bodyType">
                  Body Type
                </label>
                <select 
                  id="bodyType" 
                  name="bodyType" 
                  value={formData.bodyType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Body Type</option>
                  <option value="slim">Slim</option>
                  <option value="average">Average</option>
                  <option value="athletic">Athletic</option>
                  <option value="heavyset">Heavyset</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="occasion">
                  Occasion
                </label>
                <select 
                  id="occasion" 
                  name="occasion" 
                  value={formData.occasion}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Occasion</option>
                  <option value="casual">Casual</option>
                  <option value="formal">Formal</option>
                  <option value="business">Business</option>
                  <option value="party">Party</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="season">
                  Season
                </label>
                <select 
                  id="season" 
                  name="season" 
                  value={formData.season}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Season</option>
                  <option value="all">All Seasons</option>
                  <option value="spring">Spring</option>
                  <option value="summer">Summer</option>
                  <option value="fall">Fall</option>
                  <option value="winter">Winter</option>
                </select>
              </div>

              <div className="button-group">
                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? 'Analyzing...' : 'Get Recommendations'}
                </button>
                <button type="button" className="reset-btn" onClick={handleReset}>
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Results Section */}
          <div className="results-section">
            {loading && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Analyzing your preferences...</p>
              </div>
            )}

            {!loading && !recommendations && (
              <div className="empty-state">
                <div className="empty-icon"></div>
                <h3>Ready for Recommendations</h3>
                <p>Fill out the form and click "Get Recommendations" to see personalized outfit suggestions</p>
              </div>
            )}

            {!loading && recommendations && (
              <div className="recommendations-display">
                <h2>Your Personalized Recommendations</h2>
                
                <div className="recommendation-card">
                  <h3>Recommended Colors</h3>
                  <div className="color-swatches">
                    {recommendations.colors.map((color, index) => (
                      <div key={index} className="color-swatch">
                        <div 
                          className="color-circle" 
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        ></div>
                        <span>{color.name}</span>
                      </div>
                    ))}
                  </div>
                  <p className="reasoning">{recommendations.colorReasoning}</p>
                </div>

                <div className="recommendation-card">
                  <h3>Outfit Styles</h3>
                  <div className="style-list">
                    {recommendations.styles.map((style, index) => (
                      <div key={index} className="style-item">
                        <div className="style-details">
                          <strong>{style.name}</strong>
                          <p>{style.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="recommendation-card">
                  <h3>Styling Tips</h3>
                  <ul className="tips-list">
                    {recommendations.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                <div className="action-buttons">
                  <button 
                    className="wishlist-btn" 
                    onClick={handleAddToWishlist}
                    disabled={isWishlisted}
                  >
                    {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
                  </button>
                  <button className="apply-btn" onClick={handleApplyToAvatar}>
                    Apply to Avatar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitRecommendation;
