import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Girl3DAvatar from '../components/Girl3DAvatar';
import './AvatarPage.css';

const GirlAvatar = () => {
  const navigate = useNavigate();
  
  // Customization state
  const [dressColor, setDressColor] = useState('#e91e63');
  const [shoesColor, setShoesColor] = useState('#9c27b0');
  const [hairColor, setHairColor] = useState('#8b4513');
  const [outfit, setOutfit] = useState('dress');

  // Preset colors
  const dressColors = ['#e91e63', '#9c27b0', '#3f51b5', '#00bcd4', '#ff5722', '#f06292'];
  const shoesColors = ['#9c27b0', '#000000', '#e91e63', '#ffffff', '#ff4081', '#7b1fa2'];
  const hairColors = ['#8b4513', '#000000', '#ffd700', '#ff6347', '#4b0082', '#a0522d'];

  return (
    <div className="avatar-page">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Selection
      </button>
      
      <div className="avatar-3d-container">
        <h1>Girl Avatar - 3D View</h1>
        
        <div className="avatar-display">
          <div className="avatar-3d-model">
            {/* Interactive 3D Avatar Display */}
            <Girl3DAvatar 
              dressColor={dressColor}
              shoesColor={shoesColor}
              hairColor={hairColor}
              outfit={outfit}
            />
          </div>
          
          <div className="avatar-info">
            <h2>Girl Avatar</h2>
            <div className="avatar-details">
              <p><strong>Type:</strong> Female</p>
              <p><strong>Style:</strong> {outfit.charAt(0).toUpperCase() + outfit.slice(1)}</p>
              <p><strong>Status:</strong> Active</p>
            </div>
            
            {/* Outfit Selection */}
            <div className="customization-section">
              <h3>Select Outfit</h3>
              <div className="outfit-buttons">
                <button 
                  className={`outfit-btn ${outfit === 'dress' ? 'active' : ''}`}
                  onClick={() => setOutfit('dress')}
                >
                  Dress
                </button>
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
              </div>
            </div>
            
            {/* Color Customization */}
            <div className="customization-section">
              <h3>Outfit Color</h3>
              <div className="color-palette">
                {dressColors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${dressColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setDressColor(color)}
                  />
                ))}
              </div>
            </div>
            
            <div className="customization-section">
              <h3>Hair Color</h3>
              <div className="color-palette">
                {hairColors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${hairColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setHairColor(color)}
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

export default GirlAvatar;
