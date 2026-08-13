import { useState } from 'react';
import { roommateProfiles, colleges } from '../data/mockData';
import { User, MapPin, IndianRupee, Briefcase, Coffee, Check } from 'lucide-react';

const RoommateFinder = () => {
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    budget: 8000,
    collegeId: 'c2',
    smoking: 'Non-smoking',
    sleepSchedule: 'Early Bird',
    cleanliness: 'Very Clean'
  });
  
  const [matches, setMatches] = useState([]);

  const handleChange = (e) => {
    setPreferences({ ...preferences, [e.target.name]: e.target.value });
  };

  const calculateMatches = () => {
    const scoredProfiles = roommateProfiles.map(profile => {
      let score = 0;
      let totalWeight = 100;
      let reasons = [];

      // College / Location Match (High weight)
      if (profile.collegeId === preferences.collegeId) {
        score += 30;
        reasons.push('Same college area');
      }

      // Budget match (High weight)
      if (Math.abs(profile.budget - preferences.budget) <= 1000) {
        score += 25;
        reasons.push('Similar budget');
      }

      // Habit match (Medium weight)
      if (profile.preferences.smoking === preferences.smoking) {
        score += 15;
        reasons.push('Matching smoking preference');
      }
      
      if (profile.preferences.sleepSchedule === preferences.sleepSchedule) {
        score += 15;
        reasons.push(`Both are ${preferences.sleepSchedule}s`);
      }
      
      if (profile.preferences.cleanliness === preferences.cleanliness) {
        score += 15;
        reasons.push('Similar cleanliness standards');
      }

      return { ...profile, matchScore: score, reasons };
    });

    // Sort by descending score
    scoredProfiles.sort((a, b) => b.matchScore - a.matchScore);
    setMatches(scoredProfiles);
    setStep(2);
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="font-bold text-3xl mb-2">Find a Compatible Roommate</h1>
        <p className="text-muted">We match you based on lifestyle, budget, and habits.</p>
      </div>

      {step === 1 && (
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
          <h2 className="text-xl font-bold mb-6">Tell us about your preferences</h2>
          
          <div className="input-group mb-4">
            <label className="input-label">Where are you looking?</label>
            <select className="input-field" name="collegeId" value={preferences.collegeId} onChange={handleChange}>
              {colleges.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="input-group mb-4">
            <label className="input-label">Your Budget: ₹{preferences.budget}</label>
            <input type="range" name="budget" min="5000" max="15000" step="500" value={preferences.budget} onChange={handleChange} className="input-field" style={{ padding: 0, border: 'none' }} />
          </div>

          <div className="flex gap-4 mb-4">
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Smoking</label>
              <select className="input-field" name="smoking" value={preferences.smoking} onChange={handleChange}>
                <option>Non-smoking</option>
                <option>Smoking</option>
              </select>
            </div>
            <div className="input-group" style={{ flex: 1 }}>
              <label className="input-label">Sleep Schedule</label>
              <select className="input-field" name="sleepSchedule" value={preferences.sleepSchedule} onChange={handleChange}>
                <option>Early Bird</option>
                <option>Night Owl</option>
              </select>
            </div>
          </div>

          <div className="input-group mb-8">
            <label className="input-label">Cleanliness</label>
            <select className="input-field" name="cleanliness" value={preferences.cleanliness} onChange={handleChange}>
              <option>Very Clean</option>
              <option>Moderate</option>
              <option>Messy</option>
            </select>
          </div>

          <button className="btn btn-primary" style={{ width: '100%' }} onClick={calculateMatches}>
            Find Matches
          </button>
        </div>
      )}

      {step === 2 && (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <button className="btn btn-outline mb-6" onClick={() => setStep(1)}>← Back to Preferences</button>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {matches.map((match, index) => {
              const col = colleges.find(c => c.id === match.collegeId);
              return (
                <div key={match.id} className={`card delay-${(index % 3) * 100} animate-fade-in`} style={{ padding: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2.5rem', alignItems: 'stretch' }}>
                  
                  {/* Profile Info */}
                  <div style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}>
                    <div className="flex items-center gap-4 mb-5">
                      <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-light) 0%, #E0E7FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '2px solid white', boxShadow: 'var(--shadow-sm)' }}>
                        <User size={36} color="var(--primary)" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <h3 className="font-bold text-2xl mb-1" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: 'var(--text-main)' }}>{match.name}, {match.age}</h3>
                        <p className="text-muted flex items-center gap-1 text-sm font-medium" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <MapPin size={16} style={{ flexShrink: 0, color: 'var(--primary)' }} /> Near {col?.name}
                        </p>
                      </div>
                    </div>
                    
                    <div style={{ background: '#F9FAFB', padding: '1rem', borderRadius: 'var(--radius-md)', borderLeft: '3px solid var(--primary)', marginBottom: '1.5rem' }}>
                      <p className="text-sm" style={{ fontStyle: 'italic', color: '#4B5563', lineHeight: '1.6', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        "{match.bio}"
                      </p>
                    </div>

                    <div className="flex gap-2 text-xs font-semibold mt-auto" style={{ flexWrap: 'wrap' }}>
                      <span className="badge badge-gray flex items-center gap-1 px-3 py-1.5 rounded-full"><IndianRupee size={14}/> Budget: ₹{match.budget}</span>
                      <span className="badge badge-blue flex items-center gap-1 px-3 py-1.5 rounded-full"><Briefcase size={14}/> {match.preferences.studyHabits}</span>
                      <span className="badge badge-green flex items-center gap-1 px-3 py-1.5 rounded-full"><Coffee size={14}/> {match.preferences.sleepSchedule}</span>
                    </div>
                  </div>

                  {/* Match Score & Actions */}
                  <div style={{ background: 'var(--primary-light)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', display: 'flex', flexDirection: 'column', border: '1px solid rgba(79, 70, 229, 0.1)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '100px', height: '100px', background: 'var(--primary)', opacity: '0.05', borderRadius: '50%' }}></div>
                    
                    <div className="text-center mb-6">
                      <div className="font-bold" style={{ fontSize: '3rem', lineHeight: '1', color: match.matchScore >= 80 ? 'var(--secondary)' : 'var(--primary)', textShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        {match.matchScore}%
                      </div>
                      <div className="text-sm font-semibold text-muted uppercase tracking-wider mt-1">Match Score</div>
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <h4 className="text-xs font-bold text-muted mb-3 uppercase">Why you match</h4>
                      <ul className="text-sm" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {match.reasons.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <Check size={16} color="var(--secondary)" style={{ marginTop: '1px', flexShrink: 0 }} /> 
                            <span style={{ lineHeight: 1.4 }}>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <button className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.875rem', fontWeight: 'bold' }}>Connect Request</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoommateFinder;
