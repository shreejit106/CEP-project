import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pgs, colleges } from '../data/mockData';
import { 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Wifi, 
  Users, 
  IndianRupee, 
  Star, 
  Calendar, 
  ShieldCheck, 
  Utensils, 
  Check, 
  Filter, 
  SlidersHorizontal,
  Eye,
  ArrowUpDown,
  PhoneCall
} from 'lucide-react';

const PgSearch = ({ onOpenScheduleModal, onSelectProperty, onCompareProperties, compareList = [], onToggleCompare }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const initialLocation = searchParams.get('location') || 'PICT';
  const initialType = searchParams.get('type') || 'all';
  const initialMaxBudget = searchParams.get('maxBudget') ? parseInt(searchParams.get('maxBudget')) : 16000;
  const initialDistance = searchParams.get('distance') ? parseFloat(searchParams.get('distance')) : 5;

  const [filteredPgs, setFilteredPgs] = useState(pgs);
  const [filters, setFilters] = useState({
    location: initialLocation,
    type: initialType,
    maxBudget: initialMaxBudget,
    maxDistance: initialDistance,
    facilities: searchParams.get('food') ? ['Food'] : [],
    sortBy: 'distance'
  });

  const [cardRoomSelection, setCardRoomSelection] = useState({});

  useEffect(() => {
    let result = [...pgs];

    // Filter by location / college
    if (filters.location && filters.location !== 'any') {
      const col = colleges.find(c => 
        c.name.toLowerCase().includes(filters.location.toLowerCase()) || 
        c.shortName.toLowerCase().includes(filters.location.toLowerCase()) ||
        c.id === filters.location
      );
      if (col) {
        result = result.filter(pg => pg.collegeId === col.id);
      }
    }

    // Filter by Type (Independent vs Managed)
    if (filters.type === 'independent' || filters.type === 'Independent') {
      result = result.filter(pg => pg.type === 'Local Independent Hostel');
    } else if (filters.type === 'managed' || filters.type === 'Managed') {
      result = result.filter(pg => pg.type === 'Managed Co-Living');
    }

    // Filter by Distance
    if (filters.maxDistance && filters.maxDistance < 5) {
      result = result.filter(pg => parseFloat(pg.distance) <= filters.maxDistance);
    }

    // Filter by Budget
    result = result.filter(pg => pg.basePrice <= filters.maxBudget);

    // Filter by Facilities
    if (filters.facilities.length > 0) {
      result = result.filter(pg => 
        filters.facilities.every(fac => 
          pg.facilities?.some(f => f.toLowerCase().includes(fac.toLowerCase()))
        )
      );
    }

    // Sorting
    if (filters.sortBy === 'distance') {
      result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    } else if (filters.sortBy === 'price-low') {
      result.sort((a, b) => a.basePrice - b.basePrice);
    } else if (filters.sortBy === 'price-high') {
      result.sort((a, b) => b.basePrice - a.basePrice);
    } else if (filters.sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 4) - (a.rating || 4));
    }

    setFilteredPgs(result);
  }, [filters]);

  const handleFacilityToggle = (fac) => {
    setFilters(prev => {
      const exists = prev.facilities.includes(fac);
      return {
        ...prev,
        facilities: exists ? prev.facilities.filter(f => f !== fac) : [...prev.facilities, fac]
      };
    });
  };

  const getCardRoomData = (pg) => {
    const activeKey = cardRoomSelection[pg.id] || (pg.rooms?.triple ? 'triple' : 'double');
    const rooms = pg.rooms || {
      single: { price: pg.basePrice + 3000, vacancies: 2 },
      double: { price: pg.basePrice, vacancies: 4 },
      triple: { price: pg.basePrice - 1500, vacancies: 5 }
    };
    return {
      activeKey,
      price: rooms[activeKey]?.price || pg.basePrice,
      vacancies: rooms[activeKey]?.vacancies || 1
    };
  };

  return (
    <div className="container py-8 animate-fade-in" style={{ minHeight: '80vh' }}>
      {/* Top Banner */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-gray-200" style={{ borderBottom: '1px solid #E2E8F0' }}>
        <div>
          <div className="flex items-center gap-2 text-xs text-muted mb-1">
            <span>PICT Pune</span>
            <span>/</span>
            <span>Katraj-Dhankawadi Belt</span>
            <span>/</span>
            <strong style={{ color: '#0F172A' }}>Hostels & PGs Directory</strong>
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A' }}>
            Boys Hostels & PGs near PICT College
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-muted flex items-center gap-1">
            <ArrowUpDown size={14} /> Sort By:
          </label>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="input-field"
            style={{ padding: '0.4rem 0.75rem', fontSize: '0.8125rem', width: 'auto', fontWeight: 600 }}
          >
            <option value="distance">Nearest to PICT Campus</option>
            <option value="price-low">Rent: Low to High</option>
            <option value="price-high">Rent: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      <div className="flex gap-8 items-start">
        {/* Sidebar Filters */}
        <aside style={{
          width: '290px',
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '8px',
          padding: '1.25rem',
          position: 'sticky',
          top: '5rem',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        }}>
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100" style={{ borderBottom: '1px solid #E2E8F0' }}>
            <h2 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <SlidersHorizontal size={16} color="#0284C7" /> Filter Hostels
            </h2>
            <button
              onClick={() => setFilters({
                location: 'PICT',
                type: 'all',
                maxBudget: 16000,
                maxDistance: 5,
                facilities: [],
                sortBy: 'distance'
              })}
              style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Reset
            </button>
          </div>

          {/* Type Filter */}
          <div className="input-group mb-4">
            <label className="input-label" style={{ fontSize: '0.8rem' }}>Hostel Type</label>
            <select
              className="input-field"
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              style={{ fontWeight: 600, fontSize: '0.85rem' }}
            >
              <option value="all">All (Local & Managed)</option>
              <option value="independent">Independent Boys Hostels</option>
              <option value="managed">Managed Co-Living</option>
            </select>
          </div>

          {/* Location Filter */}
          <div className="input-group mb-4">
            <label className="input-label" style={{ fontSize: '0.8rem' }}>Campus / Area</label>
            <select
              className="input-field"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              style={{ fontWeight: 600, fontSize: '0.85rem' }}
            >
              <option value="any">Anywhere in Pune</option>
              {colleges.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Proximity Slider */}
          <div className="input-group mb-4">
            <label className="input-label flex justify-between" style={{ fontSize: '0.8rem' }}>
              <span>Walking Distance to PICT</span>
              <strong style={{ color: '#0F172A' }}>{filters.maxDistance >= 5 ? 'Any' : `< ${filters.maxDistance} km`}</strong>
            </label>
            <input
              type="range"
              min="0.5"
              max="5"
              step="0.3"
              value={filters.maxDistance}
              onChange={(e) => setFilters({ ...filters, maxDistance: parseFloat(e.target.value) })}
              style={{ accentColor: '#0284C7', cursor: 'pointer', width: '100%' }}
            />
            <div className="flex justify-between text-2xs text-muted" style={{ fontSize: '0.7rem' }}>
              <span>500m (Trimurti)</span>
              <span>1.5 km</span>
              <span>5 km</span>
            </div>
          </div>

          {/* Budget Range */}
          <div className="input-group mb-4">
            <label className="input-label flex justify-between" style={{ fontSize: '0.8rem' }}>
              <span>Max Monthly Budget</span>
              <strong style={{ color: '#0F172A' }}>₹{filters.maxBudget.toLocaleString('en-IN')}</strong>
            </label>
            <input
              type="range"
              min="5000"
              max="16000"
              step="500"
              value={filters.maxBudget}
              onChange={(e) => setFilters({ ...filters, maxBudget: parseInt(e.target.value) })}
              style={{ accentColor: '#0284C7', cursor: 'pointer', width: '100%' }}
            />
            <div className="flex justify-between text-2xs text-muted" style={{ fontSize: '0.7rem' }}>
              <span>₹5,000</span>
              <span>₹10,000</span>
              <span>₹16,000+</span>
            </div>
          </div>

          {/* Key Amenities */}
          <div>
            <label className="input-label mb-2 block" style={{ fontSize: '0.8rem' }}>Amenities Filter</label>
            <div className="flex flex-col gap-2">
              {[
                { label: '🍲 Food / Mess Facility', key: 'Food' },
                { label: '📶 Wi-Fi Internet', key: 'Wi-Fi' },
                { label: '☀️ Solar Hot Water', key: 'Solar' },
                { label: '🧼 Daily Cleaning Staff', key: 'Cleaning' },
                { label: '🛵 Bike Parking', key: 'Parking' },
              ].map((item) => {
                const isChecked = filters.facilities.includes(item.key);
                return (
                  <label
                    key={item.key}
                    className="flex items-center gap-2 text-xs font-medium"
                    style={{ color: '#334155', cursor: 'pointer' }}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleFacilityToggle(item.key)}
                      style={{ accentColor: '#0284C7', width: '15px', height: '15px' }}
                    />
                    <span>{item.label}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Listings */}
        <main style={{ flex: 1 }}>
          <div className="flex justify-between items-center mb-4">
            <span style={{ fontSize: '0.85rem', color: '#64748B' }}>
              Showing <strong>{filteredPgs.length}</strong> boys accommodations near PICT
            </span>
          </div>

          <div className="flex flex-col gap-5">
            {filteredPgs.map((pg) => {
              const cardData = getCardRoomData(pg);
              const isCompared = compareList.some(p => p.id === pg.id);
              const displayImg = pg.images ? pg.images[0] : pg.image;
              const isManaged = pg.type === 'Managed Co-Living';

              return (
                <div
                  key={pg.id}
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    overflow: 'hidden',
                    display: 'flex',
                    minHeight: '210px'
                  }}
                >
                  {/* Left: Image with Badges */}
                  <div style={{ width: '260px', position: 'relative', flexShrink: 0 }}>
                    <img
                      src={displayImg}
                      alt={pg.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    
                    <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', display: 'flex', gap: '0.35rem' }}>
                      <span style={{
                        background: isManaged ? '#0284C7' : '#0F172A',
                        color: 'white',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '0.15rem 0.45rem',
                        borderRadius: '3px'
                      }}>
                        {pg.type || 'Hostel'}
                      </span>
                    </div>

                    <div style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      left: '0.5rem',
                      background: 'rgba(255, 255, 255, 0.95)',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}>
                      <MapPin size={12} color="#0284C7" />
                      <span>{pg.walkingTime || `${pg.distance} km from PICT`}</span>
                    </div>
                  </div>

                  {/* Right: Body Details */}
                  <div style={{ padding: '1.15rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                              {pg.name}
                            </h3>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                              <Star size={12} fill="#F59E0B" color="#F59E0B" /> {pg.rating || 4.6}
                            </span>
                          </div>
                          <p style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '2px' }}>
                            📍 {pg.landmark || pg.address}
                          </p>
                        </div>

                        <div className="text-right">
                          <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Rent from</span>
                          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                            ₹{cardData.price.toLocaleString('en-IN')}
                            <span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#64748B' }}>/mo</span>
                          </div>
                        </div>
                      </div>

                      {/* Sharing Selection Pills */}
                      {pg.rooms && (
                        <div className="flex items-center gap-2 mt-2 pt-2" style={{ borderTop: '1px solid #F1F5F9' }}>
                          <span style={{ fontSize: '0.7rem', fontWeight: 600, color: '#64748B' }}>Sharing:</span>
                          {Object.keys(pg.rooms).map((rKey) => {
                            const rInfo = pg.rooms[rKey];
                            const isSelected = cardData.activeKey === rKey;
                            const label = rKey === 'single' ? 'Single' : rKey === 'double' ? 'Double' : 'Triple';
                            return (
                              <button
                                key={rKey}
                                onClick={() => setCardRoomSelection(prev => ({ ...prev, [pg.id]: rKey }))}
                                style={{
                                  padding: '0.2rem 0.5rem',
                                  borderRadius: '4px',
                                  border: isSelected ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                                  background: isSelected ? '#F0F9FF' : '#FFFFFF',
                                  color: isSelected ? '#0369A1' : '#475569',
                                  fontWeight: isSelected ? 700 : 500,
                                  fontSize: '0.72rem',
                                  cursor: 'pointer'
                                }}
                              >
                                {label} • ₹{(rInfo.price / 1000).toFixed(1)}k
                              </button>
                            );
                          })}
                        </div>
                      )}

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1 mt-2.5">
                        {pg.facilities?.slice(0, 4).map((f, i) => (
                          <span key={i} style={{ background: '#F1F5F9', color: '#334155', fontSize: '0.7rem', fontWeight: 500, padding: '0.1rem 0.45rem', borderRadius: '3px' }}>
                            ✓ {f}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="flex items-center gap-3">
                        <label style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={isCompared}
                            onChange={() => onToggleCompare(pg)}
                            style={{ accentColor: '#0284C7' }}
                          />
                          <span>Compare</span>
                        </label>

                        {cardData.vacancies > 0 ? (
                          <span style={{ fontSize: '0.7rem', color: '#15803D', fontWeight: 600 }}>
                            🟢 {cardData.vacancies} Vacancies
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.7rem', color: '#B91C1C', fontWeight: 600 }}>
                            🔴 Limited
                          </span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {/* Direct Call to Local Hostel Owner */}
                        {pg.contactNumber && (
                          <a
                            href={`tel:${pg.contactNumber}`}
                            style={{
                              background: '#F8FAFC',
                              border: '1px solid #CBD5E1',
                              color: '#334155',
                              padding: '0.4rem 0.7rem',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.25rem',
                              textDecoration: 'none'
                            }}
                          >
                            <Phone size={13} color="#0284C7" /> Call {pg.contactNumber.slice(-4)}
                          </a>
                        )}

                        <button
                          onClick={() => onSelectProperty(pg)}
                          style={{
                            background: '#0284C7',
                            color: 'white',
                            padding: '0.4rem 0.8rem',
                            borderRadius: '6px',
                            fontSize: '0.78rem',
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

            {filteredPgs.length === 0 && (
              <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '2.5rem', textAlign: 'center' }}>
                <p style={{ color: '#64748B', fontSize: '0.9rem', marginBottom: '1rem' }}>No hostels matching this filter.</p>
                <button
                  onClick={() => setFilters({
                    location: 'PICT',
                    type: 'all',
                    maxBudget: 16000,
                    maxDistance: 5,
                    facilities: [],
                    sortBy: 'distance'
                  })}
                  style={{ background: '#0284C7', color: 'white', padding: '0.5rem 1rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PgSearch;
