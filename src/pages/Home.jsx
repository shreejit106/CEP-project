import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Star, Heart, ArrowRight,
  ChevronRight, Layers, Bed, Wifi,
  Users, BookOpen, ShieldCheck, Calendar, PhoneCall, Check,
  Sparkles, HelpCircle, Utensils
} from 'lucide-react';
import { useScrollReveal } from '../utils/motion';
import { pictHostels } from '../data/pictHostelsData';
import { useUser } from '../context/UserContext';

/* ── SVG Icons ─── */
const SparkleIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.552 4.115 1.52 5.847L.057 23.43l5.73-1.502A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.876 0-3.63-.49-5.147-1.346l-.369-.218-3.4.892.907-3.316-.237-.384A9.96 9.96 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const CheckIcon = ({ size = 11, color = '#0284c7' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const StarIcon = ({ filled, size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? '#f59e0b' : 'none'} stroke="#f59e0b" strokeWidth="2">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);

/* ── Property Card Component ─── */
function PropertyCard({ property, onSelect, onOpenScheduleModal }) {
  const { toggleSaveProperty, isPropertySaved } = useUser();
  const [sharing, setSharing] = useState('double');
  const [inCompare, setInCompare] = useState(false);
  const [imgHover, setImgHover] = useState(false);

  const isSaved = isPropertySaved(property.id);
  const isManaged = property.category === 'managed-coliving' || property.type === 'Managed Co-Living';
  const roomData = property.rooms?.[sharing] || property.rooms?.double || property.rooms?.triple;
  const walkTime = property.walkingTime || (typeof property.distance === 'number' ? `${Math.round(property.distance * 12)} min walk` : '6 min walk');

  return (
    <div
      className="spotlight-card"
      style={{
        background: '#ffffff',
        borderRadius: '18px',
        border: '1.5px solid #e0f2fe',
        boxShadow: '0 4px 18px rgba(2, 132, 199, 0.08)',
        overflow: 'hidden',
        transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(2, 132, 199, 0.16)';
        e.currentTarget.style.borderColor = '#bae6fd';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 18px rgba(2, 132, 199, 0.08)';
        e.currentTarget.style.borderColor = '#e0f2fe';
      }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
    >
      {/* Property Photo */}
      <div
        style={{ position: 'relative', height: '220px', overflow: 'hidden', background: '#0f172a' }}
        onMouseEnter={() => setImgHover(true)}
        onMouseLeave={() => setImgHover(false)}
      >
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=800&auto=format&fit=crop'}
          alt={`${property.name} PICT student residence`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease-out',
            transform: imgHover ? 'scale(1.06)' : 'scale(1)'
          }}
        />
        
        {/* Soft gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.55) 0%, transparent 50%)' }} />

        {/* PICT Verified Badge */}
        <div style={{
          position: 'absolute',
          top: '0.75rem',
          left: '0.75rem',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(8px)',
          color: '#0369a1',
          fontSize: '0.66rem',
          fontWeight: 800,
          padding: '0.22rem 0.6rem',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem',
          border: '1px solid #bae6fd',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <CheckIcon size={10} color="#0284c7" /> PICT VERIFIED
        </div>

        {/* Favorite Heart Save Button (Saves to User Profile) */}
        <button
          aria-label={isSaved ? `Remove ${property.name} from saved` : `Save ${property.name}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveProperty(property);
          }}
          title={isSaved ? "Saved! Click to remove" : "Save this property"}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: isSaved ? '#e0f2fe' : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: isSaved ? '1.5px solid #0284c7' : '1px solid rgba(255, 255, 255, 0.8)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart
            size={16}
            fill={isSaved ? '#0284c7' : 'none'}
            stroke={isSaved ? '#0284c7' : '#475569'}
            strokeWidth={2.2}
          />
        </button>

        {/* Walking distance pill */}
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          left: '0.75rem',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(6px)',
          color: '#ffffff',
          fontSize: '0.72rem',
          fontWeight: 700,
          padding: '0.2rem 0.6rem',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.3rem'
        }}>
          <MapPin size={11} color="#38bdf8" />
          <span>{walkTime} to PICT Gate</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        
        {/* Type & Star Rating */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <span style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: isManaged ? '#0284c7' : '#059669',
            background: isManaged ? '#e0f2fe' : '#ecfdf5',
            padding: '0.15rem 0.5rem',
            borderRadius: '4px'
          }}>
            {isManaged ? 'Managed Co-Living' : 'Independent Hostel'}
          </span>

          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>
            <StarIcon filled size={13} /> {property.rating || 4.7}
            <span style={{ fontWeight: 500, color: '#64748b' }}>({property.reviewCount || 34})</span>
          </span>
        </div>

        {/* Property Name */}
        <h3 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: '1.35rem',
          fontWeight: 400,
          color: '#0f172a',
          margin: '0.25rem 0 0.35rem',
          lineHeight: 1.2
        }}>
          {property.name}
        </h3>

        {/* Landmark */}
        <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.85rem' }}>
          📍 {property.landmark || property.address || 'Trimurti Chowk, Katraj'}
        </div>

        {/* Dynamic Sharing Selector (Single / Double / Triple) */}
        <div style={{
          background: '#f0f7ff',
          borderRadius: '10px',
          padding: '0.3rem',
          marginBottom: '0.85rem',
          display: 'flex',
          gap: '0.25rem',
          border: '1px solid #bae6fd'
        }}>
          {['single', 'double', 'triple'].map(key => {
            const r = property.rooms?.[key];
            if (!r) return null;
            const sel = sharing === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSharing(key)}
                style={{
                  flex: 1,
                  padding: '0.4rem 0.2rem',
                  borderRadius: '7px',
                  background: sel ? '#ffffff' : 'transparent',
                  border: sel ? '1.5px solid #0284c7' : '1.5px solid transparent',
                  color: sel ? '#0284c7' : '#64748b',
                  fontFamily: "'Manrope', sans-serif",
                  fontWeight: sel ? 800 : 600,
                  fontSize: '0.72rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  boxShadow: sel ? '0 2px 6px rgba(2, 132, 199, 0.15)' : 'none',
                  transition: 'all 0.2s'
                }}
              >
                <div>{key}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 800 }}>
                  ₹{(r.price / 1000).toFixed(1)}k
                </div>
              </button>
            );
          })}
        </div>

        {/* Price & Beds Left Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
          <div>
            <span style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', fontFamily: "'Manrope', sans-serif" }}>
              ₹{roomData?.price?.toLocaleString('en-IN') || '6,500'}
            </span>
            <span style={{ fontSize: '0.72rem', color: '#64748b', marginLeft: '4px' }}>/ month</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.76rem',
            fontWeight: 700,
            color: '#059669',
            background: '#ecfdf5',
            padding: '0.2rem 0.55rem',
            borderRadius: '6px'
          }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }} />
            <span>{roomData?.vacancies || 3} beds available</span>
          </div>
        </div>

        {/* Amenities */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.1rem' }}>
          {(property.facilities || ['Meals included', 'Wi-Fi', 'Study room']).slice(0, 3).map((f, i) => (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              background: '#f0f7ff',
              border: '1px solid #bae6fd',
              color: '#0369a1',
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '0.18rem 0.5rem',
              borderRadius: '5px'
            }}>
              <CheckIcon size={10} color="#0284c7" /> {f}
            </span>
          ))}
        </div>

        {/* Action Buttons: View Details & Schedule Tour & WhatsApp */}
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onSelect && onSelect(property)}
            className="btn btn-outline btn-sm"
            style={{ flex: 1, borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700 }}
          >
            Details <ArrowRight size={13} />
          </button>

          <button
            onClick={() => onOpenScheduleModal && onOpenScheduleModal(property)}
            className="btn btn-primary btn-sm"
            style={{ borderRadius: '10px', fontSize: '0.82rem', padding: '0.45rem 0.85rem' }}
          >
            <Calendar size={13} /> Visit
          </button>

          <a
            href={`https://wa.me/${(property.contactNumber || '917798725326').replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp"
            style={{
              width: '38px',
              height: '36px',
              background: '#ecfdf5',
              border: '1.5px solid #a7f3d0',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#059669',
              cursor: 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#25d366'; e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#25d366'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#ecfdf5'; e.currentTarget.style.color = '#059669'; e.currentTarget.style.borderColor = '#a7f3d0'; }}
          >
            <WhatsAppIcon />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Main Home Component ─── */
const Home = ({ onOpenScheduleModal, onSelectProperty }) => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [budget, setBudget] = useState(8500);
  const [matchScore, setMatchScore] = useState(88);
  const propertiesSectionRef = useRef(null);
  useScrollReveal();

  const handleBudgetChange = (val) => {
    setBudget(val);
    const pct = (val - 5000) / (14000 - 5000);
    setMatchScore(Math.round(72 + pct * 24));
  };

  const budgetPct = Math.round(((budget - 5000) / (14000 - 5000)) * 100);

  const scrollToProperties = () => {
    propertiesSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Combine verified pict hostels
  const displayedProperties = pictHostels.filter(p => {
    if (activeCategory === 'independent') return p.type === 'Local Independent Hostel';
    if (activeCategory === 'managed') return p.type === 'Managed Co-Living';
    return true;
  });

  return (
    <div style={{ background: '#f0f7ff', minHeight: '100vh' }}>

      {/* ═══════════ HERO: LIGHT BLUE PALETTE ═══════════ */}
      <section style={{
        background: 'linear-gradient(145deg, #0369a1 0%, #0284c7 50%, #38bdf8 100%)',
        minHeight: '620px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 0 70px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Light Blue Geometric Accents */}
        <div style={{ position: 'absolute', top: '10%', right: '8%', width: '280px', height: '280px', borderRadius: '50%', border: '1.5px solid rgba(255, 255, 255, 0.18)', animation: 'spin 25s linear infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '15%', right: '12%', width: '180px', height: '180px', borderRadius: '50%', border: '1.5px dashed rgba(255, 255, 255, 0.25)', animation: 'spinReverse 18s linear infinite', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 65%)', pointerEvents: 'none' }} />

        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          
          {/* Eyebrow Label */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            borderRadius: '9999px',
            padding: '0.35rem 0.95rem',
            fontSize: '0.72rem',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
            animation: 'slideDown 0.5s ease-out both'
          }}>
            <SparkleIcon /> BUILT BY STUDENTS, FOR PICT STUDENTS
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: 'clamp(2.7rem, 6vw, 4.6rem)',
            fontFamily: "'DM Serif Display', serif",
            fontWeight: 400,
            lineHeight: 1.05,
            color: '#ffffff',
            maxWidth: '820px',
            margin: '0 auto 1.25rem',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.15)'
          }}>
            Your next <em style={{ fontStyle: 'italic', textDecoration: 'underline', textUnderlineOffset: '6px' }}>home</em>
            <br />
            is closer than class.
          </h1>

          {/* Hero Subtitle */}
          <p style={{
            fontSize: '1.05rem',
            color: '#e0f2fe',
            maxWidth: '580px',
            margin: '0 auto 2.25rem',
            lineHeight: 1.7,
            fontWeight: 500
          }}>
            Verified student hostels, compatible roommates, and zero brokerage — all within 4–9 mins walking distance of PICT Pune.
          </p>

          {/* Floating Search Console */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            boxShadow: '0 25px 60px rgba(3, 105, 161, 0.28)',
            maxWidth: '960px',
            margin: '0 auto',
            border: '2px solid #bae6fd',
            overflow: 'hidden',
            animation: 'slideUp 0.6s ease-out both'
          }}>
            {/* Search Category Tabs */}
            <div style={{
              display: 'flex',
              padding: '0.5rem 0.75rem 0',
              borderBottom: '1px solid #e0f2fe',
              background: '#f8fbff',
              gap: '0.25rem'
            }}>
              {[
                { id: 'all', label: 'All Stays (Hostels & Co-Living)' },
                { id: 'independent', label: 'Independent Boys Hostels' },
                { id: 'managed', label: 'Managed Co-Living' }
              ].map((tab) => {
                const sel = activeCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCategory(tab.id)}
                    style={{
                      padding: '0.55rem 1.1rem',
                      borderRadius: '8px 8px 0 0',
                      fontFamily: "'Manrope', sans-serif",
                      fontWeight: sel ? 800 : 600,
                      fontSize: '0.82rem',
                      color: sel ? '#0284c7' : '#64748b',
                      background: sel ? '#ffffff' : 'transparent',
                      border: 'none',
                      borderBottom: sel ? '2.5px solid #0284c7' : '2.5px solid transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Search Fields Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 1px 1fr 1px 1fr 1px auto',
              alignItems: 'center',
              padding: '0.75rem 1rem'
            }}>
              {/* Field 1: Near */}
              <div style={{ padding: '0.5rem 0.85rem', textAlign: 'left' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={11} /> Near
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  PICT Campus, Pune
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', background: '#e0f2fe' }} />

              {/* Field 2: Sharing */}
              <div style={{ padding: '0.5rem 0.85rem', textAlign: 'left' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Bed size={11} /> Sharing
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  Any (1, 2, 3 Sharing)
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', background: '#e0f2fe' }} />

              {/* Field 3: Budget */}
              <div style={{ padding: '0.5rem 0.85rem', textAlign: 'left' }}>
                <div style={{ fontSize: '0.65rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  Monthly Budget
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', marginTop: '2px' }}>
                  ₹5,000 – ₹12,000
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', background: '#e0f2fe' }} />

              {/* Search CTA */}
              <div style={{ padding: '0.5rem 0.5rem 0.5rem 1rem' }}>
                <button
                  onClick={scrollToProperties}
                  className="btn btn-primary"
                  style={{
                    padding: '0.8rem 1.6rem',
                    borderRadius: '12px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  <Search size={16} /> Explore Stays
                </button>
              </div>
            </div>
          </div>

          {/* Social Proof Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            marginTop: '2rem',
            color: '#ffffff',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ display: 'flex' }}>
                {['RS', 'AK', 'PM', 'YT'].map((init, i) => (
                  <div key={init} style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: ['#ffffff', '#e0f2fe', '#bae6fd', '#38bdf8'][i],
                    color: '#0369a1',
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #0284c7',
                    marginLeft: i === 0 ? 0 : '-8px',
                    zIndex: 4 - i
                  }}>
                    {init}
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>1,200+ PICTians</div>
                <div style={{ fontSize: '0.72rem', color: '#e0f2fe' }}>Found their stay here</div>
              </div>
            </div>

            <div style={{ width: '1px', height: '30px', background: 'rgba(255, 255, 255, 0.3)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.88rem', fontWeight: 800 }}>
              <ShieldCheck size={18} color="#ffffff" />
              <span>Zero Brokerage. Always.</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PROPERTIES SECTION ═══════════ */}
      <section ref={propertiesSectionRef} style={{ padding: '70px 0 80px' }}>
        <div className="container">
          
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#0284c7',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.4rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}>
                <span style={{ width: '20px', height: '2.5px', background: '#0284c7', borderRadius: '2px' }} />
                Handpicked Near PICT Campus
              </div>

              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.7rem)',
                fontWeight: 400,
                color: '#0f172a',
                lineHeight: 1.15
              }}>
                Walk to class. Not miles.
              </h2>
              <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '4px' }}>
                Verified student hostels with direct owner contact in Trimurti Chowk, Dhankawadi & Katraj
              </p>
            </div>

            <button
              onClick={() => navigate('/search-pg?location=PICT')}
              style={{
                background: '#e0f2fe',
                border: '1.5px solid #bae6fd',
                color: '#0284c7',
                padding: '0.55rem 1.25rem',
                borderRadius: '10px',
                fontWeight: 800,
                fontSize: '0.85rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#0284c7'; e.currentTarget.style.color = '#ffffff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#e0f2fe'; e.currentTarget.style.color = '#0284c7'; }}
            >
              <span>View All 15+ Verified Stays</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}>
            {displayedProperties.map(property => (
              <PropertyCard
                key={property.id}
                property={property}
                onSelect={onSelectProperty}
                onOpenScheduleModal={onOpenScheduleModal}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ROOMMATE MATCHER SECTION ═══════════ */}
      <section style={{ padding: '0 0 90px' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #0f2744 0%, #0369a1 60%, #0284c7 100%)',
            borderRadius: '26px',
            padding: 'clamp(2rem, 5vw, 4rem)',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 20px 50px rgba(2, 132, 199, 0.2)'
          }}>
            {/* Left Copy */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                display: 'inline-block',
                fontSize: '0.68rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#38bdf8',
                marginBottom: '0.75rem'
              }}>
                MORE THAN A ROOM
              </div>

              <h2 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.85rem)',
                fontWeight: 400,
                color: '#ffffff',
                lineHeight: 1.1,
                marginBottom: '1rem'
              }}>
                Find someone you’ll actually{' '}
                <em style={{ color: '#38bdf8', fontStyle: 'italic' }}>get along with.</em>
              </h2>

              <p style={{ fontSize: '0.92rem', color: '#e0f2fe', lineHeight: 1.7, marginBottom: '1.75rem', maxWidth: '420px' }}>
                Our PICT roommate engine matches branch (CS/IT/EnTC), sleep routine (Night Owl vs Early Bird), study habits, and food preferences.
              </p>

              {/* Interactive Budget Slider */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                borderRadius: '16px',
                padding: '1.1rem 1.4rem',
                marginBottom: '1.75rem',
                maxWidth: '420px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#bae6fd', textTransform: 'uppercase' }}>
                    Your Monthly Budget
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff', fontFamily: "'Manrope', sans-serif" }}>
                    ₹{budget.toLocaleString('en-IN')}
                  </span>
                </div>

                <input
                  type="range"
                  min={5000}
                  max={14000}
                  step={500}
                  value={budget}
                  onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                  style={{ '--pct': `${budgetPct}%` }}
                  aria-label="Monthly roommate budget"
                />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#bae6fd', marginTop: '0.35rem' }}>
                  <span>₹5k</span>
                  <span>₹14k</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/roommates')}
                className="btn btn-white btn-lg"
                style={{ borderRadius: '12px', fontWeight: 800, fontSize: '0.92rem' }}
              >
                <span>Find My Compatible Roommate</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Right Visualization: Compatibility Orbit */}
            <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              
              {/* Compatibility Orbit Circle */}
              <div style={{
                position: 'relative',
                width: '280px',
                height: '280px',
                borderRadius: '50%',
                border: '2px dashed rgba(56, 189, 248, 0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Central Score Circle */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  boxShadow: '0 0 0 12px rgba(56, 189, 248, 0.2), 0 0 30px rgba(56, 189, 248, 0.35)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  <div style={{ fontFamily: "'DM Serif Display', serif", fontSize: '2.1rem', lineHeight: 1 }}>
                    {matchScore}%
                  </div>
                  <div style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#bae6fd' }}>
                    MATCH
                  </div>
                </div>

                {/* Profile Card 1 (Top Left) */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '-20px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '0.6rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                  transform: 'rotate(-3deg)'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#e0f2fe',
                    color: '#0284c7',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    AS
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>Aaryan S.</div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>PICT CS · 2nd Year</div>
                  </div>
                </div>

                {/* Profile Card 2 (Bottom Right) */}
                <div style={{
                  position: 'absolute',
                  bottom: '-15px',
                  right: '-20px',
                  background: '#ffffff',
                  borderRadius: '12px',
                  padding: '0.6rem 0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
                  transform: 'rotate(2deg)'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#fef3c7',
                    color: '#d97706',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    RD
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0f172a' }}>Rohan D.</div>
                    <div style={{ fontSize: '0.65rem', color: '#64748b' }}>PICT IT · 3rd Year</div>
                  </div>
                </div>

                {/* Trait Chips around orbit */}
                <div style={{ position: 'absolute', top: '45%', left: '-35px', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 700 }}>
                  🦉 Night Owl
                </div>
                <div style={{ position: 'absolute', top: '15%', right: '-30px', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 700 }}>
                  💻 Hackathons
                </div>
                <div style={{ position: 'absolute', bottom: '15%', left: '10px', background: 'rgba(255, 255, 255, 0.15)', border: '1px solid rgba(255, 255, 255, 0.3)', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '20px', fontSize: '0.68rem', fontWeight: 700 }}>
                  🥗 Veg Mess
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ HOW WEBSITE WORKS (Target of HOW WEBSITE WORKS tab) ═══════════ */}
      <section id="how-it-works" style={{ padding: '0 0 100px' }}>
        <div className="container">
          
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#0284c7',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: '0.5rem'
            }}>
              SIMPLE BY DESIGN
            </div>

            <h2 style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
              color: '#0f172a',
              margin: '0 0 0.5rem'
            }}>
              From search to settled in 3 steps.
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748b' }}>
              Built specifically for PICT students. Zero middleman fees.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '2rem'
          }}>
            {/* Step 1 */}
            <div style={{
              background: '#ffffff',
              border: '1.5px solid #bae6fd',
              borderRadius: '20px',
              padding: '2.25rem 1.75rem',
              textAlign: 'center',
              boxShadow: '0 4px 18px rgba(2, 132, 199, 0.06)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.5rem',
                fontWeight: 800
              }}>
                <Search size={28} />
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                STEP 01
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                Discover Stays
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.65 }}>
                Filter verified hostels and co-living spaces near PICT by walking minutes, sharing option, and budget.
              </p>
            </div>

            {/* Step 2 */}
            <div style={{
              background: '#ffffff',
              border: '1.5px solid #bae6fd',
              borderRadius: '20px',
              padding: '2.25rem 1.75rem',
              textAlign: 'center',
              boxShadow: '0 4px 18px rgba(2, 132, 199, 0.06)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.5rem',
                fontWeight: 800
              }}>
                <Layers size={28} />
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                STEP 02
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                Compare & Match
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.65 }}>
                Compare up to 3 hostels side by side across rent, food, and facilities, or find compatible study roommates.
              </p>
            </div>

            {/* Step 3 */}
            <div style={{
              background: '#ffffff',
              border: '1.5px solid #bae6fd',
              borderRadius: '20px',
              padding: '2.25rem 1.75rem',
              textAlign: 'center',
              boxShadow: '0 4px 18px rgba(2, 132, 199, 0.06)'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '16px',
                background: '#e0f2fe',
                color: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem',
                fontSize: '1.5rem',
                fontWeight: 800
              }}>
                <Calendar size={28} />
              </div>
              <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.35rem' }}>
                STEP 03
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                Free Visit & Direct Move-In
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.65 }}>
                Schedule a free in-person visit, call the owner directly without middlemen, and move in with peace of mind.
              </p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link
              to="/how-it-works"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#ffffff',
                border: '1.5px solid #1688E8',
                color: '#1688E8',
                padding: '0.65rem 1.35rem',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.85rem',
                textDecoration: 'none',
                transition: 'all 0.18s'
              }}
            >
              <span>Explore Transparency, Verification & Methodology</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* Responsive Layout Styles */}
      <style>{`
        @media (max-width: 900px) {
          section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section#how-it-works .container > div[style*="grid-template-columns: repeat(3, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
