import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Building2, 
  MapPin, 
  Calendar, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { colleges } from '../data/mockData';

const Navbar = ({ onOpenScheduleModal }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedCampus, setSelectedCampus] = useState(colleges[0]); // PICT
  const [isCampusOpen, setIsCampusOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCampusSelect = (col) => {
    setSelectedCampus(col);
    setIsCampusOpen(false);
    navigate(`/search-pg?location=${encodeURIComponent(col.name)}`);
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/search-pg?location=PICT', label: 'All Hostels & PGs' },
    { path: '/search-pg?type=Managed', label: 'Co-Living Spaces' },
    { path: '/roommates', label: 'Find Roommate' },
  ];

  return (
    <header style={{
      background: '#FFFFFF',
      borderBottom: '1px solid #E2E8F0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '4.25rem',
        maxWidth: '1240px'
      }}>
        {/* Left: Clean Brand Logo */}
        <Link 
          to="/" 
          style={{ 
            textDecoration: 'none', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.6rem' 
          }}
        >
          <div style={{
            background: '#0284C7',
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF'
          }}>
            <Building2 size={20} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', letterSpacing: '-0.02em' }}>
              Stay<span style={{ color: '#0284C7' }}>Mate</span>
            </span>
            <span style={{
              fontSize: '0.65rem',
              fontWeight: 700,
              background: '#F0F9FF',
              color: '#0369A1',
              border: '1px solid #BAE6FD',
              padding: '0.15rem 0.45rem',
              borderRadius: '4px'
            }}>
              PICT Pune
            </span>
          </div>
        </Link>

        {/* Center: Clean & Spaced Navigation Links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname + location.search === link.path || (link.path.startsWith('/search-pg') && location.pathname === '/search-pg' && !location.search.includes('type=Managed') && link.label === 'All Hostels & PGs');
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontWeight: isActive ? 700 : 600,
                  fontSize: '0.9rem',
                  color: isActive ? '#0284C7' : '#475569',
                  padding: '0.5rem 0',
                  borderBottom: isActive ? '2px solid #0284C7' : '2px solid transparent',
                  textDecoration: 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Clean Campus Switcher & Visit CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          {/* Campus Selector */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCampusOpen(!isCampusOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                padding: '0.45rem 0.75rem',
                borderRadius: '6px',
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: '#334155',
                cursor: 'pointer'
              }}
            >
              <MapPin size={13} color="#0284C7" />
              <span>{selectedCampus.shortName}</span>
              <ChevronDown size={13} color="#64748B" />
            </button>

            {isCampusOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  width: '240px',
                  background: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.15)',
                  border: '1px solid #E2E8F0',
                  padding: '0.4rem',
                  zIndex: 200
                }}
              >
                <div style={{ padding: '0.35rem 0.6rem', fontSize: '0.7rem', fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase' }}>
                  Select Campus
                </div>
                {colleges.map((col) => (
                  <button
                    key={col.id}
                    onClick={() => handleCampusSelect(col)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.65rem',
                      borderRadius: '6px',
                      background: selectedCampus.id === col.id ? '#F0F9FF' : 'transparent',
                      color: selectedCampus.id === col.id ? '#0369A1' : '#334155',
                      fontWeight: selectedCampus.id === col.id ? 700 : 500,
                      fontSize: '0.8125rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      border: 'none'
                    }}
                  >
                    <span>{col.shortName}</span>
                    <span style={{ fontSize: '0.7rem', color: '#64748B' }}>{col.area}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book Visit Button */}
          <button
            onClick={() => onOpenScheduleModal ? onOpenScheduleModal() : navigate('/search-pg')}
            style={{
              background: '#0284C7',
              color: '#FFFFFF',
              padding: '0.45rem 0.95rem',
              borderRadius: '6px',
              fontSize: '0.8125rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.15s ease'
            }}
          >
            <Calendar size={14} />
            <span>Book Visit</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
