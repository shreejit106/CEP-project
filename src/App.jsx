import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PgSearch from './pages/PgSearch';
import RoommateFinder from './pages/RoommateFinder';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search-pg" element={<PgSearch />} />
            <Route path="/roommates" element={<RoommateFinder />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
