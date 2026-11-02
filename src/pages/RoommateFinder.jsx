import { useState, useMemo } from 'react';
import { roommateProfiles, colleges } from '../data/mockData';
import { useUser } from '../context/UserContext';
import { 
  User, 
  MapPin, 
  Search, 
  Check, 
  Users, 
  Send, 
  MessageSquare, 
  Building2, 
  CheckCircle2, 
  X, 
  Bookmark, 
  Sparkles, 
  SlidersHorizontal, 
  ArrowUpDown, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  Clock, 
  Coffee, 
  Moon, 
  Sun, 
  BookOpen, 
  Award, 
  Heart,
  ChevronRight,
  ArrowRight,
  RotateCcw,
  Scale
} from 'lucide-react';

/* ── Preference Option Chip Component ─── */
function SelectableOption({ label, sublabel, icon: Icon, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        minWidth: '130px',
        padding: '0.75rem 0.85rem',
        borderRadius: '12px',
        border: selected ? '2px solid #1688E8' : '1.5px solid #E2E8F0',
        background: selected ? '#EFF6FF' : '#FFFFFF',
        color: selected ? '#14243A' : '#475569',
        textAlign: 'left',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.2rem',
        boxShadow: selected ? '0 2px 8px rgba(22, 136, 232, 0.12)' : 'none'
      }}
      onMouseEnter={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = '#CBD5E1';
          e.currentTarget.style.background = '#F8FAFC';
        }
      }}
      onMouseLeave={e => {
        if (!selected) {
          e.currentTarget.style.borderColor = '#E2E8F0';
          e.currentTarget.style.background = '#FFFFFF';
        }
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          {Icon && <Icon size={15} color={selected ? '#1688E8' : '#64748B'} />}
          <span style={{ fontSize: '0.82rem', fontWeight: selected ? 800 : 700, color: selected ? '#14243A' : '#334155' }}>
            {label}
          </span>
        </div>
        {selected && (
          <div style={{ width: '16px', height: '16px', borderRadius: '50%', background: '#1688E8', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={10} strokeWidth={3} />
          </div>
        )}
      </div>
      {sublabel && (
        <span style={{ fontSize: '0.68rem', color: selected ? '#1688E8' : '#94A3B8', fontWeight: 500 }}>
          {sublabel}
        </span>
      )}
    </button>
  );
}

export default function RoommateFinder() {
  const { user, savedRoommates = [], toggleSaveRoommate, isRoommateSaved } = useUser();

  // Active view: 'preferences' (Builder) | 'results' (Matches Explorer)
  const [activeView, setActiveView] = useState('preferences');

  // Roommate Preferences State
  const [preferences, setPreferences] = useState({
    collegeId: 'c2', // PICT default
    branch: 'Computer Engineering (PICT)',
    year: '2nd Year (SE)',
    budget: 7000,
    sharing: 'Double',
    locality: 'Trimurti Chowk',
    furnished: 'Furnished',
    smoking: 'Non-smoking',
    food: 'Vegetarian',
    sleepSchedule: 'Night Owl',
    cleanliness: 'Very Clean',
    social: 'Balanced',
    studyHabits: 'Quiet study / Coding',
    priorities: ['Budget', 'Sleep Schedule', 'Cleanliness']
  });

  // Results Sorting & Filtering
  const [sortBy, setSortBy] = useState('score'); // 'score', 'budget_asc', 'year'
  const [filterBranch, setFilterBranch] = useState('all');
  const [filterSleep, setFilterSleep] = useState('all');

  // Modals state
  const [connectModalStudent, setConnectModalStudent] = useState(null);
  const [connectMessage, setConnectMessage] = useState('');
  const [connectSent, setConnectSent] = useState(false);

  const [detailModalStudent, setDetailModalStudent] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  // Toggle user priorities
  const handleTogglePriority = (priority) => {
    setPreferences(prev => {
      const exists = prev.priorities.includes(priority);
      if (exists) {
        if (prev.priorities.length <= 1) return prev; // keep at least 1
        return { ...prev, priorities: prev.priorities.filter(p => p !== priority) };
      } else {
        if (prev.priorities.length >= 3) {
          return { ...prev, priorities: [...prev.priorities.slice(1), priority] };
        }
        return { ...prev, priorities: [...prev.priorities, priority] };
      }
    });
  };

  // True Weighted Matching Engine
  const matchedProfiles = useMemo(() => {
    const scored = roommateProfiles.map(profile => {
      let score = 0;
      let reasons = [];

      // 1. College Match (Base: 25 pts)
      if (profile.collegeId === preferences.collegeId) {
        score += 25;
        reasons.push('Same PICT/Katraj college campus');
      } else {
        score += 10;
      }

      // 2. Budget Proximity (Base: 25 pts, weight x1.3 if in priorities)
      const budgetWeight = preferences.priorities.includes('Budget') ? 1.3 : 1.0;
      const budgetDiff = Math.abs(profile.budget - preferences.budget);
      if (budgetDiff <= 500) {
        score += Math.round(25 * budgetWeight);
        reasons.push(`Budget matches within ₹500 (₹${profile.budget.toLocaleString('en-IN')})`);
      } else if (budgetDiff <= 1500) {
        score += Math.round(18 * budgetWeight);
        reasons.push(`Compatible budget range (±₹1,500)`);
      } else if (budgetDiff <= 2500) {
        score += Math.round(10 * budgetWeight);
      }

      // 3. Sleep Schedule (Base: 20 pts, weight x1.3 if in priorities)
      const sleepWeight = preferences.priorities.includes('Sleep Schedule') ? 1.3 : 1.0;
      if (profile.preferences.sleepSchedule === preferences.sleepSchedule) {
        score += Math.round(20 * sleepWeight);
        reasons.push(`Both prefer ${preferences.sleepSchedule} routine`);
      } else if (profile.preferences.sleepSchedule === 'Flexible' || preferences.sleepSchedule === 'Flexible') {
        score += Math.round(14 * sleepWeight);
        reasons.push('Flexible sleep routine compatibility');
      } else {
        score += 4;
      }

      // 4. Cleanliness (Base: 15 pts, weight x1.3 if in priorities)
      const cleanWeight = preferences.priorities.includes('Cleanliness') ? 1.3 : 1.0;
      if (profile.preferences.cleanliness === preferences.cleanliness) {
        score += Math.round(15 * cleanWeight);
        reasons.push('Identical cleanliness standards');
      } else {
        score += 7;
      }

      // 5. Smoking (Dealbreaker / High priority)
      const smokeWeight = preferences.priorities.includes('Smoking') ? 1.4 : 1.0;
      if (profile.preferences.smoking === preferences.smoking) {
        score += Math.round(15 * smokeWeight);
        reasons.push('Matching non-smoker lifestyle');
      } else {
        score -= 10; // penalty
      }

      // 6. Food Habits (Veg / Non-Veg)
      const foodWeight = preferences.priorities.includes('Food Habits') ? 1.3 : 1.0;
      if (profile.preferences.food === preferences.food || profile.preferences.food === 'Any') {
        score += Math.round(10 * foodWeight);
        reasons.push(`Compatible food dining (${profile.preferences.food})`);
      } else {
        score += 3;
      }

      // 7. Academic Branch / Year affinity bonus
      if (profile.branch.includes('PICT') && preferences.branch.includes('PICT')) {
        score += 8;
        if (profile.branch === preferences.branch) {
          reasons.push(`Both studying ${profile.branch.split('(')[0].trim()}`);
        }
      }

      // Cap at 98%
      if (score > 98) score = 98;
      if (score < 45) score = 48;

      return {
        ...profile,
        matchScore: score,
        reasons: reasons.slice(0, 3)
      };
    });

    // Sorting
    if (sortBy === 'score') {
      scored.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'budget_asc') {
      scored.sort((a, b) => a.budget - b.budget);
    } else if (sortBy === 'year') {
      scored.sort((a, b) => a.year.localeCompare(b.year));
    }

    // Filters
    return scored.filter(p => {
      if (filterBranch !== 'all' && !p.branch.toLowerCase().includes(filterBranch.toLowerCase())) {
        return false;
      }
      if (filterSleep !== 'all' && p.preferences.sleepSchedule !== filterSleep) {
        return false;
      }
      return true;
    });
  }, [preferences, sortBy, filterBranch, filterSleep]);

  const handleToggleCompare = (student) => {
    setCompareList(prev => {
      const exists = prev.some(s => s.id === student.id);
      if (exists) return prev.filter(s => s.id !== student.id);
      if (prev.length >= 2) {
        return [prev[1], student]; // keep latest 2
      }
      return [...prev, student];
    });
  };

  const budgetPct = Math.round(((preferences.budget - 4500) / (15000 - 4500)) * 100);

  return (
    <div style={{ background: '#F7F8FA', minHeight: 'calc(100vh - 70px)', paddingBottom: '5rem' }}>
      
      {/* ═══════════ MAIN PAGE HEADER ═══════════ */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid #E2E8F0',
        padding: '2.5rem 0 2rem'
      }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.25rem' }}>
            <div>
              {/* Contextual Sub-label */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: '#EFF6FF',
                color: '#1688E8',
                border: '1px solid #BFDBFE',
                borderRadius: '6px',
                padding: '0.2rem 0.6rem',
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                marginBottom: '0.6rem'
              }}>
                <ShieldCheck size={13} color="#1688E8" /> PICT Pune Student Housing Community
              </div>

              {/* Compelling Headline */}
              <h1 style={{
                fontFamily: "'DM Serif Display', serif",
                fontSize: 'clamp(2rem, 3.5vw, 2.6rem)',
                fontWeight: 400,
                color: '#14243A',
                lineHeight: 1.15,
                margin: 0
              }}>
                Find Your Ideal Roommate
              </h1>

              {/* Supporting Text */}
              <p style={{
                fontSize: '0.92rem',
                color: '#64748B',
                marginTop: '0.35rem',
                fontWeight: 500,
                maxWidth: '620px'
              }}>
                Find someone who matches your lifestyle, budget, and college life around Dhankawadi, Katraj, and Trimurti Chowk.
              </p>
            </div>

            {/* View Switcher Pill */}
            <div style={{
              display: 'flex',
              background: '#F1F5F9',
              padding: '4px',
              borderRadius: '10px',
              border: '1px solid #E2E8F0'
            }}>
              <button
                type="button"
                onClick={() => setActiveView('preferences')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '7px',
                  border: 'none',
                  background: activeView === 'preferences' ? '#ffffff' : 'transparent',
                  color: activeView === 'preferences' ? '#14243A' : '#64748B',
                  fontWeight: activeView === 'preferences' ? 800 : 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: activeView === 'preferences' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.18s'
                }}
              >
                <SlidersHorizontal size={14} color={activeView === 'preferences' ? '#1688E8' : '#64748B'} />
                <span>1. Edit Preferences</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveView('results')}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '7px',
                  border: 'none',
                  background: activeView === 'results' ? '#ffffff' : 'transparent',
                  color: activeView === 'results' ? '#14243A' : '#64748B',
                  fontWeight: activeView === 'results' ? 800 : 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  boxShadow: activeView === 'results' ? '0 1px 4px rgba(0,0,0,0.06)' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  transition: 'all 0.18s'
                }}
              >
                <Users size={14} color={activeView === 'results' ? '#1688E8' : '#64748B'} />
                <span>2. View Matches ({matchedProfiles.length})</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ CONTENT AREA ═══════════ */}
      <div className="container" style={{ marginTop: '2rem' }}>
        
        {/* VIEW 1: PREFERENCE BUILDER (TWO-COLUMN LAYOUT) */}
        {activeView === 'preferences' && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) 360px',
            gap: '2rem',
            alignItems: 'start'
          }}>
            
            {/* LEFT COLUMN: 4 Logical Preference Sections */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              
              {/* ───────────────── SECTION 1: ACADEMIC PREFERENCES ───────────────── */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#EFF6FF', color: '#1688E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={16} />
                  </div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                    1. Academic Context
                  </h2>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                  Students from your campus or branch have synced academic schedules and lab timings.
                </p>

                {/* College Selection */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                    Campus
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {colleges.map(c => {
                      const sel = preferences.collegeId === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setPreferences({ ...preferences, collegeId: c.id })}
                          style={{
                            padding: '0.5rem 0.9rem',
                            borderRadius: '8px',
                            border: sel ? '2px solid #1688E8' : '1px solid #CBD5E1',
                            background: sel ? '#EFF6FF' : '#ffffff',
                            color: sel ? '#1688E8' : '#334155',
                            fontWeight: sel ? 800 : 600,
                            fontSize: '0.82rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem'
                          }}
                        >
                          <span>{c.shortName}</span>
                          <span style={{ fontSize: '0.7rem', color: sel ? '#1688E8' : '#94A3B8' }}>({c.area.split('/')[0].trim()})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Engineering Branch & Academic Year */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                      Engineering Branch
                    </label>
                    <select
                      className="input-field"
                      value={preferences.branch}
                      onChange={e => setPreferences({ ...preferences, branch: e.target.value })}
                      style={{ fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      <option value="Computer Engineering (PICT)">Computer Engineering (CS)</option>
                      <option value="Information Technology (PICT)">Information Technology (IT)</option>
                      <option value="AI & Data Science (PICT)">AI & Data Science (AIDS)</option>
                      <option value="Electronics & Telecom (PICT)">Electronics & Telecom (EnTC)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                      Academic Year
                    </label>
                    <select
                      className="input-field"
                      value={preferences.year}
                      onChange={e => setPreferences({ ...preferences, year: e.target.value })}
                      style={{ fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      <option value="1st Year (FE)">1st Year (FE - Fresher)</option>
                      <option value="2nd Year (SE)">2nd Year (SE)</option>
                      <option value="3rd Year (TE)">3rd Year (TE)</option>
                      <option value="4th Year (BE)">4th Year (BE - Final Year)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ───────────────── SECTION 2: BUDGET & ACCOMMODATION ───────────────── */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#DDF5E9', color: '#0D6838', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bookmark size={16} />
                  </div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                    2. Budget & Accommodation Preferences
                  </h2>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                  Specify your ideal rent per month and how you prefer your room to be configured.
                </p>

                {/* Elegant Budget Selector */}
                <div style={{
                  background: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  marginBottom: '1.25rem'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <div>
                      <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Monthly Budget Target
                      </span>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#14243A', fontFamily: "'Manrope', sans-serif" }}>
                        ₹{preferences.budget.toLocaleString('en-IN')}<span style={{ fontSize: '0.8rem', fontWeight: 500, color: '#64748B' }}> / month</span>
                      </div>
                    </div>

                    {/* Quick Budget Presets */}
                    <div style={{ display: 'flex', gap: '0.35rem' }}>
                      {[
                        { label: '₹6k Econ', val: 6000 },
                        { label: '₹7.5k Std', val: 7500 },
                        { label: '₹10k Prem', val: 10000 },
                      ].map(preset => (
                        <button
                          key={preset.label}
                          type="button"
                          onClick={() => setPreferences({ ...preferences, budget: preset.val })}
                          style={{
                            padding: '0.35rem 0.65rem',
                            borderRadius: '6px',
                            border: preferences.budget === preset.val ? '1.5px solid #1688E8' : '1px solid #CBD5E1',
                            background: preferences.budget === preset.val ? '#EFF6FF' : '#ffffff',
                            color: preferences.budget === preset.val ? '#1688E8' : '#475569',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Range Slider */}
                  <input
                    type="range"
                    min="4500"
                    max="15000"
                    step="500"
                    value={preferences.budget}
                    onChange={e => setPreferences({ ...preferences, budget: parseInt(e.target.value) })}
                    style={{ '--pct': `${budgetPct}%` }}
                    aria-label="Monthly budget range"
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginTop: '0.4rem', fontWeight: 600 }}>
                    <span>₹4,500 (Budget Triple)</span>
                    <span>₹8,500 (Double Sharing)</span>
                    <span>₹15,000 (Private Single)</span>
                  </div>
                </div>

                {/* Preferred Sharing Selection Cards */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                    Room Sharing Option
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    <SelectableOption
                      label="Single Sharing"
                      sublabel="Private room (₹9k–₹14k)"
                      selected={preferences.sharing === 'Single'}
                      onClick={() => setPreferences({ ...preferences, sharing: 'Single' })}
                    />
                    <SelectableOption
                      label="Double Sharing"
                      sublabel="Most popular (₹6k–₹9k)"
                      selected={preferences.sharing === 'Double'}
                      onClick={() => setPreferences({ ...preferences, sharing: 'Double' })}
                    />
                    <SelectableOption
                      label="Triple Sharing"
                      sublabel="Budget-friendly (₹5k–₹6.5k)"
                      selected={preferences.sharing === 'Triple'}
                      onClick={() => setPreferences({ ...preferences, sharing: 'Triple' })}
                    />
                  </div>
                </div>

                {/* Preferred Locality & Furnishing */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                      Preferred Hub / Locality
                    </label>
                    <select
                      className="input-field"
                      value={preferences.locality}
                      onChange={e => setPreferences({ ...preferences, locality: e.target.value })}
                      style={{ fontSize: '0.85rem' }}
                    >
                      <option value="Trimurti Chowk">Trimurti Chowk (5-6m walk to PICT)</option>
                      <option value="PICT Back Gate">PICT Back Gate (4m walk)</option>
                      <option value="Katraj Hub">Katraj Hub (Managed Stays)</option>
                      <option value="Dhankawadi">Dhankawadi Main Road</option>
                      <option value="Ambegaon Pathar">Ambegaon Pathar Belt</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                      Furnishing
                    </label>
                    <select
                      className="input-field"
                      value={preferences.furnished}
                      onChange={e => setPreferences({ ...preferences, furnished: e.target.value })}
                      style={{ fontSize: '0.85rem' }}
                    >
                      <option value="Furnished">Fully Furnished (Bed, Desk, Cupboard)</option>
                      <option value="Semi-Furnished">Semi-Furnished</option>
                      <option value="Any">Any / Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ───────────────── SECTION 3: LIFESTYLE COMPATIBILITY ───────────────── */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sparkles size={16} />
                  </div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                    3. Daily Lifestyle & Routine Compatibility
                  </h2>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1.25rem' }}>
                  Match daily living patterns so your academic focus and downtime harmonize.
                </p>

                {/* Trait 1: Sleep Schedule */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.45rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      Sleep & Study Schedule
                    </label>
                    <span style={{ fontSize: '0.72rem', color: '#1688E8', fontWeight: 700 }}>Critical Match Factor</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    <SelectableOption
                      label="Early Bird"
                      sublabel="Sleeps ~11 PM · 8 AM practical ready"
                      icon={Sun}
                      selected={preferences.sleepSchedule === 'Early Bird'}
                      onClick={() => setPreferences({ ...preferences, sleepSchedule: 'Early Bird' })}
                    />
                    <SelectableOption
                      label="Night Owl"
                      sublabel="Late night coding / study past 2 AM"
                      icon={Moon}
                      selected={preferences.sleepSchedule === 'Night Owl'}
                      onClick={() => setPreferences({ ...preferences, sleepSchedule: 'Night Owl' })}
                    />
                    <SelectableOption
                      label="Flexible Routine"
                      sublabel="Adjusts around exam & submission weeks"
                      icon={Clock}
                      selected={preferences.sleepSchedule === 'Flexible'}
                      onClick={() => setPreferences({ ...preferences, sleepSchedule: 'Flexible' })}
                    />
                  </div>
                </div>

                {/* Trait 2: Smoking Policy */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                    Smoking Preference
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
                    <SelectableOption
                      label="Non-smoking Room"
                      sublabel="Strictly smoke-free environment"
                      selected={preferences.smoking === 'Non-smoking'}
                      onClick={() => setPreferences({ ...preferences, smoking: 'Non-smoking' })}
                    />
                    <SelectableOption
                      label="Smoking Tolerant"
                      sublabel="Balcony or outside only"
                      selected={preferences.smoking === 'Smoking Allowed'}
                      onClick={() => setPreferences({ ...preferences, smoking: 'Smoking Allowed' })}
                    />
                  </div>
                </div>

                {/* Trait 3: Food / Mess Habits */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                    Food & Dining Preference
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    <SelectableOption
                      label="Vegetarian Only"
                      sublabel="Veg mess or tiffin service"
                      selected={preferences.food === 'Vegetarian'}
                      onClick={() => setPreferences({ ...preferences, food: 'Vegetarian' })}
                    />
                    <SelectableOption
                      label="Non-Veg Allowed"
                      sublabel="Comfortable with any mess food"
                      selected={preferences.food === 'Non-Vegetarian'}
                      onClick={() => setPreferences({ ...preferences, food: 'Non-Vegetarian' })}
                    />
                    <SelectableOption
                      label="Any / Flexible"
                      sublabel="No food preference restrictions"
                      selected={preferences.food === 'Any'}
                      onClick={() => setPreferences({ ...preferences, food: 'Any' })}
                    />
                  </div>
                </div>

                {/* Trait 4: Cleanliness Standards */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.45rem' }}>
                    Cleanliness & Organization
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
                    <SelectableOption
                      label="Very Clean"
                      sublabel="Daily tidy desk, clean washroom"
                      selected={preferences.cleanliness === 'Very Clean'}
                      onClick={() => setPreferences({ ...preferences, cleanliness: 'Very Clean' })}
                    />
                    <SelectableOption
                      label="Moderate & Tidy"
                      sublabel="Weekend cleaning, reasonable order"
                      selected={preferences.cleanliness === 'Moderate'}
                      onClick={() => setPreferences({ ...preferences, cleanliness: 'Moderate' })}
                    />
                    <SelectableOption
                      label="Relaxed"
                      sublabel="Easy-going, comfortable atmosphere"
                      selected={preferences.cleanliness === 'Relaxed'}
                      onClick={() => setPreferences({ ...preferences, cleanliness: 'Relaxed' })}
                    />
                  </div>
                </div>
              </div>

              {/* ───────────────── SECTION 4: COMPATIBILITY PRIORITIES ───────────────── */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '16px',
                padding: '1.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: '#EFF6FF', color: '#1688E8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award size={16} />
                  </div>
                  <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                    4. Top Dealbreaker Priorities (Pick up to 3)
                  </h2>
                </div>
                <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '1rem' }}>
                  Tell our algorithm which criteria matter most to you. Selected traits receive higher weighting in the compatibility score.
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {[
                    'Budget',
                    'Sleep Schedule',
                    'Cleanliness',
                    'Smoking',
                    'Food Habits',
                    'Study Habits'
                  ].map(trait => {
                    const isPrioritized = preferences.priorities.includes(trait);
                    return (
                      <button
                        key={trait}
                        type="button"
                        onClick={() => handleTogglePriority(trait)}
                        style={{
                          padding: '0.5rem 0.95rem',
                          borderRadius: '9999px',
                          border: isPrioritized ? '2px solid #1688E8' : '1px solid #CBD5E1',
                          background: isPrioritized ? '#1688E8' : '#F8FAFC',
                          color: isPrioritized ? '#ffffff' : '#334155',
                          fontWeight: 700,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          transition: 'all 0.18s'
                        }}
                      >
                        {isPrioritized && <Check size={12} strokeWidth={3} />}
                        <span>{trait}</span>
                        {isPrioritized && <span style={{ fontSize: '0.65rem', opacity: 0.85 }}>(Priority)</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Sticky Live Roommate Profile Preview & Matching Intelligence */}
            <div style={{ position: 'sticky', top: '90px' }}>
              
              {/* Profile Preview Card */}
              <div style={{
                background: '#ffffff',
                border: '1.5px solid #BFDBFE',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 8px 24px rgba(20, 36, 58, 0.08)',
                marginBottom: '1rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1688E8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Live Profile Preview
                  </span>
                  <span style={{ fontSize: '0.68rem', background: '#DDF5E9', color: '#0D6838', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: 700 }}>
                    Visible to Matches
                  </span>
                </div>

                {/* Candidate Simulation Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '10px',
                    background: '#14243A',
                    color: '#ffffff',
                    fontWeight: 800,
                    fontSize: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {user?.name ? user.name.slice(0, 2).toUpperCase() : 'PS'}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                      {user?.name || 'Your Name'}, {preferences.year.split('(')[0].trim()}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                      {preferences.branch}
                    </div>
                  </div>
                </div>

                {/* Budget & Sharing Pill */}
                <div style={{
                  background: '#F0F9FF',
                  border: '1px solid #BAE6FD',
                  borderRadius: '8px',
                  padding: '0.65rem 0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>TARGET RENT</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#1688E8' }}>
                      ₹{preferences.budget.toLocaleString('en-IN')}<span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>/mo</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.65rem', color: '#64748B', fontWeight: 600 }}>SHARING</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#14243A' }}>
                      {preferences.sharing} Room
                    </div>
                  </div>
                </div>

                {/* Dynamic Lifestyle Badges */}
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.45rem' }}>
                  Configured Routine Traits
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                  <span style={{ background: '#F1F5F9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.72rem', fontWeight: 600 }}>
                    {preferences.sleepSchedule === 'Night Owl' ? '🌙 Night Owl' : '☀️ Early Bird'}
                  </span>
                  <span style={{ background: '#F1F5F9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.72rem', fontWeight: 600 }}>
                    {preferences.food === 'Vegetarian' ? '🥗 Vegetarian' : '🍗 Non-Veg'}
                  </span>
                  <span style={{ background: '#F1F5F9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.72rem', fontWeight: 600 }}>
                    🧼 {preferences.cleanliness}
                  </span>
                  <span style={{ background: '#F1F5F9', color: '#334155', padding: '0.2rem 0.5rem', borderRadius: '5px', fontSize: '0.72rem', fontWeight: 600 }}>
                    📍 {preferences.locality}
                  </span>
                </div>

                {/* Primary Find Match CTA */}
                <button
                  type="button"
                  onClick={() => setActiveView('results')}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: '10px',
                    fontSize: '0.92rem',
                    fontWeight: 800,
                    background: '#1688E8',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(22, 136, 232, 0.35)'
                  }}
                >
                  <span>Find Compatible Roommates</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              {/* Matching Explanation Card */}
              <div style={{
                background: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '14px',
                padding: '1.25rem',
                fontSize: '0.78rem',
                color: '#64748B',
                lineHeight: 1.6
              }}>
                <div style={{ fontWeight: 800, color: '#14243A', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <ShieldCheck size={15} color="#1688E8" />
                  <span>How Compatibility is Calculated</span>
                </div>
                Scores are determined by cross-matching daily study hours, sleep times, non-smoking agreements, and proximity to your selected PICT hostel hub.
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: REAL MATCH DISCOVERY EXPERIENCE */}
        {activeView === 'results' && (
          <div>
            {/* Top Results Bar */}
            <div style={{
              background: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: '14px',
              padding: '1rem 1.25rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button
                  onClick={() => setActiveView('preferences')}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #CBD5E1',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem'
                  }}
                >
                  <SlidersHorizontal size={13} />
                  <span>Adjust Preferences</span>
                </button>

                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#14243A' }}>
                  Found <strong style={{ color: '#1688E8' }}>{matchedProfiles.length}</strong> compatible candidates
                </div>
              </div>

              {/* Sorting and Secondary Filters */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.8rem', color: '#64748B' }}>
                  <ArrowUpDown size={13} />
                  <span>Sort:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#14243A',
                    background: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <option value="score">Highest Compatibility</option>
                  <option value="budget_asc">Budget: Low to High</option>
                  <option value="year">Academic Year</option>
                </select>

                <select
                  value={filterSleep}
                  onChange={e => setFilterSleep(e.target.value)}
                  style={{
                    padding: '0.4rem 0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #CBD5E1',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#334155',
                    background: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  <option value="all">All Sleep Schedules</option>
                  <option value="Night Owl">Night Owls Only</option>
                  <option value="Early Bird">Early Birds Only</option>
                </select>

                {compareList.length > 0 && (
                  <button
                    onClick={() => setIsCompareOpen(true)}
                    style={{
                      background: '#14243A',
                      color: '#ffffff',
                      border: 'none',
                      padding: '0.45rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      cursor: 'pointer'
                    }}
                  >
                    <Scale size={13} color="#38BDF8" />
                    <span>Compare ({compareList.length})</span>
                  </button>
                )}
              </div>
            </div>

            {/* Roommate Cards Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
              {matchedProfiles.map(candidate => {
                const isCompared = compareList.some(s => s.id === candidate.id);
                const isSaved = isRoommateSaved(candidate.id);

                return (
                  <div
                    key={candidate.id}
                    style={{
                      background: '#ffffff',
                      borderRadius: '16px',
                      border: '1.5px solid #E2E8F0',
                      padding: '1.4rem',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#BFDBFE';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(22, 136, 232, 0.1)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <div>
                      {/* Top Header Row: Candidate Info + Score Badge */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                          {/* Avatar with Online Green Dot */}
                          <div style={{ position: 'relative' }}>
                            <img
                              src={candidate.avatar}
                              alt={candidate.name}
                              style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '12px',
                                objectFit: 'cover',
                                border: '1.5px solid #E2E8F0'
                              }}
                            />
                            <div style={{
                              position: 'absolute',
                              bottom: '-2px',
                              right: '-2px',
                              width: '12px',
                              height: '12px',
                              borderRadius: '50%',
                              background: '#10B981',
                              border: '2px solid #ffffff'
                            }} />
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                                {candidate.name}
                              </h3>
                              {candidate.verified && (
                                <span title="Verified PICT Student">
                                  <ShieldCheck size={15} color="#1688E8" />
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: '#64748B', marginTop: '2px' }}>
                              {candidate.branch} · {candidate.year}
                            </div>
                          </div>
                        </div>

                        {/* Match Score Badge with Kaizen Color Indicator */}
                        <div style={{
                          background: candidate.matchScore >= 85 ? '#EFF6FF' : '#F8FAFC',
                          border: `1.5px solid ${candidate.matchScore >= 85 ? '#BFDBFE' : '#E2E8F0'}`,
                          borderRadius: '10px',
                          padding: '0.35rem 0.65rem',
                          textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '1.15rem', fontWeight: 800, color: candidate.matchScore >= 85 ? '#1688E8' : '#14243A', lineHeight: 1 }}>
                            {candidate.matchScore}%
                          </div>
                          <div style={{ fontSize: '0.58rem', fontWeight: 700, color: '#64748B', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                            MATCH
                          </div>
                        </div>
                      </div>

                      {/* Locality & Budget Bar */}
                      <div style={{
                        background: '#F8FAFC',
                        border: '1px solid #F1F5F9',
                        borderRadius: '8px',
                        padding: '0.5rem 0.75rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.78rem',
                        marginBottom: '0.85rem'
                      }}>
                        <div style={{ color: '#334155', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin size={12} color="#1688E8" />
                          <span>{candidate.preferredLocality || 'Trimurti Chowk'}</span>
                        </div>
                        <div style={{ fontWeight: 800, color: '#14243A' }}>
                          ₹{candidate.budget.toLocaleString('en-IN')}<span style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 500 }}>/mo</span>
                        </div>
                      </div>

                      {/* Bio Quote */}
                      <p style={{
                        fontSize: '0.82rem',
                        color: '#475569',
                        lineHeight: 1.5,
                        fontStyle: 'italic',
                        marginBottom: '0.9rem',
                        background: '#ffffff',
                        borderLeft: '2.5px solid #1688E8',
                        paddingLeft: '0.5rem'
                      }}>
                        "{candidate.bio}"
                      </p>

                      {/* Genuine Shared Traits / Explanations */}
                      <div style={{ marginBottom: '1rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0D6838', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                          Why You Match:
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          {candidate.reasons.map((r, i) => (
                            <div key={i} style={{ fontSize: '0.75rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                              <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tag Chips */}
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.25rem' }}>
                        {candidate.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: '#F1F5F9',
                              color: '#475569',
                              padding: '0.18rem 0.5rem',
                              borderRadius: '4px',
                              fontSize: '0.7rem',
                              fontWeight: 600
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions Row */}
                    <div style={{
                      borderTop: '1px solid #F1F5F9',
                      paddingTop: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '0.5rem'
                    }}>
                      <div style={{ display: 'flex', gap: '0.35rem' }}>
                        {/* Bookmark Button */}
                        <button
                          onClick={() => toggleSaveRoommate(candidate)}
                          title={isSaved ? "Saved! Click to remove" : "Save this roommate"}
                          style={{
                            width: '34px',
                            height: '34px',
                            borderRadius: '8px',
                            border: isSaved ? '1.5px solid #1688E8' : '1px solid #CBD5E1',
                            background: isSaved ? '#EFF6FF' : '#ffffff',
                            color: isSaved ? '#1688E8' : '#64748B',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                        >
                          <Bookmark size={15} fill={isSaved ? '#1688E8' : 'none'} />
                        </button>

                        {/* Compare Toggle */}
                        <button
                          onClick={() => handleToggleCompare(candidate)}
                          title="Add to comparison"
                          style={{
                            padding: '0 0.65rem',
                            height: '34px',
                            borderRadius: '8px',
                            border: isCompared ? '1.5px solid #14243A' : '1px solid #CBD5E1',
                            background: isCompared ? '#14243A' : '#ffffff',
                            color: isCompared ? '#ffffff' : '#475569',
                            fontSize: '0.72rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            cursor: 'pointer'
                          }}
                        >
                          <Scale size={13} />
                          <span>{isCompared ? 'Compared' : 'Compare'}</span>
                        </button>
                      </div>

                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        <button
                          onClick={() => setDetailModalStudent(candidate)}
                          style={{
                            padding: '0.45rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            background: '#ffffff',
                            color: '#14243A',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            cursor: 'pointer'
                          }}
                        >
                          Profile
                        </button>

                        <button
                          onClick={() => {
                            setConnectModalStudent(candidate);
                            setConnectMessage(`Hi ${candidate.name.split(' ')[0]}, I saw your profile on PG Scout. I'm also looking for a roommate near PICT and our preferences match!`);
                            setConnectSent(false);
                          }}
                          style={{
                            padding: '0.45rem 0.9rem',
                            borderRadius: '8px',
                            border: 'none',
                            background: '#1688E8',
                            color: '#ffffff',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 8px rgba(22, 136, 232, 0.25)'
                          }}
                        >
                          <MessageSquare size={13} />
                          <span>Connect</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {matchedProfiles.length === 0 && (
              <div style={{
                background: '#ffffff',
                border: '1.5px dashed #CBD5E1',
                borderRadius: '16px',
                padding: '3.5rem 1rem',
                textAlign: 'center',
                maxWidth: '520px',
                margin: '2rem auto'
              }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EFF6FF', color: '#1688E8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Users size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#14243A', marginBottom: '0.35rem' }}>
                  No Roommates Matching Current Filter
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginBottom: '1.25rem' }}>
                  Try resetting the branch or sleep schedule filter to view all verified candidates.
                </p>
                <button
                  onClick={() => {
                    setFilterBranch('all');
                    setFilterSleep('all');
                  }}
                  className="btn btn-outline btn-sm"
                >
                  <RotateCcw size={14} /> Reset Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ═══════════ CONNECT / MESSAGE MODAL ═══════════ */}
      {connectModalStudent && (
        <div className="modal-backdrop" onClick={() => setConnectModalStudent(null)}>
          <div
            className="modal-content animate-slide-up"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '520px', borderRadius: '18px', padding: 0, overflow: 'hidden' }}
          >
            {/* Modal Header */}
            <div style={{
              background: '#14243A',
              color: '#ffffff',
              padding: '1.25rem 1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                  Connect with {connectModalStudent.name}
                </h3>
                <div style={{ fontSize: '0.75rem', color: '#94A3B8', marginTop: '2px' }}>
                  {connectModalStudent.branch} · {connectModalStudent.matchScore}% Compatibility
                </div>
              </div>
              <button
                onClick={() => setConnectModalStudent(null)}
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#ffffff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '1.5rem' }}>
              {connectSent ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#DDF5E9', color: '#0D6838', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#14243A', marginBottom: '0.35rem' }}>
                    Connection Request Delivered!
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: '#64748B', maxWidth: '380px', margin: '0 auto 1.25rem' }}>
                    Your message and profile summary have been sent to <strong>{connectModalStudent.name}</strong>. You'll receive a notification on WhatsApp once they respond.
                  </p>
                  <button
                    onClick={() => setConnectModalStudent(null)}
                    className="btn btn-primary"
                    style={{ background: '#1688E8', padding: '0.65rem 1.75rem' }}
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setConnectSent(true); }}>
                  <div style={{
                    background: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '10px',
                    padding: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <img
                      src={connectModalStudent.avatar}
                      alt={connectModalStudent.name}
                      style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14243A' }}>
                        Preferred: {connectModalStudent.preferredHostel || 'Near PICT'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        Budget: ₹{connectModalStudent.budget}/mo · {connectModalStudent.preferences.sleepSchedule}
                      </div>
                    </div>
                  </div>

                  <div className="input-group" style={{ marginBottom: '1.25rem' }}>
                    <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>
                      Introduction Note
                    </label>
                    <textarea
                      rows={4}
                      className="input-field"
                      value={connectMessage}
                      onChange={e => setConnectMessage(e.target.value)}
                      placeholder="Say hi and share your hostel plans..."
                      required
                      style={{ fontSize: '0.85rem', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        flex: 1,
                        background: '#1688E8',
                        padding: '0.75rem',
                        fontSize: '0.88rem',
                        borderRadius: '10px',
                        cursor: 'pointer'
                      }}
                    >
                      <Send size={15} /> Send Connection Request
                    </button>
                    <button
                      type="button"
                      onClick={() => setConnectModalStudent(null)}
                      style={{
                        background: '#F1F5F9',
                        border: 'none',
                        color: '#475569',
                        padding: '0.75rem 1rem',
                        borderRadius: '10px',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ FULL CANDIDATE PROFILE MODAL ═══════════ */}
      {detailModalStudent && (
        <div className="modal-backdrop" onClick={() => setDetailModalStudent(null)}>
          <div
            className="modal-content animate-slide-up"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '600px', borderRadius: '18px', padding: 0, overflow: 'hidden' }}
          >
            <div style={{
              background: '#14243A',
              color: '#ffffff',
              padding: '1.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <img
                  src={detailModalStudent.avatar}
                  alt={detailModalStudent.name}
                  style={{ width: '54px', height: '54px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                    {detailModalStudent.name}, {detailModalStudent.age}
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px' }}>
                    {detailModalStudent.branch} · {detailModalStudent.year}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setDetailModalStudent(null)}
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '1.5rem', maxHeight: '70vh', overflowY: 'auto' }}>
              <div style={{
                background: '#EFF6FF',
                border: '1.5px solid #BFDBFE',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.25rem'
              }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#1688E8', fontWeight: 800, textTransform: 'uppercase' }}>
                    Compatibility Score
                  </div>
                  <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#14243A' }}>
                    {detailModalStudent.matchScore}% Compatible
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 700 }}>MONTHLY BUDGET</div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14243A' }}>
                    ₹{detailModalStudent.budget.toLocaleString('en-IN')}/mo
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
                  Student Bio & Background
                </div>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6, background: '#F8FAFC', padding: '0.85rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  {detailModalStudent.bio}
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>SLEEP HABIT</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14243A' }}>{detailModalStudent.preferences.sleepSchedule}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>FOOD DIET</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14243A' }}>{detailModalStudent.preferences.food}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>CLEANLINESS</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14243A' }}>{detailModalStudent.preferences.cleanliness}</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '0.75rem', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>STUDY ENVIRONMENT</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14243A' }}>{detailModalStudent.preferences.studyHabits}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => {
                    setDetailModalStudent(null);
                    setConnectModalStudent(detailModalStudent);
                    setConnectMessage(`Hi ${detailModalStudent.name.split(' ')[0]}, I read your full profile on PG Scout and would like to connect for room sharing!`);
                    setConnectSent(false);
                  }}
                  className="btn btn-primary"
                  style={{ flex: 1, background: '#1688E8', padding: '0.75rem' }}
                >
                  <MessageSquare size={15} /> Connect with {detailModalStudent.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ COMPARISON MODAL (SIDE BY SIDE) ═══════════ */}
      {isCompareOpen && (
        <div className="modal-backdrop" onClick={() => setIsCompareOpen(false)}>
          <div
            className="modal-content animate-slide-up"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '680px', borderRadius: '18px', padding: 0, overflow: 'hidden' }}
          >
            <div style={{ background: '#14243A', color: '#ffffff', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Scale size={18} color="#38BDF8" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                  Compare Potential Roommates
                </h3>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                style={{ background: 'rgba(255, 255, 255, 0.1)', border: 'none', color: '#ffffff', width: '30px', height: '30px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ padding: '1.5rem' }}>
              {compareList.length < 2 ? (
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <p style={{ color: '#64748B', fontSize: '0.9rem' }}>Please select at least 2 roommate candidates using the "Compare" button on their cards.</p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid #E2E8F0', color: '#64748B', width: '30%' }}>Criteria</th>
                        {compareList.map(s => (
                          <th key={s.id} style={{ textAlign: 'left', padding: '0.75rem', borderBottom: '2px solid #E2E8F0', color: '#14243A', width: '35%' }}>
                            <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{s.name}</div>
                            <div style={{ fontSize: '0.72rem', color: '#1688E8', fontWeight: 700 }}>{s.matchScore}% Match</div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 600, color: '#64748B' }}>Branch</td>
                        {compareList.map(s => <td key={s.id} style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 700 }}>{s.branch}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 600, color: '#64748B' }}>Monthly Budget</td>
                        {compareList.map(s => <td key={s.id} style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 800, color: '#1688E8' }}>₹{s.budget}/mo</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 600, color: '#64748B' }}>Sleep Routine</td>
                        {compareList.map(s => <td key={s.id} style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 700 }}>{s.preferences.sleepSchedule}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 600, color: '#64748B' }}>Food Habit</td>
                        {compareList.map(s => <td key={s.id} style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 700 }}>{s.preferences.food}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 600, color: '#64748B' }}>Cleanliness</td>
                        {compareList.map(s => <td key={s.id} style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 700 }}>{s.preferences.cleanliness}</td>)}
                      </tr>
                      <tr>
                        <td style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontWeight: 600, color: '#64748B' }}>Preferred Hostel</td>
                        {compareList.map(s => <td key={s.id} style={{ padding: '0.65rem 0.75rem', borderBottom: '1px solid #F1F5F9', fontSize: '0.78rem' }}>{s.preferredHostel || 'Near PICT'}</td>)}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Responsive Breakpoints */}
      <style>{`
        @media (max-width: 900px) {
          .container > div[style*="grid-template-columns: minmax(0, 1fr) 360px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
