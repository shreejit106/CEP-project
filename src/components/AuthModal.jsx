import { useState } from 'react';
import { X, Phone, User, Mail, GraduationCap, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useUser } from '../context/UserContext';

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.36 7.35 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
    />
  </svg>
);

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle, loginWithPhone } = useUser();
  const [authMode, setAuthMode] = useState('phone-signup'); // 'phone-signup', 'phone-login'

  // Form fields
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('Computer Engineering');
  const [year, setYear] = useState('2nd Year (SE)');
  const [step, setStep] = useState('details'); // 'details' | 'otp'
  const [otp, setOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setStep('details');
    setErrorMsg('');
  };

  const handleGoogleClick = () => {
    loginWithGoogle();
  };

  const handleProceedToOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (authMode === 'phone-signup' && !name.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }
    setErrorMsg('');
    setStep('otp');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.length < 4) {
      setErrorMsg('Please enter the 4-digit code (Use 1234 for demo).');
      return;
    }
    loginWithPhone({
      name: name.trim() || 'PICT Student',
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      email: email.trim(),
      branch,
      year
    });
  };

  return (
    <div className="modal-backdrop" onClick={handleClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '460px',
          borderRadius: '20px',
          background: '#ffffff',
          border: '1.5px solid #bae6fd',
          boxShadow: '0 25px 60px rgba(2, 132, 199, 0.2)',
          overflow: 'hidden'
        }}
      >
        {/* Modal Header */}
        <div style={{
          background: 'linear-gradient(135deg, #f0f7ff 0%, #e0f2fe 100%)',
          padding: '1.5rem 1.75rem 1.25rem',
          borderBottom: '1px solid #bae6fd',
          position: 'relative'
        }}>
          <button
            onClick={handleClose}
            aria-label="Close modal"
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: '#ffffff',
              border: '1px solid #bae6fd',
              color: '#64748b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#0284c7'; e.currentTarget.style.borderColor = '#0284c7'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.borderColor = '#bae6fd'; }}
          >
            <X size={16} />
          </button>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ffffff', padding: '0.2rem 0.65rem', borderRadius: '9999px', border: '1px solid #bae6fd', fontSize: '0.7rem', fontWeight: 700, color: '#0284c7', marginBottom: '0.5rem' }}>
            <Sparkles size={12} color="#0284c7" /> PICT Student Access
          </div>

          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', fontFamily: "'Manrope', sans-serif", margin: 0 }}>
            {authMode === 'phone-signup' ? 'Create Student Account' : 'Welcome Back'}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0' }}>
            Zero brokerage, verified PICT hostels & roommate matching
          </p>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem 1.75rem' }}>
          {/* Quick Google Sign In Button */}
          <button
            type="button"
            onClick={handleGoogleClick}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              background: '#ffffff',
              border: '1.5px solid #cbd5e1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              fontFamily: "'Manrope', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 700,
              color: '#1e293b',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.05)',
              marginBottom: '1.25rem'
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#0284c7'; e.currentTarget.style.background = '#f8faff'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.background = '#ffffff'; }}
          >
            <GoogleIcon />
            <span>Continue with Google</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Or using Mobile Number
            </span>
            <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
          </div>

          {/* Mode Switch Tabs */}
          <div style={{ display: 'flex', background: '#f0f7ff', padding: '4px', borderRadius: '10px', marginBottom: '1.25rem' }}>
            <button
              type="button"
              onClick={() => { setAuthMode('phone-signup'); setStep('details'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '0.45rem',
                border: 'none',
                borderRadius: '8px',
                background: authMode === 'phone-signup' ? '#ffffff' : 'transparent',
                color: authMode === 'phone-signup' ? '#0284c7' : '#64748b',
                fontWeight: authMode === 'phone-signup' ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: authMode === 'phone-signup' ? '0 2px 6px rgba(2, 132, 199, 0.15)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              New Info / Sign Up
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('phone-login'); setStep('details'); setErrorMsg(''); }}
              style={{
                flex: 1,
                padding: '0.45rem',
                border: 'none',
                borderRadius: '8px',
                background: authMode === 'phone-login' ? '#ffffff' : 'transparent',
                color: authMode === 'phone-login' ? '#0284c7' : '#64748b',
                fontWeight: authMode === 'phone-login' ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                boxShadow: authMode === 'phone-login' ? '0 2px 6px rgba(2, 132, 199, 0.15)' : 'none',
                transition: 'all 0.2s'
              }}
            >
              Existing User Login
            </button>
          </div>

          {errorMsg && (
            <div style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', padding: '0.55rem 0.85rem', borderRadius: '8px', fontSize: '0.78rem', marginBottom: '1rem', fontWeight: 600 }}>
              {errorMsg}
            </div>
          )}

          {step === 'details' ? (
            <form onSubmit={handleProceedToOtp} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
              {/* If creating new account, ask for Name, Branch, Year */}
              {authMode === 'phone-signup' && (
                <>
                  <div className="input-group">
                    <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>
                      Student Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="e.g. Yash Deshmukh"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="input-field"
                        style={{ paddingLeft: '2.25rem', borderColor: '#bae6fd' }}
                        required
                      />
                    </div>
                  </div>

                  <div className="input-group">
                    <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>
                      College Email (Optional)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="email"
                        placeholder="e.g. yash.deshmukh@pict.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="input-field"
                        style={{ paddingLeft: '2.25rem', borderColor: '#bae6fd' }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div className="input-group">
                      <label className="input-label" style={{ fontSize: '0.72rem', color: '#334155' }}>
                        Branch
                      </label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        className="input-field"
                        style={{ fontSize: '0.8rem', padding: '0.65rem 0.5rem', borderColor: '#bae6fd', fontWeight: 600 }}
                      >
                        <option value="Computer Engineering">Computer Engg</option>
                        <option value="Information Technology">IT</option>
                        <option value="Electronics & Telecomm">E&TC</option>
                        <option value="AI & Data Science">AI & DS</option>
                      </select>
                    </div>

                    <div className="input-group">
                      <label className="input-label" style={{ fontSize: '0.72rem', color: '#334155' }}>
                        Year
                      </label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="input-field"
                        style={{ fontSize: '0.8rem', padding: '0.65rem 0.5rem', borderColor: '#bae6fd', fontWeight: 600 }}
                      >
                        <option value="1st Year (FE)">1st Year (FE)</option>
                        <option value="2nd Year (SE)">2nd Year (SE)</option>
                        <option value="3rd Year (TE)">3rd Year (TE)</option>
                        <option value="4th Year (BE)">4th Year (BE)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Phone Number Field */}
              <div className="input-group">
                <label className="input-label" style={{ fontSize: '0.75rem', color: '#334155' }}>
                  Mobile Number *
                </label>
                <div style={{ display: 'flex', gap: '0.4rem' }}>
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#f0f7ff',
                    border: '1.5px solid #bae6fd',
                    borderRadius: '10px',
                    padding: '0 0.75rem',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: '#0284c7'
                  }}>
                    🇮🇳 +91
                  </span>
                  <input
                    type="tel"
                    placeholder="98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field"
                    style={{ flex: 1, borderColor: '#bae6fd', fontSize: '0.9rem', fontWeight: 600 }}
                    maxLength={14}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  marginTop: '0.5rem',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <span>{authMode === 'phone-signup' ? 'Continue with Phone' : 'Send Verification OTP'}</span>
                <ArrowRight size={16} />
              </button>
            </form>
          ) : (
            /* OTP Verification Step */
            <form onSubmit={handleVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ textAlign: 'center', padding: '0.5rem 0' }}>
                <div style={{ fontSize: '0.85rem', color: '#475569' }}>
                  Enter the 4-digit code sent to <strong style={{ color: '#0f172a' }}>+91 {phone}</strong>
                </div>
                <div style={{ marginTop: '0.25rem' }}>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    style={{ background: 'none', border: 'none', color: '#0284c7', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Change Phone Number
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="1234"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={4}
                  style={{
                    width: '160px',
                    textAlign: 'center',
                    fontSize: '1.6rem',
                    fontWeight: 800,
                    letterSpacing: '0.4em',
                    padding: '0.6rem 0',
                    borderRadius: '12px',
                    border: '2px solid #0284c7',
                    background: '#f0f7ff',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  type="button"
                  onClick={() => setOtp('1234')}
                  style={{
                    background: '#e0f2fe',
                    border: '1px dashed #0284c7',
                    borderRadius: '6px',
                    padding: '0.25rem 0.65rem',
                    fontSize: '0.72rem',
                    color: '#0284c7',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  ⚡ Auto-fill Demo Code (1234)
                </button>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  boxShadow: '0 4px 14px rgba(2, 132, 199, 0.35)',
                  cursor: 'pointer'
                }}
              >
                <span>Verify & Complete Sign In</span>
                <CheckCircle2 size={16} />
              </button>
            </form>
          )}

          {/* Trust Banner */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            marginTop: '1.25rem',
            paddingTop: '1rem',
            borderTop: '1px solid #f1f5f9',
            fontSize: '0.72rem',
            color: '#64748b'
          }}>
            <ShieldCheck size={14} color="#059669" />
            <span>Official PICT student community login · 100% Privacy</span>
          </div>
        </div>
      </div>
    </div>
  );
}

