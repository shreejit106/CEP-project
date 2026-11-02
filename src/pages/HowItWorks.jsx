import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Search, 
  Layers, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  ExternalLink, 
  Lock, 
  Eye, 
  Trash2, 
  SlidersHorizontal, 
  Clock, 
  Compass, 
  MapPin, 
  Star, 
  Database, 
  Cpu, 
  FileText, 
  ArrowRight,
  Wifi,
  Utensils,
  Moon,
  Sun,
  Award
} from 'lucide-react';

export default function HowItWorks() {
  // ── 1. Interactive Process Stage State ──
  const [activeStage, setActiveStage] = useState(0);

  // ── 2. Interactive Data Source State ──
  const [activeSource, setActiveSource] = useState('scout');

  // ── 3. Interactive Review Demo State ──
  const [selectedReviewIdx, setSelectedReviewIdx] = useState(0);

  // ── 4. Interactive Recommendation Simulator State ──
  const [simBudget, setSimBudget] = useState(7500);
  const [simWalkTime, setSimWalkTime] = useState(8);
  const [simPriority, setSimPriority] = useState('wifi');

  // Timeline stages data
  const processStages = [
    {
      id: 0,
      number: '01',
      title: 'Discover Accommodation Data',
      subtitle: 'Multi-source ingestion & place matching',
      icon: Search,
      color: '#1688E8',
      whatHappens: 'We aggregate public listings, direct hostel manager submissions, and Google Maps place identifiers across Katraj, Dhankawadi, and Trimurti Chowk.',
      dataInvolved: 'Property names, physical addresses, geographic coordinates (lat/lng), contact numbers, and Google Place IDs.',
      systemsUsed: 'Google Places API (Place Search/Details), Owner KYC Verification Portal, and Scout Campus Ingestion Engine.',
      informationProduced: 'A deduplicated, standardized directory entry mapped to PICT Pune campus proximity.',
      limitations: 'Google content is never scraped or permanently stored. Only permitted Place IDs and transient ratings are referenced.'
    },
    {
      id: 1,
      number: '02',
      title: 'Structure Pricing, Rooms & Facilities',
      subtitle: 'Separating availability from uptime quality',
      icon: Layers,
      color: '#0D6838',
      whatHappens: 'Flat amenities like "Wi-Fi" or "Solar Water" are broken down into verified uptime reliability, room-sharing pricing tiers (Single, Double, Triple), and security deposits.',
      dataInvolved: 'Per-bed rental rates, security deposits, notice periods, tested Wi-Fi bandwidth (Mbps), and solar hot water timings.',
      systemsUsed: 'Facility Intelligence Normalizer and Room Configuration Relational Schema.',
      informationProduced: 'Structured facility scorecards with 3-tier provenance (Scout Inspected vs Student Verified vs Owner Stated).',
      limitations: 'Owner claims remain tagged as "Owner Stated" until physically inspected by campus ambassadors.'
    },
    {
      id: 2,
      number: '03',
      title: 'Aspect-Based Review Intelligence',
      subtitle: 'NLP analysis across 10 vital student dimensions',
      icon: Sparkles,
      color: '#8B5CF6',
      whatHappens: 'Student resident reviews are evaluated using aspect-based sentiment analysis to extract specific qualitative feedback on food, Wi-Fi speed, washroom cleanliness, and noise.',
      dataInvolved: 'Authenticated resident reviews, academic year, stay duration, and multilingual keywords in English, Hindi, and Marathi.',
      systemsUsed: 'Rule-based NLP Aspect Sentiment Extractor and Bayesian Rating Smoother.',
      informationProduced: 'Aspect radar scores (1.0 to 5.0) with genuine evidence quotes, polarity confidence, and severity tags.',
      limitations: 'Algorithmic interpretations are strictly separated from raw review text. AI sentiment never overrides factual reports.'
    },
    {
      id: 3,
      number: '04',
      title: 'Compare Student Preferences',
      subtitle: 'Hard constraints & weighted dealbreakers',
      icon: SlidersHorizontal,
      color: '#F59E0B',
      whatHappens: 'The student selects budget limits, target sharing type, and critical priorities (e.g., "Must have reliable Wi-Fi for competitive coding" or "Quiet study environment").',
      dataInvolved: 'Student budget target, preferred sharing tier, maximum walk time, and selected priority dealbreakers.',
      systemsUsed: 'Preference Normalization Engine and Constraint Satisfaction Evaluator.',
      informationProduced: 'A personalized preference vector that weights each accommodation criterion dynamically.',
      limitations: 'Hard dealbreakers (e.g., boys/girls restriction or strict budget caps) completely filter out non-viable listings.'
    },
    {
      id: 4,
      number: '05',
      title: 'Generate Explainable Recommendations',
      subtitle: 'Transparent utility scoring with trade-off insights',
      icon: Award,
      color: '#0284C7',
      whatHappens: 'Each residence receives a multi-criteria utility match percentage. We show exactly why it matched and what trade-offs you make.',
      dataInvolved: 'Bayesian ratings, distance from PICT gates, room prices, aspect scores, and user preference weights.',
      systemsUsed: 'PG Scout Recommendation Utility Algorithm and Trade-off Explanation Generator.',
      informationProduced: 'Match percentage (0–98%), "Why Recommended" rationale chips, and clear trade-off warnings (e.g., "Saves ₹1,200/mo but 9 mins walk").',
      limitations: 'Scores reflect lifestyle and academic compatibility; they do not replace scheduling an in-person hostel visit.'
    }
  ];

  // Data Sources Explorer items
  const dataSources = {
    scout: {
      title: 'PG Scout Physical Verification',
      category: 'Independently Verified by Students',
      badge: 'Highest Trust Tier',
      badgeColor: '#0D6838',
      bgColor: '#DDF5E9',
      whatWeGet: 'Actual Wi-Fi speed tests (Mbps), solar water availability hours, washroom cleanliness audits, and building entrance security verification.',
      howUsed: 'Awards the "Scout Inspected" green badge and provides high-confidence uptime percentages.',
      provenance: 'Internal PG Scout field team (PICT student campus ambassadors).',
      attribution: 'Attributed directly to PG Scout inspection audits with verification timestamps.',
      limitations: 'Inspections reflect conditions on the audit date. Physical re-inspections occur every 90–120 days.'
    },
    reviews: {
      title: 'Authenticated Student Reviews',
      category: 'User-Generated Resident Feedback',
      badge: 'Community Verified',
      badgeColor: '#1688E8',
      bgColor: '#EFF6FF',
      whatWeGet: 'Firsthand resident experiences detailing mess food taste, caretaker responsiveness, exam-season study atmosphere, and hidden costs.',
      howUsed: 'Powers aspect-based sentiment analysis, evidence quotes, and Bayesian rating calculations.',
      provenance: 'Enrolled college students verified via institutional email (@pict.edu) or phone confirmation.',
      attribution: 'Author name, branch (e.g. "PICT CS"), and year of study displayed transparently.',
      limitations: 'Reflects individual subjective experiences. Single negative reviews never automatically de-list a facility.'
    },
    owners: {
      title: 'Hostel Manager / Owner Submissions',
      category: 'Management-Reported Information',
      badge: 'Pending Verification',
      badgeColor: '#B45309',
      bgColor: '#FEF3C7',
      whatWeGet: 'Base monthly rents, single/double/triple sharing availability, security deposit amounts, and direct WhatsApp contact numbers.',
      howUsed: 'Provides preliminary pricing and room availability before physical inspection.',
      provenance: 'Submitted directly by local hostel managers and landlords in Dhankawadi/Katraj.',
      attribution: 'Labeled as "Owner Stated" to clearly separate unverified assertions from tested reality.',
      limitations: 'May contain optimistic claims. Unverified facilities are flagged until confirmed by students or scouts.'
    },
    google: {
      title: 'Google Places Platform Metadata',
      category: 'External Place Reference (Compliant)',
      badge: 'Official Google Reference',
      badgeColor: '#475569',
      bgColor: '#F1F5F9',
      whatWeGet: 'Official Google Place ID, external average rating, total Google review count, and geographic coordinates for map routing.',
      howUsed: 'Provides a secondary external benchmark rating and one-click navigation links to Google Maps.',
      provenance: 'Retrieved on-demand via Google Places API in accordance with Google Maps Platform Terms of Service.',
      attribution: 'Accompanied by Google logo citations and direct links to the Google Maps place listing.',
      limitations: 'We NEVER scrape Google Maps, bulk-download reviews, or permanently cache Google photos contrary to its terms.'
    },
    photos: {
      title: 'Resident & Scout Photography',
      category: 'Licensed & Resident Media',
      badge: 'Visual Provenance',
      badgeColor: '#0284C7',
      bgColor: '#E0F2FE',
      whatWeGet: 'Real photographs of room study desks, washrooms, dining areas, and exterior building entrances.',
      howUsed: 'Displayed in room carousels to help students inspect room conditions prior to booking a visit.',
      provenance: 'Uploaded by verified student residents or captured during scout inspections.',
      attribution: 'Each photo card displays its exact provenance (e.g. "Scout Inspection Photo" or "Resident Upload").',
      limitations: 'If a property lacks verified photography, standard illustrative imagery is clearly labeled as "Illustrative".'
    }
  };

  // Sample reviews for NLP demo
  const sampleReviews = [
    {
      author: 'Omkar Bhosale',
      branch: 'PICT EnTC, 2nd Year',
      date: '3 weeks ago',
      text: 'Very close to PICT via Trimurti chowk, just 6 minutes walk. The owner uncle is helpful and rooms are cleaned regularly every morning. Wi-Fi speed is around 45 Mbps which is fast for coding assignments. Only drawback is solar hot water is restricted to 7 AM to 9:30 AM.',
      aspects: [
        { name: 'Commute / Proximity', sentiment: 'positive', score: '5.0', quote: 'just 6 minutes walk via Trimurti chowk' },
        { name: 'Cleanliness', sentiment: 'positive', score: '4.8', quote: 'rooms are cleaned regularly every morning' },
        { name: 'Staff & Owner', sentiment: 'positive', score: '4.7', quote: 'owner uncle is helpful' },
        { name: 'Wi-Fi & Internet', sentiment: 'positive', score: '4.5', quote: 'around 45 Mbps which is fast for coding' },
        { name: 'Water & Electricity', sentiment: 'negative', score: '3.2', quote: 'solar hot water restricted to 7 AM to 9:30 AM' }
      ]
    },
    {
      author: 'Pranav Joshi',
      branch: 'PICT CS, 1st Year',
      date: '1 month ago',
      text: 'Quiet study environment with respectful roommates. No loud noise after 11 PM so great for DSA practice. Mess food is decent vegetarian tiffin, but sometimes repetitive on weekdays. Safe building with night caretaker.',
      aspects: [
        { name: 'Noise & Study', sentiment: 'positive', score: '4.9', quote: 'quiet study environment, no loud noise after 11 PM' },
        { name: 'Safety & Security', sentiment: 'positive', score: '4.6', quote: 'safe building with night caretaker' },
        { name: 'Food & Mess', sentiment: 'neutral', score: '3.6', quote: 'decent vegetarian tiffin, but repetitive on weekdays' },
        { name: 'Room Quality', sentiment: 'positive', score: '4.4', quote: 'respectful roommates, great for DSA practice' }
      ]
    }
  ];

  // Dynamic recommendation calculation simulation
  const calcSimResult = () => {
    let score = 92;
    const reasons = [];
    const tradeoffs = [];

    // Budget impact
    if (simBudget >= 7500) {
      score += 3;
      reasons.push(`Comfortably within target budget (₹${simBudget.toLocaleString('en-IN')}/mo)`);
    } else {
      score -= 5;
      tradeoffs.push(`₹${(7500 - simBudget).toLocaleString('en-IN')}/mo below standard double sharing rate`);
    }

    // Walk time impact
    if (simWalkTime <= 7) {
      score += 3;
      reasons.push(`Ultra-short commute: ~${simWalkTime} mins walk to PICT gates`);
    } else {
      score -= 4;
      tradeoffs.push(`${simWalkTime} mins walking distance from campus`);
    }

    // Priority aspect
    if (simPriority === 'wifi') {
      reasons.push('High-speed fiber Wi-Fi tested at 50+ Mbps with 95% uptime');
    } else if (simPriority === 'noise') {
      reasons.push('Strict 11 PM quiet study hours enforced for exam focus');
    } else if (simPriority === 'food') {
      reasons.push('Pure vegetarian mess available with optional tiffin service');
    } else if (simPriority === 'cleanliness') {
      reasons.push('Daily corridor and washroom housekeeping staff verified');
    }

    const bayesian = 4.54; // derived from 48 reviews @ 4.6 against C=4.25
    return {
      matchPct: Math.min(98, Math.max(55, score)),
      bayesianRating: bayesian,
      reasons,
      tradeoffs
    };
  };

  const simResult = calcSimResult();

  return (
    <div style={{ background: '#F7F8FA', minHeight: 'calc(100vh - 70px)', paddingBottom: '6rem' }}>
      
      {/* ══════════════ 1. HERO SECTION ══════════════ */}
      <section style={{
        background: '#ffffff',
        borderBottom: '1px solid #E2E8F0',
        padding: '3.5rem 0 3rem'
      }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            
            {/* Pill Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: '#EFF6FF',
              color: '#1688E8',
              border: '1px solid #BFDBFE',
              borderRadius: '999px',
              padding: '0.25rem 0.85rem',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              <ShieldCheck size={14} color="#1688E8" />
              <span>Transparency & Methodology</span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
              fontWeight: 800,
              color: '#14243A',
              lineHeight: 1.15,
              margin: '0 0 1rem',
              letterSpacing: '-0.02em'
            }}>
              How PG Scout Works
            </h1>

            <p style={{
              fontSize: '1.1rem',
              color: '#64748B',
              lineHeight: 1.6,
              maxWidth: '640px',
              margin: '0 auto 2.5rem',
              fontWeight: 500
            }}>
              Understand the information behind your accommodation decisions. No fake ratings, zero hidden brokerage, and explainable recommendations.
            </p>

            {/* Three Visual Concepts (Discover · Understand · Match) */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.25rem',
              textAlign: 'left'
            }}>
              <div style={{
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.35rem'
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', color: '#1688E8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Search size={18} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14243A', margin: '0 0 0.35rem' }}>
                  1. Discover
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Aggregated from owner submissions, Google Maps place coordinates, and physical scout audits around PICT Pune.
                </p>
              </div>

              <div style={{
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.35rem'
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#DDF5E9', color: '#0D6838', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Sparkles size={18} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14243A', margin: '0 0 0.35rem' }}>
                  2. Understand
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Aspect-based review NLP, facility uptime metrics (speed & solar hours), and Bayesian-adjusted ratings.
                </p>
              </div>

              <div style={{
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.35rem'
              }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                  <Award size={18} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#14243A', margin: '0 0 0.35rem' }}>
                  3. Match
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  Multi-criteria utility matching with clear trade-off explanations and verified student roommate discovery.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ 2. INTERACTIVE PROCESS TIMELINE ══════════════ */}
      <section style={{ padding: '3.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1688E8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Step-by-Step Architecture
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#14243A', margin: '0.35rem 0 0.5rem' }}>
              The 5-Stage Information Lifecycle
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '580px', margin: '0 auto' }}>
              Click any stage in the pipeline to inspect what happens, which systems run, and what limitations exist.
            </p>
          </div>

          {/* Timeline Horizontal Stage Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            {processStages.map((stage) => {
              const isSelected = activeStage === stage.id;
              const Icon = stage.icon;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStage(stage.id)}
                  style={{
                    background: isSelected ? '#FFFFFF' : '#F1F5F9',
                    border: isSelected ? `2px solid ${stage.color}` : '1.5px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '1.15rem 1rem',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease',
                    boxShadow: isSelected ? '0 6px 18px rgba(0,0,0,0.06)' : 'none',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: isSelected ? stage.color : '#94A3B8' }}>
                      {stage.number}
                    </span>
                    <Icon size={16} color={isSelected ? stage.color : '#64748B'} />
                  </div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#14243A', margin: '0 0 0.2rem', lineHeight: 1.3 }}>
                    {stage.title}
                  </h4>
                  <p style={{ fontSize: '0.7rem', color: '#64748B', margin: 0, lineHeight: 1.3 }}>
                    {stage.subtitle}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Active Stage Detailed Inspection Card */}
          {(() => {
            const current = processStages[activeStage];
            return (
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #BFDBFE',
                borderRadius: '16px',
                padding: '2rem',
                boxShadow: '0 4px 20px rgba(22, 136, 232, 0.06)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.25rem' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#EFF6FF', color: current.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <current.icon size={18} />
                  </div>
                  <div>
                    <span style={{ fontSize: '0.72rem', fontWeight: 800, color: current.color, textTransform: 'uppercase' }}>
                      Stage {current.number} Audit
                    </span>
                    <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                      {current.title}
                    </h3>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#F8FAFC', padding: '1.15rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#14243A', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                      <CheckCircle2 size={15} color="#10B981" /> What Happens at this Stage
                    </strong>
                    <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {current.whatHappens}
                    </p>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '1.15rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <strong style={{ fontSize: '0.82rem', color: '#14243A', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.35rem' }}>
                      <Database size={15} color="#1688E8" /> Data Involved
                    </strong>
                    <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {current.dataInvolved}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>SYSTEMS & ENGINES</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14243A', marginTop: '0.25rem' }}>{current.systemsUsed}</div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0D6838', textTransform: 'uppercase' }}>INFORMATION PRODUCED</span>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#14243A', marginTop: '0.25rem' }}>{current.informationProduced}</div>
                  </div>

                  <div style={{ background: '#FEF3C7', padding: '1rem', borderRadius: '10px', border: '1px solid #FDE68A' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase' }}>KNOWN LIMITATIONS</span>
                    <div style={{ fontSize: '0.8rem', color: '#78350F', marginTop: '0.25rem', lineHeight: 1.4 }}>{current.limitations}</div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ══════════════ 3. DATA SOURCE TRANSPARENCY EXPLORER ══════════════ */}
      <section style={{ padding: '3.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D6838', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Data Governance & Provenance
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#14243A', margin: '0.35rem 0 0.5rem' }}>
              Where PG Scout Gets Information
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '620px', margin: '0 auto' }}>
              We maintain strict boundaries between official partner metadata, user-generated resident reviews, and physical campus inspection audits.
            </p>
          </div>

          {/* Interactive Source Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { id: 'scout', label: '🛡️ Scout Physical Audits' },
              { id: 'reviews', label: '🎓 Student Reviews' },
              { id: 'owners', label: '🏢 Owner Submissions' },
              { id: 'google', label: '🗺️ Google Places API' },
              { id: 'photos', label: '📸 Visual Assets' },
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveSource(tab.id)}
                style={{
                  padding: '0.6rem 1.15rem',
                  borderRadius: '999px',
                  border: activeSource === tab.id ? '2px solid #1688E8' : '1px solid #CBD5E1',
                  background: activeSource === tab.id ? '#1688E8' : '#FFFFFF',
                  color: activeSource === tab.id ? '#FFFFFF' : '#334155',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Data Source Breakdown Card */}
          {(() => {
            const src = dataSources[activeSource];
            return (
              <div style={{
                background: '#FFFFFF',
                border: '1.5px solid #E2E8F0',
                borderRadius: '16px',
                padding: '2rem',
                maxWidth: '920px',
                margin: '0 auto',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div>
                    <span style={{
                      background: src.bgColor,
                      color: src.badgeColor,
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      padding: '0.2rem 0.6rem',
                      borderRadius: '4px',
                      textTransform: 'uppercase'
                    }}>
                      {src.badge}
                    </span>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#14243A', margin: '0.4rem 0 0.2rem' }}>
                      {src.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      Classification: {src.category}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      WHAT INFORMATION IS OBTAINED
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {src.whatWeGet}
                    </p>
                  </div>

                  <div style={{ background: '#F8FAFC', padding: '1rem', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#334155', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      HOW IT IS USED IN RECOMMENDATIONS
                    </div>
                    <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                      {src.howUsed}
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }}>
                  <div style={{ background: '#EFF6FF', padding: '1rem', borderRadius: '10px', border: '1px solid #BFDBFE' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#1688E8', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      DATA PROVENANCE & ATTRIBUTION
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#1E40AF', lineHeight: 1.5, margin: 0 }}>
                      {src.attribution}
                    </p>
                  </div>

                  <div style={{ background: '#FEF3C7', padding: '1rem', borderRadius: '10px', border: '1px solid #FDE68A' }}>
                    <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      BOUNDARIES & LIMITATIONS
                    </div>
                    <p style={{ fontSize: '0.8rem', color: '#78350F', lineHeight: 1.4, margin: 0 }}>
                      {src.limitations}
                    </p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </section>

      {/* ══════════════ 4. INTERACTIVE REVIEW NLP DEMONSTRATION ══════════════ */}
      <section style={{ padding: '3.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Aspect-Based Sentiment Extraction
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#14243A', margin: '0.35rem 0 0.5rem' }}>
              How We Analyze Student Reviews
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
              Raw student feedback is unstructured. Our keyword-based NLP parser isolates specific claims across 10 vital aspects without altering the original review.
            </p>
          </div>

          <div style={{ maxWidth: '960px', margin: '0 auto' }}>
            {/* Review Selector Pill Bar */}
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', justifyContent: 'center' }}>
              {sampleReviews.map((rev, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedReviewIdx(idx)}
                  style={{
                    padding: '0.45rem 1rem',
                    borderRadius: '8px',
                    border: selectedReviewIdx === idx ? '1.5px solid #8B5CF6' : '1px solid #CBD5E1',
                    background: selectedReviewIdx === idx ? '#F5F3FF' : '#FFFFFF',
                    color: selectedReviewIdx === idx ? '#7C3AED' : '#475569',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Review Demo #{idx + 1}: {rev.author} ({rev.branch})
                </button>
              ))}
            </div>

            {/* Side-by-Side: Original Text vs Algorithmic Interpretation */}
            {(() => {
              const curRev = sampleReviews[selectedReviewIdx];
              return (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.2fr',
                  gap: '1.5rem',
                  background: '#FFFFFF',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.03)'
                }}>
                  {/* Left Column: Raw Student Review */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Original Student Text (Unedited)
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#10B981', fontWeight: 700 }}>
                        ✓ Verified Resident
                      </span>
                    </div>

                    <div style={{
                      background: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: '10px',
                      padding: '1.25rem',
                      fontSize: '0.9rem',
                      lineHeight: 1.7,
                      color: '#14243A',
                      fontStyle: 'italic',
                      marginBottom: '1rem'
                    }}>
                      "{curRev.text}"
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      <strong>Author:</strong> {curRev.author} · {curRev.branch}
                      <br />
                      <strong>Submitted:</strong> {curRev.date}
                    </div>
                  </div>

                  {/* Right Column: Structured Aspect Extractor Output */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8B5CF6', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Extracted Aspect Intelligence (Algorithm Output)
                      </span>
                      <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
                        Aspect Polarity
                      </span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      {curRev.aspects.map((asp, aIdx) => {
                        const isPos = asp.sentiment === 'positive';
                        const isNeg = asp.sentiment === 'negative';
                        return (
                          <div
                            key={aIdx}
                            style={{
                              background: '#FFFFFF',
                              border: '1px solid #E2E8F0',
                              borderRadius: '8px',
                              padding: '0.75rem',
                              borderLeft: `4px solid ${isPos ? '#10B981' : isNeg ? '#EF4444' : '#F59E0B'}`
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                              <strong style={{ fontSize: '0.82rem', color: '#14243A' }}>
                                {asp.name}
                              </strong>
                              <span style={{
                                fontSize: '0.72rem',
                                fontWeight: 800,
                                color: isPos ? '#0D6838' : isNeg ? '#B91C1C' : '#B45309',
                                background: isPos ? '#DDF5E9' : isNeg ? '#FEE2E2' : '#FEF3C7',
                                padding: '0.1rem 0.45rem',
                                borderRadius: '4px'
                              }}>
                                {asp.score} / 5.0 ({asp.sentiment})
                              </span>
                            </div>
                            <div style={{ fontSize: '0.75rem', color: '#475569', fontStyle: 'italic' }}>
                              Evidence: "{asp.quote}"
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ══════════════ 5. INTERACTIVE RECOMMENDATION SIMULATOR ══════════════ */}
      <section style={{ padding: '3.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284C7', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Multi-Criteria Utility Ranking
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#14243A', margin: '0.35rem 0 0.5rem' }}>
              How Recommendations & Bayesian Scores Are Calculated
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
              We avoid fake precision. Try adjusting your preferences below to see how our statistical utility model recalculates matching and trade-offs.
            </p>
          </div>

          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1.5px solid #BFDBFE',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 18px rgba(22, 136, 232, 0.05)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '2rem', alignItems: 'center' }}>
              {/* Controls */}
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#14243A', marginBottom: '1.25rem' }}>
                  Adjust Sample Preferences
                </h4>

                {/* Target Budget Slider */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    <span>Monthly Budget</span>
                    <span style={{ color: '#1688E8' }}>₹{simBudget.toLocaleString('en-IN')}/mo</span>
                  </div>
                  <input
                    type="range"
                    min="5000"
                    max="12000"
                    step="500"
                    value={simBudget}
                    onChange={(e) => setSimBudget(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#1688E8', cursor: 'pointer' }}
                  />
                </div>

                {/* Walk Time Slider */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                    <span>Walking Time to PICT</span>
                    <span style={{ color: '#1688E8' }}>{simWalkTime} mins</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="15"
                    step="1"
                    value={simWalkTime}
                    onChange={(e) => setSimWalkTime(parseInt(e.target.value))}
                    style={{ width: '100%', accentColor: '#1688E8', cursor: 'pointer' }}
                  />
                </div>

                {/* Priority Aspect */}
                <div>
                  <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '0.45rem', textTransform: 'uppercase' }}>
                    Priority Dealbreaker
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                    {[
                      { key: 'wifi', label: '📶 Fast Wi-Fi' },
                      { key: 'noise', label: '🤫 Quiet Study' },
                      { key: 'food', label: '🍲 Quality Food' },
                      { key: 'cleanliness', label: '🧼 Cleanliness' },
                    ].map(p => (
                      <button
                        key={p.key}
                        type="button"
                        onClick={() => setSimPriority(p.key)}
                        style={{
                          padding: '0.45rem',
                          borderRadius: '6px',
                          border: simPriority === p.key ? '1.5px solid #1688E8' : '1px solid #CBD5E1',
                          background: simPriority === p.key ? '#EFF6FF' : '#FFFFFF',
                          color: simPriority === p.key ? '#1688E8' : '#475569',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Dynamic Output Card */}
              <div style={{
                background: '#F8FAFC',
                border: '1.5px solid #E2E8F0',
                borderRadius: '12px',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.68rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase' }}>
                      SAMPLE CANDIDATE: GURUKUL HOSTEL
                    </span>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
                      Double Sharing Room
                    </h3>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1688E8', lineHeight: 1 }}>
                      {simResult.matchPct}%
                    </div>
                    <span style={{ fontSize: '0.65rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                      UTILITY MATCH
                    </span>
                  </div>
                </div>

                {/* Bayesian Rating Pill */}
                <div style={{
                  background: '#EFF6FF',
                  border: '1px solid #BFDBFE',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '6px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '1rem',
                  fontSize: '0.78rem'
                }}>
                  <span style={{ color: '#1E40AF', fontWeight: 700 }}>
                    ⭐ Bayesian Smoothed: {simResult.bayesianRating} / 5.0
                  </span>
                  <span style={{ color: '#64748B', fontSize: '0.7rem' }}>
                    Damps small sample volatility
                  </span>
                </div>

                {/* Reasons & Trade-offs */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0D6838', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                    Why It Matches You:
                  </div>
                  {simResult.reasons.map((r, i) => (
                    <div key={i} style={{ fontSize: '0.75rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: '#10B981', fontWeight: 800 }}>✓</span>
                      <span>{r}</span>
                    </div>
                  ))}
                </div>

                {simResult.tradeoffs.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 800, color: '#B45309', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                      Trade-offs to Consider:
                    </div>
                    {simResult.tradeoffs.map((t, i) => (
                      <div key={i} style={{ fontSize: '0.75rem', color: '#78350F', display: 'flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.2rem' }}>
                        <span>⚠️</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 6. ROOMMATE MATCHING TRANSPARENCY ══════════════ */}
      <section style={{ padding: '3.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1688E8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Peer Compatibility Logic
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#14243A', margin: '0.35rem 0 0.5rem' }}>
              How Roommate Matching Works
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '640px', margin: '0 auto' }}>
              Roommate matching operates completely separately from PG recommendations. We evaluate daily lifestyle rhythms and study habits rather than superficial metrics.
            </p>
          </div>

          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              {/* Hard Constraints */}
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B91C1C', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.45rem' }}>
                  <AlertCircle size={16} /> Hard Non-Negotiable Constraints
                </div>
                <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '0.75rem' }}>
                  Candidates who violate hard criteria are filtered out before scoring:
                </p>
                <ul style={{ fontSize: '0.8rem', color: '#334155', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                  <li><strong>Campus Matching:</strong> Same college or walking radius.</li>
                  <li><strong>Smoking Policy:</strong> Strict non-smoker agreement.</li>
                  <li><strong>Maximum Rent Threshold:</strong> Cannot exceed budget ceiling by ₹2,500.</li>
                </ul>
              </div>

              {/* Flexible Routine Synchronization */}
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#1688E8', fontWeight: 800, fontSize: '0.85rem', marginBottom: '0.45rem' }}>
                  <Users size={16} /> Weighted Routine Synchronization
                </div>
                <p style={{ fontSize: '0.78rem', color: '#1E40AF', marginBottom: '0.75rem' }}>
                  Weighted traits determine the final compatibility percentage:
                </p>
                <ul style={{ fontSize: '0.8rem', color: '#1E3A8A', paddingLeft: '1.2rem', margin: 0, lineHeight: 1.6 }}>
                  <li><strong>Sleep Routine:</strong> Night Owl (2 AM) vs Early Bird (10 PM).</li>
                  <li><strong>Cleanliness Standards:</strong> Daily tidy vs Weekend cleaning.</li>
                  <li><strong>Food Diet:</strong> Pure Vegetarian vs Non-Vegetarian tolerant.</li>
                  <li><strong>Academic Year & Branch:</strong> Shared syllabus & lab timings.</li>
                </ul>
              </div>
            </div>

            {/* Frank Disclaimer */}
            <div style={{
              background: '#FFFBEB',
              border: '1.5px solid #FDE68A',
              borderRadius: '10px',
              padding: '1rem 1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem'
            }}>
              <Info size={20} color="#D97706" style={{ flexShrink: 0 }} />
              <div style={{ fontSize: '0.8rem', color: '#92400E', lineHeight: 1.5 }}>
                <strong>Responsible Product Disclaimer:</strong> While compatibility algorithms accurately detect daily routine synchronization, they do not guarantee interpersonal harmony. We strongly encourage meeting potential roommates in person or on a call before signing a lease.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 7. TRUST & VERIFICATION MATRIX ══════════════ */}
      <section style={{ padding: '3.5rem 0 1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0D6838', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Integrity System
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#14243A', margin: '0.35rem 0 0.5rem' }}>
              Verification Tiers & Badge Meanings
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '620px', margin: '0 auto' }}>
              Every badge shown on PG Scout has an audited definition. We never award verified badges based on owner payments or commercial advertising.
            </p>
          </div>

          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            background: '#FFFFFF',
            border: '1.5px solid #E2E8F0',
            borderRadius: '16px',
            overflow: 'hidden'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
              <thead>
                <tr style={{ background: '#14243A', color: '#FFFFFF', textAlign: 'left' }}>
                  <th style={{ padding: '0.85rem 1rem', width: '22%' }}>Badge & Tier</th>
                  <th style={{ padding: '0.85rem 1rem', width: '28%' }}>What It Means</th>
                  <th style={{ padding: '0.85rem 1rem', width: '30%' }}>Verification Method</th>
                  <th style={{ padding: '0.85rem 1rem', width: '20%' }}>Data Freshness</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: '#DDF5E9', color: '#0D6838', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <ShieldCheck size={13} /> Scout Inspected
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#14243A', fontWeight: 600 }}>
                    Physically inspected by PICT student ambassadors.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                    On-site speed tests (Wi-Fi), solar water inspection, and room size checks.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#0D6838', fontWeight: 700 }}>
                    Audited within 90 days
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: '#EFF6FF', color: '#1688E8', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                      Student Verified
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#14243A', fontWeight: 600 }}>
                    Confirmed by multiple resident reviews.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                    Aggregated across authenticated student submissions with verified stay histories.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#1688E8', fontWeight: 700 }}>
                    Continuously updated
                  </td>
                </tr>

                <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: '#FEF3C7', color: '#B45309', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                      Owner Stated
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#14243A', fontWeight: 600 }}>
                    Preliminary claims from hostel manager.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                    Management brochure or leaflet submission; pending campus inspection.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#B45309', fontWeight: 700 }}>
                    Pending Scout Audit
                  </td>
                </tr>

                <tr style={{ background: '#F8FAFC' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span style={{ background: '#F1F5F9', color: '#475569', padding: '0.2rem 0.55rem', borderRadius: '4px', fontWeight: 800, fontSize: '0.72rem' }}>
                      Google Referenced
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#14243A', fontWeight: 600 }}>
                    External Google Maps benchmark.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                    Permitted Google Places API place_id reference with external link.
                  </td>
                  <td style={{ padding: '0.85rem 1rem', color: '#64748B', fontWeight: 700 }}>
                    30-Day API Sync
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══════════════ 8. STUDENT PRIVACY & DATA GOVERNANCE ══════════════ */}
      <section style={{ padding: '3.5rem 0 2rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#1688E8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Responsible Data Handling
            </span>
            <h2 style={{ fontSize: '1.85rem', fontWeight: 800, color: '#14243A', margin: '0.35rem 0 0.5rem' }}>
              Student Privacy Principles
            </h2>
            <p style={{ fontSize: '0.92rem', color: '#64748B', maxWidth: '620px', margin: '0 auto' }}>
              You control your data. We do not sell student phone numbers to third-party brokers or track you across the web.
            </p>
          </div>

          <div style={{
            maxWidth: '920px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem'
          }}>
            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '1.35rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EFF6FF', color: '#1688E8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Eye size={18} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14243A', margin: '0 0 0.35rem' }}>
                Public vs Private Profile
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                Only your branch, academic year, and general budget range are visible to potential roommates. Your phone number is only shared when you mutually accept a connection request.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '1.35rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#DDF5E9', color: '#0D6838', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Lock size={18} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14243A', margin: '0 0 0.35rem' }}>
                Zero Broker Monetization
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                We do not sell student contact sheets to real estate agents. All tour scheduling connects you directly with the property caretaker with zero brokerage fees.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '12px', padding: '1.35rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem' }}>
                <Trash2 size={18} />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14243A', margin: '0 0 0.35rem' }}>
                Right to Deletion
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#64748B', lineHeight: 1.5, margin: 0 }}>
                You can delete your saved properties, booked visit history, or roommate listing at any time directly from your user profile modal with immediate effect.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ 9. CALL TO ACTION ══════════════ */}
      <section style={{ padding: '2rem 0' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #14243A 0%, #1E3A8A 100%)',
            color: '#FFFFFF',
            borderRadius: '16px',
            padding: '3rem 2rem',
            textAlign: 'center',
            maxWidth: '920px',
            margin: '0 auto'
          }}>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 0.5rem' }}>
              Ready to Explore Verified Accommodations?
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#CBD5E1', maxWidth: '520px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
              Browse audited hostels around PICT Pune, check exact walking times, or find an academically compatible roommate.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/search-pg"
                className="btn btn-primary"
                style={{ background: '#1688E8', color: '#FFFFFF', padding: '0.75rem 1.5rem', borderRadius: '8px', fontWeight: 800, textDecoration: 'none' }}
              >
                Find Hostels & PGs <ArrowRight size={16} />
              </Link>
              <Link
                to="/roommates"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  border: '1px solid rgba(255, 255, 255, 0.3)'
                }}
              >
                Find Roommates
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

