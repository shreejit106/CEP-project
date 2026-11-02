import { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, PhoneCall } from 'lucide-react';
import { pictHostels } from '../data/pictHostelsData';
import { useUser } from '../context/UserContext';

const ScheduleVisitModal = ({ isOpen, onClose, preselectedProperty }) => {
  const { user, addBooking } = useUser();
  
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    preselectedProperty?.id || pictHostels[0].id
  );
  const [selectedDate, setSelectedDate] = useState('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState('Evening (4:00 PM - 7:00 PM)');
  const [roomType, setRoomType] = useState('double');
  const [fullName, setFullName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (preselectedProperty?.id) {
      setSelectedPropertyId(preselectedProperty.id);
    }
  }, [preselectedProperty]);

  useEffect(() => {
    if (user?.name && !fullName) setFullName(user.name);
    if (user?.phone && !phone) setPhone(user.phone);
  }, [user]);

  if (!isOpen) return null;

  const currentProperty = pictHostels.find(p => p.id === selectedPropertyId) || preselectedProperty || pictHostels[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    // Save into central UserContext
    addBooking({
      propertyId: currentProperty.id,
      propertyName: currentProperty.name,
      address: currentProperty.landmark || currentProperty.address,
      image: currentProperty.images?.[0] || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400&auto=format&fit=crop',
      contactNumber: currentProperty.contactNumber,
      studentName: fullName,
      studentPhone: phone,
      date: selectedDate,
      slot: selectedSlot,
      roomType: `${roomType.charAt(0).toUpperCase() + roomType.slice(1)} Sharing`
    });

    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1050 }}>
      <div
        className="modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '560px',
          borderRadius: '20px',
          background: '#ffffff',
          border: '1.5px solid #bae6fd',
          boxShadow: '0 25px 60px rgba(2, 132, 199, 0.2)',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
          borderBottom: '1px solid #bae6fd',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Manrope', sans-serif" }}>
              Schedule a Free Hostel Visit
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b', margin: '3px 0 0' }}>
              Direct visit coordination with verified owner/caretaker · 100% Free
            </p>
          </div>
          <button 
            onClick={onClose} 
            style={{
              background: '#ffffff',
              padding: '0.4rem',
              borderRadius: '50%',
              border: '1px solid #bae6fd',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          {isSuccess ? (
            <div className="text-center py-4 animate-fade-in" style={{ textAlign: 'center' }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: '#dcfce7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#15803d',
                margin: '0 auto 1.25rem'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.35rem' }}>
                Visit Confirmed for {fullName}!
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#64748b', maxWidth: '420px', margin: '0 auto 1.25rem' }}>
                Your visit to <strong style={{ color: '#0f172a' }}>{currentProperty.name}</strong> is confirmed for <strong style={{ color: '#0284c7' }}>{selectedDate}</strong> ({selectedSlot}). Saved to your student profile!
              </p>

              <div style={{
                background: '#f0f7ff',
                border: '1.5px solid #bae6fd',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'left',
                marginBottom: '1.25rem'
              }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369a1', textTransform: 'uppercase', marginBottom: '0.3rem' }}>
                  📍 Hostel Location & Direct Contact
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>{currentProperty.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '0.5rem' }}>
                  {currentProperty.landmark || currentProperty.address}
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#0284c7', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <PhoneCall size={14} /> Owner / Caretaker: {currentProperty.contactNumber}
                </div>
              </div>

              <button 
                onClick={handleReset} 
                className="btn btn-primary"
                style={{ width: '100%', padding: '0.75rem', borderRadius: '10px', fontSize: '0.9rem' }}
              >
                Done · View in My Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Select Property */}
              <div className="input-group">
                <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>
                  Select Hostel / Co-Living near PICT
                </label>
                <select
                  className="input-field"
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  style={{ fontWeight: 600, fontSize: '0.88rem' }}
                >
                  {pictHostels.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.walkingTime || `${p.distance} km`} • {p.landmark || p.address})
                    </option>
                  ))}
                </select>
              </div>

              {/* Day Selection */}
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Day of Visit
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {['Today', 'Tomorrow', 'This Weekend'].map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      style={{
                        padding: '0.55rem',
                        borderRadius: '8px',
                        border: selectedDate === day ? '2px solid #0284c7' : '1.5px solid #bae6fd',
                        background: selectedDate === day ? '#e0f2fe' : '#ffffff',
                        color: selectedDate === day ? '#0369a1' : '#334155',
                        fontWeight: selectedDate === day ? 800 : 600,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot Selection */}
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Preferred Time Slot
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {[
                    { label: 'Morning', time: '10 AM - 1 PM' },
                    { label: 'Afternoon', time: '1 PM - 4 PM' },
                    { label: 'Evening', time: '4 PM - 7 PM' },
                  ].map((slot) => {
                    const fullText = `${slot.label} (${slot.time})`;
                    const isSelected = selectedSlot === fullText;
                    return (
                      <button
                        type="button"
                        key={slot.label}
                        onClick={() => setSelectedSlot(fullText)}
                        style={{
                          padding: '0.5rem 0.25rem',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #0284c7' : '1.5px solid #bae6fd',
                          background: isSelected ? '#e0f2fe' : '#ffffff',
                          color: isSelected ? '#0369a1' : '#334155',
                          fontSize: '0.78rem',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                      >
                        <div style={{ fontWeight: isSelected ? 800 : 700 }}>{slot.label}</div>
                        <div style={{ fontSize: '0.68rem', color: isSelected ? '#0284c7' : '#64748b' }}>{slot.time}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Room sharing type */}
              <div>
                <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155', display: 'block', marginBottom: '0.4rem' }}>
                  Interested Room Type
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem' }}>
                  {['single', 'double', 'triple'].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRoomType(r)}
                      style={{
                        padding: '0.45rem',
                        borderRadius: '8px',
                        border: roomType === r ? '2px solid #0284c7' : '1.5px solid #bae6fd',
                        background: roomType === r ? '#e0f2fe' : '#ffffff',
                        color: roomType === r ? '#0369a1' : '#334155',
                        fontWeight: roomType === r ? 800 : 600,
                        fontSize: '0.78rem',
                        textTransform: 'capitalize',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                    >
                      {r} Sharing
                    </button>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div className="input-group">
                  <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>Student Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  padding: '0.75rem',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  marginTop: '0.25rem',
                  cursor: 'pointer'
                }}
              >
                Confirm Free Visit Now
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
