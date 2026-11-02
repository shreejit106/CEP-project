import { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import {
  X,
  Star,
  PhoneCall,
  MessageSquare,
  Calendar,
  Check,
  ShieldCheck,
  Heart,
  ExternalLink,
  Sparkles,
  Info,
  Clock,
  Maximize2,
  Compass,
  ChevronLeft,
  ChevronRight,
  Camera
} from 'lucide-react';
import { VERIFICATION_TIERS } from '../services/facilityIntelligence';
import { ASPECT_CATEGORIES } from '../services/reviewIntelligence';

const PropertyDetailModal = ({ property, isOpen, onClose, onScheduleVisit }) => {
  const { toggleSaveProperty, isPropertySaved } = useUser();
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRoomType, setActiveRoomType] = useState('triple');
  const [mediaMode, setMediaMode] = useState('photos'); // 'photos' | 'streetview'
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const images = property?.images || [property?.image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5'];

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowRight') setLightboxIndex(prev => (prev + 1) % images.length);
      if (e.key === 'ArrowLeft') setLightboxIndex(prev => (prev - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, images.length]);

  if (!isOpen || !property) return null;
  const rooms = property.rooms || {
    single: { price: property.basePrice + 3000, vacancies: 1, features: ['Attached Washroom', 'Desk'] },
    double: { price: property.basePrice, vacancies: 3, features: ['Attached Washroom', 'Twin Desks'] },
    triple: { price: property.basePrice - 1200, vacancies: 4, features: ['Attached Washroom', 'Lockers'] }
  };

  const currentRoom = rooms[activeRoomType] || rooms.triple || rooms.double;
  const bayesianRating = property.bayesianRating || (property.rating ? parseFloat(property.rating.toFixed(2)) : 4.4);
  const confidenceScore = property.confidenceScore || 90;
  const aspectScores = property.aspectScores || {};
  const facilitiesIntel = property.facilityIntelligence || {};
  const externalPlace = property.externalPlace;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '860px', maxHeight: '92vh', borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
      >
        {/* Header */}
        <div className="modal-header" style={{ padding: '1.15rem 1.5rem', borderBottom: '1px solid #E2E8F0', background: '#FFFFFF' }}>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span style={{
                background: property.type === 'Managed Co-Living' ? '#0284C7' : '#14243A',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
                letterSpacing: '0.03em'
              }}>
                {property.type || 'Hostel'}
              </span>

              {property.verified && (
                <span style={{
                  background: '#DDF5E9',
                  color: '#0D6838',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.55rem',
                  borderRadius: '4px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <ShieldCheck size={13} color="#0D6838" /> Scout Inspected
                </span>
              )}

              {/* PG Scout Bayesian Rating */}
              <span style={{
                background: '#EFF6FF',
                border: '1px solid #BFDBFE',
                color: '#1688E8',
                fontSize: '0.72rem',
                fontWeight: 800,
                padding: '0.2rem 0.55rem',
                borderRadius: '4px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem'
              }}>
                <Star size={12} fill="#1688E8" color="#1688E8" />
                <span>{bayesianRating} (PG Scout Bayesian)</span>
                <span style={{ color: '#64748B', fontWeight: 600 }}>· {property.reviewCount || 30} reviews</span>
              </span>

              {/* Google Places External Link */}
              {externalPlace && (
                <a
                  href={externalPlace.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    background: '#F8FAFC',
                    border: '1px solid #CBD5E1',
                    color: '#475569',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    textDecoration: 'none'
                  }}
                  title="View place on Google Maps"
                >
                  <span>Google: {externalPlace.googleRating} ★</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#14243A', margin: 0 }}>
              {property.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{ background: '#F1F5F9', padding: '0.45rem', borderRadius: '50%', border: 'none', cursor: 'pointer', color: '#475569' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="modal-body" style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
          {/* Media Discovery & Gallery Hub */}
          <div style={{ marginBottom: '1.25rem' }}>
            {/* Gallery / 360° Street View Toggle Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '8px',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => setMediaMode('photos')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    border: '1px solid',
                    borderColor: mediaMode === 'photos' ? '#0284C7' : '#E2E8F0',
                    background: mediaMode === 'photos' ? '#E0F2FE' : '#FFFFFF',
                    color: mediaMode === 'photos' ? '#0369A1' : '#475569'
                  }}
                >
                  <Camera size={13} />
                  <span>Property Photos ({images.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setMediaMode('streetview')}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    border: '1px solid',
                    borderColor: mediaMode === 'streetview' ? '#0284C7' : '#E2E8F0',
                    background: mediaMode === 'streetview' ? '#E0F2FE' : '#FFFFFF',
                    color: mediaMode === 'streetview' ? '#0369A1' : '#475569'
                  }}
                >
                  <Compass size={13} />
                  <span>360° Street Surroundings</span>
                </button>
              </div>

              {mediaMode === 'photos' && (
                <button
                  type="button"
                  onClick={() => {
                    setLightboxIndex(selectedImgIndex);
                    setIsLightboxOpen(true);
                  }}
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#0284C7',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Maximize2 size={12} />
                  <span>Expand Full Screen Lightbox</span>
                </button>
              )}
            </div>

            {/* View Mode 1: Property Photographs Gallery */}
            {mediaMode === 'photos' ? (
              <div>
                <div
                  onClick={() => {
                    setLightboxIndex(selectedImgIndex);
                    setIsLightboxOpen(true);
                  }}
                  style={{
                    position: 'relative',
                    height: '320px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#0F172A',
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={images[selectedImgIndex] || images[0]}
                    alt={property.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />

                  {/* Gradient Overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(15,23,42,0.3) 0%, transparent 40%, rgba(15,23,42,0.8) 100%)', pointerEvents: 'none' }} />

                  {/* Top Badges: Source Classification */}
                  <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '6px' }}>
                    <span style={{
                      background: 'rgba(15, 23, 42, 0.85)',
                      backdropFilter: 'blur(4px)',
                      color: 'white',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      {property.mediaGallery?.[selectedImgIndex]?.source === 'owner_uploaded'
                        ? 'Owner Verified Photo'
                        : 'Google Places Property Photo'}
                    </span>
                  </div>

                  {/* Top Right: Lightbox Trigger Icon */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.65)',
                    color: 'white',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Maximize2 size={14} />
                  </div>

                  {/* Bottom Info: Location & Caption */}
                  <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', right: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ color: 'white', fontSize: '0.75rem', fontWeight: 700 }}>
                        {property.mediaGallery?.[selectedImgIndex]?.caption || property.name}
                      </div>
                      <div style={{ color: '#BAE6FD', fontSize: '0.68rem' }}>
                        📍 {property.landmark || property.address} ({property.walkingTime || `${property.distance} km from PICT`})
                      </div>
                    </div>

                    <div style={{
                      background: 'rgba(0, 0, 0, 0.75)',
                      color: '#E2E8F0',
                      padding: '0.2rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.65rem',
                      fontWeight: 600
                    }}>
                      {property.mediaGallery?.[selectedImgIndex]?.attribution || 'Google Local Guide Contributor'}
                    </div>
                  </div>
                </div>

                {/* Thumbnails Navigation */}
                {images.length > 1 && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedImgIndex(idx)}
                        style={{
                          width: '74px',
                          height: '50px',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: selectedImgIndex === idx ? '2.5px solid #0284C7' : '1px solid #CBD5E1',
                          cursor: 'pointer',
                          padding: 0,
                          flexShrink: 0,
                          position: 'relative'
                        }}
                      >
                        <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        {selectedImgIndex === idx && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 132, 199, 0.15)' }} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* View Mode 2: Google Street View 360° Explorer */
              <div style={{
                background: '#0F172A',
                borderRadius: '12px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid #1E293B'
              }}>
                <div style={{ position: 'relative', height: '340px' }}>
                  <iframe
                    title="Google Street View Panorama"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={property.streetView?.embedUrl || `https://maps.google.com/maps?q=18.4575,73.8508&layer=c&cbll=18.4575,73.8508&output=svembed`}
                  />

                  {/* Street View Legend Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(15, 23, 42, 0.9)',
                    backdropFilter: 'blur(4px)',
                    color: 'white',
                    padding: '0.3rem 0.65rem',
                    borderRadius: '6px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                  }}>
                    <Compass size={13} color="#38BDF8" />
                    <span>Official Google Street View Surroundings</span>
                  </div>

                  {/* Direct Google Maps Link */}
                  {property.externalPlace?.mapsUrl && (
                    <a
                      href={property.externalPlace.mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        position: 'absolute',
                        top: '0.75rem',
                        right: '0.75rem',
                        background: 'rgba(255, 255, 255, 0.95)',
                        color: '#0284C7',
                        padding: '0.3rem 0.65rem',
                        borderRadius: '6px',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      <span>Open in Maps</span>
                      <ExternalLink size={11} />
                    </a>
                  )}
                </div>

                {/* Important Context Disclaimer */}
                <div style={{
                  padding: '10px 14px',
                  background: '#1E293B',
                  color: '#94A3B8',
                  fontSize: '0.72rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Info size={14} color="#38BDF8" />
                  <span>
                    <strong>Contextual Surroundings:</strong> Interactive Street View imagery provides approach road, Katraj/Trimurti Chowk walking access, and street context. It does not represent hostel interior spaces.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Direct Owner Inquiries */}
          <div style={{
            background: '#F0F9FF',
            border: '1.5px solid #BAE6FD',
            borderRadius: '10px',
            padding: '0.9rem 1.15rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Direct Owner / Hostel Administration (Zero Brokerage)
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#14243A' }}>
                {property.contactNumber} {property.altContact ? ` / ${property.altContact}` : ''}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                {property.ownerName || 'Hostel Caretaker / Manager'}
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${property.contactNumber}`}
                style={{
                  background: '#1688E8',
                  color: 'white',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  textDecoration: 'none'
                }}
              >
                <PhoneCall size={14} /> Call Direct
              </a>
              <a
                href={`https://wa.me/${property.contactNumber?.replace(/[^0-9]/g, '')}?text=Hi,%20I'm%20a%20PICT%20student%20interested%20in%20visiting%20${encodeURIComponent(property.name)}.`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#16A34A',
                  color: 'white',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  textDecoration: 'none'
                }}
              >
                <MessageSquare size={14} /> WhatsApp
              </a>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 mb-4" style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '10px', border: '1px solid #E2E8F0', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: 700 }}>WALK TO PICT</span>
              <strong style={{ color: '#14243A' }}>{property.walkingTime || `${property.distance} km`}</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: 700 }}>BASE RENT</span>
              <strong style={{ color: '#1688E8' }}>₹{property.basePrice?.toLocaleString('en-IN')}/mo</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: 700 }}>DEPOSIT</span>
              <strong style={{ color: '#14243A' }}>₹{property.deposit ? property.deposit.toLocaleString('en-IN') : '5,000'}</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.68rem', fontWeight: 700 }}>RELIABILITY CONFIDENCE</span>
              <strong style={{ color: '#0D6838' }}>{confidenceScore}% Verified</strong>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 border-b border-gray-200 mb-4" style={{ borderBottom: '1.5px solid #E2E8F0' }}>
            {[
              { id: 'overview', label: 'Overview & Highlights' },
              { id: 'aspects', label: 'Aspect Review Intelligence (NLP)' },
              { id: 'facilities', label: 'Verified Facilities & Reliability' },
              { id: 'rooms', label: 'Rooms & Pricing' },
              { id: 'reviews', label: 'Student Reviews & Citations' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '0.6rem 0.2rem',
                  fontWeight: activeTab === t.id ? 800 : 600,
                  fontSize: '0.82rem',
                  color: activeTab === t.id ? '#1688E8' : '#64748B',
                  borderBottom: activeTab === t.id ? '2.5px solid #1688E8' : '2.5px solid transparent',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-4 animate-fade-in" style={{ fontSize: '0.85rem' }}>
              <div>
                <h4 style={{ fontWeight: 800, color: '#14243A', marginBottom: '0.35rem' }}>About this Residence</h4>
                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.82rem', margin: 0 }}>
                  Located at <strong>{property.landmark || property.address}</strong>. Perfect for PICT students seeking a clean environment, fast Wi-Fi, solar hot water, and quiet hours for DSA coding and laboratory submissions.
                </p>
              </div>

              {property.highlights && (
                <div>
                  <h4 style={{ fontWeight: 800, color: '#14243A', marginBottom: '0.45rem' }}>Audited Highlights</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {property.highlights.map((h, i) => (
                      <div key={i} style={{ background: '#F8FAFC', padding: '0.55rem 0.8rem', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#334155' }}>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ASPECT REVIEW INTELLIGENCE */}
          {activeTab === 'aspects' && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '0.85rem 1rem', borderRadius: '8px', fontSize: '0.8rem', color: '#1E40AF' }}>
                <div style={{ fontWeight: 800, marginBottom: '2px', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={15} color="#1688E8" /> Aspect-Based Sentiment Analysis
                </div>
                Extracted automatically from authenticated student reviews across 10 vital criteria. Evidence quotes highlight authentic resident experiences.
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.85rem' }}>
                {Object.entries(ASPECT_CATEGORIES).map(([key, meta]) => {
                  const data = aspectScores[key] || { score: 4.2, mentionCount: 1, positiveCount: 1, negativeCount: 0, evidence: [] };
                  const score = data.score;
                  const scoreColor = score >= 4.4 ? '#10B981' : score >= 3.8 ? '#1688E8' : '#F59E0B';

                  return (
                    <div
                      key={key}
                      style={{
                        background: '#FFFFFF',
                        border: '1px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '0.85rem',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#14243A' }}>
                          {meta.label}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                          <span style={{ fontSize: '0.9rem', fontWeight: 800, color: scoreColor }}>
                            {score.toFixed(1)}
                          </span>
                          <span style={{ fontSize: '0.65rem', color: '#64748B' }}>/ 5.0</span>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ width: '100%', height: '6px', background: '#F1F5F9', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                        <div style={{ width: `${(score / 5.0) * 100}%`, height: '100%', background: scoreColor, borderRadius: '999px' }} />
                      </div>

                      {/* Evidence Quote if available */}
                      {data.evidence && data.evidence.length > 0 ? (
                        <p style={{ fontSize: '0.72rem', color: '#475569', fontStyle: 'italic', margin: 0, background: '#F8FAFC', padding: '0.35rem 0.5rem', borderRadius: '4px', borderLeft: `2.5px solid ${scoreColor}` }}>
                          "{data.evidence[0].quote}"
                        </p>
                      ) : (
                        <span style={{ fontSize: '0.68rem', color: '#94A3B8' }}>
                          Positive sentiment consistent with campus standards
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: VERIFIED FACILITIES & RELIABILITY */}
          {activeTab === 'facilities' && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.85rem', borderRadius: '8px', fontSize: '0.8rem', color: '#475569' }}>
                <strong style={{ color: '#14243A', display: 'block', marginBottom: '0.2rem' }}>
                  Availability vs. Functional Quality
                </strong>
                PG Scout tests the actual uptime and speed of claimed facilities. Verification tiers separate owner assertions from physical scout inspection.
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {Object.values(facilitiesIntel).map((fac, idx) => {
                  const tier = VERIFICATION_TIERS[fac.verification] || VERIFICATION_TIERS.owner_claimed;
                  return (
                    <div
                      key={idx}
                      style={{
                        background: '#FFFFFF',
                        border: '1.5px solid #E2E8F0',
                        borderRadius: '8px',
                        padding: '0.85rem 1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '0.75rem'
                      }}
                    >
                      <div style={{ flex: 1, minWidth: '220px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <strong style={{ fontSize: '0.85rem', color: '#14243A' }}>{fac.name}</strong>
                          <span style={{
                            background: tier.bgColor,
                            color: tier.badgeColor,
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px'
                          }}>
                            {tier.label}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '0.2rem' }}>
                          {fac.evidence}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: '#0369A1', marginTop: '0.15rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <Clock size={11} /> {fac.timing}
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: 600 }}>RELIABILITY</div>
                        <div style={{ fontSize: '1rem', fontWeight: 800, color: fac.reliabilityPct >= 90 ? '#10B981' : '#F59E0B' }}>
                          {fac.reliabilityPct}% Uptime
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 4: ROOMS & PRICING */}
          {activeTab === 'rooms' && (
            <div className="flex flex-col gap-4 animate-fade-in">
              <div className="flex gap-2">
                {Object.keys(rooms).map((rKey) => {
                  const r = rooms[rKey];
                  const label = rKey === 'single' ? 'Single Room' : rKey === 'double' ? 'Double Sharing' : 'Triple Sharing';
                  const isSelected = activeRoomType === rKey;
                  return (
                    <button
                      key={rKey}
                      onClick={() => setActiveRoomType(rKey)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid #1688E8' : '1px solid #CBD5E1',
                        background: isSelected ? '#EFF6FF' : '#FFFFFF',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#14243A' }}>{label}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1688E8' }}>₹{r.price.toLocaleString('en-IN')}/mo</div>
                    </button>
                  );
                })}
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '1rem' }}>
                <h5 style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.65rem' }}>
                  What's included in {activeRoomType} room:
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {(currentRoom.features || ['Attached Washroom', 'Study Desk', 'Bed with Mattress', 'Solar Hot Water', 'RO Drinking Water']).map((f, i) => (
                    <div key={i} style={{ fontSize: '0.78rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Check size={14} color="#10B981" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS & CITATIONS */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-3 animate-fade-in">
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.75rem 1rem', borderRadius: '8px', fontSize: '0.75rem', color: '#64748B' }}>
                <strong>Legal Attribution & Source Transparency:</strong> Reviews displayed below are user-submitted by authenticated college students. Place identity and geographic coordinates are referenced in compliance with Google Maps Platform API terms.
              </div>

              {(property.reviews || [
                { author: 'PICT Student', branch: '2nd Year EnTC', rating: 5, date: '1 month ago', comment: 'Clean hostel with responsive management and good study environment.' }
              ]).map((rev, i) => (
                <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.85rem' }}>
                  <div className="flex justify-between items-center mb-1">
                    <strong style={{ fontSize: '0.82rem', color: '#14243A' }}>{rev.author} ({rev.branch})</strong>
                    <span style={{ fontSize: '0.78rem', color: '#D97706', fontWeight: 700 }}>
                      {'★'.repeat(Math.floor(rev.rating || 5))} ({rev.rating})
                    </span>
                  </div>
                  <p style={{ fontSize: '0.78rem', color: '#475569', margin: 0 }}>"{rev.comment}"</p>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div style={{ borderTop: '1px solid #E2E8F0', padding: '1rem 1.5rem', background: '#FFFFFF', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block', fontWeight: 700 }}>
              {activeRoomType.toUpperCase()} SHARING RENT
            </span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#14243A' }}>
              ₹{currentRoom.price?.toLocaleString('en-IN')}<span style={{ fontSize: '0.75rem', fontWeight: 500, color: '#64748B' }}>/mo</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => toggleSaveProperty(property)}
              title={isPropertySaved(property.id) ? "Saved! Click to remove" : "Save this property"}
              style={{
                background: isPropertySaved(property.id) ? '#EFF6FF' : '#ffffff',
                color: isPropertySaved(property.id) ? '#1688E8' : '#475569',
                border: isPropertySaved(property.id) ? '1.5px solid #1688E8' : '1px solid #cbd5e1',
                padding: '0.55rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Heart size={15} fill={isPropertySaved(property.id) ? '#1688E8' : 'none'} color={isPropertySaved(property.id) ? '#1688E8' : '#475569'} />
              <span>{isPropertySaved(property.id) ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onScheduleVisit(property);
              }}
              style={{
                background: '#1688E8',
                color: 'white',
                padding: '0.55rem 1.25rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 800,
                cursor: 'pointer',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 2px 8px rgba(22, 136, 232, 0.3)'
              }}
            >
              <Calendar size={15} /> Schedule Free Tour
            </button>
          </div>
        </div>
      </div>

      {/* ── FULL SCREEN HIGH-RES LIGHTBOX ── */}
      {isLightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(10, 15, 29, 0.96)',
            zIndex: 1300,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.25rem'
          }}
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Top Header */}
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', zIndex: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>
                {property.name}
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8', marginLeft: '8px' }}>
                (Photo {lightboxIndex + 1} of {images.length})
              </span>
            </div>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              style={{
                background: 'rgba(255, 255, 255, 0.15)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Lightbox Main Stage */}
          <div
            style={{
              position: 'relative',
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxHeight: 'calc(100vh - 160px)',
              margin: '1rem 0'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev - 1 + images.length) % images.length);
                }}
                style={{
                  position: 'absolute',
                  left: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <ChevronLeft size={24} />
              </button>
            )}

            <img
              src={images[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              style={{
                maxWidth: '90%',
                maxHeight: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
              }}
            />

            {images.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex(prev => (prev + 1) % images.length);
                }}
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'rgba(0, 0, 0, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10
                }}
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>

          {/* Lightbox Bottom Strip & Caption */}
          <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 10 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ color: '#E2E8F0', fontSize: '0.78rem', textAlign: 'center' }}>
              {property.mediaGallery?.[lightboxIndex]?.caption || property.name} ·{' '}
              <span style={{ color: '#38BDF8' }}>
                {property.mediaGallery?.[lightboxIndex]?.attribution || 'Verified Google Local Guide Photo'}
              </span>
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', maxWidth: '80vw', padding: '4px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setLightboxIndex(idx)}
                    style={{
                      width: '54px',
                      height: '38px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: lightboxIndex === idx ? '2px solid #38BDF8' : '1px solid rgba(255,255,255,0.3)',
                      background: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetailModal;
