import { Link } from 'react-router-dom';
import { Building2, ShieldCheck, Phone, Mail, MapPin, CheckCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: '#0F172A', color: '#CBD5E1', marginTop: '4rem', borderTop: '1px solid #1E293B', padding: '3.5rem 0 1.5rem 0' }}>
      <div className="container">
        <div className="grid grid-cols-4 gap-8 mb-10">
          {/* Col 1 */}
          <div style={{ gridColumn: 'span 1' }}>
            <div className="flex items-center gap-2 mb-3">
              <div style={{
                background: '#0284C7',
                width: '32px',
                height: '32px',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white'
              }}>
                <Building2 size={18} />
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFFFFF' }}>Stay<span style={{ color: '#38BDF8' }}>Mate</span></span>
            </div>
            <p style={{ fontSize: '0.8125rem', color: '#94A3B8', lineHeight: 1.6, marginBottom: '1rem' }}>
              The hyperlocal student housing & roommate aggregator for Pune Institute of Computer Technology (PICT) and Katraj-Dhankawadi educational belt.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#38BDF8' }}>
              <MapPin size={13} /> Trimurti Chowk & Dhankawadi, Katraj, Pune 411046
            </div>
          </div>

          {/* Col 2: Local Independent Hostels */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.85rem' }}>Independent Boys Hostels</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
              <li><Link to="/search-pg?location=PICT" style={{ color: 'inherit' }}>Gurukul Boy's Hostel (Trimurti Chowk)</Link></li>
              <li><Link to="/search-pg?location=PICT" style={{ color: 'inherit' }}>Shri Swami Samartha Boy's PG</Link></li>
              <li><Link to="/search-pg?location=PICT" style={{ color: 'inherit' }}>Shreeram Boy's Hostel (Ambegaon Pathar)</Link></li>
              <li><Link to="/search-pg?location=PICT" style={{ color: 'inherit' }}>Ira Boy’s Hostel (Near Back Gate)</Link></li>
              <li><Link to="/search-pg?location=PICT" style={{ color: 'inherit' }}>Sthala Student Living</Link></li>
              <li><Link to="/search-pg?location=PICT" style={{ color: 'inherit' }}>My Hostel Boys PG</Link></li>
            </ul>
          </div>

          {/* Col 3: Managed Co-Living Brands */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.85rem' }}>Managed Co-Living Spaces</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
              <li><Link to="/search-pg?type=Managed" style={{ color: 'inherit' }}>Casa Living (कासा लिव्हींग - Katraj)</Link></li>
              <li><Link to="/search-pg?type=Managed" style={{ color: 'inherit' }}>Union Living Student Social Club</Link></li>
              <li><Link to="/search-pg?type=Managed" style={{ color: 'inherit' }}>Stanza Living Shiraz House</Link></li>
              <li><Link to="/search-pg?type=Managed" style={{ color: 'inherit' }}>Stanza Living Cairo House</Link></li>
              <li><Link to="/search-pg?type=Managed" style={{ color: 'inherit' }}>Stanza Living Girona House</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Direct Owner Contacts */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '0.85rem' }}>Verified Contact Numbers</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8125rem', color: '#94A3B8' }}>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Gurukul Hostel:</strong>
                <span>7798725326 / 8624024830</span>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Swami Samartha / Shreeram:</strong>
                <span>9923448274 / 8007577703</span>
              </div>
              <div>
                <strong style={{ color: '#FFFFFF', display: 'block' }}>Casa Living:</strong>
                <span>8208498961 / 8956866053</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ borderTop: '1px solid #1E293B', paddingTop: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#64748B' }}>
          <div>© 2026 StayMate • PICT Pune Student Housing Directory. Independent portal with 0% brokerage.</div>
          <div>Direct owner contact listings for students in Katraj & Dhankawadi.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
