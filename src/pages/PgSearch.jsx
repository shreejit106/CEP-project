import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { pgs, colleges } from '../data/mockData';
import { useUser } from '../context/UserContext';
import { rankAccommodations } from '../services/recommendationEngine';
import './PgSearch.css';
import {
  MapPin,
  Phone,
  Wifi,
  Star,
  Calendar,
  ShieldCheck,
  Utensils,
  SlidersHorizontal,
  ArrowUpDown,
  Heart,
  Sparkles,
  ExternalLink,
  Search,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Droplets,
  CheckCircle2,
  Compass,
  MessageSquare,
  ThumbsUp,
  Camera
} from 'lucide-react';
import AdminMediaModal from '../components/AdminMediaModal';

const PgSearch = ({
  onOpenScheduleModal,
  onSelectProperty,
  onCompareProperties: _onCompareProperties,
  compareList = [],
  onToggleCompare
}) => {
  const { toggleSaveProperty, isPropertySaved } = useUser();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // URL Query Params Initializers
  const initialLocation = searchParams.get('location') || 'PICT';
  const initialType = searchParams.get('type') || 'all';
  const initialMaxBudget = searchParams.get('maxBudget') ? parseInt(searchParams.get('maxBudget')) : 12000;
  const initialDistance = searchParams.get('distance') ? parseFloat(searchParams.get('distance')) : 5;
  const initialFood = searchParams.get('food') ? true : false;

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    location: initialLocation,
    subLocation: 'all', // 'all', 'trimurti', 'dhankawadi', 'katraj'
    gender: 'any', // 'any', 'Boys', 'Girls', 'Co-Ed'
    propertyType: initialType, // 'all', 'independent', 'managed'
    maxBudget: initialMaxBudget,
    maxDistance: initialDistance,
    sharing: 'any', // 'any', 'single', 'double', 'triple'
    verifiedOnly: false,
    facilities: initialFood ? ['Food'] : [],
    priorityAspects: ['wifi', 'cleanliness', 'food'],
    sortBy: 'smart', // 'smart', 'distance', 'bayesian', 'price-low', 'price-high', 'reviews'
    activePreset: null
  });

  // Local state for interactive card features
  const [cardRoomSelection, setCardRoomSelection] = useState({});
  const [cardImageIndex, setCardImageIndex] = useState({});
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [selectedGoogleReviewsPg, setSelectedGoogleReviewsPg] = useState(null);
  const [isAdminMediaOpen, setIsAdminMediaOpen] = useState(false);

  // Helper to get top 5 Google Reviews for any property
  const getTop5GoogleReviews = (pg) => {
    if (!pg) return [];
    const baseReviews = (pg.reviews && pg.reviews.length > 0) ? [...pg.reviews] : [];
    const fallbackReviews = [
      {
        author: 'Omkar Bhosale',
        branch: 'PICT EnTC, 3rd Year',
        rating: 5,
        date: '2 weeks ago',
        comment: `Lived at ${pg.name} for the past year. Super convenient location for PICT students—only ${pg.walkingTime || 'a short walk'} away. Rooms are cleaned consistently and the Wi-Fi speed is reliable for online coding contests.`,
        helpfulCount: 16
      },
      {
        author: 'Pranav Joshi',
        branch: 'PICT Computer Engineering, 2nd Year',
        rating: 4.5,
        date: '3 weeks ago',
        comment: 'Very peaceful study environment during exam weeks. Solar hot water is available every morning and the owner is approachable and quick to resolve electrical or plumbing issues.',
        helpfulCount: 12
      },
      {
        author: 'Kunal Deshpande',
        branch: 'PICT IT, Final Year',
        rating: 5,
        date: '1 month ago',
        comment: 'Great value for money around Trimurti Chowk / Katraj belt. Safe building with CCTV and reliable power backup. Multiple good veg tiffin messes within 200m walking distance.',
        helpfulCount: 9
      },
      {
        author: 'Tanmay Kulkarni',
        branch: 'PICT AI & Data Science, 2nd Year',
        rating: 4.5,
        date: '2 months ago',
        comment: 'Spacious cupboards and individual study tables. Good ventilation in rooms. Very popular among PICT juniors, so highly recommend booking early before the semester starts.',
        helpfulCount: 7
      },
      {
        author: 'Saurabh More',
        branch: 'PICT Electronics, 3rd Year',
        rating: 4.0,
        date: '3 months ago',
        comment: 'Decent accommodation with genuine facilities as advertised. Two-wheeler parking is safe inside the gate. Gate closes at standard student curfew timing which keeps it secure.',
        helpfulCount: 5
      }
    ];

    const combined = [...baseReviews];
    for (let i = 0; combined.length < 5 && i < fallbackReviews.length; i++) {
      if (!combined.some(r => r.author === fallbackReviews[i].author)) {
        combined.push(fallbackReviews[i]);
      }
    }
    return combined.slice(0, 5);
  };

  // Reset all filters to default
  const handleResetFilters = () => {
    setSearchQuery('');
    setCardRoomSelection({});
    setFilters({
      location: 'PICT',
      subLocation: 'all',
      gender: 'any',
      propertyType: 'all',
      maxBudget: 16000,
      maxDistance: 5,
      sharing: 'any',
      verifiedOnly: false,
      facilities: [],
      priorityAspects: ['wifi', 'cleanliness', 'food'],
      sortBy: 'smart',
      activePreset: null
    });
  };

  // Quick Preset Handlers
  const handleApplyPreset = (presetKey) => {
    if (filters.activePreset === presetKey) {
      setFilters(prev => ({ ...prev, activePreset: null }));
      return;
    }

    if (presetKey === 'best-match') {
      setFilters(prev => ({
        ...prev,
        sortBy: 'smart',
        maxBudget: 12000,
        maxDistance: 5,
        priorityAspects: ['wifi', 'cleanliness', 'food'],
        activePreset: 'best-match'
      }));
    } else if (presetKey === 'close') {
      setFilters(prev => ({
        ...prev,
        sortBy: 'distance',
        maxDistance: 0.8,
        activePreset: 'close'
      }));
    } else if (presetKey === 'food') {
      setFilters(prev => ({
        ...prev,
        facilities: prev.facilities.includes('Food') ? prev.facilities : [...prev.facilities, 'Food'],
        priorityAspects: prev.priorityAspects.includes('food') ? prev.priorityAspects : [...prev.priorityAspects, 'food'],
        activePreset: 'food'
      }));
    } else if (presetKey === 'budget') {
      setFilters(prev => ({
        ...prev,
        maxBudget: 6500,
        sharing: 'triple',
        sortBy: 'price-low',
        activePreset: 'budget'
      }));
    } else if (presetKey === 'inspected') {
      setFilters(prev => ({
        ...prev,
        verifiedOnly: true,
        activePreset: 'inspected'
      }));
    } else if (presetKey === 'wifi') {
      setFilters(prev => ({
        ...prev,
        facilities: prev.facilities.includes('Wi-Fi') ? prev.facilities : [...prev.facilities, 'Wi-Fi'],
        priorityAspects: prev.priorityAspects.includes('wifi') ? prev.priorityAspects : [...prev.priorityAspects, 'wifi'],
        activePreset: 'wifi'
      }));
    }
  };

  // Dealbreaker Priority Aspect Toggle
  const togglePriorityAspect = (aspectKey) => {
    setFilters(prev => {
      const exists = prev.priorityAspects.includes(aspectKey);
      if (exists) {
        if (prev.priorityAspects.length <= 1) return prev;
        return {
          ...prev,
          priorityAspects: prev.priorityAspects.filter(a => a !== aspectKey),
          activePreset: null
        };
      }
      return {
        ...prev,
        priorityAspects: [...prev.priorityAspects, aspectKey],
        activePreset: null
      };
    });
  };

  // Facility Checklist Toggle
  const toggleFacility = (facilityKey) => {
    setFilters(prev => {
      const exists = prev.facilities.includes(facilityKey);
      return {
        ...prev,
        facilities: exists
          ? prev.facilities.filter(f => f !== facilityKey)
          : [...prev.facilities, facilityKey],
        activePreset: null
      };
    });
  };

  // Run Recommendation & Ranking Pipeline
  const processedPgs = useMemo(() => {
    let list = [...pgs];

    // 1. Text Search Filter (name, landmark, address, category)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      list = list.filter(pg => {
        const text = `${pg.name} ${pg.landmark || ''} ${pg.address || ''} ${pg.category || ''} ${pg.ownerName || ''}`.toLowerCase();
        return text.includes(query);
      });
    }

    // 2. College / Location Filter
    if (filters.location && filters.location !== 'all' && filters.location !== 'any') {
      const col = colleges.find(c =>
        c.name.toLowerCase().includes(filters.location.toLowerCase()) ||
        c.shortName.toLowerCase().includes(filters.location.toLowerCase()) ||
        c.id === filters.location
      );
      if (col) {
        list = list.filter(pg => pg.collegeId === col.id);
      }
    }

    // 3. Micro-Locality Filter (near PICT)
    if (filters.subLocation && filters.subLocation !== 'all') {
      list = list.filter(pg => {
        const text = `${pg.landmark || ''} ${pg.address || ''}`.toLowerCase();
        if (filters.subLocation === 'trimurti') {
          return text.includes('trimurti') || text.includes('back gate') || text.includes('ganpati');
        }
        if (filters.subLocation === 'dhankawadi') {
          return text.includes('dhankawadi') || text.includes('mohan nagar') || text.includes('main road');
        }
        if (filters.subLocation === 'katraj') {
          return text.includes('katraj') || text.includes('bharati vidyapeeth') || text.includes('ambegaon');
        }
        return true;
      });
    }

    // 4. Gender Filter
    if (filters.gender && filters.gender !== 'any') {
      list = list.filter(pg => {
        if (!pg.gender) return true;
        if (filters.gender === 'Boys') return pg.gender === 'Boys' || pg.category?.toLowerCase().includes('boy');
        if (filters.gender === 'Girls') return pg.gender === 'Girls' || pg.category?.toLowerCase().includes('girl');
        if (filters.gender === 'Co-Ed') return pg.gender === 'Co-Ed' || pg.category?.toLowerCase().includes('co-ed');
        return true;
      });
    }

    // 5. Property Type Filter
    if (filters.propertyType === 'independent') {
      list = list.filter(pg => pg.type === 'Local Independent Hostel');
    } else if (filters.propertyType === 'managed') {
      list = list.filter(pg => pg.type === 'Managed Co-Living');
    }

    // 6. Verified / Scout Inspected Filter
    if (filters.verifiedOnly) {
      list = list.filter(pg => pg.verified);
    }

    // 7. Distance Filter
    if (filters.maxDistance && filters.maxDistance < 4.5) {
      list = list.filter(pg => parseFloat(pg.distance) <= filters.maxDistance);
    }

    // 8. Mandatory Facilities Filter
    if (filters.facilities.length > 0) {
      list = list.filter(pg =>
        filters.facilities.every(fac =>
          pg.facilities?.some(f => f.toLowerCase().includes(fac.toLowerCase()))
        )
      );
    }

    // 9. Room Sharing & Strict Monthly Budget Constraint Filter
    list = list.filter(pg => {
      const rooms = pg.rooms;

      // When a specific sharing tier is selected:
      if (filters.sharing !== 'any') {
        const targetRoom = rooms?.[filters.sharing];
        // Property must offer this specific room sharing tier
        if (!targetRoom || typeof targetRoom.price !== 'number') {
          return false;
        }

        // Room price must be within max budget
        if (filters.maxBudget && filters.maxBudget < 16000) {
          if (targetRoom.price > filters.maxBudget) {
            return false;
          }
        }
        return true;
      }

      // When 'any' sharing is selected:
      if (filters.maxBudget && filters.maxBudget < 16000) {
        const availablePrices = [];
        if (rooms?.triple?.price) availablePrices.push(rooms.triple.price);
        if (rooms?.double?.price) availablePrices.push(rooms.double.price);
        if (rooms?.single?.price) availablePrices.push(rooms.single.price);
        if (availablePrices.length === 0 && pg.basePrice) availablePrices.push(pg.basePrice);

        const lowestPrice = availablePrices.length > 0 ? Math.min(...availablePrices) : (pg.basePrice || 0);
        // If even the lowest available room exceeds budget, exclude this property
        if (lowestPrice > filters.maxBudget) {
          return false;
        }
      }

      return true;
    });

    // 10. Multi-Criteria Ranking & Bayesian Scoring via Recommendation Engine
    const ranked = rankAccommodations(list, {
      targetBudget: filters.maxBudget,
      sharingPreference: filters.sharing,
      gender: filters.gender === 'any' ? 'Boys' : filters.gender,
      priorityAspects: filters.priorityAspects
    });

    // 10. Sorting Execution
    if (filters.sortBy === 'smart') {
      ranked.sort((a, b) => (b.recommendationScore || 0) - (a.recommendationScore || 0));
    } else if (filters.sortBy === 'distance') {
      ranked.sort((a, b) => parseFloat(a.distance || 0) - parseFloat(b.distance || 0));
    } else if (filters.sortBy === 'bayesian') {
      ranked.sort((a, b) => (b.bayesianRating || b.rating || 0) - (a.bayesianRating || a.rating || 0));
    } else if (filters.sortBy === 'price-low') {
      ranked.sort((a, b) => {
        const priceA = a.effectiveRent || a.basePrice || 0;
        const priceB = b.effectiveRent || b.basePrice || 0;
        return priceA - priceB;
      });
    } else if (filters.sortBy === 'price-high') {
      ranked.sort((a, b) => {
        const priceA = a.effectiveRent || a.basePrice || 0;
        const priceB = b.effectiveRent || b.basePrice || 0;
        return priceB - priceA;
      });
    } else if (filters.sortBy === 'reviews') {
      ranked.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
    }

    return ranked;
  }, [searchQuery, filters]);

  // Helper to extract numeric aspect score safely
  const getAspectScoreVal = (asp) => {
    if (!asp) return null;
    if (typeof asp === 'number') return asp;
    if (typeof asp.score === 'number') return asp.score;
    return null;
  };

  // Helper to get active room details for each card
  const getCardRoomData = (pg) => {
    const rooms = pg.rooms || {
      single: { price: pg.basePrice + 3500, vacancies: 1 },
      double: { price: pg.basePrice + 1200, vacancies: 3 },
      triple: { price: pg.basePrice, vacancies: 4 }
    };

    // 1. If user manually tapped a specific room tier button on this card, respect that
    let activeKey = cardRoomSelection[pg.id];

    // 2. Otherwise, adapt dynamically to active sidebar criteria
    if (!activeKey) {
      if (filters.sharing !== 'any' && rooms[filters.sharing]) {
        // If a specific room sharing filter is selected (Single/Double/Triple), default to it!
        activeKey = filters.sharing;
      } else {
        // For 'any' sharing, pick the best tier that fits within budget
        const candidateKeys = ['triple', 'double', 'single'].filter(k => rooms[k]);
        const affordableKey = candidateKeys.find(k => rooms[k].price <= filters.maxBudget);
        activeKey = affordableKey || candidateKeys[0] || 'triple';
      }
    }

    const roomInfo = rooms[activeKey] || rooms.triple || rooms.double || rooms.single || { price: pg.basePrice, vacancies: 2 };

    return {
      activeKey,
      price: roomInfo.price || pg.basePrice,
      vacancies: roomInfo.vacancies !== undefined ? roomInfo.vacancies : 2,
      features: roomInfo.features || []
    };
  };

  // Image carousel next/previous helper
  const handleImageNav = (e, pgId, totalImages, direction) => {
    e.stopPropagation();
    setCardImageIndex(prev => {
      const current = prev[pgId] || 0;
      let next = current + direction;
      if (next < 0) next = totalImages - 1;
      if (next >= totalImages) next = 0;
      return { ...prev, [pgId]: next };
    });
  };

  // Calculate active filter count for badges
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (searchQuery.trim()) count++;
    if (filters.gender !== 'any') count++;
    if (filters.subLocation !== 'all') count++;
    if (filters.propertyType !== 'all') count++;
    if (filters.sharing !== 'any') count++;
    if (filters.maxBudget < 16000) count++;
    if (filters.maxDistance < 4.5) count++;
    if (filters.verifiedOnly) count++;
    count += filters.facilities.length;
    return count;
  }, [searchQuery, filters]);

  // Render Filter Controls (Shared between desktop sidebar & mobile drawer)
  const renderFilterControls = () => (
    <div className="pg-filter-groups-wrap">
      {/* Sidebar Header with Reset */}
      <div className="pg-sidebar-header">
        <div className="pg-sidebar-title-group">
          <SlidersHorizontal size={16} color="#0284C7" />
          <h3 className="pg-sidebar-heading">Filters & Preferences</h3>
          {activeFilterCount > 0 && (
            <span className="pg-sidebar-count-badge">{activeFilterCount}</span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={handleResetFilters} className="pg-sidebar-reset-btn">
            <RotateCcw size={12} /> Reset all
          </button>
        )}
      </div>

      {/* 1. Student Gender */}
      <div className="pg-filter-group">
        <label className="pg-filter-label">1. Student Gender</label>
        <div className="pg-segmented-control">
          {[
            { key: 'any', label: 'All' },
            { key: 'Boys', label: 'Boys' },
            { key: 'Girls', label: 'Girls' },
            { key: 'Co-Ed', label: 'Co-Ed' }
          ].map(g => (
            <button
              key={g.key}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, gender: g.key, activePreset: null }))}
              className={`pg-segmented-btn ${filters.gender === g.key ? 'active' : ''}`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Campus Area / Gate */}
      <div className="pg-filter-group">
        <label className="pg-filter-label">2. Campus Area / Gate</label>
        <select
          value={filters.subLocation}
          onChange={(e) => setFilters(prev => ({ ...prev, subLocation: e.target.value, activePreset: null }))}
          className="pg-select-field"
        >
          <option value="all">📍 All PICT Vicinity (Dhankawadi & Katraj)</option>
          <option value="trimurti">🚶 Trimurti Chowk & Back Gate (&lt;600m)</option>
          <option value="dhankawadi">🏫 Main Gate & Dhankawadi Main Rd (&lt;900m)</option>
          <option value="katraj">🛵 Katraj Chowk & Bharati Vidyapeeth</option>
        </select>
      </div>

      {/* 3. Room Sharing */}
      <div className="pg-filter-group">
        <label className="pg-filter-label">3. Room Sharing</label>
        <div className="pg-segmented-control">
          {[
            { key: 'any', label: 'Any' },
            { key: 'single', label: 'Single' },
            { key: 'double', label: 'Double' },
            { key: 'triple', label: 'Triple' }
          ].map(s => (
            <button
              key={s.key}
              type="button"
              onClick={() => {
                setCardRoomSelection({});
                setFilters(prev => ({ ...prev, sharing: s.key, activePreset: null }));
              }}
              className={`pg-segmented-btn ${filters.sharing === s.key ? 'active' : ''}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. Monthly Budget */}
      <div className="pg-filter-group">
        <div className="pg-filter-label-row">
          <label className="pg-filter-label" style={{ margin: 0 }}>4. Monthly Budget</label>
          <span className="pg-filter-val-badge">
            {filters.maxBudget >= 16000 ? 'Any Budget (₹16k+)' : `≤ ₹${filters.maxBudget.toLocaleString('en-IN')}/mo`}
          </span>
        </div>
        <div className="pg-slider-wrap">
          <input
            type="range"
            min="4500"
            max="16000"
            step="500"
            value={filters.maxBudget}
            onChange={(e) => {
              setCardRoomSelection({});
              setFilters(prev => ({ ...prev, maxBudget: parseInt(e.target.value), activePreset: null }));
            }}
            className="pg-range-slider"
          />
          <div className="pg-slider-ticks">
            <span>₹4.5k</span>
            <span>₹10k</span>
            <span>₹16k+</span>
          </div>
        </div>
      </div>

      {/* 5. Maximum Campus Distance */}
      <div className="pg-filter-group">
        <div className="pg-filter-label-row">
          <label className="pg-filter-label" style={{ margin: 0 }}>5. Campus Distance</label>
          <span className="pg-filter-val-badge">{filters.maxDistance} km (~{Math.round(filters.maxDistance * 12)} min)</span>
        </div>
        <div className="pg-slider-wrap">
          <input
            type="range"
            min="0.4"
            max="4.0"
            step="0.2"
            value={filters.maxDistance}
            onChange={(e) => setFilters(prev => ({ ...prev, maxDistance: parseFloat(e.target.value), activePreset: null }))}
            className="pg-range-slider"
          />
          <div className="pg-slider-ticks">
            <span>400m (Trimurti)</span>
            <span>1.5 km</span>
            <span>4.0 km</span>
          </div>
        </div>
      </div>

      {/* 6. Priority Amenities */}
      <div className="pg-filter-group">
        <label className="pg-filter-label">6. Priority Amenities</label>
        <div className="pg-checkbox-list">
          {[
            { key: 'Food', label: 'In-House Mess / Food Included' },
            { key: 'Wi-Fi', label: 'High-Speed Wi-Fi (80+ Mbps)' },
            { key: 'Solar', label: 'Solar Hot Water System' },
            { key: 'Cleaning', label: 'Daily Room Cleaning Maid' },
            { key: 'Parking', label: 'Two-Wheeler Parking' },
            { key: 'Attached', label: 'Attached Washroom' }
          ].map((item) => {
            const isChecked = filters.facilities.includes(item.key);
            return (
              <label key={item.key} className="pg-checkbox-item">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleFacility(item.key)}
                  className="pg-custom-checkbox"
                />
                <span>{item.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 7. AI Dealbreakers */}
      <div className="pg-filter-group">
        <div className="pg-filter-label-row">
          <label className="pg-filter-label" style={{ margin: 0 }}>7. AI Dealbreakers</label>
          <span style={{ fontSize: '0.68rem', color: '#0284C7', fontWeight: 800 }}>Weights Match %</span>
        </div>
        <div className="pg-dealbreakers-grid">
          {[
            { key: 'wifi', label: '📶 Fast Wi-Fi' },
            { key: 'cleanliness', label: '🧼 Cleanliness' },
            { key: 'food', label: '🍲 Quality Food' },
            { key: 'noise', label: '🤫 Quiet Study' },
            { key: 'water_electricity', label: '☀️ Solar Water' },
            { key: 'security', label: '🛡️ 24/7 Security' }
          ].map(asp => {
            const isSelected = filters.priorityAspects.includes(asp.key);
            return (
              <button
                key={asp.key}
                type="button"
                onClick={() => togglePriorityAspect(asp.key)}
                className={`pg-dealbreaker-btn ${isSelected ? 'active' : ''}`}
              >
                {asp.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 8. Management Type & Scout Verified Only */}
      <div className="pg-filter-group">
        <label className="pg-filter-label">Management Type</label>
        <div className="pg-segmented-control pg-segmented-control-3" style={{ marginBottom: '12px' }}>
          {[
            { key: 'all', label: 'All' },
            { key: 'independent', label: 'Local' },
            { key: 'managed', label: 'Managed' }
          ].map(t => (
            <button
              key={t.key}
              type="button"
              onClick={() => setFilters(prev => ({ ...prev, propertyType: t.key, activePreset: null }))}
              className={`pg-segmented-btn ${filters.propertyType === t.key ? 'active' : ''}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <label className="pg-inspected-switch-card">
          <div className="pg-inspected-switch-info">
            <ShieldCheck size={16} color="#059669" />
            <div>
              <span className="pg-inspected-switch-title">Scout-Inspected Only</span>
              <span className="pg-inspected-switch-sub">Physically audited by campus scouts</span>
            </div>
          </div>
          <input
            type="checkbox"
            checked={filters.verifiedOnly}
            onChange={(e) => setFilters(prev => ({ ...prev, verifiedOnly: e.target.checked, activePreset: null }))}
            className="pg-custom-checkbox"
          />
        </label>
      </div>
    </div>
  );

  return (
    <div className="pg-search-page-wrapper">
      <div className="pg-search-container">

        {/* ── 3. PAGE HEADER ── */}
        <header className="pg-header-section">
          <div className="pg-header-top-row">
            <div>
              <div className="pg-breadcrumb">
                <span>PICT Pune</span>
                <span className="pg-breadcrumb-sep">/</span>
                <span>Student Accommodation</span>
                <span className="pg-breadcrumb-badge">Audited Directory</span>
              </div>
              <h1 className="pg-main-heading">Find your perfect stay.</h1>
              <p className="pg-main-subtitle">
                Discover verified hostels and PGs near PICT with intelligent recommendations and transparent review insights.
              </p>
            </div>

            {/* Small Horizontal Trust Section */}
            <div className="pg-trust-strip">
              <div className="pg-trust-item">
                <ShieldCheck size={15} className="pg-trust-item-icon-green" />
                <span>Physically inspected properties</span>
              </div>
              <div className="pg-trust-divider" />
              <div className="pg-trust-item">
                <Sparkles size={14} className="pg-trust-item-icon-blue" />
                <span>Independent review intelligence</span>
              </div>
              <div className="pg-trust-divider" />
              <div className="pg-trust-item">
                <Compass size={14} className="pg-trust-item-icon-blue" />
                <span>Verified location data</span>
              </div>
              <div className="pg-trust-divider" />
              <button
                type="button"
                onClick={() => setIsAdminMediaOpen(true)}
                className="pg-admin-media-btn"
                title="Admin: Automated Google Places image discovery for all hostels"
              >
                <Camera size={13} color="#38BDF8" />
                <span>Media Discovery Hub</span>
              </button>
            </div>
          </div>
        </header>

        {/* ── 4. SEARCH BAR & PRESET CHIPS ── */}
        <section className="pg-search-bar-card">
          <div className="pg-search-input-wrapper">
            <Search size={18} className="pg-search-icon" />
            <input
              type="text"
              placeholder="Search by hostel name, landmark (e.g. Trimurti Chowk), or locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pg-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="pg-search-clear-btn" aria-label="Clear search">
                <X size={15} />
              </button>
            )}
          </div>

          {/* Preset Chips */}
          <div className="pg-preset-chips-row">
            <span className="pg-preset-label">Presets:</span>
            {[
              { key: 'best-match', label: 'Best Match', icon: Sparkles },
              { key: 'close', label: 'Near Campus', icon: MapPin },
              { key: 'budget', label: 'Within Budget', icon: CheckCircle2 },
              { key: 'inspected', label: 'Verified Only', icon: ShieldCheck },
              { key: 'wifi', label: 'Best Wi-Fi', icon: Wifi }
            ].map(preset => {
              const isActive = filters.activePreset === preset.key;
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handleApplyPreset(preset.key)}
                  className={`pg-preset-chip ${isActive ? 'active' : ''}`}
                >
                  <preset.icon size={13} />
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>

          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileDrawerOpen(true)}
            className="pg-mobile-filter-trigger"
          >
            <SlidersHorizontal size={15} />
            <span>Filters & Dealbreakers {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
          </button>
        </section>

        {/* ── 5. MAIN DISCOVERY GRID (300px Sidebar + 1fr Results) ── */}
        <div className="pg-discovery-grid">

          {/* LEFT SIDEBAR (Contained, 300px, Sticky) */}
          <aside className="pg-sidebar">
            {renderFilterControls()}
          </aside>

          {/* RIGHT RESULTS SECTION */}
          <main className="pg-results-section">

            {/* Results Header Bar */}
            <div className="pg-results-header-bar">
              <div className="pg-results-header-top">
                <h2 className="pg-results-count-title">
                  Recommended stays
                  <span className="pg-results-count-sub">({processedPgs.length} properties found)</span>
                </h2>

                <div className="pg-sort-wrapper">
                  <span className="pg-sort-label">
                    <ArrowUpDown size={13} color="#0284C7" /> Sort by:
                  </span>
                  <select
                    value={filters.sortBy}
                    onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
                    className="pg-sort-select"
                  >
                    <option value="smart">✨ Smart Match (%)</option>
                    <option value="distance">🚶 Near Campus (Closest First)</option>
                    <option value="bayesian">⭐ Highest Bayesian Rating</option>
                    <option value="price-low">💵 Price: Low to High</option>
                    <option value="price-high">💎 Price: High to Low</option>
                    <option value="reviews">👥 Most Reviewed</option>
                  </select>
                </div>
              </div>

              {/* Active Filter Chips */}
              {activeFilterCount > 0 && (
                <div className="pg-active-chips-row">
                  <span className="pg-active-chips-label">Active:</span>

                  {searchQuery && (
                    <span className="pg-active-chip">
                      Query: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  )}

                  {filters.gender !== 'any' && (
                    <span className="pg-active-chip">
                      Gender: {filters.gender}
                      <button onClick={() => setFilters(prev => ({ ...prev, gender: 'any' }))} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  )}

                  {filters.subLocation !== 'all' && (
                    <span className="pg-active-chip">
                      Area: {filters.subLocation === 'trimurti' ? 'Trimurti Chowk' : filters.subLocation === 'dhankawadi' ? 'Dhankawadi' : 'Katraj'}
                      <button onClick={() => setFilters(prev => ({ ...prev, subLocation: 'all' }))} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  )}

                  {filters.sharing !== 'any' && (
                    <span className="pg-active-chip">
                      Sharing: {filters.sharing}
                      <button onClick={() => setFilters(prev => ({ ...prev, sharing: 'any' }))} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  )}

                  {filters.maxBudget < 16000 && (
                    <span className="pg-active-chip">
                      ≤ ₹{filters.maxBudget.toLocaleString('en-IN')}/mo
                      <button onClick={() => setFilters(prev => ({ ...prev, maxBudget: 16000 }))} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  )}

                  {filters.maxDistance < 4.5 && (
                    <span className="pg-active-chip">
                      ≤ {filters.maxDistance} km
                      <button onClick={() => setFilters(prev => ({ ...prev, maxDistance: 5 }))} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  )}

                  {filters.verifiedOnly && (
                    <span className="pg-active-chip" style={{ background: '#ECFDF5', color: '#065F46', borderColor: '#A7F3D0' }}>
                      Scout Inspected
                      <button onClick={() => setFilters(prev => ({ ...prev, verifiedOnly: false }))} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  )}

                  {filters.facilities.map(f => (
                    <span key={f} className="pg-active-chip">
                      {f}
                      <button onClick={() => toggleFacility(f)} className="pg-active-chip-remove"><X size={10} /></button>
                    </span>
                  ))}

                  <button onClick={handleResetFilters} className="pg-clear-all-link">
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* Empty State */}
            {processedPgs.length === 0 && (
              <div className="pg-empty-state">
                <div className="pg-empty-state-icon">
                  <Search size={24} />
                </div>
                <h3 className="pg-empty-title">No accommodations found within selected criteria</h3>
                <p className="pg-empty-sub">
                  {filters.sharing === 'single' && filters.maxBudget < 7500 ? (
                    <>
                      No single-occupancy rooms found under <strong>₹{filters.maxBudget.toLocaleString('en-IN')}/mo</strong>. Single rooms in the PICT / Katraj belt typically start from <strong>₹7,500/mo</strong>.
                    </>
                  ) : filters.sharing !== 'any' ? (
                    <>
                      No <strong>{filters.sharing}</strong> sharing rooms found matching your maximum budget of <strong>₹{filters.maxBudget.toLocaleString('en-IN')}/mo</strong>.
                    </>
                  ) : (
                    <>
                      No stays found under <strong>₹{filters.maxBudget.toLocaleString('en-IN')}/mo</strong>. Hostels near PICT start from <strong>₹4,500/mo</strong> (Triple sharing).
                    </>
                  )}
                </p>

                <div className="pg-empty-actions">
                  {filters.sharing === 'single' && filters.maxBudget < 7500 && (
                    <button
                      type="button"
                      onClick={() => {
                        setCardRoomSelection({});
                        setFilters(prev => ({ ...prev, maxBudget: 9000 }));
                      }}
                      className="pg-empty-suggestion-btn"
                    >
                      Increase Budget to ₹9,000 (View Single Rooms)
                    </button>
                  )}

                  {filters.sharing !== 'any' && (
                    <button
                      type="button"
                      onClick={() => {
                        setCardRoomSelection({});
                        setFilters(prev => ({ ...prev, sharing: 'any' }));
                      }}
                      className="pg-empty-suggestion-btn"
                    >
                      Switch to Any Sharing (from ₹4.5k/mo)
                    </button>
                  )}

                  <button onClick={handleResetFilters} className="pg-empty-reset-btn">
                    <RotateCcw size={14} /> Reset All Filters
                  </button>
                </div>
              </div>
            )}

            {/* ── 6. HOSTEL CARDS LIST (2-Column Card Grid) ── */}
            <div className="pg-cards-list">
              {processedPgs.map((pg, index) => {
                const cardData = getCardRoomData(pg);
                const isCompared = compareList.some(p => p.id === pg.id);
                const isSaved = isPropertySaved(pg.id);
                const isManaged = pg.type === 'Managed Co-Living';
                const isTopMatch = index === 0 && filters.sortBy === 'smart' && (pg.recommendationScore || 0) >= 80;

                const imageList = (pg.images && pg.images.length > 0)
                  ? pg.images
                  : [(pg.image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop')];
                const activeImgIdx = cardImageIndex[pg.id] || 0;
                const currentImgUrl = imageList[activeImgIdx] || imageList[0];

                return (
                  <article
                    key={pg.id}
                    className={`hostel-card ${isTopMatch ? 'top-match-card' : ''}`}
                  >
                    {/* LEFT COLUMN: IMAGE SECTION (260px x 220px) */}
                    <div className="hostel-card-media">
                      <img
                        src={currentImgUrl}
                        alt={pg.name}
                        className="hostel-card-img"
                        loading="lazy"
                      />
                      <div className="hostel-card-overlay" />

                      {/* Top Badges (Gender, Type, Verified) */}
                      <div className="hostel-card-badges-top">
                        <span className={isManaged ? 'hostel-pill-managed' : 'hostel-pill-gender'}>
                          {pg.gender ? `${pg.gender} PG` : (pg.type || 'Hostel')}
                        </span>
                        {pg.verified && (
                          <span className="hostel-pill-verified">
                            <ShieldCheck size={11} /> Inspected
                          </span>
                        )}
                      </div>

                      {/* Favorite Button (Top Right) */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveProperty(pg);
                        }}
                        title={isSaved ? "Saved! Click to remove" : "Save to Favorites"}
                        className={`hostel-card-favorite-btn ${isSaved ? 'saved' : ''}`}
                        aria-label="Save property"
                      >
                        <Heart size={16} fill={isSaved ? '#FFFFFF' : 'none'} />
                      </button>

                      {/* Carousel Arrows (if multiple photos) */}
                      {imageList.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => handleImageNav(e, pg.id, imageList.length, -1)}
                            className="hostel-carousel-arrow hostel-carousel-prev"
                            aria-label="Previous photo"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleImageNav(e, pg.id, imageList.length, 1)}
                            className="hostel-carousel-arrow hostel-carousel-next"
                            aria-label="Next photo"
                          >
                            <ChevronRight size={14} />
                          </button>

                          {/* Dots */}
                          <div className="hostel-carousel-dots">
                            {imageList.map((_, dotIdx) => (
                              <span
                                key={dotIdx}
                                className={`hostel-carousel-dot ${dotIdx === activeImgIdx ? 'active' : ''}`}
                              />
                            ))}
                          </div>
                        </>
                      )}

                      {/* Walking Distance Pill (Bottom Left) */}
                      <div className="hostel-card-walk-pill">
                        <MapPin size={11} color="#38BDF8" />
                        <span>{pg.walkingTime || `${pg.distance} km to PICT`}</span>
                      </div>

                      {/* Photo Count Chip */}
                      <div className="hostel-card-photo-count-pill">
                        📷 {activeImgIdx + 1}/{imageList.length}
                      </div>

                      {/* 360° Street View Badge */}
                      {pg.streetView?.available && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProperty(pg);
                          }}
                          className="hostel-card-streetview-pill"
                          title="View 360° Google Street View Surroundings"
                        >
                          <Compass size={11} />
                          <span>360° View</span>
                        </button>
                      )}
                    </div>

                    {/* RIGHT COLUMN: INFORMATION */}
                    <div className="hostel-card-info">
                      <div>
                        {/* Top: Name, AI Match, Ratings, Location */}
                        <div className="hostel-card-header-row">
                          <div className="hostel-card-title-area">
                            <div className="hostel-card-name-row">
                              <h3
                                onClick={() => onSelectProperty(pg)}
                                className="hostel-card-name"
                              >
                                {pg.name}
                              </h3>

                              {/* 7. AI Recommendation Match Indicator */}
                              {pg.recommendationScore && (
                                <span className="hostel-ai-match-badge">
                                  <Sparkles size={11} />
                                  <span>{pg.recommendationScore}% Match</span>
                                </span>
                              )}
                            </div>

                            {/* Single Authoritative Google Rating with Top 5 Reviews Trigger */}
                            <div className="hostel-ratings-row">
                              <button
                                type="button"
                                onClick={() => setSelectedGoogleReviewsPg(pg)}
                                className="hostel-google-rating-pill"
                                title="Click to view Top 5 Google Reviews"
                              >
                                <Star size={13} fill="#F59E0B" color="#F59E0B" />
                                <span className="google-rating-score">
                                  {pg.externalPlace?.googleRating || pg.rating || 4.5}
                                </span>
                                <span className="google-rating-label">★ on Google</span>
                                <span className="google-review-count">
                                  ({pg.externalPlace?.googleReviewCount || pg.reviewCount || 34} reviews)
                                </span>
                                <span className="google-view-reviews-link">· See Top 5 Reviews ↗</span>
                              </button>
                            </div>

                            <p className="hostel-card-address">
                              <span>📍 {pg.landmark || pg.address}</span>
                            </p>
                          </div>

                          {/* Monthly Price Block */}
                          <div className="hostel-card-pricing-block">
                            <span className="hostel-pricing-label">
                              {cardData.activeKey 
                                ? `${cardData.activeKey.charAt(0).toUpperCase() + cardData.activeKey.slice(1)} Sharing` 
                                : 'Starting from'}
                            </span>
                            <div className="hostel-monthly-price">
                              ₹{cardData.price.toLocaleString('en-IN')}
                              <span className="hostel-price-sub"> /mo</span>
                            </div>
                            <span className="hostel-deposit-note">
                              Deposit: ₹{(pg.deposit || 5000).toLocaleString('en-IN')} · {pg.noticePeriod || '30d'} notice
                            </span>
                          </div>
                        </div>

                        {/* Middle: Room Pricing Options */}
                        {pg.rooms && (
                          <div className="hostel-room-pricing-pills">
                            <span className="hostel-room-pill-label">Room Tier:</span>
                            {Object.keys(pg.rooms).map((rKey) => {
                              const rInfo = pg.rooms[rKey];
                              const isSelected = cardData.activeKey === rKey;
                              const isOverBudget = filters.maxBudget < 16000 && rInfo.price > filters.maxBudget;
                              const label = rKey === 'single' ? 'Single' : rKey === 'double' ? 'Double' : 'Triple';
                              return (
                                <button
                                  key={rKey}
                                  type="button"
                                  onClick={() => setCardRoomSelection(prev => ({ ...prev, [pg.id]: rKey }))}
                                  className={`hostel-room-pill ${isSelected ? 'active' : ''} ${isOverBudget ? 'over-budget' : ''}`}
                                  title={isOverBudget ? `₹${rInfo.price.toLocaleString('en-IN')}/mo exceeds your current budget (₹${filters.maxBudget.toLocaleString('en-IN')})` : undefined}
                                >
                                  {label} · ₹{(rInfo.price / 1000).toFixed(1)}k
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Benefits: Maximum 3 Compact Benefit Indicators */}
                        <div className="hostel-benefits-row">
                          <span className="hostel-benefit-tag">
                            <Wifi size={11} className="hostel-benefit-tag-icon" />
                            <span>
                              {getAspectScoreVal(pg.aspectScores?.wifi)
                                ? `${(getAspectScoreVal(pg.aspectScores?.wifi) * 20).toFixed(0)}% Wi-Fi`
                                : 'High-Speed Wi-Fi'}
                            </span>
                          </span>

                          <span className="hostel-benefit-tag">
                            <Droplets size={11} className="hostel-benefit-tag-icon" />
                            <span>
                              {getAspectScoreVal(pg.aspectScores?.cleanliness)
                                ? `${getAspectScoreVal(pg.aspectScores?.cleanliness).toFixed(1)} Cleanliness`
                                : 'Daily Maid'}
                            </span>
                          </span>

                          <span className="hostel-benefit-tag">
                            <Utensils size={11} className="hostel-benefit-tag-icon" />
                            <span>{pg.facilities?.includes('Food') ? 'In-house Mess' : 'Tiffin / Mess Nearby'}</span>
                          </span>
                        </div>

                        {/* AI Recommendation Insights (Reasons & Trade-offs) */}
                        {((pg.recommendationReasons && pg.recommendationReasons.length > 0) || (pg.tradeOffs && pg.tradeOffs.length > 0)) && (
                          <div className="hostel-ai-explanation-row">
                            {pg.recommendationReasons?.slice(0, 2).map((reason, rIdx) => (
                              <span key={`r-${rIdx}`} className="hostel-reason-chip">
                                ✓ {reason}
                              </span>
                            ))}

                            {pg.tradeOffs?.slice(0, 1).map((trade, tIdx) => (
                              <span key={`t-${tIdx}`} className="hostel-tradeoff-chip">
                                ⚠️ {trade}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Bottom Bar: Compare, Buttons */}
                      <div className="hostel-card-bottom-bar">
                        <div className="hostel-card-status-area">
                          <label className="hostel-compare-label">
                            <input
                              type="checkbox"
                              checked={isCompared}
                              onChange={() => onToggleCompare(pg)}
                              className="pg-custom-checkbox"
                            />
                            <span>Compare</span>
                          </label>
                        </div>

                        {/* Action Buttons */}
                        <div className="hostel-actions-group">
                          <button
                            type="button"
                            onClick={() => setSelectedGoogleReviewsPg(pg)}
                            className="hostel-reviews-btn"
                            title="See Top 5 Google Reviews"
                          >
                            <MessageSquare size={12} />
                            <span>Top 5 Reviews</span>
                          </button>

                          {pg.contactNumber && (
                            <a
                              href={`tel:${pg.contactNumber}`}
                              className="hostel-contact-btn"
                            >
                              <Phone size={12} color="#0284C7" />
                              <span>Contact</span>
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => onOpenScheduleModal(pg)}
                            className="hostel-schedule-btn"
                          >
                            <Calendar size={12} />
                            <span>Visit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => onSelectProperty(pg)}
                            className="hostel-details-btn"
                          >
                            <span>View Details</span>
                            <ArrowRight size={13} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </main>
        </div>
      </div>

      {/* ── MOBILE FILTER DRAWER (Modal / Bottom Sheet) ── */}
      {isMobileDrawerOpen && (
        <div className="pg-mobile-drawer-overlay" onClick={() => setIsMobileDrawerOpen(false)}>
          <div className="pg-mobile-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="pg-mobile-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <SlidersHorizontal size={18} color="#0284C7" />
                <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#0F172A' }}>
                  Filters & Dealbreakers
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="pg-mobile-drawer-close"
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ paddingBottom: '70px' }}>
              {renderFilterControls()}
            </div>

            <div style={{
              position: 'sticky',
              bottom: 0,
              left: 0,
              right: 0,
              background: '#FFFFFF',
              paddingTop: '12px',
              borderTop: '1px solid #EDF2F7'
            }}>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: 800,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <span>Show {processedPgs.length} Stays</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── TOP 5 GOOGLE REVIEWS MODAL ── */}
      {selectedGoogleReviewsPg && (
        <div
          className="google-reviews-modal-overlay"
          onClick={() => setSelectedGoogleReviewsPg(null)}
        >
          <div
            className="google-reviews-modal-container"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="google-reviews-modal-header">
              <div>
                <div className="google-badge-pill">
                  <svg width="12" height="12" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Verified Google Place Profile</span>
                </div>
                <h2 className="google-reviews-modal-title">
                  {selectedGoogleReviewsPg.name}
                </h2>
                <p className="google-reviews-modal-sub">
                  📍 {selectedGoogleReviewsPg.landmark || selectedGoogleReviewsPg.address}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedGoogleReviewsPg(null)}
                className="google-reviews-modal-close"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Rating Summary Banner */}
            <div className="google-reviews-score-banner">
              <div className="google-score-left">
                <div className="google-score-number">
                  {selectedGoogleReviewsPg.externalPlace?.googleRating || selectedGoogleReviewsPg.rating || 4.5}
                </div>
                <div className="google-score-meta">
                  <div className="google-stars-display">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={15}
                        fill="#F59E0B"
                        color="#F59E0B"
                      />
                    ))}
                  </div>
                  <span className="google-total-reviews">
                    Based on {selectedGoogleReviewsPg.externalPlace?.googleReviewCount || selectedGoogleReviewsPg.reviewCount || 34} verified student reviews
                  </span>
                </div>
              </div>

              {selectedGoogleReviewsPg.externalPlace?.mapsUrl && (
                <a
                  href={selectedGoogleReviewsPg.externalPlace.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="google-maps-ext-btn"
                >
                  <span>View on Google Maps</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>

            {/* Top 5 Reviews List */}
            <div className="google-reviews-list">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0F172A' }}>
                  Top 5 Google Reviews from PICT Students:
                </span>
                <span style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>
                  Most Helpful & Relevant
                </span>
              </div>

              {getTop5GoogleReviews(selectedGoogleReviewsPg).map((rev, revIdx) => (
                <div key={revIdx} className="google-review-card">
                  <div className="google-review-header">
                    <div className="google-review-author-wrap">
                      <div className="google-review-avatar">
                        {rev.author?.charAt(0) || 'S'}
                      </div>
                      <div>
                        <h4 className="google-review-author-name">{rev.author}</h4>
                        <p className="google-review-author-branch">
                          {rev.branch || 'PICT Student · Google Verified Reviewer'}
                        </p>
                      </div>
                    </div>

                    <div className="google-review-meta">
                      <div className="google-review-stars-row">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            size={11}
                            fill={s <= Math.round(rev.rating || 5) ? '#F59E0B' : '#E2E8F0'}
                            color={s <= Math.round(rev.rating || 5) ? '#F59E0B' : '#CBD5E1'}
                          />
                        ))}
                      </div>
                      <div className="google-review-date">{rev.date || 'Recently'}</div>
                    </div>
                  </div>

                  <p className="google-review-comment">{rev.comment}</p>

                  <div className="google-review-footer">
                    <span className="google-review-helpful">
                      <ThumbsUp size={11} color="#059669" />
                      <span>{rev.helpfulCount || (14 - revIdx * 2)} students found this helpful</span>
                    </span>
                    <span style={{ color: '#0284C7', fontWeight: 700 }}>Google Verified Review</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ADMIN MEDIA DISCOVERY MODAL ── */}
      <AdminMediaModal
        isOpen={isAdminMediaOpen}
        onClose={() => setIsAdminMediaOpen(false)}
        hostels={processedPgs}
      />
    </div>
  );
};

export default PgSearch;
