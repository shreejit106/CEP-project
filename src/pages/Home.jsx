import { Link, useNavigate } from 'react-router-dom';
import { Search, Users, UserPlus, MapPin, QrCode } from 'lucide-react';
import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const [showQrSim, setShowQrSim] = useState(false);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, var(--primary-light) 0%, #FFFFFF 100%)',
        padding: '4rem 0',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container text-center">
          <h1 className="font-bold text-2xl mb-4" style={{ fontSize: '3rem', color: '#111827' }}>
            Find Your Perfect <span className="text-primary">PG & Roommate</span>
          </h1>
          <p className="text-lg text-muted mb-8" style={{ maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            A hyperlocal platform exclusively for boys in Pune. Discover verified PGs, compare facilities, or find a highly compatible roommate.
          </p>

          <div style={{
            display: 'flex',
            gap: '1.5rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            {/* Card 1: Individual */}
            <div className="card text-center" style={{ padding: '2rem', flex: '1', minWidth: '250px', cursor: 'pointer' }} onClick={() => navigate('/search-pg?type=individual')}>
              <div style={{ background: 'var(--primary-light)', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Search size={32} color="var(--primary)" />
              </div>
              <h3 className="font-semibold text-xl mb-2">I'm looking for a PG</h3>
              <p className="text-muted text-sm">Find individual rooms based on your budget and location.</p>
            </div>

            {/* Card 2: Group */}
            <div className="card text-center" style={{ padding: '2rem', flex: '1', minWidth: '250px', cursor: 'pointer' }} onClick={() => navigate('/search-pg?type=group')}>
              <div style={{ background: '#D1FAE5', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Users size={32} color="var(--secondary)" />
              </div>
              <h3 className="font-semibold text-xl mb-2">We're a group</h3>
              <p className="text-muted text-sm">Find PGs with enough vacancies for you and your friends.</p>
            </div>

            {/* Card 3: Roommate */}
            <div className="card text-center" style={{ padding: '2rem', flex: '1', minWidth: '250px', cursor: 'pointer' }} onClick={() => navigate('/roommates')}>
              <div style={{ background: '#FEE2E2', width: '64px', height: '64px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <UserPlus size={32} color="#DC2626" />
              </div>
              <h3 className="font-semibold text-xl mb-2">I need a roommate</h3>
              <p className="text-muted text-sm">Find compatible roommates with similar habits and preferences.</p>
            </div>
          </div>
        </div>
      </section>

      {/* QR Code Simulator */}
      <section className="container py-8 text-center mt-8">
        <div className="card" style={{ padding: '3rem 2rem', background: 'var(--text-main)', color: 'white' }}>
          <QrCode size={48} color="white" style={{ margin: '0 auto 1rem auto' }} />
          <h2 className="text-2xl font-bold mb-2">Try the QR Flow</h2>
          <p className="text-light mb-6">Scan QR codes around colleges to instantly see nearby Boys' PGs.</p>
          <button className="btn" style={{ background: 'white', color: 'var(--text-main)' }} onClick={() => setShowQrSim(!showQrSim)}>
            Simulate QR Scan
          </button>

          {showQrSim && (
            <div className="mt-8 flex justify-center gap-4 animate-fade-in" style={{ flexWrap: 'wrap' }}>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }} onClick={() => navigate('/search-pg?location=COEP')}>
                <MapPin size={16} /> Near COEP
              </button>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }} onClick={() => navigate('/search-pg?location=PICT')}>
                <MapPin size={16} /> Near PICT
              </button>
              <button className="btn btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.2)', background: 'rgba(255,255,255,0.1)' }} onClick={() => navigate('/search-pg?location=MIT-WPU')}>
                <MapPin size={16} /> Near MIT-WPU
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
