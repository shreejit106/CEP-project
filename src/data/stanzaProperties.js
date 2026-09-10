// Stanza Living properties specifically in and around PICT Pune (Dhankawadi, Katraj, Ambegaon)
export const stanzaProperties = [
  {
    id: 'stanza-shiraz',
    name: 'Stanza Living Shiraz House',
    tagline: 'Premium Boys Residence with Chef Meals & Gaming Lounge',
    isStanza: true,
    gender: 'Boys',
    verified: true,
    rating: 4.8,
    reviewCount: 142,
    collegeId: 'c2', // PICT
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Bharati Vidyapeeth Back Gate, Dhankawadi-Katraj Road, Pune 411043',
    distance: 0.7,
    walkingTime: '8 mins walk to PICT Main Gate',
    mapCoordinates: { lat: 18.4552, lng: 73.8525 },
    basePrice: 8499, // Triple starting price
    deposit: 10190,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    rooms: {
      single: {
        price: 15499,
        vacancies: 2,
        total: 10,
        sqft: 180,
        features: ['Attached Private Washroom', 'Private Balcony', 'Study Desk + Ergonomic Chair', 'Personal Wardrobe', 'Air Conditioning']
      },
      double: {
        price: 10999,
        vacancies: 4,
        total: 24,
        sqft: 220,
        features: ['Attached Washroom', 'Individual Wardrobes', 'Twin Study Desks', 'Spacious Bed with Storage']
      },
      triple: {
        price: 8499,
        vacancies: 3,
        total: 18,
        sqft: 280,
        features: ['Attached Washroom', 'Personal Lockers', 'Triple Study Units', 'High-Speed LAN port per bed']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      '3-Meal Chef Cooked Food',
      '100 Mbps Wi-Fi',
      'Daily Professional Housekeeping',
      'Biometric & Smart Tech Access',
      '24x7 CCTV & Security Guard',
      'Gaming Zone (PS5 & Table Tennis)',
      'Fitness & Gym Area',
      'Unlimited Laundry Support',
      'Power Backup 24/7',
      'Hot Water Geysers',
      'RO Drinking Water',
      'Quiet Study Lounge'
    ],
    amenityCategories: {
      food: ['Breakfast, Lunch, Evening Snacks & Dinner', 'Chef-prepared North & South Indian Menu', 'Hygienic Dining Hall', 'Custom Weekend Specials'],
      safety: ['Biometric Resident Entry', '24/7 On-ground Security Guards', 'HD CCTV Surveillance in Common Areas', 'App-based Visitor Management'],
      convenience: ['Daily Room Cleaning & Trash Clearance', 'App-based Ticket Support (24h resolution)', 'High-speed Fiber Wi-Fi (100 Mbps)', 'Doctor on Call & First Aid'],
      community: ['PlayStation 5 Gaming Zone', 'Table Tennis & Foosball', 'High-tech Study Lounge with LAN', 'Monthly Cultural & Sports Events']
    },
    foodMenuSample: [
      { day: 'Monday', breakfast: 'Poha + Boiled Eggs/Sprouts + Tea/Coffee', lunch: 'Paneer Butter Masala, Dal Tadka, Roti, Rice, Salad', dinner: 'Mix Veg, Rajma, Jeera Rice, Chapati, Gulab Jamun' },
      { day: 'Wednesday', breakfast: 'Idli Sambar + Vada + Chutney + Coffee', lunch: 'Aloo Gobi, Dal Fry, Phulka, Steamed Rice, Curd', dinner: 'Chicken Curry / Shahi Paneer, Biryani Rice, Raita' },
      { day: 'Sunday', breakfast: 'Chole Bhature + Lassi', lunch: 'Special Veg Thali / Egg Curry, Pulao, Sweets', dinner: 'Pav Bhaji / Chinese Combo + Dessert' }
    ],
    highlights: [
      '🚶 Only 8 mins walk from PICT College campus',
      '⚡ 100 Mbps uninterrupted Wi-Fi for coding & assignments',
      '🍽️ 4-time wholesome meals included in rent',
      '🎮 Dedicated Gaming Room with PS5 and Table Tennis'
    ],
    reviews: [
      {
        author: 'Soham Kulkarni',
        branch: 'PICT CS, 3rd Year',
        rating: 5,
        date: '2 weeks ago',
        comment: 'Living at Shiraz House since 2nd year. The 8-minute walk to PICT makes it super convenient for morning 8 AM labs. The Wi-Fi is blazing fast and food is honestly 10x better than standard mess food.'
      },
      {
        author: 'Aditya Patil',
        branch: 'PICT IT, 2nd Year',
        rating: 5,
        date: '1 month ago',
        comment: 'Best student hostel near PICT hands down. Tech support resolves any AC or plumbing issues within 2 hours on the Stanza app. Very safe environment with biometric entry.'
      },
      {
        author: 'Prathamesh Shinde',
        branch: 'PICT EnTC, 4th Year',
        rating: 4,
        date: '2 months ago',
        comment: 'Spacious study tables and quiet atmosphere during exam weeks. The gaming zone is a great way to de-stress with friends.'
      }
    ]
  },
  {
    id: 'stanza-cairo',
    name: 'Stanza Living Cairo House',
    tagline: 'Modern Managed Student PG with Dedicated Study Desks',
    isStanza: true,
    gender: 'Boys',
    verified: true,
    rating: 4.7,
    reviewCount: 118,
    collegeId: 'c2', // PICT
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Mohan Nagar, Dhankawadi Main Road, Pune 411043',
    distance: 0.9,
    walkingTime: '10 mins walk to PICT Campus',
    mapCoordinates: { lat: 18.4590, lng: 73.8540 },
    basePrice: 7999, // Triple starting price
    deposit: 10000,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    rooms: {
      single: {
        price: 13999,
        vacancies: 1,
        total: 8,
        sqft: 165,
        features: ['Attached Washroom', 'Compact Balcony', 'High Quality Study Table', 'Single Bed with Spring Mattress']
      },
      double: {
        price: 9999,
        vacancies: 3,
        total: 20,
        sqft: 210,
        features: ['Attached Washroom', 'Individual Wardrobes', 'Study Space', 'Geyser Fitted']
      },
      triple: {
        price: 7999,
        vacancies: 5,
        total: 15,
        sqft: 260,
        features: ['Attached Washroom', 'Triple Storage Units', 'High-Speed Wi-Fi Router']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      '3-Meal Homely Food',
      'High-Speed Wi-Fi',
      'Daily Housekeeping',
      'App-based Biometric Security',
      '24/7 Power Backup',
      'Automatic Washing Machines',
      'Ergonomic Study Desks',
      'CCTV Monitoring',
      'RO Water Purifiers',
      'Solar & Geyser Hot Water'
    ],
    amenityCategories: {
      food: ['Wholesome 3 Meals + Tea', 'Clean and Sanitized Kitchen', 'Nutritional Menu by Dieticians', 'Hygienic Packed Tiffins for College'],
      safety: ['Biometric Access Gate', '24x7 Security Guards', 'Fire Extinguishers & Safety Alarms', 'Resident Verification'],
      convenience: ['Commercial Grade Laundry Support', '24/7 Inverter Power Backup', 'Professional Room Cleaning', 'Fast Repairs via App'],
      community: ['Indoor Board Games', 'High-Speed Wi-Fi Common Lounge', 'Student Study Circles']
    },
    foodMenuSample: [
      { day: 'Tuesday', breakfast: 'Masala Dosa + Sambhar + Filter Coffee', lunch: 'Bhindi Masala, Dal Makhani, Phulka, Rice, Salad', dinner: 'Kadhai Paneer, Jeera Rice, Tawa Roti, Fruit Custard' },
      { day: 'Thursday', breakfast: 'Aloo Paratha + Curd + Pickle + Tea', lunch: 'Sev Tamatar, Dal Fry, Roti, Rice', dinner: 'Veg Kolhapuri, Dal Tadka, Chapati, Steamed Rice, Kheer' }
    ],
    highlights: [
      '🚶 10 mins walk from PICT',
      '💻 High-speed internet & ergonomic study tables',
      '🧼 Daily professional housekeeping & linen change',
      '🛡️ Biometric entry and zero brokerage'
    ],
    reviews: [
      {
        author: 'Nikhil Deshmukh',
        branch: 'PICT AIDS, 2nd Year',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Great value for money. Very peaceful neighborhood in Dhankawadi, perfect for studying. The food quality has been consistent throughout the semester.'
      },
      {
        author: 'Tanmay Joshi',
        branch: 'PICT CS, 1st Year',
        rating: 4.5,
        date: '1 month ago',
        comment: 'As a fresher at PICT, moving into Cairo House made college life so easy. Zero hassle with maids, wifi bills or cook problems.'
      }
    ]
  },
  {
    id: 'stanza-girona',
    name: 'Stanza Living Girona House',
    tagline: 'Tech-Enabled Co-Living with AC Rooms & Fitness Hub',
    isStanza: true,
    gender: 'Boys',
    verified: true,
    rating: 4.9,
    reviewCount: 165,
    collegeId: 'c2', // PICT
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Katraj Chowk, Ambegaon BK - Dhankawadi Link Road, Pune 411046',
    distance: 1.2,
    walkingTime: '14 mins walk (4 mins by bike) to PICT',
    mapCoordinates: { lat: 18.4520, lng: 73.8560 },
    basePrice: 8999, // Triple starting price
    deposit: 12000,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    rooms: {
      single: {
        price: 16499,
        vacancies: 3,
        total: 12,
        sqft: 190,
        features: ['Inverter Air Conditioner', 'Attached Modern Washroom', 'Private Balcony', 'Smart Key Lock', 'Study Hub']
      },
      double: {
        price: 11499,
        vacancies: 6,
        total: 30,
        sqft: 240,
        features: ['Air Conditioned', 'Attached Washroom', 'Twin Ergonomic Desks', 'Spacious Dual Wardrobes']
      },
      triple: {
        price: 8999,
        vacancies: 4,
        total: 20,
        sqft: 300,
        features: ['Attached Washroom', 'High-Speed Wi-Fi', 'Personal Lockers', 'Triple Study Units']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      'Air Conditioned Rooms',
      '4-Time Meals by Certified Chefs',
      '150 Mbps Fiber Internet',
      'Fully Equipped Fitness & Gym Zone',
      'Daily Deep Housekeeping',
      'Biometric Access & Smart Surveillance',
      'Unlimited Laundry Support',
      'Community Entertainment Lounge',
      '100% Power Backup',
      'Cafeteria & Snacks Counter'
    ],
    amenityCategories: {
      food: ['4-Course Meals (Breakfast, Lunch, Hi-Tea, Dinner)', 'Live Counter on Weekends', 'Nutritious & Hygienic Kitchen Audit', 'Late Night Exam Snacks Counter'],
      safety: ['Facial Recognition / Biometric Entry', '24x7 Armed Security Guard', 'Night Warden On-duty', 'Complete CCTV Coverage'],
      convenience: ['Commercial Laundry Service Included', '100% Inverter & Genset Power Backup', 'Daily Room & Washroom Sanitization', 'On-site Facility Manager'],
      community: ['Equipped Gym with Cardio & Weights', 'PlayStation 5, Pool Table & TT', 'Acoustic Study Library', 'Weekend Movie Screenings']
    },
    foodMenuSample: [
      { day: 'Friday', breakfast: 'Methi Paratha + Curd + Coffee', lunch: 'Veg Biryani, Mirchi Ka Salan, Raita, Gulab Jamun', dinner: 'Paneer Lababdar, Butter Roti, Dal Tadka, Jeera Rice, Ice Cream' },
      { day: 'Saturday', breakfast: 'Uttapam + Sambhar + Coconut Chutney', lunch: 'Chole Masala, Bhature, Jeera Rice, Onion Salad', dinner: 'Special Continental/Pasta night + Dessert' }
    ],
    highlights: [
      '❄️ Fully Air Conditioned Rooms available',
      '🏋️ In-house Fitness Gym & Community Hub',
      '🛵 4 mins ride / 14 mins walk to PICT campus',
      '📶 Ultra-fast 150 Mbps Fiber Wi-Fi'
    ],
    reviews: [
      {
        author: 'Rohan Mehta',
        branch: 'PICT IT, 3rd Year',
        rating: 5,
        date: '1 week ago',
        comment: 'Girona House is top tier. The AC rooms, gym inside the building, and the gaming lounge make it feel like a luxury student hotel. AC works great in hot Pune summers.'
      },
      {
        author: 'Shubham Mane',
        branch: 'PICT CS, 4th Year',
        rating: 5,
        date: '3 weeks ago',
        comment: 'Our entire hackathon team stayed here during final year. High speed internet never dropped once. Super clean rooms and friendly manager.'
      }
    ]
  },
  {
    id: 'stanza-giza',
    name: 'Stanza Living Giza House',
    tagline: 'Affordable Managed Living near PICT & Bharati Vidyapeeth',
    isStanza: true,
    gender: 'Boys',
    verified: true,
    rating: 4.6,
    reviewCount: 94,
    collegeId: 'c2', // PICT
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Bharati Vidyapeeth Gate 2, Katraj-Dhankawadi, Pune 411043',
    distance: 1.5,
    walkingTime: '16 mins walk (5 mins by bike) to PICT',
    mapCoordinates: { lat: 18.4505, lng: 73.8580 },
    basePrice: 7499, // Triple starting price
    deposit: 9500,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    rooms: {
      single: {
        price: 13200,
        vacancies: 2,
        total: 6,
        sqft: 160,
        features: ['Attached Washroom', 'Private Wardrobe', 'Study Desk', 'Spring Bed']
      },
      double: {
        price: 9499,
        vacancies: 5,
        total: 18,
        sqft: 200,
        features: ['Attached Washroom', 'Individual Wardrobes', 'Twin Study Spaces']
      },
      triple: {
        price: 7499,
        vacancies: 6,
        total: 24,
        sqft: 250,
        features: ['Attached Washroom', 'Personal Lockers', 'Triple Study Units']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1598928506311-c55dd1b31bb1?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      '3 Nutritious Meals Daily',
      'High-Speed Wi-Fi',
      'Daily Professional Housekeeping',
      '24/7 Security & CCTV',
      'Automatic Washing Machines',
      'Power Backup',
      'Solar Hot Water System',
      'RO Water Purifiers',
      'Study Hall',
      'Biometric Check-in'
    ],
    amenityCategories: {
      food: ['Homestyle 3 Meals Daily', 'Clean Dining Setup', 'Pure Vegetarian / Non-Veg options on select days'],
      safety: ['Biometric Access Gate', 'CCTV on all corridors', 'Night Security Supervisor'],
      convenience: ['Daily Housekeeping Service', 'Laundry Washer Support', 'Hot Water in all Washrooms', 'App-based Ticket Support'],
      community: ['Common TV Lounge', 'Carrom & Chess Tables', 'Quiet Study Room']
    },
    foodMenuSample: [
      { day: 'Wednesday', breakfast: 'Upma + Sheera + Tea', lunch: 'Rajma Masala, Steamed Rice, Roti, Salad', dinner: 'Paneer Handi, Chapati, Jeera Rice, Gulab Jamun' }
    ],
    highlights: [
      '💰 Most budget-friendly Stanza residence near PICT',
      '🍛 Fresh nutritious meals 3 times a day',
      '🔐 Biometric security with zero brokerage',
      '🧹 Daily housekeeping and quick maintenance'
    ],
    reviews: [
      {
        author: 'Aniket Sharma',
        branch: 'PICT EnTC, 2nd Year',
        rating: 4.5,
        date: '1 month ago',
        comment: 'Very pocket-friendly for the Stanza quality of life. The food is hygienic and the staff is polite.'
      }
    ]
  },
  {
    id: 'stanza-tartus',
    name: 'Stanza Living Tartus House',
    tagline: 'Serene Co-Living Residence near Katraj Lake & PICT',
    isStanza: true,
    gender: 'Boys',
    verified: true,
    rating: 4.7,
    reviewCount: 76,
    collegeId: 'c2', // PICT
    collegeName: 'Pune Institute of Computer Technology (PICT)',
    address: 'Near Katraj Lake Road, Ambegaon Path, Pune 411046',
    distance: 1.8,
    walkingTime: '20 mins walk (6 mins by bike) to PICT',
    mapCoordinates: { lat: 18.4480, lng: 73.8600 },
    basePrice: 7299, // Triple starting price
    deposit: 9000,
    noticePeriod: '30 Days',
    lockIn: '3 Months',
    rooms: {
      single: {
        price: 12999,
        vacancies: 2,
        total: 5,
        sqft: 155,
        features: ['Attached Washroom', 'Study Desk', 'Wardrobe', 'Balcony View']
      },
      double: {
        price: 9199,
        vacancies: 4,
        total: 16,
        sqft: 195,
        features: ['Attached Washroom', 'Twin Desks', 'Spacious Beds']
      },
      triple: {
        price: 7299,
        vacancies: 5,
        total: 15,
        sqft: 240,
        features: ['Attached Washroom', 'Storage Lockers', 'Triple Study Tables']
      }
    },
    images: [
      'https://images.unsplash.com/photo-1499955085172-a104c9463ece?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=1000&auto=format&fit=crop'
    ],
    facilities: [
      '3-Meal Daily Food',
      'High-Speed Wi-Fi',
      'Daily Housekeeping',
      'Biometric Entry',
      'Laundry Support',
      '24/7 Power Backup',
      'CCTV Surveillance',
      'Study Room',
      'RO Water Purifiers'
    ],
    amenityCategories: {
      food: ['Healthy 3 Meals + Tea', 'Clean and Sanitized Kitchen', 'Weekend Specials'],
      safety: ['Biometric Access Gate', 'CCTV Monitoring', 'Guard on duty 24/7'],
      convenience: ['Daily Room Cleaning', 'Automatic Washers', '24/7 Hot Water', 'App Helpdesk'],
      community: ['Study Zone', 'Common Lounge & TT']
    },
    foodMenuSample: [
      { day: 'Monday', breakfast: 'Poha + Sprouts + Tea', lunch: 'Dal Fry, Aloo Matar, Roti, Rice', dinner: 'Mix Veg, Dal Tadka, Chapati, Kheer' }
    ],
    highlights: [
      '🌿 Quiet and scenic location near Katraj Lake',
      '📶 High speed internet and quiet study zones',
      '💸 Value pricing with zero brokerage',
      '🛡️ 24/7 security and managed living'
    ],
    reviews: [
      {
        author: 'Tejas Deshpande',
        branch: 'PICT IT, 1st Year',
        rating: 5,
        date: '2 months ago',
        comment: 'Very quiet and peaceful location. Great if you want to avoid city noise and focus on coding and studies.'
      }
    ]
  }
];
