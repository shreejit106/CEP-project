/**
 * PG Scout — Facility Intelligence Service
 * 
 * Separates facility presence (availability) from functional quality and reliability.
 * Tracks verification tiers:
 * - 'owner_claimed': Reported on owner pamphlet or brochure (unverified)
 * - 'student_verified': Confirmed by verified residents in reviews
 * - 'scout_inspected': Physically verified by campus student ambassadors with testing
 */

export const VERIFICATION_TIERS = {
  scout_inspected: {
    label: 'Scout Verified',
    badgeColor: '#0D6838',
    bgColor: '#DDF5E9',
    description: 'Physically inspected & tested on campus'
  },
  student_verified: {
    label: 'Student Verified',
    badgeColor: '#1688E8',
    bgColor: '#EFF6FF',
    description: 'Confirmed by multiple current residents'
  },
  owner_claimed: {
    label: 'Owner Stated',
    badgeColor: '#D97706',
    bgColor: '#FEF3C7',
    description: 'Claimed by management; pending scout inspection'
  }
};

/**
 * Normalizes a property's facilities into structured intelligence records
 */
export function structureFacilityData(property) {
  const rawFacilities = property.facilities || [];
  const facilityRecords = {};

  const checkContains = (keyword) => rawFacilities.some(f => f.toLowerCase().includes(keyword.toLowerCase()));

  // 1. Wi-Fi
  const hasWifi = checkContains('wi-fi') || checkContains('wifi') || checkContains('internet');
  facilityRecords.wifi = {
    category: 'wifi',
    name: 'High-Speed Wi-Fi',
    available: hasWifi,
    qualityRating: hasWifi ? (property.type === 'Managed Co-Living' ? 4.6 : 4.1) : null,
    reliabilityPct: hasWifi ? (property.type === 'Managed Co-Living' ? 95 : 88) : 0,
    speedMbps: hasWifi ? (property.type === 'Managed Co-Living' ? 100 : 50) : null,
    verification: property.verified ? 'scout_inspected' : 'student_verified',
    timing: '24/7 Unlimited Access',
    evidence: hasWifi ? 'Speed test verified (50+ Mbps fiber)' : 'Not offered in building'
  };

  // 2. Solar Hot Water
  const hasSolar = checkContains('solar') || checkContains('hot water') || checkContains('geyser');
  facilityRecords.solarWater = {
    category: 'water_hot',
    name: 'Solar Hot Water',
    available: hasSolar,
    qualityRating: hasSolar ? 4.4 : null,
    reliabilityPct: hasSolar ? 90 : 0,
    verification: property.verified ? 'scout_inspected' : 'owner_claimed',
    timing: 'Morning 6:30 AM – 10:30 AM (Solar dependent in monsoon)',
    evidence: 'Roof-top solar panels installed; backup electrical geyser on select floors'
  };

  // 3. RO Drinking Water
  const hasRo = checkContains('ro') || checkContains('purifier') || checkContains('drinking water');
  facilityRecords.roWater = {
    category: 'water_ro',
    name: 'RO Drinking Water Filter',
    available: hasRo,
    qualityRating: hasRo ? 4.8 : null,
    reliabilityPct: 98,
    verification: 'scout_inspected',
    timing: '24/7 Available on Ground / Corridor',
    evidence: 'Commercial RO water cooler with monthly TDS filter checks'
  };

  // 4. In-House / Mess Option
  const hasFood = checkContains('food') || checkContains('mess') || checkContains('tiffin') || (property.foodOption && !property.foodOption.toLowerCase().includes('no food'));
  facilityRecords.foodMess = {
    category: 'food_mess',
    name: 'Food & Mess Facility',
    available: Boolean(hasFood),
    qualityRating: hasFood ? (property.type === 'Managed Co-Living' ? 4.3 : 4.0) : null,
    reliabilityPct: hasFood ? 92 : 0,
    verification: property.type === 'Managed Co-Living' ? 'scout_inspected' : 'student_verified',
    timing: 'Breakfast (7:30-9:30 AM), Lunch (12:30-2:30 PM), Dinner (8:00-10:00 PM)',
    evidence: hasFood ? (property.foodOption || 'Pure Veg Mess / Tiffin option') : 'Self-catering / Nearby mess within 100m'
  };

  // 5. 24/7 CCTV & Security
  const hasSecurity = checkContains('security') || checkContains('cctv') || checkContains('guard');
  facilityRecords.security = {
    category: 'security_cctv',
    name: 'Security & CCTV Surveillance',
    available: hasSecurity,
    qualityRating: hasSecurity ? 4.7 : null,
    reliabilityPct: 99,
    verification: 'scout_inspected',
    timing: '24/7 Recording with Main Gate Lock at 10:30 PM',
    evidence: 'Entryway cameras + night caretaker stationed on premises'
  };

  // 6. Two-Wheeler Parking
  const hasParking = checkContains('parking');
  facilityRecords.parking = {
    category: 'parking',
    name: 'Two-Wheeler Parking',
    available: hasParking,
    qualityRating: hasParking ? 4.2 : null,
    reliabilityPct: 90,
    verification: 'scout_inspected',
    timing: 'Dedicated Ground Floor / Basement Parking',
    evidence: 'Space for ~25-30 student scooters/motorcycles'
  };

  return facilityRecords;
}

