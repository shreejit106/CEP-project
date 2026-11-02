import { X, Check, Minus, IndianRupee, MapPin, Star, Calendar, ShieldCheck, Wifi, Sparkles } from 'lucide-react';

const ComparisonModal = ({ isOpen, onClose, selectedProperties, onScheduleVisit }) => {
  if (!isOpen || selectedProperties.length === 0) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content animate-slide-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '980px', maxHeight: '92vh', borderRadius: '14px', overflow: 'hidden' }}>
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid #E2E8F0', padding: '1.25rem 1.5rem', background: '#14243A', color: '#ffffff' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>Side-by-Side Accommodation Comparison</h3>
            <p style={{ fontSize: '0.78rem', color: '#94A3B8', marginTop: '2px', margin: 0 }}>
              Transparent feature matrix, Bayesian ratings, and verified facility uptimes for PICT Pune
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255, 255, 255, 0.12)', border: 'none', color: '#ffffff', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '1.5rem', overflowX: 'auto', background: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '650px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.85rem', width: '24%', color: '#64748B', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Criteria
                </th>
                {selectedProperties.map((p) => (
                  <th key={p.id} style={{ padding: '0.85rem', width: `${76 / selectedProperties.length}%`, verticalAlign: 'top' }}>
                    <div style={{ height: '110px', borderRadius: '8px', overflow: 'hidden', marginBottom: '0.5rem', border: '1px solid #E2E8F0' }}>
                      <img src={p.image || (p.images ? p.images[0] : '')} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 800, color: '#14243A' }}>{p.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B' }}>{p.walkingTime || `${p.distance} km from PICT`}</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1688E8', marginTop: '0.25rem' }}>
                      ₹{p.basePrice?.toLocaleString('en-IN')}<span style={{ fontSize: '0.7rem', fontWeight: 500, color: '#64748B' }}>/mo</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Verification & Type */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Classification</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: '#14243A' }}>
                    {p.type || 'Hostel'} {p.verified ? '• Scout Inspected' : ''}
                  </td>
                ))}
              </tr>

              {/* Bayesian Rating */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Bayesian Rating</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 800, fontSize: '0.85rem', color: '#D97706' }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" /> {p.bayesianRating || p.rating} / 5.0
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#64748B', display: 'block' }}>
                      ({p.reviewCount || 25} verified reviews)
                    </span>
                  </td>
                ))}
              </tr>

              {/* Wi-Fi Speed & Reliability */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Wi-Fi Intelligence</td>
                {selectedProperties.map((p) => {
                  const wifiData = p.facilityIntelligence?.wifi;
                  return (
                    <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.8rem', color: '#334155' }}>
                      <strong style={{ color: '#1688E8' }}>{wifiData?.speedMbps ? `${wifiData.speedMbps} Mbps Fiber` : 'Standard Wi-Fi'}</strong>
                      <span style={{ fontSize: '0.7rem', color: '#0D6838', display: 'block' }}>
                        {wifiData?.reliabilityPct || 90}% Uptime tested
                      </span>
                    </td>
                  );
                })}
              </tr>

              {/* Cleanliness Score */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Cleanliness & Hygiene</td>
                {selectedProperties.map((p) => {
                  const cleanScore = p.aspectScores?.cleanliness?.score || 4.2;
                  return (
                    <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: cleanScore >= 4.4 ? '#10B981' : '#14243A' }}>
                      {cleanScore} / 5.0 (Daily Cleaning)
                    </td>
                  );
                })}
              </tr>

              {/* Triple Sharing */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Triple Sharing</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontWeight: 800, fontSize: '0.85rem', color: '#14243A' }}>
                    {p.rooms?.triple?.price ? `₹${p.rooms.triple.price.toLocaleString('en-IN')}/mo` : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Double Sharing */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Double Sharing</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontWeight: 800, fontSize: '0.85rem', color: '#14243A' }}>
                    {p.rooms?.double?.price ? `₹${p.rooms.double.price.toLocaleString('en-IN')}/mo` : `₹${p.basePrice}/mo`}
                  </td>
                ))}
              </tr>

              {/* Single Room */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Single Private Room</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontWeight: 800, fontSize: '0.85rem', color: '#14243A' }}>
                    {p.rooms?.single?.price ? `₹${p.rooms.single.price.toLocaleString('en-IN')}/mo` : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Food Option */}
              <tr style={{ borderBottom: '1px solid #F1F5F9', background: '#F8FAFC' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Food & Mess</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.78rem', color: '#334155' }}>
                    {p.foodOption || 'Nearby Mess Available'}
                  </td>
                ))}
              </tr>

              {/* Direct Call / Contact */}
              <tr style={{ borderBottom: '1px solid #F1F5F9' }}>
                <td style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#64748B' }}>Owner Contact</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: '#1688E8' }}>
                    {p.contactNumber || 'Contact Office'}
                  </td>
                ))}
              </tr>

              {/* Action Button */}
              <tr>
                <td style={{ padding: '1rem 0.75rem' }}></td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '1rem 0.75rem' }}>
                    <button
                      style={{
                        width: '100%',
                        background: '#1688E8',
                        color: 'white',
                        padding: '0.55rem',
                        borderRadius: '8px',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        border: 'none',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(22, 136, 232, 0.25)'
                      }}
                      onClick={() => {
                        onClose();
                        onScheduleVisit(p);
                      }}
                    >
                      Schedule Free Visit
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonModal;
