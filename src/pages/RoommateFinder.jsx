import { useState } from 'react';
import { roommateProfiles, colleges } from '../data/mockData';
import { 
  User, 
  MapPin, 
  IndianRupee, 
  Briefcase, 
  Coffee, 
  Check, 
  Users, 
  Send, 
  MessageSquare, 
  Building2, 
  CheckCircle2, 
  X 
} from 'lucide-react';

const RoommateFinder = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: 6500,
    collegeId: 'c2', // PICT default
    branch: 'Computer Engineering (CS)',
    year: '2nd Year',
    smoking: 'Non-smoking',
    sleepSchedule: 'Early Bird',
    cleanliness: 'Very Clean',
    diet: 'Vegetarian'
  });
  
  const [matches, setMatches] = useState([]);
  const [connectModalStudent, setConnectModalStudent] = useState(null);
  const [connectMessageSent, setConnectMessageSent] = useState(false);
  const [connectMessage, setConnectMessage] = useState('');

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const calculateMatches = () => {
    const scoredProfiles = roommateProfiles.map(profile => {
      let score = 0;
      let reasons = [];

      // College / Location Match
      if (profile.collegeId === preferences.collegeId) {
        score += 30;
        reasons.push('Same PICT/Katraj Campus Area');
      }

      // Budget match
      if (Math.abs(profile.budget - preferences.budget) <= 1500) {
        score += 25;
        reasons.push('Compatible Monthly Budget (±₹1,500)');
      }

      // Habit match (Smoking)
      if (profile.preferences.smoking === preferences.smoking) {
        score += 15;
        reasons.push('Matching non-smoking preference');
      }
      
      // Sleep Schedule
      if (profile.preferences.sleepSchedule === preferences.sleepSchedule) {
        score += 15;
        reasons.push(`Both are ${preferences.sleepSchedule}s`);
      } else {
        score += 5;
      }
      
      // Cleanliness
      if (profile.preferences.cleanliness === preferences.cleanliness) {
        score += 15;
        reasons.push('Matching cleanliness standards');
      } else {
        score += 8;
      }

      // Food match bonus
      if (profile.preferences.food === preferences.diet || profile.preferences.food === 'Any') {
        score += 5;
        reasons.push('Compatible dining habits');
      }

      if (score > 98) score = 98;

      return { ...profile, matchScore: score, reasons };
    });

    scoredProfiles.sort((a, b) => b.matchScore - a.matchScore);
    setMatches(scoredProfiles);
    setStep(2);
  };

  const handleSendConnect = (e) => {
    e.preventDefault();
    setConnectMessageSent(true);
  };

  return (
    <div className="container py-8 animate-fade-in" style={{ maxWidth: '960px' }}>
      {/* Top Banner */}
      <div className="text-center mb-8">
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.25rem' }}>
          Find a Compatible PICT Roommate
        </h1>
        <p style={{ fontSize: '0.875rem', color: '#64748B' }}>
          Connect with verified engineering students looking to share rooms in hostels around PICT Pune (Trimurti Chowk / Dhankawadi).
        </p>
      </div>

      {step === 1 && (
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          background: '#FFFFFF',
          border: '1px solid #CBD5E1',
          borderRadius: '8px',
          padding: '1.75rem',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)'
        }}>
          <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0F172A', marginBottom: '1.25rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
            Set Your Roommate Preferences
          </h2>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="input-group">
              <label className="input-label" style={{ fontSize: '0.8rem' }}>College Campus</label>
              <select className="input-field" name="collegeId" value={preferences.collegeId} onChange={handleChange} style={{ fontWeight: 600, fontSize: '0.8125rem' }}>
                {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Engineering Branch</label>
              <select className="input-field" name="branch" value={preferences.branch} onChange={handleChange} style={{ fontSize: '0.8125rem' }}>
                <option>Computer Engineering (CS)</option>
                <option>Information Technology (IT)</option>
                <option>AI & Data Science (AIDS)</option>
                <option>Electronics & Telecom (EnTC)</option>
              </select>
            </div>
          </div>

          <div className="input-group mb-4">
            <label className="input-label flex justify-between" style={{ fontSize: '0.8rem' }}>
              <span>Monthly Budget</span>
              <strong style={{ color: '#0F172A' }}>₹{preferences.budget.toLocaleString('en-IN')}/mo</strong>
            </label>
            <input 
              type="range" 
              name="budget" 
              min="4500" 
              max="14000" 
              step="500" 
              value={preferences.budget} 
              onChange={handleChange} 
              style={{ accentColor: '#0284C7', cursor: 'pointer', width: '100%' }}
            />
            <div className="flex justify-between text-2xs text-muted" style={{ fontSize: '0.7rem' }}>
              <span>₹4,500 (Triple)</span>
              <span>₹7,000 (Double)</span>
              <span>₹12,000+ (Single)</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-3">
            <div className="input-group">
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Smoking</label>
              <select className="input-field" name="smoking" value={preferences.smoking} onChange={handleChange} style={{ fontSize: '0.8125rem' }}>
                <option>Non-smoking</option>
                <option>Smoking Allowed</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Study Schedule</label>
              <select className="input-field" name="sleepSchedule" value={preferences.sleepSchedule} onChange={handleChange} style={{ fontSize: '0.8125rem' }}>
                <option>Early Bird (Sleeps by 11 PM)</option>
                <option>Night Owl (Late study/coding)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="input-group">
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Food Habit</label>
              <select className="input-field" name="diet" value={preferences.diet} onChange={handleChange} style={{ fontSize: '0.8125rem' }}>
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Any / Flexible</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label" style={{ fontSize: '0.8rem' }}>Cleanliness</label>
              <select className="input-field" name="cleanliness" value={preferences.cleanliness} onChange={handleChange} style={{ fontSize: '0.8125rem' }}>
                <option>Very Clean & Organized</option>
                <option>Moderate</option>
              </select>
            </div>
          </div>

          <button 
            style={{ width: '100%', background: '#0284C7', color: 'white', padding: '0.65rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}
            onClick={calculateMatches}
          >
            Find Compatible Roommates
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div className="flex justify-between items-center mb-5">
            <button 
              onClick={() => setStep(1)} 
              style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', padding: '0.4rem 0.75rem', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer' }}
            >
              ← Change Preferences
            </button>
            <span style={{ fontSize: '0.8125rem', color: '#64748B' }}>
              Found <strong>{matches.length}</strong> matching profiles
            </span>
          </div>
          
          <div className="flex flex-col gap-4">
            {matches.map((match) => (
              <div 
                key={match.id} 
                style={{ 
                  background: '#FFFFFF', 
                  border: '1px solid #CBD5E1', 
                  borderRadius: '8px', 
                  padding: '1.25rem', 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 220px', 
                  gap: '1.5rem', 
                  alignItems: 'stretch' 
                }}
              >
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '50%', 
                      background: '#F0F9FF', 
                      border: '1.5px solid #BAE6FD', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      color: '#0284C7' 
                    }}>
                      <User size={24} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>{match.name}, {match.age}</h3>
                        <span style={{ fontSize: '0.68rem', background: '#DCFCE7', color: '#166534', padding: '0.1rem 0.4rem', borderRadius: '3px', fontWeight: 700 }}>
                          PICT Verified
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        {match.branch} • {match.year}
                      </p>
                    </div>
                  </div>

                  {match.preferredHostel && (
                    <div style={{ fontSize: '0.75rem', color: '#0284C7', fontWeight: 600, marginBottom: '0.5rem' }}>
                      🏠 Preferred: <strong>{match.preferredHostel}</strong>
                    </div>
                  )}

                  <div style={{ background: '#F8FAFC', padding: '0.65rem 0.85rem', borderRadius: '4px', borderLeft: '3px solid #0284C7', marginBottom: '0.75rem' }}>
                    <p style={{ fontSize: '0.78rem', color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
                      "{match.bio}"
                    </p>
                  </div>

                  <div className="flex gap-1.5 text-xs font-semibold flex-wrap">
                    <span style={{ background: '#F1F5F9', color: '#334155', padding: '0.15rem 0.5rem', borderRadius: '3px', fontSize: '0.72rem' }}>
                      ₹{match.budget}/mo
                    </span>
                    <span style={{ background: '#F1F5F9', color: '#334155', padding: '0.15rem 0.5rem', borderRadius: '3px', fontSize: '0.72rem' }}>
                      {match.preferences.studyHabits}
                    </span>
                    <span style={{ background: '#F1F5F9', color: '#334155', padding: '0.15rem 0.5rem', borderRadius: '3px', fontSize: '0.72rem' }}>
                      {match.preferences.sleepSchedule}
                    </span>
                  </div>
                </div>

                {/* Match Score & Connect */}
                <div style={{ 
                  background: '#F0F9FF', 
                  border: '1px solid #BAE6FD', 
                  borderRadius: '6px', 
                  padding: '1rem', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between' 
                }}>
                  <div>
                    <div className="text-center mb-2">
                      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0284C7' }}>
                        {match.matchScore}%
                      </div>
                      <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>
                        Compatibility
                      </div>
                    </div>
                    
                    <ul style={{ fontSize: '0.72rem', color: '#334155', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      {match.reasons.slice(0, 3).map((r, i) => (
                        <li key={i} className="flex items-start gap-1">
                          <Check size={12} color="#059669" style={{ marginTop: '2px', flexShrink: 0 }} />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    style={{ background: '#0284C7', color: 'white', padding: '0.45rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, border: 'none', cursor: 'pointer', marginTop: '0.5rem' }}
                    onClick={() => {
                      setConnectModalStudent(match);
                      setConnectMessageSent(false);
                      setConnectMessage(`Hi ${match.name.split(' ')[0]}, I am also a student at PICT looking for a roommate in Dhankawadi / Trimurti Chowk!`);
                    }}
                  >
                    Send Connect Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connect Request Modal */}
      {connectModalStudent && (
        <div className="modal-backdrop" onClick={() => setConnectModalStudent(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px', borderRadius: '8px' }}>
            <div className="modal-header" style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid #E2E8F0' }}>
              <div className="flex items-center gap-2">
                <Send size={16} color="#0284C7" />
                <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0F172A' }}>Connect with {connectModalStudent.name}</h3>
              </div>
              <button onClick={() => setConnectModalStudent(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <div className="modal-body" style={{ padding: '1.25rem' }}>
              {connectMessageSent ? (
                <div className="text-center py-4">
                  <div style={{ width: '48px', height: '48px', background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A', margin: '0 auto 0.75rem auto' }}>
                    <CheckCircle2 size={28} />
                  </div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', marginBottom: '0.25rem' }}>
                    Message Sent to {connectModalStudent.name}!
                  </h4>
                  <p style={{ fontSize: '0.78rem', color: '#64748B', marginBottom: '1rem' }}>
                    Your contact info was shared. You'll receive a WhatsApp confirmation.
                  </p>
                  <button 
                    style={{ background: '#0284C7', color: 'white', padding: '0.4rem 0.85rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => setConnectModalStudent(null)}
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendConnect} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '0.75rem', borderRadius: '6px', fontSize: '0.8rem' }}>
                    <strong>{connectModalStudent.name}</strong> • {connectModalStudent.branch}
                  </div>

                  <div className="input-group">
                    <label className="input-label" style={{ fontSize: '0.8rem' }}>Your Message</label>
                    <textarea
                      rows={3}
                      className="input-field"
                      value={connectMessage}
                      onChange={(e) => setConnectMessage(e.target.value)}
                      required
                      style={{ fontSize: '0.85rem' }}
                    />
                  </div>

                  <button 
                    type="submit" 
                    style={{ background: '#0284C7', color: 'white', padding: '0.55rem', borderRadius: '6px', fontWeight: 700, border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}
                  >
                    Send WhatsApp Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoommateFinder;
