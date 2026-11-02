import { useState } from 'react';
import {
  X, User, Phone, Mail, GraduationCap, MapPin,
  Calendar, Heart, Trash2, PhoneCall, ExternalLink,
  CheckCircle2, Clock, ShieldCheck, LogOut, ArrowRight,
  Building2, Sparkles, AlertCircle
} from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function UserProfileModal({ onOpenScheduleModal, onSelectProperty }) {
  const {
    user,
    savedProperties,
    removeSavedProperty,
    bookedVisits,
    cancelBooking,
    savedRoommates = [],
    isProfileModalOpen,
    setIsProfileModalOpen,
    setIsAuthModalOpen,
    profileActiveTab,
    setProfileActiveTab,
    logout,
    updateUserProfile
  } = useUser();

  const activeTab = profileActiveTab || 'saved';
  const setActiveTab = setProfileActiveTab;
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [editPhone, setEditPhone] = useState(user?.phone || '');
  const [editBranch, setEditBranch] = useState(user?.branch || '');
  const [editYear, setEditYear] = useState(user?.year || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isProfileModalOpen) return null;

  const handleClose = () => {
    setIsProfileModalOpen(false);
    setIsEditing(false);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      phone: editPhone,
      branch: editBranch,
      year: editYear
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleOpenAuth = () => {
    setIsProfileModalOpen(false);
    setIsAuthModalOpen(true);
  };

  return (
    <div className="modal-backdrop" onClick={handleClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '760px',
          width: '95%',
          maxHeight: '88vh',
          borderRadius: '24px',
          background: '#ffffff',
          border: '1.5px solid #bae6fd',
          boxShadow: '0 25px 60px rgba(2, 132, 199, 0.18)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header Profile Bar */}
        <div style={{
          background: 'linear-gradient(135deg, #0369a1 0%, #0284c7 50%, #38bdf8 100%)',
          padding: '1.75rem 2rem',
          color: '#ffffff',
          position: 'relative'
        }}>
          <button
            onClick={handleClose}
            aria-label="Close profile"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.35)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            <X size={18} />
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '50%',
                background: '#ffffff',
                border: '3px solid rgba(255, 255, 255, 0.8)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.4rem',
                fontWeight: 800,
                color: '#0284c7',
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)'
              }}>
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  user?.name ? user.name.slice(0, 2).toUpperCase() : 'PS'
                )}
              </div>
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                background: '#10b981',
                border: '2px solid #ffffff'
              }} />
            </div>

            {/* Student Info */}
            <div style={{ flex: 1, minWidth: '220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem', flexWrap: 'wrap' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', margin: 0, fontFamily: "'Manrope', sans-serif" }}>
                  {user?.name || 'PICT Student'}
                </h2>
                <span style={{
                  background: 'rgba(255, 255, 255, 0.22)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.15rem 0.55rem',
                  borderRadius: '9999px',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <ShieldCheck size={11} /> Verified PICT
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: '#e0f2fe', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span>{user?.college || 'PICT Pune'}</span>
                <span>•</span>
                <span>{user?.branch || 'Computer Engineering'}</span>
                <span>•</span>
                <span>{user?.year || '3rd Year'}</span>
              </div>

              <div style={{ fontSize: '0.78rem', color: '#bae6fd', marginTop: '0.35rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Phone size={12} /> {user?.phone || '+91 98231 45678'}
                </span>
                {user?.email && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Mail size={12} /> {user.email}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick Summary Counts */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <button
              onClick={() => setActiveTab('saved')}
              style={{
                flex: 1,
                background: activeTab === 'saved' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeTab === 'saved' ? '#0369a1' : '#ffffff',
                border: 'none',
                padding: '0.6rem 0.85rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Heart size={15} fill={activeTab === 'saved' ? '#0284c7' : 'currentColor'} />
              <span>Saved Stays ({savedProperties.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('visits')}
              style={{
                flex: 1,
                background: activeTab === 'visits' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeTab === 'visits' ? '#0369a1' : '#ffffff',
                border: 'none',
                padding: '0.6rem 0.85rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <Calendar size={15} />
              <span>Booked Visits ({bookedVisits.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              style={{
                background: activeTab === 'profile' ? '#ffffff' : 'rgba(255, 255, 255, 0.15)',
                color: activeTab === 'profile' ? '#0369a1' : '#ffffff',
                border: 'none',
                padding: '0.6rem 0.85rem',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <User size={15} />
              <span>My Info</span>
            </button>
          </div>
        </div>

        {/* Tab Content Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, background: '#f8fbff' }}>
          {saveSuccess && (
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#047857', padding: '0.65rem 1rem', borderRadius: '10px', marginBottom: '1rem', fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <CheckCircle2 size={16} /> Profile information updated successfully!
            </div>
          )}

          {/* TAB 1: SAVED PROPERTIES */}
          {activeTab === 'saved' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Hostels & PGs You Bookmarked ({savedProperties.length})
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                  Stored in your student session
                </span>
              </div>

              {savedProperties.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#ffffff', borderRadius: '16px', border: '1.5px dashed #cbd5e1' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Heart size={26} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>No Saved Hostels Yet</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '340px', margin: '0 auto 1.25rem' }}>
                    Click the heart icon on any hostel or co-living card to save it for easy comparison and booking.
                  </p>
                  <button
                    onClick={() => { handleClose(); }}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Browse Stays Near PICT
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {savedProperties.map((property) => {
                    const price = property.basePrice || property.rooms?.double?.price || property.rooms?.triple?.price || 6500;
                    const img = property.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400&auto=format&fit=crop';
                    return (
                      <div
                        key={property.id}
                        style={{
                          background: '#ffffff',
                          borderRadius: '16px',
                          border: '1.5px solid #e0f2fe',
                          padding: '1rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          boxShadow: '0 2px 8px rgba(2, 132, 199, 0.06)',
                          transition: 'all 0.2s'
                        }}
                      >
                        {/* Property Image */}
                        <img
                          src={img}
                          alt={property.name}
                          style={{
                            width: '90px',
                            height: '75px',
                            borderRadius: '12px',
                            objectFit: 'cover',
                            flexShrink: 0,
                            border: '1px solid #bae6fd'
                          }}
                        />

                        {/* Property Info */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                            <span style={{
                              background: '#e0f2fe',
                              color: '#0369a1',
                              fontSize: '0.62rem',
                              fontWeight: 700,
                              padding: '0.12rem 0.45rem',
                              borderRadius: '4px',
                              textTransform: 'uppercase'
                            }}>
                              {property.type || 'Hostel'}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#059669', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                              <MapPin size={10} /> {property.walkingTime || '6 mins walk to PICT'}
                            </span>
                          </div>

                          <h4 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {property.name}
                          </h4>

                          <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                            {property.landmark || property.address || 'Near Trimurti Chowk, Katraj'}
                          </div>

                          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', marginTop: '0.25rem' }}>
                            ₹{price.toLocaleString('en-IN')}<span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 500 }}>/mo</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', flexShrink: 0 }}>
                          <button
                            onClick={() => {
                              handleClose();
                              if (onOpenScheduleModal) onOpenScheduleModal(property);
                            }}
                            style={{
                              background: '#0284c7',
                              color: '#ffffff',
                              border: 'none',
                              padding: '0.45rem 0.9rem',
                              borderRadius: '8px',
                              fontSize: '0.78rem',
                              fontWeight: 700,
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.35rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Calendar size={13} /> Book Visit
                          </button>

                          <div style={{ display: 'flex', gap: '0.35rem' }}>
                            <a
                              href={`tel:${property.contactNumber}`}
                              style={{
                                flex: 1,
                                background: '#f0fdf4',
                                border: '1px solid #bbf7d0',
                                color: '#16a34a',
                                padding: '0.35rem',
                                borderRadius: '8px',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.25rem',
                                textDecoration: 'none'
                              }}
                            >
                              <PhoneCall size={12} /> Call
                            </a>

                            <button
                              onClick={() => removeSavedProperty(property.id)}
                              title="Remove from saved"
                              style={{
                                background: '#fff1f2',
                                border: '1px solid #fecdd3',
                                color: '#e11d48',
                                padding: '0.35rem 0.55rem',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: BOOKED VISITS */}
          {activeTab === 'visits' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                  Hostel Tours Scheduled ({bookedVisits.length})
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>
                  100% Free · Direct Owner Coordination
                </span>
              </div>

              {bookedVisits.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3rem 1rem', background: '#ffffff', borderRadius: '16px', border: '1.5px dashed #cbd5e1' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#e0f2fe', color: '#0284c7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                    <Calendar size={26} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>No Visits Booked Yet</h4>
                  <p style={{ fontSize: '0.82rem', color: '#64748b', maxWidth: '340px', margin: '0 auto 1.25rem' }}>
                    Schedule a free, zero-commitment visit to check rooms, Wi-Fi speed, and mess hygiene in person.
                  </p>
                  <button
                    onClick={() => {
                      handleClose();
                      if (onOpenScheduleModal) onOpenScheduleModal();
                    }}
                    style={{ background: '#0284c7', color: '#ffffff', border: 'none', padding: '0.6rem 1.4rem', borderRadius: '10px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    Schedule a Free Hostel Tour
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  {bookedVisits.map((visit) => (
                    <div
                      key={visit.id}
                      style={{
                        background: '#ffffff',
                        borderRadius: '16px',
                        border: '1.5px solid #bae6fd',
                        padding: '1.25rem',
                        boxShadow: '0 4px 14px rgba(2, 132, 199, 0.08)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                        <div>
                          <span style={{
                            background: '#dcfce7',
                            color: '#15803d',
                            border: '1px solid #86efac',
                            fontSize: '0.68rem',
                            fontWeight: 800,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '9999px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            marginBottom: '0.4rem'
                          }}>
                            <CheckCircle2 size={12} /> {visit.status || 'Confirmed'}
                          </span>
                          <h4 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.2rem' }}>
                            {visit.propertyName}
                          </h4>
                          <div style={{ fontSize: '0.8rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <MapPin size={12} color="#0284c7" /> {visit.address || 'Katraj - Dhankawadi Belt, Pune'}
                          </div>
                        </div>

                        {/* Date/Slot Pill */}
                        <div style={{
                          background: '#f0f7ff',
                          border: '1.5px solid #bae6fd',
                          borderRadius: '12px',
                          padding: '0.55rem 0.85rem',
                          textAlign: 'right'
                        }}>
                          <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>Scheduled Slot</div>
                          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Clock size={13} /> {visit.date} • {visit.slot}
                          </div>
                        </div>
                      </div>

                      {/* Visitor details & contact */}
                      <div style={{
                        background: '#f8fafc',
                        border: '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '0.65rem 0.85rem',
                        fontSize: '0.78rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.85rem',
                        flexWrap: 'wrap',
                        gap: '0.5rem'
                      }}>
                        <div>
                          <span style={{ color: '#64748b' }}>Visitor: </span>
                          <strong style={{ color: '#0f172a' }}>{visit.studentName}</strong>
                          <span style={{ color: '#64748b' }}> ({visit.studentPhone})</span>
                        </div>
                        <div>
                          <span style={{ color: '#64748b' }}>Room: </span>
                          <strong style={{ color: '#0284c7' }}>{visit.roomType || 'Double Sharing'}</strong>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <a
                          href={`tel:${visit.contactNumber || '+917798725326'}`}
                          style={{
                            background: '#0284c7',
                            color: '#ffffff',
                            padding: '0.45rem 1rem',
                            borderRadius: '8px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            textDecoration: 'none'
                          }}
                        >
                          <PhoneCall size={14} /> Call Owner Directly ({visit.contactNumber || 'Contact'})
                        </a>

                        <button
                          onClick={() => cancelBooking(visit.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textDecoration: 'underline'
                          }}
                        >
                          Cancel Visit
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: USER INFO & PROFILE */}
          {activeTab === 'profile' && (
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1.5px solid #e0f2fe', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                    Student Information & Preferences
                  </h3>
                  <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '2px 0 0' }}>
                    Used to prefill visit bookings and calculate roommate compatibility
                  </p>
                </div>
                {!isEditing && (
                  <button
                    onClick={() => {
                      setEditName(user?.name || '');
                      setEditPhone(user?.phone || '');
                      setEditBranch(user?.branch || '');
                      setEditYear(user?.year || '');
                      setIsEditing(true);
                    }}
                    style={{
                      background: '#e0f2fe',
                      color: '#0284c7',
                      border: '1px solid #bae6fd',
                      padding: '0.4rem 0.85rem',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Edit Details
                  </button>
                )}
              </div>

              {isEditing ? (
                <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <div className="input-group">
                    <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>Student Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>Phone Number</label>
                    <input
                      type="tel"
                      className="input-field"
                      value={editPhone}
                      onChange={e => setEditPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="input-group">
                      <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>PICT Branch</label>
                      <select
                        className="input-field"
                        value={editBranch}
                        onChange={e => setEditBranch(e.target.value)}
                      >
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Electronics & Telecomm">Electronics & Telecomm</option>
                        <option value="AI & Data Science">AI & Data Science</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>Year of Study</label>
                      <select
                        className="input-field"
                        value={editYear}
                        onChange={e => setEditYear(e.target.value)}
                      >
                        <option value="1st Year (FE)">1st Year (FE)</option>
                        <option value="2nd Year (SE)">2nd Year (SE)</option>
                        <option value="3rd Year (TE)">3rd Year (TE)</option>
                        <option value="4th Year (BE)">4th Year (BE)</option>
                      </select>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        background: '#0284c7',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Save Profile Updates
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={{
                        background: '#f1f5f9',
                        color: '#475569',
                        border: 'none',
                        padding: '0.65rem 1.25rem',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Full Name</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{user?.name || 'Not set'}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Mobile Contact</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{user?.phone || 'Not set'}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>College & Branch</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>PICT · {user?.branch || 'Computer Engineering'}</div>
                  </div>

                  <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Current Year</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>{user?.year || '3rd Year'}</div>
                  </div>
                </div>
              )}

              {/* Bottom Account Controls */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '1.5rem',
                paddingTop: '1.25rem',
                borderTop: '1px solid #e2e8f0'
              }}>
                <button
                  type="button"
                  onClick={handleOpenAuth}
                  style={{
                    background: '#f0f7ff',
                    color: '#0284c7',
                    border: '1px solid #bae6fd',
                    padding: '0.5rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Switch / Add Another Account
                </button>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    handleClose();
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

