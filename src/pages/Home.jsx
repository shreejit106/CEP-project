import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  ArrowRight, 
  Check, 
  Star, 
  Building2, 
  Users, 
  Sparkles, 
  Filter, 
  ExternalLink, 
  SlidersHorizontal 
} from 'lucide-react';
import { pictHostels } from '../data/pictHostelsData';
import { colleges } from '../data/mockData';

const Home = ({ onOpenScheduleModal, onSelectProperty }) => {
  const navigate = useNavigate();
  
  const [selectedCampus, setSelectedCampus] = useState('PICT');
  const [selectedCategory, setSelectedCategory] = useState('all'); // all, independent, managed
  const [maxBudget, setMaxBudget] = useState('15000');
  const [activeSharingPills, setActiveSharingPills] = useState({});

  const handleSharingChange = (hostelId, type) => {
    setActiveSharingPills(prev => ({ ...prev, [hostelId]: type }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let url = `/search-pg?location=${encodeURIComponent(selectedCampus)}`;
    if (selectedCategory !== 'all') url += `&type=${selectedCategory}`;
    if (maxBudget) url += `&maxBudget=${maxBudget}`;
    navigate(url);
  };

  const displayedHostels = pictHostels.filter(h => {
    if (selectedCategory === 'independent') return h.type === 'Local Independent Hostel';
    if (selectedCategory === 'managed') return h.type === 'Managed Co-Living';
    return true;
  });

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#F8FAFC' }}>
      {/* 1. HERO SECTION (Clean & Practical Search) */}
      <section style={{
        background: '#FFFFFF',
        borderBottom: '1px solid #E2E8F0',
        padding: '3rem 0 2.5rem 0'
      }}>
        <div className="container text-center">
          {/* Top Campus Pill */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#0369A1',
            marginBottom: '1rem'
          }}>
            <MapPin size={14} color="#0284C7" />
            <span>Dhankawadi, Katraj & Trimurti Chowk Hub — PICT Pune</span>
          </div>

          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 800,
            color: '#0F172A',
            letterSpacing: '-0.02em',
            maxWidth: '820px',
            margin: '0 auto 0.75rem auto'
          }}>
            Find Boys Hostels, PGs & Co-Living Spaces <br />
            <span style={{ color: '#0284C7' }}>Near PICT College Pune</span>
          </h1>

          <p style={{
            fontSize: '1rem',
            color: '#64748B',
            maxWidth: '640px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Direct owner contact numbers, verified student reviews, transparent mess options, and zero brokerage. Compare independent local hostels and managed co-living brands.
          </p>

          {/* Practical Search Console */}
          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            boxShadow: '0 8px 25px -4px rgba(0, 0, 0, 0.08)',
            padding: '1.25rem 1.5rem',
            textAlign: 'left'
          }}>
            <form onSubmit={handleSearch} className="grid grid-cols-4 gap-4" style={{ alignItems: 'flex-end' }}>
              {/* College Hub */}
              <div className="input-group">
                <label className="input-label" style={{ fontSize: '0.8rem', color: '#475569' }}>
                  🎓 College Campus
                </label>
                <select
                  value={selectedCampus}
                  onChange={(e) => setSelectedCampus(e.target.value)}
                  className="input-field"
                  style={{ fontWeight: 600, padding: '0.65rem 0.85rem' }}
                >
                  <option value="PICT">PICT (Dhankawadi / Katraj)</option>
                  <option value="COEP">COEP (Shivajinagar)</option>
                  <option value="VIT">VIT (Bibwewadi)</option>
                  <option value="MIT-WPU">MIT-WPU (Kothrud)</option>
                  <option value="PCCOE">PCCOE (Akurdi)</option>
                </select>
              </div>

              {/* Type Category */}
              <div className="input-group">
                <label className="input-label" style={{ fontSize: '0.8rem', color: '#475569' }}>
                  🏠 Accommodation Type
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field"
                  style={{ fontWeight: 600, padding: '0.65rem 0.85rem' }}
                >
                  <option value="all">All (Local Hostels & Co-Living)</option>
                  <option value="independent">Independent Boys Hostels</option>
                  <option value="managed">Managed Co-Living</option>
                </select>
              </div>

              {/* Budget Range */}
              <div className="input-group">
                <label className="input-label" style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Max Budget</span>
                  <strong style={{ color: '#0F172A' }}>₹{parseInt(maxBudget).toLocaleString('en-IN')}/mo</strong>
                </label>
                <input
                  type="range"
                  min="5000"
                  max="16000"
                  step="500"
                  value={maxBudget}
                  onChange={(e) => setMaxBudget(e.target.value)}
                  style={{ accentColor: '#0284C7', cursor: 'pointer', height: '36px', width: '100%' }}
                />
              </div>

              {/* Search Button */}
              <div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', height: '44px', borderRadius: '8px', background: '#0284C7', color: 'white', fontWeight: 700 }}
                >
                  <Search size={16} /> Search Hostels
                </button>
              </div>
            </form>

            {/* Quick Filter Tags */}
            <div className="flex items-center gap-2 mt-3 pt-3 flex-wrap" style={{ borderTop: '1px solid #F1F5F9', fontSize: '0.78rem' }}>
              <span style={{ color: '#64748B', fontWeight: 600 }}>Nearby Landmarks:</span>
              {[
                { label: '📍 Trimurti Chowk (< 600m)', query: 'location=PICT' },
                { label: '📍 Ichapurti Ganpati Mandir (< 750m)', query: 'location=PICT' },
                { label: '📍 PICT Back Gate (4 mins walk)', query: 'location=PICT' },
                { label: '📞 Direct Owner Contacts', query: 'type=independent' },
                { label: '🍱 With 3-Meal Food', query: 'food=true' },
              ].map((tag, idx) => (
                <button
                  key={idx}
                  onClick={() => navigate(`/search-pg?${tag.query}`)}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '4px',
                    color: '#334155',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    cursor: 'pointer'
                  }}
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. ACCOMMODATION LISTINGS SECTION */}
      <section className="container py-10">
        {/* Category Header & Tabs */}
        <div className="flex justify-between items-center mb-6 pb-2" style={{ borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A' }}>
              Verified Hostels & PGs around PICT Campus
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '2px' }}>
              Showing {displayedHostels.length} student residences in Trimurti Chowk, Dhankawadi & Katraj
            </p>
          </div>

          <div className="flex gap-2">
            {[
              { id: 'all', label: 'All Places' },
              { id: 'independent', label: 'Local Boys Hostels' },
              { id: 'managed', label: 'Co-Living (Casa, Union, Stanza)' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  border: selectedCategory === cat.id ? '2px solid #0284C7' : '1px solid #CBD5E1',
                  background: selectedCategory === cat.id ? '#F0F9FF' : '#FFFFFF',
                  color: selectedCategory === cat.id ? '#0369A1' : '#475569',
                  fontWeight: selectedCategory === cat.id ? 700 : 500,
                  fontSize: '0.8125rem',
                  cursor: 'pointer'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Cards Grid */}
        <div className="grid grid-cols-2 gap-6">
          {displayedHostels.map((hostel) => {
            const currentSelectedRoom = activeSharingPills[hostel.id] || 'triple';
            const roomData = hostel.rooms[currentSelectedRoom] || hostel.rooms.triple || hostel.rooms.double;
            const isManaged = hostel.type === 'Managed Co-Living';

            return (
              <div
                key={hostel.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '10px',
                  border: isManaged ? '1.5px solid #BAE6FD' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.2s ease'
                }}
              >
                {/* Card Top Image & Badges */}
                <div style={{ position: 'relative', height: '210px' }}>
                  <img
                    src={hostel.images[0]}
                    alt={hostel.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: '0.65rem', left: '0.65rem', display: 'flex', gap: '0.4rem' }}>
                    <span style={{
                      background: isManaged ? '#0284C7' : '#0F172A',
                      color: 'white',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px'
                    }}>
                      {hostel.type}
                    </span>
                    <span style={{
                      background: 'rgba(255, 255, 255, 0.95)',
                      color: '#0F172A',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '4px'
                    }}>
                      Boys Only
                    </span>
                  </div>

                  <div style={{
                    position: 'absolute',
                    bottom: '0.65rem',
                    left: '0.65rem',
                    background: 'rgba(255, 255, 255, 0.95)',
                    padding: '0.25rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: '#0F172A',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    <MapPin size={13} color="#0284C7" />
                    <span>{hostel.walkingTime}</span>
                  </div>

                  <div style={{
                    position: 'absolute',
                    top: '0.65rem',
                    right: '0.65rem',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: 'white',
                    padding: '0.2rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.2rem'
                  }}>
                    <Star size={12} fill="#F59E0B" color="#F59E0B" /> {hostel.rating}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                          {hostel.name}
                        </h3>
                        <p style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                          📍 {hostel.landmark || hostel.address}
                        </p>
                      </div>
                    </div>

                    {/* Sharing Selection Pills */}
                    <div style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '6px',
                      padding: '0.5rem',
                      marginTop: '0.75rem',
                      marginBottom: '0.75rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#64748B', fontWeight: 600, marginBottom: '0.35rem' }}>
                        <span>Room Option:</span>
                        <span style={{ color: '#0284C7' }}>{roomData.vacancies} beds available</span>
                      </div>
                      <div className="flex gap-2">
                        {['triple', 'double', 'single'].map((rKey) => {
                          const r = hostel.rooms[rKey];
                          if (!r) return null;
                          const isSelected = currentSelectedRoom === rKey;
                          const label = rKey === 'triple' ? 'Triple' : rKey === 'double' ? 'Double' : 'Single';
                          return (
                            <button
                              key={rKey}
                              onClick={() => handleSharingChange(hostel.id, rKey)}
                              style={{
                                flex: 1,
                                padding: '0.35rem',
                                borderRadius: '4px',
                                border: isSelected ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                                background: isSelected ? '#F0F9FF' : '#FFFFFF',
                                color: isSelected ? '#0369A1' : '#334155',
                                textAlign: 'center',
                                cursor: 'pointer'
                              }}
                            >
                              <div style={{ fontSize: '0.72rem', fontWeight: 600 }}>{label}</div>
                              <div style={{ fontSize: '0.78rem', fontWeight: 800 }}>₹{(r.price / 1000).toFixed(1)}k</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Key Amenities */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hostel.facilities.slice(0, 4).map((f, i) => (
                        <span
                          key={i}
                          style={{
                            background: '#F1F5F9',
                            color: '#334155',
                            fontSize: '0.72rem',
                            fontWeight: 500,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '4px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.2rem'
                          }}
                        >
                          <Check size={11} color="#059669" /> {f}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pricing and Action Bottom Row */}
                  <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Monthly Rent</span>
                      <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                        ₹{roomData.price.toLocaleString('en-IN')}
                        <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#64748B' }}>/mo</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {/* Direct Call Owner */}
                      <a
                        href={`tel:${hostel.contactNumber}`}
                        style={{
                          background: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          color: '#334155',
                          padding: '0.45rem 0.75rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.3rem',
                          textDecoration: 'none'
                        }}
                      >
                        <Phone size={13} color="#0284C7" /> Call
                      </a>

                      <button
                        onClick={() => onSelectProperty(hostel)}
                        style={{
                          background: '#0284C7',
                          color: 'white',
                          padding: '0.45rem 0.85rem',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          border: 'none'
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. LOCAL HOSTELS VS MANAGED CO-LIVING GUIDE */}
      <section style={{ background: '#FFFFFF', borderTop: '1px solid #E2E8F0', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
              Choosing Your Accommodation Near PICT
            </h2>
            <p style={{ fontSize: '0.875rem', color: '#64748B', marginTop: '4px' }}>
              Understand the difference between independent local hostels and managed co-living spaces
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {/* Box 1: Independent Local Hostels */}
            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Budget Friendly & Close to Campus
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                Independent Boys Hostels
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem' }}>
                e.g. Gurukul Hostel, Shri Swami Samartha, Shreeram Hostel, Ira Hostel, Sthala, My Hostel.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#334155' }}>
                <li className="flex items-center gap-2"><Check size={14} color="#059669" /> <strong>Affordable:</strong> ₹5,200 - ₹7,000/mo</li>
                <li className="flex items-center gap-2"><Check size={14} color="#059669" /> <strong>Proximity:</strong> 4 to 9 mins walk to PICT</li>
                <li className="flex items-center gap-2"><Check size={14} color="#059669" /> <strong>Direct Contact:</strong> Speak with owner/caretaker</li>
                <li className="flex items-center gap-2"><Check size={14} color="#059669" /> <strong>Flexibility:</strong> Lower deposits & simple 1-month lock-in</li>
              </ul>
            </div>

            {/* Box 2: Managed Co-Living */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '1.5rem' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0284C7', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Full-Service & In-House Mess
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.75rem' }}>
                Managed Co-Living Spaces
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#64748B', marginBottom: '1rem' }}>
                e.g. Casa Living, Union Living, Stanza Living (Shiraz, Cairo, Girona).
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#334155' }}>
                <li className="flex items-center gap-2"><Check size={14} color="#0284C7" /> <strong>All-Inclusive:</strong> 3-4 Meals included in rent</li>
                <li className="flex items-center gap-2"><Check size={14} color="#0284C7" /> <strong>Housekeeping:</strong> Daily room cleaning & laundry</li>
                <li className="flex items-center gap-2"><Check size={14} color="#0284C7" /> <strong>Amenities:</strong> AC options, gym, gaming lounge</li>
                <li className="flex items-center gap-2"><Check size={14} color="#0284C7" /> <strong>Price:</strong> ₹7,500 - ₹12,000/mo</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
