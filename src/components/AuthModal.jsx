import { useState, useEffect } from 'react';
import { 
  X, User, Mail, Lock, Eye, EyeOff, 
  CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, ChevronRight, Zap
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const GoogleGIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
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
  const { isAuthModalOpen, setIsAuthModalOpen, loginWithGoogle, loginWithCredentials } = useUser();

  // Mode: 'signin' | 'signup'
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Form Fields
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [branch, setBranch] = useState('Computer Engineering');
  const [year, setYear] = useState('2nd Year (SE)');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isAuthModalOpen) {
        setIsAuthModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAuthModalOpen, setIsAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleClose = () => {
    setIsAuthModalOpen(false);
    setShowGooglePicker(false);
    setErrorMessage('');
  };

  // Google Sign-In Quick Selectors
  const googleAccounts = [
    {
      name: 'Shreejit Pawar',
      email: 'shreejitpawar07@gmail.com',
      branch: 'Computer Engineering',
      year: '3rd Year (TE)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop'
    },
    {
      name: 'Prashant Patil',
      email: 'prashant.patil@pict.edu',
      branch: 'Information Technology',
      year: '2nd Year (SE)',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=200&auto=format&fit=crop'
    }
  ];

  const handleSelectGoogleAccount = (acc) => {
    loginWithGoogle({
      name: acc.name,
      email: acc.email,
      phone: '+91 98231 45678',
      college: 'PICT Pune',
      branch: acc.branch,
      year: acc.year,
      avatar: acc.avatar,
      isLoggedIn: true,
      provider: 'google'
    });
    handleClose();
  };

  const handleCustomGoogleSubmit = (e) => {
    e.preventDefault();
    if (!customGoogleEmail.trim()) {
      setErrorMessage('Please enter your Google / PICT email.');
      return;
    }
    const cleanName = customGoogleName.trim() || customGoogleEmail.split('@')[0];
    loginWithGoogle({
      name: cleanName,
      email: customGoogleEmail.trim(),
      phone: '+91 98231 45678',
      college: 'PICT Pune',
      branch: 'Computer Engineering',
      year: '2nd Year (SE)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      isLoggedIn: true,
      provider: 'google'
    });
    handleClose();
  };

  // Credentials Sign In Submit
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!emailOrPhone.trim()) {
      setErrorMessage('Please enter your email or 10-digit mobile number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    const isEmail = emailOrPhone.includes('@');
    loginWithCredentials({
      name: isEmail ? emailOrPhone.split('@')[0] : 'PICT Student',
      email: isEmail ? emailOrPhone.trim() : `${emailOrPhone.replace(/\D/g, '')}@student.pict.edu`,
      phone: isEmail ? '+91 98231 45678' : emailOrPhone,
      branch: 'Computer Engineering',
      year: '2nd Year (SE)'
    });
    handleClose();
  };

  // Demo Sign-In (Instant Access)
  const handle1ClickDemoSignIn = () => {
    loginWithCredentials({
      name: 'Pratham Shinde',
      email: 'pratham.shinde@pict.edu',
      phone: '+91 98231 45678',
      branch: 'Computer Engineering',
      year: '3rd Year (TE)'
    });
    handleClose();
  };

  // Credentials Sign Up Submit
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!signupPhone.trim()) {
      setErrorMessage('Please enter your mobile number.');
      return;
    }
    if (!password) {
      setErrorMessage('Please set a password.');
      return;
    }

    loginWithCredentials({
      name: name.trim(),
      email: signupEmail.trim() || `${signupPhone.replace(/\D/g, '')}@student.pict.edu`,
      phone: signupPhone.startsWith('+91') ? signupPhone : `+91 ${signupPhone}`,
      branch,
      year
    });
    handleClose();
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleClose} 
      style={{ 
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.65)',
        backdropFilter: 'blur(6px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out'
      }}
    >
      <div
        className="modal-content animate-slide-up"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '92vh',
          borderRadius: '24px',
          background: '#ffffff',
          border: '1.5px solid #E2E8F0',
          boxShadow: '0 25px 60px -15px rgba(20, 36, 58, 0.35)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-modal-title"
      >
        {/* Header with Branded Badge & Close */}
        <div style={{
          background: 'linear-gradient(135deg, #14243A 0%, #1E3A5F 100%)',
          color: '#ffffff',
          padding: '1.5rem 1.75rem 1.35rem',
          position: 'relative'
        }}>
          {/* Close button */}
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
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)'}
          >
            <X size={16} />
          </button>

          {/* College Trust Badge */}
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.4rem', 
            background: 'rgba(255, 255, 255, 0.15)', 
            backdropFilter: 'blur(4px)',
            padding: '0.25rem 0.75rem', 
            borderRadius: '9999px', 
            border: '1px solid rgba(255, 255, 255, 0.25)', 
            fontSize: '0.72rem', 
            fontWeight: 700, 
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: '#93C5FD', 
            marginBottom: '0.65rem' 
          }}>
            <Sparkles size={13} color="#60A5FA" /> PICT Pune Student Accommodation
          </div>

          <h2 id="auth-modal-title" style={{ fontSize: '1.45rem', fontWeight: 800, fontFamily: "'Manrope', sans-serif", margin: 0, letterSpacing: '-0.02em', color: '#ffffff' }}>
            {showGooglePicker ? 'Select Google Account' : (activeTab === 'signin' ? 'Sign In to PGScout' : 'Create Student Account')}
          </h2>
          <p style={{ fontSize: '0.82rem', color: '#CBD5E1', margin: '4px 0 0', lineHeight: 1.4 }}>
            Zero brokerage, verified hostels near Dhankawadi & roommate discovery.
          </p>
        </div>

        {/* Modal Body (Scrollable) */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', flex: 1 }}>

          {/* Google Account Picker View */}
          {showGooglePicker ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 600 }}>Choose an account to continue:</span>
                <button 
                  type="button" 
                  onClick={() => setShowGooglePicker(false)}
                  style={{ background: 'none', border: 'none', color: '#1688E8', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                >
                  ← Back to login
                </button>
              </div>

              {/* Quick Google Profile Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
                {googleAccounts.map((acc, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectGoogleAccount(acc)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                      padding: '0.85rem 1rem',
                      background: '#F8FAFC',
                      border: '1.5px solid #E2E8F0',
                      borderRadius: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      width: '100%'
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = '#1688E8';
                      e.currentTarget.style.background = '#EFF6FF';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = '#E2E8F0';
                      e.currentTarget.style.background = '#F8FAFC';
                    }}
                  >
                    <img 
                      src={acc.avatar} 
                      alt={acc.name} 
                      style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid #CBD5E1' }} 
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#14243A' }}>{acc.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{acc.email}</div>
                      <div style={{ fontSize: '0.68rem', color: '#1688E8', fontWeight: 600 }}>{acc.branch} · {acc.year}</div>
                    </div>
                    <ChevronRight size={18} color="#94A3B8" />
                  </button>
                ))}
              </div>

              {/* Or enter any custom Google account */}
              <form onSubmit={handleCustomGoogleSubmit} style={{ borderTop: '1px dashed #CBD5E1', paddingTop: '1rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 700, display: 'block', marginBottom: '0.5rem' }}>
                  Or enter another Google / College email:
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <input
                    type="text"
                    placeholder="Your Name (e.g. Tanmay Sharma)"
                    value={customGoogleName}
                    onChange={(e) => setCustomGoogleName(e.target.value)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.85rem'
                    }}
                  />
                  <input
                    type="email"
                    placeholder="student@pict.edu or gmail.com"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    style={{
                      padding: '0.65rem 0.85rem',
                      borderRadius: '10px',
                      border: '1.5px solid #CBD5E1',
                      fontSize: '0.85rem'
                    }}
                    required
                  />
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem',
                      borderRadius: '10px',
                      background: '#14243A',
                      color: '#ffffff',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <GoogleGIcon />
                    <span>Sign In with this Google Account</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Main Sign In / Sign Up Flow */
            <div>
              {/* Primary Google Login Button */}
              <button
                type="button"
                onClick={() => setShowGooglePicker(true)}
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  background: '#ffffff',
                  border: '1.5px solid #CBD5E1',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#1E293B',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.05)',
                  marginBottom: '1rem'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = '#1688E8';
                  e.currentTarget.style.background = '#F8FAFC';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(22, 136, 232, 0.12)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = '#CBD5E1';
                  e.currentTarget.style.background = '#ffffff';
                  e.currentTarget.style.boxShadow = '0 2px 6px rgba(15, 23, 42, 0.05)';
                }}
              >
                <GoogleGIcon />
                <span>Continue with Google / PICT Mail</span>
              </button>

              {/* 1-Click Demo Fill for Fast Testing */}
              <button
                type="button"
                onClick={handle1ClickDemoSignIn}
                style={{
                  width: '100%',
                  padding: '0.55rem 0.85rem',
                  background: '#EFF6FF',
                  border: '1.5px dashed #1688E8',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#1688E8',
                  cursor: 'pointer',
                  marginBottom: '1.25rem',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#DBEAFE'}
                onMouseLeave={e => e.currentTarget.style.background = '#EFF6FF'}
                title="Instant login with demo student credentials"
              >
                <Zap size={14} color="#1688E8" />
                <span>⚡ 1-Click Instant Demo Student Sign In</span>
              </button>

              {/* Divider */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1rem 0 1.25rem' }}>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                <span style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  or continue with credentials
                </span>
                <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
              </div>

              {/* Segmented Control Tabs */}
              <div style={{ 
                display: 'flex', 
                background: '#F1F5F9', 
                padding: '4px', 
                borderRadius: '12px', 
                marginBottom: '1.25rem' 
              }}>
                <button
                  type="button"
                  onClick={() => { setActiveTab('signin'); setErrorMessage(''); }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: activeTab === 'signin' ? '#ffffff' : 'transparent',
                    color: activeTab === 'signin' ? '#14243A' : '#64748B',
                    fontWeight: activeTab === 'signin' ? 800 : 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    boxShadow: activeTab === 'signin' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setActiveTab('signup'); setErrorMessage(''); }}
                  style={{
                    flex: 1,
                    padding: '0.55rem',
                    border: 'none',
                    borderRadius: '8px',
                    background: activeTab === 'signup' ? '#ffffff' : 'transparent',
                    color: activeTab === 'signup' ? '#14243A' : '#64748B',
                    fontWeight: activeTab === 'signup' ? 800 : 600,
                    fontSize: '0.84rem',
                    cursor: 'pointer',
                    boxShadow: activeTab === 'signup' ? '0 2px 6px rgba(0,0,0,0.08)' : 'none',
                    transition: 'all 0.2s'
                  }}
                >
                  Create Account
                </button>
              </div>

              {/* Error Message Box */}
              {errorMessage && (
                <div style={{
                  background: '#FEF2F2',
                  border: '1px solid #FECACA',
                  color: '#B91C1C',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  marginBottom: '1rem',
                  fontWeight: 600
                }}>
                  {errorMessage}
                </div>
              )}

              {/* TAB 1: SIGN IN */}
              {activeTab === 'signin' ? (
                <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.35rem' }}>
                      Email or Mobile Number
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="e.g. pratham.shinde@pict.edu or 9823145678"
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 0.75rem 0.75rem 2.4rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155' }}>
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setEmailOrPhone('pratham.shinde@pict.edu');
                          setPassword('student123');
                        }}
                        style={{ background: 'none', border: 'none', color: '#1688E8', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                      >
                        Auto-fill sample?
                      </button>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <Lock size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.75rem 2.5rem 0.75rem 2.4rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.88rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'none',
                          border: 'none',
                          color: '#94A3B8',
                          cursor: 'pointer',
                          padding: 0
                        }}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      marginTop: '0.5rem',
                      padding: '0.85rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #14243A 0%, #1688E8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      fontFamily: "'Manrope', sans-serif",
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 14px rgba(22, 136, 232, 0.3)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>Sign In</span>
                    <ArrowRight size={16} />
                  </button>
                </form>
              ) : (
                /* TAB 2: SIGN UP */
                <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Full Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <User size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="text"
                        placeholder="e.g. Yash Deshmukh"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.68rem 0.75rem 0.68rem 2.3rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                        Branch / Dept
                      </label>
                      <select
                        value={branch}
                        onChange={(e) => setBranch(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.68rem 0.5rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          background: '#ffffff',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="Computer Engineering">Computer Engg</option>
                        <option value="Information Technology">Information Tech</option>
                        <option value="Electronics & Telecomm">E&TC</option>
                        <option value="AI & Data Science">AI & Data Science</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                        Year
                      </label>
                      <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.68rem 0.5rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          background: '#ffffff',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="1st Year (FE)">1st Year (FE)</option>
                        <option value="2nd Year (SE)">2nd Year (SE)</option>
                        <option value="3rd Year (TE)">3rd Year (TE)</option>
                        <option value="4th Year (BE)">4th Year (BE)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Mobile Number *
                    </label>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#F1F5F9',
                        border: '1.5px solid #CBD5E1',
                        borderRadius: '10px',
                        padding: '0 0.65rem',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: '#14243A'
                      }}>
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={signupPhone}
                        onChange={(e) => setSignupPhone(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '0.68rem 0.75rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      College Email (Optional)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="email"
                        placeholder="e.g. yash.deshmukh@pict.edu"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.68rem 0.75rem 0.68rem 2.3rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                      Password *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Lock size={15} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                      <input
                        type="password"
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.68rem 0.75rem 0.68rem 2.3rem',
                          borderRadius: '10px',
                          border: '1.5px solid #CBD5E1',
                          fontSize: '0.85rem',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      marginTop: '0.4rem',
                      padding: '0.85rem',
                      borderRadius: '12px',
                      background: 'linear-gradient(135deg, #0D6838 0%, #1688E8 100%)',
                      color: '#ffffff',
                      border: 'none',
                      fontSize: '0.92rem',
                      fontWeight: 800,
                      fontFamily: "'Manrope', sans-serif",
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      boxShadow: '0 4px 14px rgba(13, 104, 56, 0.3)',
                      transition: 'all 0.2s'
                    }}
                  >
                    <span>Create Free Student Account</span>
                    <CheckCircle2 size={16} />
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Guest Dismiss Option */}
          <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#14243A'}
              onMouseLeave={e => e.currentTarget.style.color = '#64748B'}
            >
              Want to look around first? <span style={{ color: '#1688E8', fontWeight: 700 }}>Explore as Guest →</span>
            </button>
          </div>

          {/* Security & Verification Guarantee */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.45rem',
            marginTop: '1.15rem',
            paddingTop: '0.85rem',
            borderTop: '1px solid #F1F5F9',
            fontSize: '0.72rem',
            color: '#64748B'
          }}>
            <ShieldCheck size={14} color="#0D6838" />
            <span>Official PICT student community · 100% Privacy & Zero Spam</span>
          </div>

        </div>
      </div>
    </div>
  );
}
