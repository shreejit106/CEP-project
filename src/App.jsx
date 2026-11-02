import { useState, Component } from 'react';
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

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error('App ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          background: '#f8fafc',
          color: '#0f172a',
          fontFamily: "'Inter', sans-serif",
          textAlign: 'center'
        }}>
          <div style={{
            background: '#ffffff',
            padding: '2.5rem',
            borderRadius: '18px',
            boxShadow: '0 12px 36px rgba(0,0,0,0.08)',
            maxWidth: '520px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.6rem' }}>
              Something went wrong loading PGScout
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.5rem', lineHeight: 1.6 }}>
              {this.state.error?.message || 'An unexpected rendering error occurred. Please refresh or return to the home page.'}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
              <button
                onClick={() => window.location.reload()}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '10px',
                  background: '#0284c7',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Reload Page
              </button>
              <button
                onClick={() => {
                  this.setState({ hasError: false });
                  window.location.href = '/';
                }}
                style={{
                  padding: '0.65rem 1.4rem',
                  borderRadius: '10px',
                  background: '#f1f5f9',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Go to Home
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

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
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </UserProvider>
    </Router>
  );
}

export default App;
