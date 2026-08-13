import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { pgs, colleges } from '../data/mockData';
import { MapPin, CheckCircle, Wifi, Users, IndianRupee } from 'lucide-react';

const PgSearch = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get('type') || 'individual';
  const preSelectedLocation = searchParams.get('location') || '';

  const [filteredPgs, setFilteredPgs] = useState(pgs);
  const [filters, setFilters] = useState({
    location: preSelectedLocation,
    budget: 15000,
    occupancy: type === 'group' ? 3 : 1, // Default 3 for group
    facilities: []
  });

  // Simple filter logic
  useEffect(() => {
    let result = [...pgs];
    
    // Filter by location (college name match)
    if (filters.location) {
      const col = colleges.find(c => c.name.includes(filters.location) || c.id === filters.location);
      if (col) {
        result = result.filter(pg => pg.collegeId === col.id);
      }
    }

    // Filter by budget
    result = result.filter(pg => pg.basePrice <= filters.budget);

    // Filter by occupancy (Group Logic: total vacancies must be >= required)
    if (filters.occupancy > 1) {
      result = result.filter(pg => {
        const totalVacancies = 
          pg.rooms.single.vacancies + 
          (pg.rooms.double.vacancies * 2) + 
          (pg.rooms.triple.vacancies * 3);
        return totalVacancies >= filters.occupancy;
      });
    } else {
      // Individual logic: at least 1 vacancy in any room
      result = result.filter(pg => 
        pg.rooms.single.vacancies > 0 || 
        pg.rooms.double.vacancies > 0 || 
        pg.rooms.triple.vacancies > 0
      );
    }

    setFilteredPgs(result);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-8 flex gap-6 animate-fade-in" style={{ alignItems: 'flex-start' }}>
      {/* Sidebar Filters */}
      <aside className="card" style={{ width: '300px', padding: '1.5rem', position: 'sticky', top: '5rem' }}>
        <h2 className="font-bold text-xl mb-6">Filters</h2>
        
        <div className="input-group mb-4">
          <label className="input-label">Location / College</label>
          <select 
            className="input-field" 
            name="location" 
            value={filters.location} 
            onChange={handleFilterChange}
          >
            <option value="">Anywhere in Pune</option>
            {colleges.map(c => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="input-group mb-4">
          <label className="input-label">Max Budget: ₹{filters.budget}</label>
          <input 
            type="range" 
            name="budget"
            min="5000" 
            max="20000" 
            step="500" 
            value={filters.budget} 
            onChange={handleFilterChange}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>

        <div className="input-group mb-4">
          <label className="input-label">Looking for (People)</label>
          <input 
            type="number" 
            name="occupancy"
            className="input-field" 
            min="1" 
            max="10"
            value={filters.occupancy} 
            onChange={handleFilterChange}
          />
        </div>
      </aside>

      {/* Main Content: PG List */}
      <main style={{ flex: 1 }}>
        <div className="flex justify-between items-center mb-6">
          <h1 className="font-bold text-2xl">
            {type === 'group' ? 'PGs for your Group' : "Boys' PGs near you"}
          </h1>
          <span className="text-muted">{filteredPgs.length} properties found</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {filteredPgs.map((pg, index) => {
            const col = colleges.find(c => c.id === pg.collegeId);
            const totalVacancies = pg.rooms.single.vacancies + pg.rooms.double.vacancies + pg.rooms.triple.vacancies;

            return (
              <div key={pg.id} className={`card flex delay-${(index % 3) * 100} animate-fade-in`} style={{ height: '220px' }}>
                {/* Image */}
                <div style={{ width: '280px', height: '100%', position: 'relative' }}>
                  <img src={pg.image} alt={pg.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {pg.verified && (
                    <div style={{ position: 'absolute', top: '0.5rem', left: '0.5rem', background: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold', color: 'var(--secondary)' }}>
                      <CheckCircle size={14} /> Verified
                    </div>
                  )}
                </div>

                {/* Details */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex justify-between items-start">
                      <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <h3 className="font-bold text-xl" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pg.name}</h3>
                        <p className="text-muted text-sm flex items-center gap-1 mt-1" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <MapPin size={14} style={{ flexShrink: 0 }} /> {pg.distance} km from {col?.name}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl flex items-center justify-end" style={{ color: 'var(--primary)' }}>
                          <IndianRupee size={20} /> {pg.basePrice}
                          <span className="text-muted text-sm font-normal">/mo</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      {pg.facilities.slice(0, 3).map((f, i) => (
                        <span key={i} className="badge badge-gray flex items-center gap-1">
                          {f === 'Wi-Fi' ? <Wifi size={12} /> : null} {f}
                        </span>
                      ))}
                      {pg.facilities.length > 3 && <span className="badge badge-gray">+{pg.facilities.length - 3}</span>}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                    <div className="flex gap-4">
                      {totalVacancies > 0 ? (
                        <span className="badge badge-green">🟢 {totalVacancies} Vacancies</span>
                      ) : (
                        <span className="badge badge-red">🔴 Full</span>
                      )}
                      <span className="text-sm text-muted">Last updated: {new Date(pg.lastVerified).toLocaleDateString()}</span>
                    </div>
                    <button className="btn btn-primary">View Details</button>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredPgs.length === 0 && (
            <div className="text-center py-8 text-muted">
              No PGs found matching your criteria. Try adjusting the filters.
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PgSearch;
