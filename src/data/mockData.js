import { pictHostels } from './pictHostelsData';
import { generatedPgs } from './generatedPgs';
import { enrichedAllPgs, enrichedPictHostels } from './enrichedHostelsData';

export const colleges = [
  { 
    id: 'c2', 
    name: 'Pune Institute of Computer Technology (PICT)', 
    shortName: 'PICT',
    area: 'Dhankawadi / Katraj',
    lat: 18.4575, 
    lng: 73.8508,
    badge: '10+ Verified Hostels & PGs'
  },
  { 
    id: 'c1', 
    name: 'COEP Technological University', 
    shortName: 'COEP',
    area: 'Shivajinagar',
    lat: 18.5284, 
    lng: 73.8553 
  },
  { 
    id: 'c3', 
    name: 'Vishwakarma Institute of Technology (VIT)', 
    shortName: 'VIT',
    area: 'Bibwewadi / Upper',
    lat: 18.4636, 
    lng: 73.8681 
  },
  { 
    id: 'c4', 
    name: 'MIT World Peace University (MIT-WPU)', 
    shortName: 'MIT-WPU',
    area: 'Kothrud',
    lat: 18.5182, 
    lng: 73.8150 
  },
  { 
    id: 'c5', 
    name: 'Pimpri Chinchwad College of Engineering (PCCOE)', 
    shortName: 'PCCOE',
    area: 'Akurdi / Nigdi',
    lat: 18.6517, 
    lng: 73.7613 
  },
];

// Combine real PICT local hostels with other Pune college PGs (Enriched with aspect analysis & Bayesian metrics)
export const pgs = enrichedAllPgs;

export { pictHostels, enrichedPictHostels, enrichedAllPgs };

export const roommateProfiles = [
  {
    id: 'r1',
    name: 'Aaryan Salunkhe',
    age: 19,
    collegeId: 'c2', // PICT
    collegeName: 'PICT Pune',
    branch: 'Computer Engineering (PICT)',
    year: '2nd Year (SE)',
    preferredHostel: "Gurukul Boy's Hostel",
    preferredLocality: 'Trimurti Chowk (600m to PICT)',
    budget: 6800,
    moveInDate: '2026-09-01',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Early Bird',
      studyHabits: 'Quiet study / Coding',
      cleanliness: 'Very Clean',
      sharing: 'Double',
      social: 'Quiet / Focused',
      furnished: 'Furnished',
      ac: 'Non-AC'
    },
    bio: '2nd Year CS student at PICT. Looking for a studious roommate for double sharing at Gurukul or Shreeram Hostel. Quiet environment for DSA and coding assignments.',
    tags: ['PICT CS', 'DSA / LeetCode', 'Vegetarian', 'Non-smoker', 'Early Riser'],
    matchScore: 0,
  },
  {
    id: 'r2',
    name: 'Rohan Deshpande',
    age: 20,
    collegeId: 'c2', // PICT
    collegeName: 'PICT Pune',
    branch: 'Information Technology (PICT)',
    year: '3rd Year (TE)',
    preferredHostel: 'Casa Living (Katraj)',
    preferredLocality: 'Katraj Hub',
    budget: 9500,
    moveInDate: '2026-08-25',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Any',
      sleepSchedule: 'Night Owl',
      studyHabits: 'Hackathons / Web Dev',
      cleanliness: 'Clean',
      sharing: 'Double',
      social: 'Outgoing',
      furnished: 'Furnished',
      ac: 'AC'
    },
    bio: 'IT 3rd year at PICT. Full-stack dev & hackathon participant. Looking for an energetic roommate at Casa Living or Girona House who loves building side projects.',
    tags: ['PICT IT', 'Hackathons', 'Night Owl', 'Gym Enthusiast'],
    matchScore: 0,
  },
  {
    id: 'r3',
    name: 'Vedant Kulkarni',
    age: 18,
    collegeId: 'c2', // PICT
    collegeName: 'PICT Pune',
    branch: 'AI & Data Science (PICT)',
    year: '1st Year (FE)',
    preferredHostel: "Shri Swami Samartha Boy's PG",
    preferredLocality: 'Near Ichapurti Ganpati',
    budget: 6000,
    moveInDate: '2026-09-01',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Early Bird',
      studyHabits: 'Quiet study',
      cleanliness: 'Very Clean',
      sharing: 'Triple',
      social: 'Balanced',
      furnished: 'Furnished',
      ac: 'Non-AC'
    },
    bio: 'Fresher joining PICT AIDS. Looking for fellow 1st year students to share a room near Ichapurti Ganpati Mandir / Trimurti Chowk.',
    tags: ['PICT AIDS', 'Fresher', 'Vegetarian', 'Organized'],
    matchScore: 0,
  },
  {
    id: 'r4',
    name: 'Siddharth More',
    age: 21,
    collegeId: 'c2', // PICT
    collegeName: 'PICT Pune',
    branch: 'Electronics & Telecom (PICT)',
    year: '4th Year (BE)',
    preferredHostel: "Ira Boy's Hostel (Back Gate)",
    preferredLocality: 'PICT Back Gate (4 mins walk)',
    budget: 5500,
    moveInDate: '2026-08-30',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Any',
      sleepSchedule: 'Night Owl',
      studyHabits: 'Placement Prep',
      cleanliness: 'Moderate',
      sharing: 'Double',
      social: 'Quiet / Focused',
      furnished: 'Furnished',
      ac: 'Non-AC'
    },
    bio: 'Final year EnTC at PICT preparing for placements. Need a quiet room right next to the back gate with reliable Wi-Fi.',
    tags: ['PICT EnTC', 'Final Year', 'Placement Prep', 'Back Gate'],
    matchScore: 0,
  },
  {
    id: 'r5',
    name: 'Pranav Joshi',
    age: 19,
    collegeId: 'c2', // PICT
    collegeName: 'PICT Pune',
    branch: 'Computer Engineering (PICT)',
    year: '2nd Year (SE)',
    preferredHostel: "Shreeram Boy's Hostel",
    preferredLocality: 'Ambegaon Pathar',
    budget: 5800,
    moveInDate: '2026-09-05',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Night Owl',
      studyHabits: 'Competitive Coding',
      cleanliness: 'Very Clean',
      sharing: 'Double',
      social: 'Balanced',
      furnished: 'Furnished',
      ac: 'Non-AC'
    },
    bio: 'SE Computer at PICT. Heavy codeforces & CP grinder. Looking for someone serious about academics and coding with respectful sleep schedule.',
    tags: ['PICT CS', 'Codeforces', 'Competitive Coding', 'Ambegaon'],
    matchScore: 0,
  },
  {
    id: 'r6',
    name: 'Harsh Vardhan',
    age: 20,
    collegeId: 'c2', // PICT
    collegeName: 'PICT Pune',
    branch: 'Information Technology (PICT)',
    year: '3rd Year (TE)',
    preferredHostel: 'Stanza Living Shiraz House',
    preferredLocality: 'Katraj - Dhankawadi Belt',
    budget: 11000,
    moveInDate: '2026-08-20',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Any',
      sleepSchedule: 'Flexible',
      studyHabits: 'Side Projects & Gym',
      cleanliness: 'Very Clean',
      sharing: 'Single',
      social: 'Outgoing',
      furnished: 'Furnished',
      ac: 'AC'
    },
    bio: '3rd Year IT. Prefers premium managed living with in-house gym and 3 meals. Open to sharing a spacious 2-bed suite at Stanza Shiraz.',
    tags: ['PICT IT', 'Stanza Living', 'Fitness', 'All-Inclusive'],
    matchScore: 0,
  },
  {
    id: 'r7',
    name: 'Aditya Patil',
    age: 18,
    collegeId: 'c2', // PICT
    collegeName: 'PICT Pune',
    branch: 'Electronics & Telecom (PICT)',
    year: '1st Year (FE)',
    preferredHostel: "Gurukul Boy's Hostel",
    preferredLocality: 'Trimurti Chowk',
    budget: 5200,
    moveInDate: '2026-09-01',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Early Bird',
      studyHabits: 'First Year Academics',
      cleanliness: 'Clean',
      sharing: 'Triple',
      social: 'Quiet / Focused',
      furnished: 'Furnished',
      ac: 'Non-AC'
    },
    bio: 'First year engineering student from Kolhapur. Focused on scoring good CGPA in FE. Looking for simple, budget-friendly triple sharing.',
    tags: ['PICT EnTC', 'Fresher FE', 'Kolhapur', 'Budget Friendly'],
    matchScore: 0,
  },
  {
    id: 'r8',
    name: 'Kabir Verma',
    age: 20,
    collegeId: 'c1', // COEP
    collegeName: 'COEP Tech University',
    branch: 'Mechanical Engineering (COEP)',
    year: '3rd Year (TE)',
    preferredHostel: 'Near Shivajinagar',
    preferredLocality: 'Shivajinagar',
    budget: 7000,
    moveInDate: '2026-08-20',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=300&auto=format&fit=crop',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Any',
      sleepSchedule: 'Night Owl',
      studyHabits: 'Group study / Music',
      cleanliness: 'Moderate',
      sharing: 'Double',
      social: 'Outgoing',
      furnished: 'Furnished',
      ac: 'Non-AC'
    },
    bio: 'COEP student, into robotics and late night prototyping. Friendly and easy going.',
    tags: ['COEP', 'Robotics', 'Night Owl'],
    matchScore: 0,
  }
];
