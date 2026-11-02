import { Link } from 'react-router-dom';
import { Building2, MapPin, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const Footer = () => (
  <footer style={{
    background: '#ffffff',
    borderTop: '1.5px solid #bae6fd',
    padding: '3rem 0 2rem',
    position: 'relative'
  }}>
    <div className="container">
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Brand Column */}
        <div>
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
            <div style={{
              background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 100%)',
              width: '36px',
              height: '36px',
              borderRadius: '10px 10px 10px 3px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: 'rotate(-2deg)'
            }}>
              <HomeIcon />
            </div>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: '#0369a1' }}>
              StayMate<span style={{ color: '#0284c7' }}> PICT</span>
            </span>
          </Link>
          <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.65, maxWidth: '280px', marginBottom: '1rem' }}>
            Hyperlocal student accommodation and roommate matching platform built for PICT Pune engineering students. Zero brokerage.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.72rem', color: '#0284c7', background: '#f0f7ff', border: '1px solid #bae6fd', padding: '0.25rem 0.65rem', borderRadius: '6px', fontWeight: 700 }}>
            <MapPin size={12} /> Dhankawadi & Katraj, Pune 411046
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.9rem' }}>
            Explore Stays
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#64748b' }}>
            <li><Link to="/search-pg?location=PICT" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0284c7'} onMouseLeave={e => e.target.style.color = '#64748b'}>All PICT Hostels</Link></li>
            <li><Link to="/search-pg?type=independent" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0284c7'} onMouseLeave={e => e.target.style.color = '#64748b'}>Independent Boys Hostels</Link></li>
            <li><Link to="/search-pg?type=managed" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0284c7'} onMouseLeave={e => e.target.style.color = '#64748b'}>Managed Co-Living</Link></li>
            <li><Link to="/roommates" style={{ transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#0284c7'} onMouseLeave={e => e.target.style.color = '#64748b'}>Roommate Matcher</Link></li>
          </ul>
        </div>

        {/* Popular Hostels near PICT */}
        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.9rem' }}>
            Popular near PICT
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.82rem', color: '#64748b' }}>
            <li>Gurukul Boy's Hostel (600m)</li>
            <li>Shri Swami Samartha (750m)</li>
            <li>Shreeram Hostel (850m)</li>
            <li>Casa Living Katraj</li>
            <li>Stanza Living Girona</li>
          </ul>
        </div>

        {/* Student Trust */}
        <div>
          <h4 style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.9rem' }}>
            Student Trust
          </h4>
          <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6, marginBottom: '0.75rem' }}>
            All phone numbers belong directly to local property owners. Schedule free in-person visits anytime.
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#059669', padding: '0.3rem 0.65rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 800 }}>
            <ShieldCheck size={14} /> 100% Zero Brokerage
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid #e0f2fe',
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem',
        fontSize: '0.78rem',
        color: '#64748b'
      }}>
        <div>
          Made with ❤️ for PICTians. Community Engagement Project (CEP).
        </div>
        <div>
          © 2026 StayMate PICT · Dhankawadi, Katraj, Pune
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
