import { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle2, User, Phone, MessageSquare } from 'lucide-react';
import { pictHostels } from '../data/pictHostelsData';

const ScheduleVisitModal = ({ isOpen, onClose, preselectedProperty }) => {
  const [selectedPropertyId, setSelectedPropertyId] = useState(
    preselectedProperty?.id || pictHostels[0].id
  );
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedSlot, setSelectedSlot] = useState('Evening (4:00 PM - 7:00 PM)');
  const [roomType, setRoomType] = useState('triple');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const currentProperty = pictHostels.find(p => p.id === selectedPropertyId) || pictHostels[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName || !phone) return;
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px', borderRadius: '10px' }}>
        {/* Header */}
        <div className="modal-header" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Schedule a Free Hostel Visit</h3>
            <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Direct visit coordination with hostel owner/caretaker</p>
          </div>
          <button 
            onClick={onClose} 
            style={{ background: '#F1F5F9', padding: '0.35rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '1.5rem' }}>
          {isSuccess ? (
            <div className="text-center py-4 animate-fade-in">
              <div style={{
                width: '60px',
                height: '60px',
                background: '#DCFCE7',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#16A34A',
                margin: '0 auto 1rem auto'
              }}>
                <CheckCircle2 size={36} />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
                Visit Confirmed for {fullName}!
              </h3>
              <p style={{ fontSize: '0.8125rem', color: '#64748B', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
                Your visit to <strong style={{ color: '#0F172A' }}>{currentProperty.name}</strong> is scheduled for <strong style={{ color: '#0F172A' }}>{selectedDate}</strong> during <strong style={{ color: '#0F172A' }}>{selectedSlot}</strong>.
              </p>

              <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '1rem', textAlign: 'left', marginBottom: '1.25rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  📍 Hostel Location & Contact
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: '#0F172A' }}>{currentProperty.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748B', marginBottom: '0.5rem' }}>{currentProperty.landmark || currentProperty.address}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0284C7' }}>
                  Owner / Caretaker Contact: {currentProperty.contactNumber}
                </div>
              </div>

              <button 
                onClick={handleReset} 
                style={{ width: '100%', background: '#0284C7', color: 'white', padding: '0.6rem', borderRadius: '6px', fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Select Property */}
              <div className="input-group">
                <label className="input-label" style={{ fontSize: '0.8rem' }}>Select Hostel near PICT</label>
                <select
                  className="input-field"
                  value={selectedPropertyId}
                  onChange={(e) => setSelectedPropertyId(e.target.value)}
                  style={{ fontWeight: 600, fontSize: '0.85rem' }}
                >
                  {pictHostels.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.distance} km • {p.landmark || p.address})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Selection */}
              <div>
                <label className="input-label mb-1 block" style={{ fontSize: '0.8rem' }}>Day of Visit</label>
                <div className="grid grid-cols-3 gap-2">
                  {['Today', 'Tomorrow', 'This Weekend'].map((day) => (
                    <button
                      type="button"
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      style={{
                        padding: '0.5rem',
                        borderRadius: '6px',
                        border: selectedDate === day ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                        background: selectedDate === day ? '#F0F9FF' : 'white',
                        color: selectedDate === day ? '#0369A1' : '#334155',
                        fontWeight: selectedDate === day ? 700 : 500,
                        fontSize: '0.8125rem',
                        cursor: 'pointer'
                      }}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Slot */}
              <div>
                <label className="input-label mb-1 block" style={{ fontSize: '0.8rem' }}>Time Slot</label>
                <div className="grid grid-cols-3 gap-2">
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
                          padding: '0.45rem',
                          borderRadius: '6px',
                          border: isSelected ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                          background: isSelected ? '#F0F9FF' : 'white',
                          color: isSelected ? '#0369A1' : '#334155',
                          fontSize: '0.78rem',
                          textAlign: 'center',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontWeight: isSelected ? 700 : 600 }}>{slot.label}</div>
                        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>{slot.time}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-3">
                <div className="input-group">
                  <label className="input-label" style={{ fontSize: '0.8rem' }}>Student Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Yash Patil"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="input-field"
                    style={{ fontSize: '0.85rem' }}
                  />
                </div>

                <div className="input-group">
                  <label className="input-label" style={{ fontSize: '0.8rem' }}>WhatsApp Mobile</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit number"
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
                style={{
                  background: '#0284C7',
                  color: 'white',
                  padding: '0.65rem',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  border: 'none',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                Confirm Free Visit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScheduleVisitModal;
