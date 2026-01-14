import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Boy3DAvatar from '../components/Boy3DAvatar';
import './AvatarPage.css';

const BoyAvatar = () => {
  const navigate = useNavigate();
  
  // Customization state
  const [shirtColor, setShirtColor] = useState('#4a90e2');
  const [pantsColor, setPantsColor] = useState('#2c3e50');
  const [shoesColor, setShoesColor] = useState('#34495e');
  const [outfit, setOutfit] = useState('casual');

  // Preset colors
  const shirtColors = ['#4a90e2', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
  const pantsColors = ['#2c3e50', '#34495e', '#7f8c8d', '#3498db', '#000000', '#8b4513'];
  const shoesColors = ['#34495e', '#000000', '#8b4513', '#ffffff', '#e74c3c', '#3498db'];

  return (
    <div className="avatar-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Selection
      </button>
      
      <div className="avatar-3d-container">
        <h1>Boy Avatar - 3D View</h1>
        
        <div className="avatar-display">
          <div className="avatar-3d-model">
            {/* Interactive 3D Avatar Display */}
            <Boy3DAvatar 
              shirtColor={shirtColor}
              pantsColor={pantsColor}
              shoesColor={shoesColor}
              outfit={outfit}
            />
          </div>
          
          <div className="avatar-info">
            <h2>Boy Avatar</h2>
            <div className="avatar-details">
              <p><strong>Type:</strong> Male</p>
              <p><strong>Style:</strong> {outfit.charAt(0).toUpperCase() + outfit.slice(1)}</p>
              <p><strong>Status:</strong> Active</p>
            </div>
            
            {/* Outfit Selection */}
            <div className="customization-section">
              <h3>Select Outfit</h3>
              <div className="outfit-buttons">
                <button 
                  className={`outfit-btn ${outfit === 'casual' ? 'active' : ''}`}
                  onClick={() => setOutfit('casual')}
                >
                  Casual
                </button>
                <button 
                  className={`outfit-btn ${outfit === 'formal' ? 'active' : ''}`}
                  onClick={() => setOutfit('formal')}
                >
                  Formal
                </button>
                <button 
                  className={`outfit-btn ${outfit === 'sporty' ? 'active' : ''}`}
                  onClick={() => setOutfit('sporty')}
                >
                  Sporty
                </button>
              </div>
            </div>
            
            {/* Color Customization */}
            <div className="customization-section">
              <h3>Shirt Color</h3>
              <div className="color-palette">
                {shirtColors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${shirtColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setShirtColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="customization-section">
              <h3>Pants Color</h3>
              <div className="color-palette">
                {pantsColors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${pantsColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setPantsColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="customization-section">
              <h3>Shoes Color</h3>
              <div className="color-palette">
                {shoesColors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${shoesColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setShoesColor(color)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoyAvatar;
