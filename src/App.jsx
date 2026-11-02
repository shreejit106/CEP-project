import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PgSearch from './pages/PgSearch';
import RoommateFinder from './pages/RoommateFinder';
import HowItWorks from './pages/HowItWorks';
import ScheduleVisitModal from './components/ScheduleVisitModal';
import PropertyDetailModal from './components/PropertyDetailModal';
import ComparisonModal from './components/ComparisonModal';
import AuthModal from './components/AuthModal';
import UserProfileModal from './components/UserProfileModal';
import AdminMediaModal from './components/AdminMediaModal';
import { pgs } from './data/mockData';
import { Layers, X, ArrowRight } from 'lucide-react';

function AppContent() {
  // Modal states
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleProperty, setScheduleProperty] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailProperty, setDetailProperty] = useState(null);

  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  const [isAdminMediaOpen, setIsAdminMediaOpen] = useState(false);

  const handleOpenScheduleModal = (prop = null) => {
    setScheduleProperty(prop);
    setIsScheduleOpen(true);
  };

  const handleOpenDetailModal = (prop) => {
    setDetailProperty(prop);
    setIsDetailOpen(true);
  };

  const handleToggleCompare = (prop) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === prop.id);
      if (exists) {
        return prev.filter((p) => p.id !== prop.id);
      }
      if (prev.length >= 3) {
        alert('You can compare a maximum of 3 properties at a time.');
        return prev;
      }
      return [...prev, prop];
    });
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Top Navbar with the 3 Tabs + User Icon on Top Right */}
      <Navbar 
        onOpenScheduleModal={() => handleOpenScheduleModal()} 
        onOpenAdminMedia={() => setIsAdminMediaOpen(true)}
      />
      
      <main style={{ flex: 1 }}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                onOpenScheduleModal={handleOpenScheduleModal}
                onSelectProperty={handleOpenDetailModal}
              />
            } 
          />
          <Route 
            path="/search-pg" 
            element={
              <PgSearch 
                onOpenScheduleModal={handleOpenScheduleModal}
                onSelectProperty={handleOpenDetailModal}
                compareList={compareList}
                onToggleCompare={handleToggleCompare}
              />
            } 
          />
          <Route path="/roommates" element={<RoommateFinder />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
        </Routes>
      </main>

      <Footer />

      {/* Global Floating Comparison Bar */}
      {compareList.length > 0 && (
        <div className="compare-floating-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Layers size={18} color="#38bdf8" />
            <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>
              Comparing {compareList.length} {compareList.length === 1 ? 'Residence' : 'Residences'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
            {compareList.map((p) => (
              <span
                key={p.id}
                style={{
                  fontSize: '0.72rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  padding: '0.2rem 0.55rem',
                  borderRadius: '6px',
                  fontWeight: 600
                }}
              >
                {p.name.length > 18 ? `${p.name.slice(0, 18)}...` : p.name}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '8px' }}
            >
              Compare Now <ArrowRight size={13} />
            </button>
            <button
              onClick={handleClearCompare}
              style={{ color: '#94a3b8', padding: '0.25rem', borderRadius: '50%', cursor: 'pointer' }}
              title="Clear Compare"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Schedule Tour Modal */}
      <ScheduleVisitModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        preselectedProperty={scheduleProperty}
      />

      {/* Full Property Detail Modal */}
      <PropertyDetailModal
        property={detailProperty}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onScheduleVisit={(prop) => handleOpenScheduleModal(prop)}
      />

      {/* Comparison Modal */}
      <ComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        selectedProperties={compareList}
        onScheduleVisit={(prop) => handleOpenScheduleModal(prop)}
      />

      {/* User Authentication Modal (Google + Phone) */}
      <AuthModal />

      {/* User Info / Saved Properties / Booked Visits Modal */}
      <UserProfileModal 
        onOpenScheduleModal={handleOpenScheduleModal}
        onSelectProperty={handleOpenDetailModal}
      />

      {/* Admin Media Discovery Modal */}
      <AdminMediaModal
        isOpen={isAdminMediaOpen}
        onClose={() => setIsAdminMediaOpen(false)}
        hostels={pgs}
      />
    </div>
  );
}

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </Router>
  );
}

export default App;
