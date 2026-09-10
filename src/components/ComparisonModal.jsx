import { X, Check, Minus, IndianRupee, MapPin, Star, Calendar } from 'lucide-react';

const ComparisonModal = ({ isOpen, onClose, selectedProperties, onScheduleVisit }) => {
  if (!isOpen || selectedProperties.length === 0) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '960px', maxHeight: '90vh', borderRadius: '8px' }}>
        {/* Header */}
        <div className="modal-header" style={{ borderBottom: '1px solid #E2E8F0', padding: '1rem 1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>Compare Hostels & PGs</h3>
            <p style={{ fontSize: '0.75rem', color: '#64748B' }}>Side-by-side comparison for accommodations around PICT Pune</p>
          </div>
          <button onClick={onClose} style={{ background: '#F1F5F9', padding: '0.4rem', borderRadius: '50%', border: 'none', cursor: 'pointer' }}>
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body" style={{ padding: '1.25rem', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                <th style={{ padding: '0.75rem', width: '25%', color: '#64748B', fontSize: '0.8rem' }}>Hostel</th>
                {selectedProperties.map((p) => (
                  <th key={p.id} style={{ padding: '0.75rem', width: `${75 / selectedProperties.length}%`, verticalAlign: 'top' }}>
                    <div style={{ height: '100px', borderRadius: '6px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                      <img src={p.image || (p.images ? p.images[0] : '')} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0F172A' }}>{p.name}</div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B' }}>{p.distance} km from PICT ({p.walkingTime || '8 min walk'})</div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0284C7', marginTop: '0.25rem' }}>
                      ₹{p.basePrice?.toLocaleString('en-IN')}<span style={{ fontSize: '0.7rem', fontWeight: 400, color: '#64748B' }}>/mo</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Type */}
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, fontSize: '0.8rem', color: '#64748B' }}>Type</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.8rem', fontWeight: 700, color: '#0F172A' }}>
                    {p.type || 'Hostel'}
                  </td>
                ))}
              </tr>

              {/* Rating */}
              <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, fontSize: '0.8rem', color: '#64748B' }}>Rating</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontWeight: 700, fontSize: '0.8rem', color: '#D97706' }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" /> {p.rating || 4.6} / 5.0
                    </span>
                  </td>
                ))}
              </tr>

              {/* Triple Sharing */}
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, fontSize: '0.8rem', color: '#64748B' }}>Triple Sharing</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#0F172A' }}>
                    {p.rooms?.triple?.price ? `₹${p.rooms.triple.price.toLocaleString('en-IN')}/mo` : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Double Sharing */}
              <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, fontSize: '0.8rem', color: '#64748B' }}>Double Sharing</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#0F172A' }}>
                    {p.rooms?.double?.price ? `₹${p.rooms.double.price.toLocaleString('en-IN')}/mo` : `₹${p.basePrice}/mo`}
                  </td>
                ))}
              </tr>

              {/* Single Room */}
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, fontSize: '0.8rem', color: '#64748B' }}>Single Room</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontWeight: 700, fontSize: '0.8rem', color: '#0F172A' }}>
                    {p.rooms?.single?.price ? `₹${p.rooms.single.price.toLocaleString('en-IN')}/mo` : 'N/A'}
                  </td>
                ))}
              </tr>

              {/* Food Option */}
              <tr style={{ borderBottom: '1px solid #E2E8F0', background: '#F8FAFC' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, fontSize: '0.8rem', color: '#64748B' }}>Food & Mess</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.78rem', color: '#334155' }}>
                    {p.foodOption || 'Nearby Mess Available'}
                  </td>
                ))}
              </tr>

              {/* Contact */}
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '0.75rem', fontWeight: 600, fontSize: '0.8rem', color: '#64748B' }}>Direct Contact</td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '0.75rem', fontSize: '0.78rem', fontWeight: 700, color: '#0284C7' }}>
                    {p.contactNumber || 'Contact Office'}
                  </td>
                ))}
              </tr>

              {/* Action */}
              <tr>
                <td style={{ padding: '1rem 0.75rem' }}></td>
                {selectedProperties.map((p) => (
                  <td key={p.id} style={{ padding: '1rem 0.75rem' }}>
                    <button
                      style={{
                        width: '100%',
                        background: '#0284C7',
                        color: 'white',
                        padding: '0.45rem',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onClick={() => {
                        onClose();
                        onScheduleVisit(p);
                      }}
                    >
                      Schedule Tour
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
