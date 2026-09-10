import { useState } from 'react';
import { 
  X, 
  MapPin, 
  Star, 
  Phone, 
  PhoneCall, 
  MessageSquare, 
  Calendar, 
  Check, 
  Utensils, 
  ShieldCheck, 
  Wifi, 
  Share2, 
  Heart,
  Building2
} from 'lucide-react';

const PropertyDetailModal = ({ property, isOpen, onClose, onScheduleVisit }) => {
  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [activeRoomType, setActiveRoomType] = useState('triple');

  if (!isOpen || !property) return null;

  const images = property.images || [property.image];
  const rooms = property.rooms || {
    single: { price: property.basePrice + 3000, vacancies: 1, features: ['Attached Washroom', 'Desk'] },
    double: { price: property.basePrice, vacancies: 3, features: ['Attached Washroom', 'Twin Desks'] },
    triple: { price: property.basePrice - 1200, vacancies: 4, features: ['Attached Washroom', 'Lockers'] }
  };

  const currentRoom = rooms[activeRoomType] || rooms.triple || rooms.double;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: '820px', maxHeight: '90vh', borderRadius: '10px' }}
      >
        {/* Header */}
        <div className="modal-header" style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #E2E8F0' }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span style={{
                background: property.type === 'Managed Co-Living' ? '#0284C7' : '#0F172A',
                color: 'white',
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.15rem 0.5rem',
                borderRadius: '3px'
              }}>
                {property.type || 'Hostel'}
              </span>
              <span style={{ fontSize: '0.68rem', background: '#F1F5F9', color: '#334155', padding: '0.15rem 0.45rem', borderRadius: '3px', fontWeight: 600 }}>
                Boys Only
              </span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706', display: 'flex', alignItems: 'center', gap: '0.15rem' }}>
                <Star size={13} fill="#F59E0B" color="#F59E0B" /> {property.rating || 4.6} ({property.reviewCount || 30}+ reviews)
              </span>
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>{property.name}</h2>
          </div>

          <button 
            onClick={onClose} 
            style={{ background: '#F1F5F9', padding: '0.4rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '1.5rem' }}>
          {/* Photos */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ position: 'relative', height: '300px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#0F172A' }}>
              <img 
                src={images[selectedImgIndex]} 
                alt={property.name} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', bottom: '0.75rem', left: '0.75rem', background: 'rgba(15, 23, 42, 0.85)', color: 'white', padding: '0.3rem 0.65rem', borderRadius: '4px', fontSize: '0.72rem' }}>
                📍 {property.address || `${property.distance} km from PICT`}
              </div>
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImgIndex(idx)}
                    style={{
                      width: '65px',
                      height: '45px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: selectedImgIndex === idx ? '2px solid #0284C7' : '1px solid #CBD5E1',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  >
                    <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Direct Owner Contact Card */}
          <div style={{
            background: '#F0F9FF',
            border: '1px solid #BAE6FD',
            borderRadius: '6px',
            padding: '0.85rem 1rem',
            marginBottom: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase' }}>
                Direct Contact & Inquiries
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0F172A' }}>
                {property.contactNumber} {property.altContact ? ` / ${property.altContact}` : ''}
              </div>
              <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                {property.ownerName || 'Hostel Administration / Caretaker'}
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${property.contactNumber}`}
                style={{
                  background: '#0284C7',
                  color: 'white',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
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
                href={`https://wa.me/${property.contactNumber?.replace(/[^0-9]/g, '')}?text=Hi,%20I'm%20interested%20in%20visiting%20${encodeURIComponent(property.name)}%20near%20PICT.`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#16A34A',
                  color: 'white',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
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

          {/* Quick Info Grid */}
          <div className="grid grid-cols-3 gap-3 mb-5" style={{ background: '#F8FAFC', padding: '0.85rem', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.8125rem' }}>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>Distance from PICT</span>
              <strong style={{ color: '#0F172A' }}>{property.distance} km ({property.walkingTime || '8 mins walk'})</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>Starting Rent</span>
              <strong style={{ color: '#0284C7' }}>₹{property.basePrice?.toLocaleString('en-IN')}/mo</strong>
            </div>
            <div>
              <span style={{ color: '#64748B', display: 'block', fontSize: '0.7rem' }}>Security Deposit</span>
              <strong style={{ color: '#0F172A' }}>₹{property.deposit ? property.deposit.toLocaleString('en-IN') : '5,000'}</strong>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 border-b border-gray-200 mb-4" style={{ borderBottom: '1px solid #E2E8F0' }}>
            {[
              { id: 'overview', label: 'Overview & Highlights' },
              { id: 'rooms', label: 'Room Options & Sharing' },
              { id: 'facilities', label: 'Facilities & Mess' },
              { id: 'reviews', label: 'PICT Student Feedback' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                style={{
                  padding: '0.5rem 0',
                  fontWeight: activeTab === t.id ? 700 : 500,
                  fontSize: '0.8125rem',
                  color: activeTab === t.id ? '#0284C7' : '#64748B',
                  borderBottom: activeTab === t.id ? '2px solid #0284C7' : '2px solid transparent',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab Content: Overview */}
          {activeTab === 'overview' && (
            <div className="flex flex-col gap-4 animate-fade-in" style={{ fontSize: '0.85rem' }}>
              <div>
                <h4 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>About this Property</h4>
                <p style={{ color: '#475569', lineHeight: 1.6, fontSize: '0.8125rem' }}>
                  Located at <strong>{property.landmark || property.address}</strong>. Perfect for PICT students looking for a peaceful study environment, regular cleaning, solar hot water, and easy access to both college gates and food mess options.
                </p>
              </div>

              {property.highlights && (
                <div>
                  <h4 style={{ fontWeight: 700, color: '#0F172A', marginBottom: '0.4rem' }}>Key Highlights</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {property.highlights.map((h, i) => (
                      <div key={i} style={{ background: '#F8FAFC', padding: '0.5rem 0.75rem', borderRadius: '4px', border: '1px solid #E2E8F0', fontSize: '0.78rem', color: '#334155' }}>
                        {h}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab Content: Rooms */}
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
                        padding: '0.6rem',
                        borderRadius: '6px',
                        border: isSelected ? '1.5px solid #0284C7' : '1px solid #CBD5E1',
                        background: isSelected ? '#F0F9FF' : '#FFFFFF',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0F172A' }}>{label}</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0284C7' }}>₹{r.price.toLocaleString('en-IN')}/mo</div>
                    </button>
                  );
                })}
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '6px', padding: '1rem' }}>
                <h5 style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  What's included in {activeRoomType} room:
                </h5>
                <div className="grid grid-cols-2 gap-2">
                  {(currentRoom.features || ['Attached Washroom', 'Study Desk', 'Bed with Mattress', 'Solar Hot Water', 'RO Drinking Water']).map((f, i) => (
                    <div key={i} style={{ fontSize: '0.78rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Check size={13} color="#059669" /> {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: Facilities */}
          {activeTab === 'facilities' && (
            <div className="flex flex-col gap-3 animate-fade-in">
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.85rem', borderRadius: '6px' }}>
                <strong style={{ fontSize: '0.8rem', color: '#0F172A', display: 'block', marginBottom: '0.2rem' }}>
                  🍲 Food / Mess Arrangement:
                </strong>
                <span style={{ fontSize: '0.78rem', color: '#475569' }}>
                  {property.foodOption || 'Multiple student mess options (Veg / Non-veg tiffins) available within 100 meters of the building.'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {property.facilities?.map((f, i) => (
                  <div key={i} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '0.5rem 0.75rem', borderRadius: '4px', fontSize: '0.78rem', color: '#334155', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Check size={13} color="#059669" /> {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab Content: Reviews */}
          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-3 animate-fade-in">
              {(property.reviews || [
                { author: 'PICT Student', branch: '2nd Year', rating: 5, date: '1 month ago', comment: 'Clean hostel with responsive management and good study environment.' }
              ]).map((rev, i) => (
                <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '0.75rem' }}>
                  <div className="flex justify-between items-center mb-1">
                    <strong style={{ fontSize: '0.8rem', color: '#0F172A' }}>{rev.author} ({rev.branch})</strong>
                    <span style={{ fontSize: '0.75rem', color: '#D97706' }}>{'★'.repeat(Math.floor(rev.rating || 5))}</span>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: '#475569' }}>"{rev.comment}"</p>
                </div>
              ))}
            </div>
          )}

          {/* Footer Modal Actions */}
          <div style={{ borderTop: '1px solid #E2E8F0', marginTop: '1.5rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.68rem', color: '#64748B', display: 'block' }}>Monthly Rent</span>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0F172A' }}>
                ₹{currentRoom.price?.toLocaleString('en-IN')}<span style={{ fontSize: '0.75rem', fontWeight: 400, color: '#64748B' }}>/mo</span>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onClose();
                  onScheduleVisit(property);
                }}
                style={{
                  background: '#0284C7',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '6px',
                  fontSize: '0.8125rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <Calendar size={14} /> Schedule Free Tour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailModal;
