import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AvatarSelector from './components/AvatarSelector';
import BoyAvatar from './pages/BoyAvatar';
import GirlAvatar from './pages/GirlAvatar';
import OutfitRecommendation from './pages/OutfitRecommendation';
import Wishlist from './pages/Wishlist';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<AvatarSelector />} />
          <Route path="/boy-avatar" element={<BoyAvatar />} />
          <Route path="/girl-avatar" element={<GirlAvatar />} />
          <Route path="/outfit-recommendation" element={<OutfitRecommendation />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
