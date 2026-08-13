import { Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Users, UserPlus } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: HomeIcon },
    { path: '/search-pg', label: 'Find PG', icon: Users },
    { path: '/roommates', label: 'Find Roommate', icon: UserPlus },
  ];

  return (
    <header>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span style={{ fontSize: '1.8rem', marginRight: '0.2rem' }}>🏠</span>
          StayMate
        </Link>
        <nav style={{ display: 'flex', gap: '2rem' }}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
                  padding: '0.5rem 0',
                  transition: 'var(--transition)'
                }}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div>
          <button className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Login</button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
