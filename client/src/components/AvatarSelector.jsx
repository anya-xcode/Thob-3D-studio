import { useNavigate } from 'react-router-dom';
import './AvatarSelector.css';
import boyImage from '../assets/boys.png';
import girlImage from '../assets/girl.png';

const AvatarSelector = () => {
  const navigate = useNavigate();

  const avatars = [
    {
      id: 1,
      type: 'boy',
      name: 'Boy Avatar',
      image: boyImage
    },
    {
      id: 2,
      type: 'girl',
      name: 'Girl Avatar',
      image: girlImage
    }
  ];

  const handleAvatarSelect = (avatar) => {
    if (avatar.type === 'boy') {
      navigate('/boy-avatar');
    } else if (avatar.type === 'girl') {
      navigate('/girl-avatar');
    }
  };

  return (
    <div className="avatar-selector-container">
      <h1>Choose Your Avatar</h1>
      
      <div className="nav-buttons">
        <button 
          className="recommendation-btn"
          onClick={() => navigate('/outfit-recommendation')}
        >
          Get Outfit Recommendations
        </button>
        <button 
          className="wishlist-heart-btn"
          onClick={() => navigate('/wishlist')}
          title="Wishlist"
        >
          ♥
        </button>
      </div>
      
      <div className="avatar-grid">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className="avatar-card"
            onClick={() => handleAvatarSelect(avatar)}
          >
            <img src={avatar.image} alt={avatar.name} />
            <h3>{avatar.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvatarSelector;
