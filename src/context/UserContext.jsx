import { createContext, useContext, useState, useEffect } from 'react';
import { pictHostels } from '../data/pictHostelsData';

const UserContext = createContext();

export function UserProvider({ children }) {
  // 1. Current User
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('staymate_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Default guest state for first-time visitor (requires Sign In / Sign Up)
    return {
      name: 'Guest Student',
      email: '',
      phone: '',
      college: 'PICT Pune',
      branch: '',
      year: '',
      avatar: '',
      isLoggedIn: false
    };
  });

  // 2. Saved Properties
  const [savedProperties, setSavedProperties] = useState(() => {
    try {
      const saved = localStorage.getItem('staymate_saved');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Pre-seed with verified hostels so the user immediately sees data in the profile
    return [
      pictHostels[0], // Gurukul Boy's Hostel
      pictHostels[1], // Ira Boy's Hostel
    ];
  });

  // 3. Booked Visits
  const [bookedVisits, setBookedVisits] = useState(() => {
    try {
      const saved = localStorage.getItem('staymate_booked_visits');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    // Pre-seed with 1 confirmed visit
    return [
      {
        id: 'visit_demo_101',
        propertyId: pictHostels[0].id,
        propertyName: pictHostels[0].name,
        address: pictHostels[0].landmark || pictHostels[0].address,
        image: pictHostels[0].images?.[0] || '/hostels/gurukul/gurukul-boys-hostel-wagholi-wagholi-pune-hostel-for-boy-students-kf57l4nubp-250.jpg',
        contactNumber: pictHostels[0].contactNumber,
        studentName: 'Pratham Shinde',
        studentPhone: '+91 98231 45678',
        date: 'Tomorrow',
        slot: 'Evening (4:00 PM - 7:00 PM)',
        roomType: 'Double Sharing',
        status: 'Confirmed',
        createdAt: '2026-11-02'
      }
    ];
  });

  // 4. Saved Roommates
  const [savedRoommates, setSavedRoommates] = useState(() => {
    try {
      const saved = localStorage.getItem('staymate_saved_roommates');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  // Modals visibility state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileActiveTab, setProfileActiveTab] = useState('saved');

  // Open profile directly to a tab
  const openProfileWithTab = (tab) => {
    setProfileActiveTab(tab);
    setIsProfileModalOpen(true);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('staymate_user', JSON.stringify(user));
    } catch (e) {}
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('staymate_saved', JSON.stringify(savedProperties));
    } catch (e) {}
  }, [savedProperties]);

  useEffect(() => {
    try {
      localStorage.setItem('staymate_booked_visits', JSON.stringify(bookedVisits));
    } catch (e) {}
  }, [bookedVisits]);

  useEffect(() => {
    try {
      localStorage.setItem('staymate_saved_roommates', JSON.stringify(savedRoommates));
    } catch (e) {}
  }, [savedRoommates]);

  const toggleSaveRoommate = (roommate) => {
    if (!roommate) return;
    setSavedRoommates(prev => {
      const exists = prev.some(r => r.id === roommate.id);
      if (exists) {
        return prev.filter(r => r.id !== roommate.id);
      } else {
        return [roommate, ...prev];
      }
    });
  };

  const isRoommateSaved = (roommateId) => {
    return savedRoommates.some(r => r.id === roommateId);
  };

  // Toggle saving a property
  const toggleSaveProperty = (property) => {
    if (!property) return;
    setSavedProperties(prev => {
      const exists = prev.some(p => p.id === property.id);
      if (exists) {
        return prev.filter(p => p.id !== property.id);
      } else {
        return [property, ...prev];
      }
    });
  };

  const isPropertySaved = (propertyId) => {
    return savedProperties.some(p => p.id === propertyId);
  };

  const removeSavedProperty = (propertyId) => {
    setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
  };

  // Add a booked visit
  const addBooking = (bookingData) => {
    const newBooking = {
      id: 'visit_' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
      status: 'Confirmed',
      ...bookingData
    };
    setBookedVisits(prev => [newBooking, ...prev]);
  };

  const cancelBooking = (bookingId) => {
    setBookedVisits(prev => prev.filter(b => b.id !== bookingId));
  };

  // Sign in with Google
  const loginWithGoogle = (customProfile = null) => {
    const profile = customProfile || {
      name: 'Shreejit Pawar',
      email: 'shreejitpawar07@gmail.com',
      phone: '+91 98231 45678',
      college: 'PICT Pune',
      branch: 'Computer Engineering',
      year: '3rd Year (TE)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      isLoggedIn: true,
      provider: 'google'
    };
    setUser(profile);
    setIsAuthModalOpen(false);
  };

  // Sign in or Create account with Email/Password or Username
  const loginWithCredentials = ({ name, email, phone, branch, year }) => {
    const cleanName = name?.trim() || (email ? email.split('@')[0] : 'PICT Student');
    const cleanEmail = email?.trim() || (phone ? `${phone.replace(/\D/g, '').slice(-10)}@student.pict.edu` : 'student@pict.edu');
    const profile = {
      name: cleanName,
      email: cleanEmail,
      phone: phone?.trim() || '+91 98231 45678',
      college: 'PICT Pune',
      branch: branch || 'Computer Engineering',
      year: year || '2nd Year (SE)',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      isLoggedIn: true,
      provider: 'credentials'
    };
    setUser(profile);
    setIsAuthModalOpen(false);
  };

  // Sign in or Create account with Phone Number
  const loginWithPhone = ({ name, phone, email, branch, year }) => {
    setUser({
      name: name || 'PICT Student',
      email: email || `${phone.replace(/\D/g, '').slice(-10)}@student.pict.edu`,
      phone: phone,
      college: 'PICT Pune',
      branch: branch || 'Computer Engineering',
      year: year || '2nd Year (SE)',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
      isLoggedIn: true,
      provider: 'phone'
    });
    setIsAuthModalOpen(false);
  };

  const updateUserProfile = (updatedFields) => {
    setUser(prev => ({ ...prev, ...updatedFields }));
  };

  // Logout
  const logout = () => {
    setUser({
      name: 'Guest Student',
      email: '',
      phone: '',
      college: 'PICT Pune',
      branch: '',
      year: '',
      avatar: '',
      isLoggedIn: false
    });
    try {
      localStorage.removeItem('staymate_user');
    } catch (e) {}
  };

  return (
    <UserContext.Provider value={{
      user,
      setUser,
      savedProperties,
      toggleSaveProperty,
      isPropertySaved,
      removeSavedProperty,
      savedRoommates,
      toggleSaveRoommate,
      isRoommateSaved,
      bookedVisits,
      addBooking,
      cancelBooking,
      isAuthModalOpen,
      setIsAuthModalOpen,
      isProfileModalOpen,
      setIsProfileModalOpen,
      profileActiveTab,
      setProfileActiveTab,
      openProfileWithTab,
      loginWithGoogle,
      loginWithCredentials,
      loginWithPhone,
      updateUserProfile,
      logout
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    return {
      user: { name: 'Guest Student', isLoggedIn: false },
      savedProperties: [],
      bookedVisits: [],
      savedRoommates: [],
      isAuthModalOpen: false,
      setIsAuthModalOpen: () => {},
      isProfileModalOpen: false,
      setIsProfileModalOpen: () => {},
      profileActiveTab: 'saved',
      setProfileActiveTab: () => {},
      openProfileWithTab: () => {},
      toggleSaveProperty: () => {},
      isPropertySaved: () => false,
      removeSavedProperty: () => {},
      toggleSaveRoommate: () => {},
      isRoommateSaved: () => false,
      addBooking: () => {},
      cancelBooking: () => {},
      loginWithGoogle: () => {},
      loginWithCredentials: () => {},
      loginWithPhone: () => {},
      updateUserProfile: () => {},
      logout: () => {}
    };
  }
  return context;
}

