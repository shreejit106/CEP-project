import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Building2, 
  Menu, 
  X, 
  User, 
  Calendar, 
  Users,
  HelpCircle,
  Bookmark,
  ChevronDown,
  LogOut,
  Compass,
  Camera
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const PGScoutLogo = () => (
  <div style={{
    width: '38px',
    height: '38px',
    borderRadius: '10px',
    background: 'linear-gradient(135deg, #14243A 0%, #1688E8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    boxShadow: '0 4px 12px rgba(20, 36, 58, 0.25)',
    flexShrink: 0
  }}>
    <Compass size={20} strokeWidth={2.2} />
  </div>
);

export default function Navbar({ onOpenScheduleModal: _onOpenScheduleModal, onOpenAdminMedia }) {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const { 
    user, 
    savedProperties, 
    bookedVisits, 
    openProfileWithTab,
    setIsAuthModalOpen,
    logout
  } = useUser();

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const isNavActive = (path) => {
    if (path === '/search-pg') return location.pathname === '/search-pg';
    if (path === '/roommates') return location.pathname === '/roommates';
    if (path === '/how-it-works') return location.pathname === '/how-it-works';
    return false;
  };

  return (
    <header style={{
      background: '#ffffff',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
    }}>
      <div className="container" style={{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        
        {/* PG Scout Brand Identity */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <PGScoutLogo />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: '1.25rem',
                color: '#14243A',
                letterSpacing: '-0.02em',
                lineHeight: 1
              }}>
                PG<span style={{ color: '#1688E8' }}>Scout</span>
              </span>
              <span style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                background: '#DDF5E9',
                color: '#0D6838',
                padding: '0.12rem 0.4rem',
                borderRadius: '4px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase'
              }}>
                PICT
              </span>
            </div>
            <span style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600, display: 'block', marginTop: '2px' }}>
              Student Housing & Roommates
            </span>
          </div>
        </Link>

        {/* Desktop Primary Nav Links */}
        <nav aria-label="Primary navigation" className="desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          
          {/* 1. Find PGs */}
          <Link
            to="/search-pg"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.86rem',
              fontWeight: isNavActive('/search-pg') ? 800 : 600,
              color: isNavActive('/search-pg') ? '#1688E8' : '#334155',
              background: isNavActive('/search-pg') ? '#EFF6FF' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.18s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            onMouseEnter={e => {
              if (!isNavActive('/search-pg')) {
                e.currentTarget.style.color = '#1688E8';
                e.currentTarget.style.background = '#F8FAFC';
              }
            }}
            onMouseLeave={e => {
              if (!isNavActive('/search-pg')) {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Building2 size={15} color={isNavActive('/search-pg') ? '#1688E8' : '#64748B'} />
            <span>Find PGs</span>
          </Link>

          {/* 2. Find Roommates */}
          <Link
            to="/roommates"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.86rem',
              fontWeight: isNavActive('/roommates') ? 800 : 600,
              color: isNavActive('/roommates') ? '#1688E8' : '#334155',
              background: isNavActive('/roommates') ? '#EFF6FF' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.18s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            onMouseEnter={e => {
              if (!isNavActive('/roommates')) {
                e.currentTarget.style.color = '#1688E8';
                e.currentTarget.style.background = '#F8FAFC';
              }
            }}
            onMouseLeave={e => {
              if (!isNavActive('/roommates')) {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <Users size={15} color={isNavActive('/roommates') ? '#1688E8' : '#64748B'} />
            <span>Find Roommates</span>
          </Link>

          {/* 3. How It Works */}
          <Link
            to="/how-it-works"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.86rem',
              fontWeight: isNavActive('/how-it-works') ? 800 : 600,
              color: isNavActive('/how-it-works') ? '#1688E8' : '#334155',
              background: isNavActive('/how-it-works') ? '#EFF6FF' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.18s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            onMouseEnter={e => {
              if (!isNavActive('/how-it-works')) {
                e.currentTarget.style.color = '#1688E8';
                e.currentTarget.style.background = '#F8FAFC';
              }
            }}
            onMouseLeave={e => {
              if (!isNavActive('/how-it-works')) {
                e.currentTarget.style.color = '#334155';
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <HelpCircle size={15} color={isNavActive('/how-it-works') ? '#1688E8' : '#64748B'} />
            <span>How It Works</span>
          </Link>

          {/* 4. Saved Action */}
          <button
            onClick={() => openProfileWithTab('saved')}
            title="View saved PGs & Roommates"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.86rem',
              fontWeight: 600,
              color: '#334155',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#1688E8';
              e.currentTarget.style.background = '#F8FAFC';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#334155';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Bookmark size={15} color="#64748B" />
            <span>Saved</span>
            {savedProperties.length > 0 && (
              <span style={{
                background: '#EFF6FF',
                color: '#1688E8',
                fontWeight: 800,
                fontSize: '0.72rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '9999px',
                border: '1px solid #BFDBFE'
              }}>
                {savedProperties.length}
              </span>
            )}
          </button>

          {/* 5. Bookings Action */}
          <button
            onClick={() => openProfileWithTab('visits')}
            title="View booked visits & tours"
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.86rem',
              fontWeight: 600,
              color: '#334155',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.18s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#1688E8';
              e.currentTarget.style.background = '#F8FAFC';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = '#334155';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <Calendar size={15} color="#64748B" />
            <span>Bookings</span>
            {bookedVisits.length > 0 && (
              <span style={{
                background: '#DDF5E9',
                color: '#0D6838',
                fontWeight: 800,
                fontSize: '0.72rem',
                padding: '0.1rem 0.45rem',
                borderRadius: '9999px',
                border: '1px solid #A7F3D0'
              }}>
                {bookedVisits.length}
              </span>
            )}
          </button>
        </nav>

        {/* Right Section: User Avatar & Profile Dropdown */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          
          <div style={{ position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => {
                if (user?.isLoggedIn) {
                  setDropdownOpen(!dropdownOpen);
                } else {
                  setIsAuthModalOpen(true);
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.55rem',
                background: dropdownOpen ? '#EFF6FF' : '#F8FAFC',
                border: `1.5px solid ${dropdownOpen ? '#1688E8' : '#E2E8F0'}`,
                borderRadius: '10px',
                padding: '0.35rem 0.65rem 0.35rem 0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
              }}
              onMouseEnter={e => {
                if (!dropdownOpen) e.currentTarget.style.borderColor = '#CBD5E1';
              }}
              onMouseLeave={e => {
                if (!dropdownOpen) e.currentTarget.style.borderColor = '#E2E8F0';
              }}
            >
              {/* User Avatar */}
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#14243A',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: '0.75rem',
                overflow: 'hidden'
              }}>
                {user?.isLoggedIn ? (
                  user?.avatar ? (
                    <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    user.name.slice(0, 2).toUpperCase()
                  )
                ) : (
                  <User size={15} color="#94A3B8" />
                )}
              </div>

              {/* Name & Role */}
              <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#14243A' }}>
                  {user?.isLoggedIn ? user.name.split(' ')[0] : 'Sign In'}
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>
                  {user?.isLoggedIn ? (user.branch?.includes('Computer') ? 'PICT CS' : 'PICT Student') : 'Guest'}
                </div>
              </div>

              <ChevronDown size={14} color="#64748B" style={{
                transform: dropdownOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s'
              }} />
            </button>

            {/* Profile Dropdown Menu */}
            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '230px',
                background: '#ffffff',
                borderRadius: '12px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 12px 30px rgba(20, 36, 58, 0.12)',
                padding: '0.5rem',
                zIndex: 200,
                animation: 'slideDown 0.18s ease-out'
              }}>
                {/* User Info Card inside dropdown */}
                <div style={{
                  padding: '0.65rem 0.75rem',
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '0.35rem'
                }}>
                  <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#14243A' }}>
                    {user?.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                    {user?.phone || user?.email}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#1688E8', fontWeight: 700, marginTop: '3px' }}>
                    {user?.college} · {user?.year}
                  </div>
                </div>

                {/* Dropdown Options */}
                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    openProfileWithTab('saved');
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.82rem',
                    color: '#334155',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Bookmark size={14} color="#1688E8" /> Saved PGs
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{savedProperties.length}</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    openProfileWithTab('visits');
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.82rem',
                    color: '#334155',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Calendar size={14} color="#1688E8" /> Booked Tours
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94A3B8' }}>{bookedVisits.length}</span>
                </button>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    openProfileWithTab('profile');
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.82rem',
                    color: '#334155',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <User size={14} color="#64748B" /> Edit Profile Details
                </button>

                {onOpenAdminMedia && (
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      onOpenAdminMedia();
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '0.82rem',
                      color: '#0284C7',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F0F9FF'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <Camera size={14} color="#0284C7" /> Automated Media Hub
                  </button>
                )}

                <div style={{ height: '1px', background: '#F1F5F9', margin: '0.35rem 0' }} />

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  style={{
                    width: '100%',
                    textAlign: 'left',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '6px',
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.82rem',
                    color: '#EF4444',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger toggle */}
          <button
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileOpen(!mobileOpen)}
            className="mobile-menu-btn"
            style={{
              padding: '0.4rem',
              borderRadius: '8px',
              border: '1px solid #E2E8F0',
              background: '#F8FAFC',
              color: '#14243A',
              display: 'none',
              cursor: 'pointer'
            }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileOpen && (
        <div style={{
          position: 'absolute',
          top: '70px',
          left: 0,
          right: 0,
          background: '#ffffff',
          borderBottom: '2px solid #E2E8F0',
          padding: '1.25rem 1.5rem',
          boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
          zIndex: 99
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Link
              to="/search-pg"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: isNavActive('/search-pg') ? '#EFF6FF' : '#F8FAFC',
                color: isNavActive('/search-pg') ? '#1688E8' : '#14243A',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Building2 size={16} /> Find PGs
            </Link>

            <Link
              to="/roommates"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: isNavActive('/roommates') ? '#EFF6FF' : '#F8FAFC',
                color: isNavActive('/roommates') ? '#1688E8' : '#14243A',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Users size={16} /> Find Roommates
            </Link>

            <Link
              to="/how-it-works"
              onClick={() => setMobileOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: isNavActive('/how-it-works') ? '#EFF6FF' : '#F8FAFC',
                color: isNavActive('/how-it-works') ? '#1688E8' : '#14243A',
                fontWeight: 700,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <HelpCircle size={16} /> How It Works
            </Link>

            <button
              onClick={() => {
                setMobileOpen(false);
                openProfileWithTab('saved');
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: '#F8FAFC',
                color: '#14243A',
                fontWeight: 700,
                border: 'none',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bookmark size={16} /> Saved Stays
              </span>
              <span style={{ background: '#EFF6FF', color: '#1688E8', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem' }}>
                {savedProperties.length}
              </span>
            </button>

            <button
              onClick={() => {
                setMobileOpen(false);
                openProfileWithTab('visits');
              }}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: '#F8FAFC',
                color: '#14243A',
                fontWeight: 700,
                border: 'none',
                textAlign: 'left',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} /> Booked Tours
              </span>
              <span style={{ background: '#DDF5E9', color: '#0D6838', padding: '0.1rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem' }}>
                {bookedVisits.length}
              </span>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
