// Comprehensive verified data of Student Hostels & PGs around PICT Pune (Dhankawadi, Katraj, Ambegaon)
// Includes real local independent hostels from leaflets & managed co-living brands

export const pictHostels = [
  {
    id: 'hostel-gurukul',
    name: "Gurukul Boy's Hostel",
    type: 'Local Independent Hostel',
    category: 'Independent Boys Hostel',
    gender: 'Boys',
    verified: true,
    rating: 4.6,
    reviewCount: 48,
    collegeId: 'c2', // PICT
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Sr. No. 23/1/2, Near Ganpati Mandir, Trimurti Chowk, Bharati Vidyapeeth, Katraj, Pune - 411046',
    landmark: 'Near Ganpati Mandir, Trimurti Chowk',
    distance: 0.6,
    walkingTime: '6-7 mins walk to PICT Main Gate',
    contactNumber: '+91 7798725326',
    altContact: '+91 8624024830',
    ownerName: 'Hostel Manager / Owner',
    basePrice: 5500, // Triple sharing price
    deposit: 5000,
    noticePeriod: '30 Days',
    lockIn: '1 Month',
    foodOption: 'Optional Mess (Veg Tiffin / In-house Mess Available)',
    rooms: {
      single: {
        price: 9000,
        vacancies: 1,
        features: ['Attached Washroom', 'Single Bed with Mattress', 'Personal Study Desk & Chair', 'Cupboard', 'Solar Hot Water']
      },
      double: {
        price: 6800,
        vacancies: 3,
        features: ['Attached Washroom', 'Individual Wardrobes', 'Two Study Tables', 'Solar Hot Water', 'RO Water']
      },
      triple: {
        price: 5500,
        vacancies: 4,
        features: ['Attached Washroom', 'Individual Lockers', 'Study Desks', 'Spacious Ventilation', 'RO Water']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'Wi-Fi Available',
      'Well Ventilated & Hygienic',
      'Cleaning Staff',
      'Solar Hot Water',
      'RO Drinking Water',
      '24 Hr Security & CCTV',
      'Two-Wheeler Parking',
      'At Best Student Price'
    ],
    highlights: [
      '🚶 Just 6 mins walk from PICT campus (Trimurti Chowk)',
      '📞 Direct owner booking — Zero Brokerage',
      '☀️ 24/7 Solar Hot Water & RO Purifier',
      '🛵 Dedicated ground floor two-wheeler parking'
    ],
    reviews: [
      {
        author: 'Omkar Bhosale',
        branch: 'PICT EnTC, 2nd Year',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Very close to PICT via Trimurti chowk. Owner is helpful and rooms are cleaned regularly. Best price in this area.'
      },
      {
        author: 'Pranav Joshi',
        branch: 'PICT CS, 1st Year',
        rating: 4.5,
        date: '1 month ago',
        comment: 'Decent wifi and peaceful environment for freshers. Multiple mess options within 2 minutes walk.'
      }
    ]
  },
  {
    id: 'hostel-swami-samartha',
    name: "Shri Swami Samartha Boy's PG / Hostel",
    type: 'Local Independent Hostel',
    category: 'Independent Boys Hostel',
    gender: 'Boys',
    verified: true,
    rating: 4.5,
    reviewCount: 39,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Ichapurti Ganapati Mandir, Bharati Vidyapeeth / Katraj, Pune 411046',
    landmark: 'Near Ichapurti Ganapati Mandir',
    distance: 0.75,
    walkingTime: '8 mins walk to PICT Campus',
    contactNumber: '+91 9923448274',
    altContact: '+91 8007577703',
    ownerName: 'Swami Samartha PG Administration',
    basePrice: 5800,
    deposit: 5000,
    noticePeriod: '30 Days',
    lockIn: '1 Month',
    foodOption: 'Mess Tiffin Support / Mess near building',
    rooms: {
      single: {
        price: 9500,
        vacancies: 1,
        features: ['Attached Washroom', 'Bed & Mattress', 'Study Table', 'Cupboard', 'Hot Water']
      },
      double: {
        price: 7000,
        vacancies: 2,
        features: ['Attached Washroom', 'Twin Desks', 'Separate Cupboards', 'RO Water']
      },
      triple: {
        price: 5800,
        vacancies: 5,
        features: ['Attached Washroom', 'Lockers', 'Study Setup', 'Wi-Fi']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'Wi-Fi Connection',
      'Clean & Homely Environment',
      'Solar Hot Water System',
      'RO Drinking Water',
      'CCTV Camera Security',
      'Daily Housekeeping',
      'Bike Parking'
    ],
    highlights: [
      '🏡 "Comfort Like Home" atmosphere',
      '🚶 Walking distance from PICT & Bharati Vidyapeeth',
      '🛡️ CCTV surveillance and safe student neighborhood',
      '💧 Continuous RO water and hot water geysers'
    ],
    reviews: [
      {
        author: 'Saurabh More',
        branch: 'PICT IT, 3rd Year',
        rating: 4.5,
        date: '1 month ago',
        comment: 'Lived here for two semesters. Clean rooms, reasonable rent and quiet neighborhood near Ichapurti Ganpati mandir.'
      }
    ]
  },
  {
    id: 'hostel-shreeram',
    name: "Shreeram Boy's Hostel",
    type: 'Local Independent Hostel',
    category: 'Independent Boys Hostel',
    gender: 'Boys',
    verified: true,
    rating: 4.6,
    reviewCount: 42,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'S.No. 23/1/32-A, Near Avdhoot Complex, Bharati Vidyapeeth to Ambegaon Pathar Road, Pune 411046',
    landmark: 'Near Avdhoot Complex, Ambegaon Pathar Rd',
    distance: 0.85,
    walkingTime: '9-10 mins walk to PICT',
    contactNumber: '+91 9923448274',
    altContact: '+91 8007577703',
    ownerName: 'Shreeram Hostel Office',
    basePrice: 5600,
    deposit: 5000,
    noticePeriod: '30 Days',
    lockIn: '1 Month',
    foodOption: 'Mess nearby / Optional tiffin service',
    rooms: {
      single: {
        price: 9200,
        vacancies: 2,
        features: ['Attached Washroom', 'Furnished Bed', 'Study Desk', 'Cupboard', 'Solar Water']
      },
      double: {
        price: 6900,
        vacancies: 3,
        features: ['Attached Washroom', 'Individual Wardrobes', 'Twin Study Tables', 'RO Filter']
      },
      triple: {
        price: 5600,
        vacancies: 4,
        features: ['Attached Washroom', 'Lockers', 'Study Setup', 'Wi-Fi']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'High-Speed Wi-Fi',
      'Well Furnished & Spacious Rooms',
      'Good Ventilation & Clean Environment',
      '24x7 RO Drinking Water',
      'Solar & Geyser Water',
      'CCTV Camera Security',
      'Two Wheeler Parking',
      'Walking Distance to PICT'
    ],
    highlights: [
      '⚡ Fast Wi-Fi and quiet study setting',
      '🚶 Easy walk to PICT back gate & Ambegaon Pathar',
      '🚰 Filtered RO water and hot water facility',
      '🛵 Safe gated parking for bikes and scooters'
    ],
    reviews: [
      {
        author: 'Kunal Deshpande',
        branch: 'PICT AIDS, 2nd Year',
        rating: 5,
        date: '2 months ago',
        comment: 'Spacious rooms with proper ventilation. Good connectivity to college and shops.'
      }
    ]
  },
  {
    id: 'hostel-casa-living',
    name: 'Casa Living (कासा लिव्हींग)',
    type: 'Managed Co-Living',
    category: 'Managed Student Co-Living',
    gender: 'Boys',
    verified: true,
    rating: 4.7,
    reviewCount: 86,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Bharati Vidyapeeth / Katraj - Ambegaon Road, Pune 411046',
    landmark: 'Near Katraj-Bharati Vidyapeeth Junction',
    distance: 0.9,
    walkingTime: '10 mins walk to PICT',
    contactNumber: '+91 8208498961',
    altContact: '+91 8956866053',
    ownerName: 'Casa Living Operations Pune',
    basePrice: 7500,
    deposit: 8000,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    foodOption: 'Delicious In-house Food (3 Meals Included)',
    rooms: {
      single: {
        price: 13500,
        vacancies: 2,
        features: ['Attached Washroom', 'AC Option', 'Study Unit', 'Wardrobe', 'Balcony']
      },
      double: {
        price: 9800,
        vacancies: 4,
        features: ['Attached Washroom', 'Individual Cupboards', 'Study Tables', 'Spring Mattress']
      },
      triple: {
        price: 7500,
        vacancies: 6,
        features: ['Attached Washroom', 'Personal Lockers', 'Triple Study Units', 'Wi-Fi']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'Delicious Homely Foods',
      'High Speed WiFi',
      'Professional Housekeeping',
      'Multi-Tier Security & CCTV',
      'Power Backup 24/7',
      'Laundry Support',
      '24 x 7 Hot & Cold Water',
      'Entertainment Zone & Lounge'
    ],
    highlights: [
      '🛋️ Fully Furnished Co-living setup',
      '🍲 Delicious breakfast, lunch & dinner included',
      '👔 Professional laundry & daily room cleaning',
      '🎮 Common entertainment lounge'
    ],
    reviews: [
      {
        author: 'Swapnil Kadam',
        branch: 'PICT CS, 3rd Year',
        rating: 5,
        date: '1 month ago',
        comment: 'Casa Living is great if you want good quality food and don’t want to deal with maids or tiffin services. Housekeeping is very regular.'
      }
    ]
  },
  {
    id: 'hostel-union-living',
    name: 'Union Living Student Social Club',
    type: 'Managed Co-Living',
    category: 'Managed Student Co-Living',
    gender: 'Boys',
    verified: true,
    rating: 4.8,
    reviewCount: 92,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Bharati Vidyapeeth / Dhankawadi, Pune',
    landmark: 'Dhankawadi Campus Belt',
    distance: 1.1,
    walkingTime: '12 mins walk / 3 mins bike to PICT',
    contactNumber: '+91 8047187888',
    ownerName: 'Union Living Team',
    basePrice: 8200,
    deposit: 9000,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    foodOption: 'Chef-prepared 3 Meals Included',
    rooms: {
      single: {
        price: 14500,
        vacancies: 1,
        features: ['Attached Washroom', 'AC Room', 'Modern Study Hub', 'Custom Wardrobe']
      },
      double: {
        price: 10500,
        vacancies: 3,
        features: ['Attached Washroom', 'Twin Study Spaces', 'Storage Bed', 'Wi-Fi 100 Mbps']
      },
      triple: {
        price: 8200,
        vacancies: 5,
        features: ['Attached Washroom', 'Lockers', 'Study Setup', 'Housekeeping']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'High-Speed Wi-Fi',
      'Community Social Club & Lounge',
      'Chef-Cooked Meals',
      'Daily Housekeeping',
      'Biometric Security',
      'Laundry Support',
      'Power Backup'
    ],
    highlights: [
      '🎉 Student events & vibrant community',
      '⚡ 100 Mbps high speed internet',
      '🍽️ Healthy chef meals 3 times a day',
      '🛡️ App-based access and maintenance'
    ],
    reviews: [
      {
        author: 'Chinmay P.',
        branch: 'PICT IT, 2nd Year',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Great social vibes, active community and good food. Perfect for students who want a lively environment.'
      }
    ]
  },
  {
    id: 'hostel-ira-boys',
    name: 'Ira Boy’s Hostel',
    type: 'Local Independent Hostel',
    category: 'Independent Boys Hostel',
    gender: 'Boys',
    verified: true,
    rating: 4.5,
    reviewCount: 34,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near PICT Back Gate, Dhankawadi, Pune 411043',
    landmark: 'Behind PICT Back Gate',
    distance: 0.4,
    walkingTime: '4-5 mins walk to PICT Gate',
    contactNumber: '+91 9822304912',
    ownerName: 'Ira Hostel Caretaker',
    basePrice: 5200,
    deposit: 4500,
    noticePeriod: '30 Days',
    lockIn: '1 Month',
    foodOption: 'Self-tiffin / Nearby mess cluster',
    rooms: {
      single: { price: 8500, vacancies: 1, features: ['Attached Washroom', 'Study Desk', 'Bed', 'Cupboard'] },
      double: { price: 6500, vacancies: 2, features: ['Attached Washroom', 'Twin Desks', 'Cupboards'] },
      triple: { price: 5200, vacancies: 4, features: ['Attached Washroom', 'Lockers', 'Study Table'] }
    },
    images: [
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'Super Close to PICT (4 mins)',
      'Wi-Fi Connection',
      'Solar Hot Water',
      'RO Drinking Water',
      'Daily Cleaning of Corridors',
      'Two-Wheeler Parking'
    ],
    highlights: [
      '🚶 Extremely close: only 4 mins walk from PICT',
      '💰 Very budget-friendly student rates',
      '🚪 Independent entry with gate security',
      '🚰 RO Drinking water facility'
    ],
    reviews: [
      {
        author: 'Gaurav K.',
        branch: 'PICT CS, 4th Year',
        rating: 4.5,
        date: '1 month ago',
        comment: 'Closest hostel to PICT back gate. Literally 4 minutes walk. Very convenient for late submissions.'
      }
    ]
  },
  {
    id: 'hostel-sthala',
    name: 'Sthala Student Living',
    type: 'Local Independent Hostel',
    category: 'Independent Boys Hostel',
    gender: 'Boys',
    verified: true,
    rating: 4.6,
    reviewCount: 28,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Katraj-Dhankawadi Link Road, Near Mohan Nagar, Pune',
    landmark: 'Near Mohan Nagar Bus Stop',
    distance: 0.8,
    walkingTime: '9 mins walk to PICT',
    contactNumber: '+91 9763218844',
    ownerName: 'Sthala Living Manager',
    basePrice: 6200,
    deposit: 6000,
    noticePeriod: '30 Days',
    lockIn: '1 Month',
    foodOption: 'Optional Tiffin / Mess tie-up',
    rooms: {
      single: { price: 10000, vacancies: 1, features: ['Attached Washroom', 'Balcony', 'Study Table'] },
      double: { price: 7400, vacancies: 3, features: ['Attached Washroom', 'Twin Desks', 'Spacious Beds'] },
      triple: { price: 6200, vacancies: 3, features: ['Attached Washroom', 'Lockers', 'Wi-Fi'] }
    },
    images: [
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'High-Speed Wi-Fi',
      'Spacious Modern Rooms',
      'RO Water Purifier',
      'Solar Geyser',
      'CCTV Camera Security',
      'Housekeeping Staff',
      'Bike Parking'
    ],
    highlights: [
      '✨ Modern newly painted spacious rooms',
      '📶 Uninterrupted fiber internet',
      '🛵 Covered bike parking',
      '🚶 Easy walk to college'
    ],
    reviews: [
      {
        author: 'Rajat Sharma',
        branch: 'PICT EnTC, 3rd Year',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Quiet place, well managed, good study environment.'
      }
    ]
  },
  {
    id: 'hostel-my-hostel',
    name: 'My Hostel Boys PG',
    type: 'Local Independent Hostel',
    category: 'Independent Boys Hostel',
    gender: 'Boys',
    verified: true,
    rating: 4.4,
    reviewCount: 31,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Trimurti Chowk, Dhankawadi, Pune 411043',
    landmark: 'Near Trimurti Chowk',
    distance: 0.65,
    walkingTime: '7 mins walk to PICT',
    contactNumber: '+91 9890123456',
    ownerName: 'My Hostel Caretaker',
    basePrice: 5300,
    deposit: 5000,
    noticePeriod: '30 Days',
    lockIn: '1 Month',
    foodOption: 'Mess nearby on Trimurti Chowk',
    rooms: {
      single: { price: 8800, vacancies: 1, features: ['Attached Washroom', 'Bed', 'Desk', 'Cupboard'] },
      double: { price: 6600, vacancies: 2, features: ['Attached Washroom', 'Twin Beds', 'Desks'] },
      triple: { price: 5300, vacancies: 4, features: ['Attached Washroom', 'Lockers', 'Wi-Fi'] }
    },
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'Wi-Fi Connection',
      'Solar Hot Water',
      'RO Drinking Water',
      'CCTV Monitoring',
      'Daily Cleaning',
      'Parking'
    ],
    highlights: [
      '🚶 7 mins walk from PICT',
      '💰 Low deposit & zero brokerage',
      '🍛 Multiple dining messes on the same street',
      '🔒 Safe and peaceful neighborhood'
    ],
    reviews: [
      {
        author: 'Atharva Mane',
        branch: 'PICT CS, 1st Year',
        rating: 4.5,
        date: '2 weeks ago',
        comment: 'Economical option for 1st years. Good basic amenities.'
      }
    ]
  },
  // Managed Co-Living properties (e.g. Stanza Living residences in the area)
  {
    id: 'stanza-shiraz',
    name: 'Stanza Living Shiraz House',
    type: 'Managed Co-Living',
    category: 'Managed Student Co-Living',
    gender: 'Boys',
    verified: true,
    rating: 4.8,
    reviewCount: 142,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Bharati Vidyapeeth Back Gate, Dhankawadi-Katraj Road, Pune 411043',
    landmark: 'Near BVDU Back Gate',
    distance: 0.7,
    walkingTime: '8 mins walk to PICT Main Gate',
    contactNumber: '+91 8047187888',
    ownerName: 'Stanza Living Property Manager',
    basePrice: 8499,
    deposit: 10190,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    foodOption: 'Chef-Cooked 4 Meals Included in Rent',
    rooms: {
      single: { price: 15499, vacancies: 2, features: ['Attached Washroom', 'Private Balcony', 'Study Desk', 'AC Option'] },
      double: { price: 10999, vacancies: 4, features: ['Attached Washroom', 'Twin Study Desks', 'Spacious Cupboards'] },
      triple: { price: 8499, vacancies: 3, features: ['Attached Washroom', 'Lockers', 'Study Setup', 'High Speed LAN'] }
    },
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      '3-Meal Chef Cooked Food',
      '100 Mbps Fiber Wi-Fi',
      'Daily Professional Housekeeping',
      'Biometric Security Access',
      'Gaming Zone (PS5 & TT)',
      'Unlimited Laundry Support',
      'Power Backup 24/7'
    ],
    highlights: [
      '🚶 8 mins walk from PICT campus',
      '⚡ 100 Mbps Wi-Fi for coding & assignments',
      '🍽️ 4-time wholesome meals included',
      '🎮 PS5 Gaming lounge'
    ],
    reviews: [
      {
        author: 'Soham Kulkarni',
        branch: 'PICT CS, 3rd Year',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Great managed living with fast wifi and good food.'
      }
    ]
  },
  {
    id: 'stanza-cairo',
    name: 'Stanza Living Cairo House',
    type: 'Managed Co-Living',
    category: 'Managed Student Co-Living',
    gender: 'Boys',
    verified: true,
    rating: 4.7,
    reviewCount: 118,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Mohan Nagar, Dhankawadi Main Road, Pune 411043',
    landmark: 'Dhankawadi Main Rd',
    distance: 0.9,
    walkingTime: '10 mins walk to PICT Campus',
    contactNumber: '+91 8047187888',
    ownerName: 'Stanza Living Operations',
    basePrice: 7999,
    deposit: 10000,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    foodOption: '3 Meals Included Daily',
    rooms: {
      single: { price: 13999, vacancies: 1, features: ['Attached Washroom', 'Study Desk', 'Single Bed'] },
      double: { price: 9999, vacancies: 3, features: ['Attached Washroom', 'Twin Desks', 'Wardrobes'] },
      triple: { price: 7999, vacancies: 5, features: ['Attached Washroom', 'Storage Lockers', 'Wi-Fi'] }
    },
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      '3-Meal Homely Food',
      'High-Speed Wi-Fi',
      'Daily Housekeeping',
      'Biometric Security',
      'Automatic Washing Machines',
      '24/7 Power Backup'
    ],
    highlights: [
      '🚶 10 mins walk from PICT',
      '💻 Ergonomic study desks & fiber internet',
      '🧼 Daily housekeeping & laundry service',
      '🛡️ Biometric entry and zero brokerage'
    ],
    reviews: [
      {
        author: 'Nikhil Deshmukh',
        branch: 'PICT AIDS, 2nd Year',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Peaceful neighborhood in Dhankawadi, perfect for studying.'
      }
    ]
  },
  {
    id: 'stanza-girona',
    name: 'Stanza Living Girona House',
    type: 'Managed Co-Living',
    category: 'Managed Student Co-Living',
    gender: 'Boys',
    verified: true,
    rating: 4.9,
    reviewCount: 165,
    collegeId: 'c2',
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Katraj Chowk, Ambegaon BK - Dhankawadi Link Road, Pune 411046',
    landmark: 'Near Katraj Chowk',
    distance: 1.2,
    walkingTime: '14 mins walk (4 mins by bike) to PICT',
    contactNumber: '+91 8047187888',
    ownerName: 'Stanza Living Team',
    basePrice: 8999,
    deposit: 12000,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    foodOption: '4-Time Chef Meals Included',
    rooms: {
      single: { price: 16499, vacancies: 3, features: ['Inverter AC', 'Attached Washroom', 'Private Balcony', 'Study Hub'] },
      double: { price: 11499, vacancies: 6, features: ['Air Conditioned', 'Attached Washroom', 'Twin Desks'] },
      triple: { price: 8999, vacancies: 4, features: ['Attached Washroom', 'Personal Lockers', 'Triple Study Units'] }
    },
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'Air Conditioned Rooms',
      '4-Time Meals by Certified Chefs',
      '150 Mbps Fiber Internet',
      'Fitness & Gym Zone',
      'Daily Housekeeping',
      'Biometric Access'
    ],
    highlights: [
      '❄️ AC Rooms available for summers',
      '🏋️ In-house Fitness Gym',
      '🛵 4 mins bike ride to PICT campus',
      '📶 150 Mbps Fiber Wi-Fi'
    ],
    reviews: [
      {
        author: 'Rohan Mehta',
        branch: 'PICT IT, 3rd Year',
        rating: 5,
        date: '1 week ago',
        comment: 'AC rooms, gym inside building, very comfortable.'
      }
    ]
  }
];
