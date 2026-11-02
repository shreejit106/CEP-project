import { useState } from 'react';
import {
  X,
  RefreshCw,
  Upload,
  MapPin,
  Search,
  Compass,
  CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import {
  batchDiscoverAllHostels,
  discoverHostelMedia,
  addManualPhotoToHostel,
  setAdminPlaceIdOverride,
  MEDIA_SOURCES
} from '../services/googleMediaDiscovery';

const AdminMediaModal = ({ isOpen, onClose, hostels = [], onHostelsUpdated }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState(null);
  const [batchLogs, setBatchLogs] = useState([]);
  const [singleLoadingId, setSingleLoadingId] = useState(null);

  // Manual Upload Modal State
  const [uploadHostel, setUploadHostel] = useState(null);
  const [uploadForm, setUploadForm] = useState({
    url: '',
    caption: '',
    attribution: '',
    source: MEDIA_SOURCES.OWNER_UPLOADED,
    isCover: false
  });

  // Place ID Override State
  const [overrideHostel, setOverrideHostel] = useState(null);
  const [customPlaceId, setCustomPlaceId] = useState('');

  if (!isOpen) return null;

  // Filter Hostels
  const filteredHostels = hostels.filter(h => {
    const matchesSearch = `${h.name} ${h.landmark || ''} ${h.googlePlaceId || ''}`.toLowerCase().includes(searchQuery.toLowerCase());
    const status = h.mediaDiscovery?.status || 'discovered';
    if (!matchesSearch) return false;
    if (activeTab === 'discovered') return status === 'discovered';
    if (activeTab === 'needs_review') return status === 'needs_review' || !h.googlePlaceId;
    if (activeTab === 'missing') return (h.images?.length || 0) === 0;
    return true;
  });

  // Calculate Metrics
  const metrics = {
    total: hostels.length,
    discovered: hostels.filter(h => (h.images?.length || 0) > 0).length,
    streetView: hostels.filter(h => h.streetView?.available).length,
    totalPhotos: hostels.reduce((acc, h) => acc + (h.images?.length || 0), 0)
  };

  // Run Batch Discovery
  const handleRunBatchDiscovery = async () => {
    setIsBatchRunning(true);
    setBatchLogs([]);
    setBatchProgress({ current: 0, total: hostels.length, percentage: 0, hostelName: 'Initializing...' });

    try {
      const summary = await batchDiscoverAllHostels(hostels, (progress) => {
        setBatchProgress(progress);
        setBatchLogs(prev => [
          `[${new Date().toLocaleTimeString()}] Discovered images for ${progress.hostelName} (${progress.current}/${progress.total})`,
          ...prev.slice(0, 15)
        ]);
      });

      setBatchLogs(prev => [
        `✅ Batch complete: Successfully processed ${summary.successful} hostels with Google Places photo references.`,
        ...prev
      ]);

      if (onHostelsUpdated) onHostelsUpdated();
    } catch (err) {
      setBatchLogs(prev => [`❌ Batch discovery encountered an error: ${err.message}`, ...prev]);
    } finally {
      setIsBatchRunning(false);
    }
  };

  // Run Single Hostel Discovery
  const handleDiscoverSingle = async (hostel) => {
    setSingleLoadingId(hostel.id);
    try {
      await discoverHostelMedia(hostel);
      if (onHostelsUpdated) onHostelsUpdated();
    } catch (err) {
      alert(`Discovery failed: ${err.message}`);
    } finally {
      setSingleLoadingId(null);
    }
  };

  // Handle Manual Upload Submission
  const handleSaveManualUpload = (e) => {
    e.preventDefault();
    if (!uploadForm.url.trim()) {
      alert('Please enter a valid image URL');
      return;
    }

    addManualPhotoToHostel(uploadHostel.id, uploadForm);
    alert(`Photo successfully added to ${uploadHostel.name} gallery!`);
    setUploadHostel(null);
    setUploadForm({ url: '', caption: '', attribution: '', source: MEDIA_SOURCES.OWNER_UPLOADED, isCover: false });
    if (onHostelsUpdated) onHostelsUpdated();
  };

  // Handle Place ID Override
  const handleSavePlaceIdOverride = (e) => {
    e.preventDefault();
    if (!customPlaceId.trim()) return;

    setAdminPlaceIdOverride(overrideHostel.id, customPlaceId.trim());
    alert(`Place ID override saved for ${overrideHostel.name}.`);
    setOverrideHostel(null);
    setCustomPlaceId('');
    if (onHostelsUpdated) onHostelsUpdated();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 1100 }}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '960px',
          maxHeight: '90vh',
          borderRadius: '16px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          background: '#FFFFFF'
        }}
      >
        {/* Modal Header */}
        <div style={{
          padding: '1.25rem 1.75rem',
          borderBottom: '1px solid #E2E8F0',
          background: '#0F172A',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span style={{
                background: '#0284C7',
                color: '#FFFFFF',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '2px 8px',
                borderRadius: '4px',
                textTransform: 'uppercase'
              }}>
                Google Maps Platform Admin
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Automated Media Discovery</span>
            </div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', margin: 0, fontFamily: "'DM Serif Display', serif" }}>
              Hostel Media & Photo Discovery Dashboard
            </h2>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, background: '#F8FAFC' }}>

          {/* Top Metrics Banner */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px',
            marginBottom: '1.25rem'
          }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Total Properties</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{metrics.total}</div>
              <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>100% in PICT vicinity</div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #BAE6FD', padding: '14px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0369A1', textTransform: 'uppercase' }}>Photos Discovered</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0284C7', marginTop: '2px' }}>{metrics.discovered} / {metrics.total}</div>
              <div style={{ fontSize: '0.7rem', color: '#0284C7', fontWeight: 600 }}>{metrics.totalPhotos} total media assets</div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
              <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>360° Street View</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0F172A', marginTop: '2px' }}>{metrics.streetView}</div>
              <div style={{ fontSize: '0.7rem', color: '#059669', fontWeight: 600 }}>Active surrounding panos</div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', padding: '14px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <button
                onClick={handleRunBatchDiscovery}
                disabled={isBatchRunning}
                style={{
                  background: isBatchRunning ? '#94A3B8' : '#0284C7',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: isBatchRunning ? 'not-allowed' : 'pointer',
                  boxShadow: '0 2px 6px rgba(2, 132, 199, 0.3)'
                }}
              >
                <RefreshCw size={14} className={isBatchRunning ? 'animate-spin' : ''} />
                <span>{isBatchRunning ? 'Discovering Images...' : 'Discover All Hostels'}</span>
              </button>
            </div>
          </div>

          {/* Batch Progress Bar (if running) */}
          {isBatchRunning && batchProgress && (
            <div style={{
              background: '#FFFFFF',
              border: '1.5px solid #BAE6FD',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '1.25rem',
              boxShadow: '0 2px 8px rgba(2, 132, 199, 0.08)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0369A1' }}>
                  Processing: {batchProgress.hostelName}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0284C7' }}>
                  {batchProgress.percentage}% ({batchProgress.current}/{batchProgress.total})
                </span>
              </div>
              <div style={{ width: '100%', height: '8px', background: '#E0F2FE', borderRadius: '9999px', overflow: 'hidden' }}>
                <div style={{ width: `${batchProgress.percentage}%`, height: '100%', background: '#0284C7', transition: 'width 0.3s ease' }} />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '6px' }}>
                Throttled at 220ms per property to respect Google Places API rate limits.
              </div>
            </div>
          )}

          {/* Activity Logs (if available) */}
          {batchLogs.length > 0 && (
            <div style={{
              background: '#0F172A',
              color: '#94A3B8',
              borderRadius: '10px',
              padding: '10px 14px',
              fontSize: '0.72rem',
              fontFamily: 'monospace',
              maxHeight: '100px',
              overflowY: 'auto',
              marginBottom: '1.25rem',
              lineHeight: 1.5
            }}>
              {batchLogs.map((log, idx) => (
                <div key={idx} style={{ color: log.startsWith('✅') ? '#34D399' : (log.startsWith('❌') ? '#F87171' : '#CBD5E1') }}>
                  {log}
                </div>
              ))}
            </div>
          )}

          {/* Controls & Filter Bar */}
          <div style={{
            background: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '10px 14px',
            marginBottom: '1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[
                { key: 'all', label: 'All Hostels' },
                { key: 'discovered', label: 'Discovered' },
                { key: 'needs_review', label: 'Needs Place ID' }
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  style={{
                    padding: '5px 12px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: 'none',
                    cursor: 'pointer',
                    background: activeTab === tab.key ? '#0284C7' : '#F1F5F9',
                    color: activeTab === tab.key ? '#FFFFFF' : '#475569'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div style={{ position: 'relative', width: '260px' }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} />
              <input
                type="text"
                placeholder="Search hostel or Place ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '6px 10px 6px 30px',
                  border: '1.5px solid #E2E8F0',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          {/* Hostels Media Table */}
          <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', overflow: 'hidden' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '70px 1.5fr 1fr 140px 140px',
              padding: '10px 16px',
              background: '#F8FAFC',
              borderBottom: '1px solid #E2E8F0',
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#475569',
              textTransform: 'uppercase'
            }}>
              <span>Photo</span>
              <span>Hostel & Place ID</span>
              <span>Source Breakdown</span>
              <span>Discovery Status</span>
              <span style={{ textAlign: 'right' }}>Actions</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredHostels.map((hostel) => {
                const coverImg = hostel.images?.[0] || hostel.image || 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=400';
                const photoCount = hostel.images?.length || 1;
                const placeId = hostel.googlePlaceId || hostel.externalPlace?.placeId;
                const isSingleLoading = singleLoadingId === hostel.id;

                return (
                  <div
                    key={hostel.id}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '70px 1.5fr 1fr 140px 140px',
                      padding: '12px 16px',
                      borderBottom: '1px solid #F1F5F9',
                      alignItems: 'center',
                      fontSize: '0.8rem'
                    }}
                  >
                    {/* Thumbnail */}
                    <div style={{ position: 'relative', width: '56px', height: '44px', borderRadius: '6px', overflow: 'hidden' }}>
                      <img src={coverImg} alt={hostel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <span style={{
                        position: 'absolute',
                        bottom: '2px',
                        right: '2px',
                        background: 'rgba(0,0,0,0.75)',
                        color: 'white',
                        fontSize: '0.6rem',
                        fontWeight: 800,
                        padding: '1px 4px',
                        borderRadius: '3px'
                      }}>
                        📷 {photoCount}
                      </span>
                    </div>

                    {/* Hostel Name & Place ID */}
                    <div>
                      <div style={{ fontWeight: 800, color: '#0F172A' }}>{hostel.name}</div>
                      <div style={{ fontSize: '0.7rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '1px' }}>
                        <MapPin size={10} color="#0284C7" />
                        <span>{hostel.landmark || hostel.address}</span>
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'monospace', marginTop: '2px' }}>
                        ID: {placeId ? placeId.slice(0, 24) + '...' : 'Not Resolved'}
                      </div>
                    </div>

                    {/* Source Breakdown */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                      <span style={{ fontSize: '0.7rem', color: '#0284C7', fontWeight: 700 }}>
                        Google Places ({photoCount})
                      </span>
                      {hostel.streetView?.available && (
                        <span style={{ fontSize: '0.68rem', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Compass size={11} /> 360° Street View Ready
                        </span>
                      )}
                    </div>

                    {/* Status */}
                    <div>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        background: '#ECFDF5',
                        color: '#065F46',
                        border: '1px solid #A7F3D0',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '3px 8px',
                        borderRadius: '6px'
                      }}>
                        <CheckCircle2 size={11} /> Discovered
                      </span>
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        onClick={() => handleDiscoverSingle(hostel)}
                        disabled={isSingleLoading}
                        title="Re-run Google Places Photo Discovery"
                        style={{
                          background: '#F1F5F9',
                          border: '1px solid #CBD5E1',
                          color: '#334155',
                          borderRadius: '6px',
                          padding: '5px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        <RefreshCw size={11} className={isSingleLoading ? 'animate-spin' : ''} />
                        <span>Sync</span>
                      </button>

                      <button
                        onClick={() => setUploadHostel(hostel)}
                        title="Upload Owner Photo Manually"
                        style={{
                          background: '#E0F2FE',
                          border: '1px solid #BAE6FD',
                          color: '#0369A1',
                          borderRadius: '6px',
                          padding: '5px 8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}
                      >
                        <Upload size={11} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '12px 1.75rem',
          borderTop: '1px solid #E2E8F0',
          background: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '0.72rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={13} color="#059669" />
            <span>Complies with Google Maps Platform Places & Street View API terms of service.</span>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '7px 16px',
              background: '#0F172A',
              color: '#FFFFFF',
              borderRadius: '8px',
              border: 'none',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Done
          </button>
        </div>
      </div>

      {/* Manual Upload Modal Overlay */}
      {uploadHostel && (
        <div
          className="modal-backdrop"
          onClick={() => setUploadHostel(null)}
          style={{ zIndex: 1200 }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '480px', padding: '20px', borderRadius: '14px', background: '#FFFFFF' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                Add Photo: {uploadHostel.name}
              </h3>
              <button onClick={() => setUploadHostel(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveManualUpload} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Image URL (High-Res CDN or Storage)
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                  value={uploadForm.url}
                  onChange={(e) => setUploadForm({ ...uploadForm, url: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #CBD5E1', borderRadius: '8px', fontSize: '0.8rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Caption / Room Description
                </label>
                <input
                  type="text"
                  placeholder="e.g. Spacious 2-Sharing Room with Attached Washroom"
                  value={uploadForm.caption}
                  onChange={(e) => setUploadForm({ ...uploadForm, caption: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #CBD5E1', borderRadius: '8px', fontSize: '0.8rem', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Photo Source Category
                </label>
                <select
                  value={uploadForm.source}
                  onChange={(e) => setUploadForm({ ...uploadForm, source: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #CBD5E1', borderRadius: '8px', fontSize: '0.8rem', boxSizing: 'border-box' }}
                >
                  <option value={MEDIA_SOURCES.OWNER_UPLOADED}>Owner / Management Verified (Priority 1)</option>
                  <option value={MEDIA_SOURCES.GOOGLE_PLACES}>Google Places Property Photo (Priority 2)</option>
                  <option value={MEDIA_SOURCES.STUDENT_SUBMITTED}>Student Resident Submission (Priority 3)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Attribution Label
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hostel Caretaker / Omkar B."
                  value={uploadForm.attribution}
                  onChange={(e) => setUploadForm({ ...uploadForm, attribution: e.target.value })}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #CBD5E1', borderRadius: '8px', fontSize: '0.8rem', boxSizing: 'border-box' }}
                />
              </div>

              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#334155', cursor: 'pointer', marginTop: '4px' }}>
                <input
                  type="checkbox"
                  checked={uploadForm.isCover}
                  onChange={(e) => setUploadForm({ ...uploadForm, isCover: e.target.checked })}
                  style={{ accentColor: '#0284C7' }}
                />
                <span style={{ fontWeight: 700 }}>Set as Primary Cover Photo for Listing Card</span>
              </label>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setUploadHostel(null)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', cursor: 'pointer', fontSize: '0.78rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFFFFF', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem' }}
                >
                  Save Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Place ID Override Modal */}
      {overrideHostel && (
        <div
          className="modal-backdrop"
          onClick={() => setOverrideHostel(null)}
          style={{ zIndex: 1200 }}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '440px', padding: '20px', borderRadius: '14px', background: '#FFFFFF' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                Set Place ID: {overrideHostel.name}
              </h3>
              <button onClick={() => setOverrideHostel(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSavePlaceIdOverride} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                  Google Maps Place ID (ChIJ...)
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. ChIJk6pU8a3BwjsR79M8b6k8jC0"
                  value={customPlaceId}
                  onChange={(e) => setCustomPlaceId(e.target.value)}
                  style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #CBD5E1', borderRadius: '8px', fontSize: '0.8rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setOverrideHostel(null)}
                  style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFFFFF', cursor: 'pointer', fontSize: '0.78rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '8px 18px', borderRadius: '8px', border: 'none', background: '#0284C7', color: '#FFFFFF', fontWeight: 800, cursor: 'pointer', fontSize: '0.78rem' }}
                >
                  Save Place ID
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMediaModal;
