import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PgSearch from './pages/PgSearch';
import RoommateFinder from './pages/RoommateFinder';
import ScheduleVisitModal from './components/ScheduleVisitModal';
import PropertyDetailModal from './components/PropertyDetailModal';
import ComparisonModal from './components/ComparisonModal';
import { Layers, X, ArrowRight } from 'lucide-react';

function App() {
  // Modal states
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [scheduleProperty, setScheduleProperty] = useState(null);

  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailProperty, setDetailProperty] = useState(null);

  const [compareList, setCompareList] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

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
    <Router>
      <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onOpenScheduleModal={() => handleOpenScheduleModal()} />
        
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
          </Routes>
        </main>

        <Footer />

        {/* Global Floating Comparison Bar */}
        {compareList.length > 0 && (
          <div className="compare-floating-bar">
            <div className="flex items-center gap-2">
              <Layers size={20} color="var(--primary)" />
              <span className="font-bold text-sm">
                Comparing {compareList.length} {compareList.length === 1 ? 'Residence' : 'Residences'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {compareList.map((p) => (
                <span
                  key={p.id}
                  style={{
                    fontSize: '0.72rem',
                    background: 'rgba(255, 255, 255, 0.15)',
                    color: '#FFFFFF',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    fontWeight: 600
                  }}
                >
                  {p.name.length > 20 ? `${p.name.slice(0, 20)}...` : p.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsCompareModalOpen(true)}
                className="btn btn-coral btn-sm"
              >
                Compare Now <ArrowRight size={14} />
              </button>
              <button
                onClick={handleClearCompare}
                style={{ color: '#94A3B8', padding: '0.25rem', borderRadius: '50%' }}
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
      </div>
    </Router>
  );
}

export default App;
