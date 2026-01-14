import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const navigate = useNavigate();
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    const saved = localStorage.getItem('outfitWishlist');
    if (saved) {
      setWishlistItems(JSON.parse(saved));
    }
  };

  const handleRemoveItem = (id) => {
    const updated = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updated);
    localStorage.setItem('outfitWishlist', JSON.stringify(updated));
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all wishlist items?')) {
      setWishlistItems([]);
      localStorage.removeItem('outfitWishlist');
    }
  };

  return (
    <div className="wishlist-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="wishlist-container">
        <h1>My Wishlist</h1>
        <p className="subtitle">Your saved outfit recommendations</p>

        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <h2>Your wishlist is empty</h2>
            <p>Add outfit recommendations to your wishlist to view them here</p>
            <button 
              className="go-recommendations-btn"
              onClick={() => navigate('/outfit-recommendation')}
            >
              Get Recommendations
            </button>
          </div>
        ) : (
          <>
            <div className="wishlist-header">
              <p>{wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} saved</p>
              <button className="clear-all-btn" onClick={handleClearAll}>
                Clear All
              </button>
            </div>

            <div className="wishlist-grid">
              {wishlistItems.map((item) => (
                <div key={item.id} className="wishlist-item">
                  <div className="item-header">
                    <h3>Recommendation #{item.id}</h3>
                    <button 
                      className="remove-btn"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      ×
                    </button>
                  </div>

                  <div className="item-details">
                    <p><strong>Gender:</strong> {item.gender}</p>
                    <p><strong>Skin Tone:</strong> {item.skinTone}</p>
                    <p><strong>Height:</strong> {item.height}</p>
                    <p><strong>Body Type:</strong> {item.bodyType}</p>
                    <p><strong>Occasion:</strong> {item.occasion}</p>
                    <p><strong>Season:</strong> {item.season}</p>
                  </div>

                  {item.recommendations && (
                    <>
                      <div className="item-colors">
                        <h4>Recommended Colors</h4>
                        <div className="color-swatches">
                          {item.recommendations.colors.slice(0, 5).map((color, index) => (
                            <div key={index} className="color-swatch-small">
                              <div 
                                className="color-circle-small" 
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              ></div>
                              <span>{color.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="item-styles">
                        <h4>Outfit Styles</h4>
                        <ul>
                          {item.recommendations.styles.map((style, index) => (
                            <li key={index}>{style.name}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="item-date">
                        <small>Added on {new Date(item.addedAt).toLocaleDateString()}</small>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
