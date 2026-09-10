import { pictHostels } from './pictHostelsData';
import { generatedPgs } from './generatedPgs';

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

// Combine real PICT local hostels with other Pune college PGs
export const pgs = [
  ...pictHostels,
  ...generatedPgs.filter(pg => pg.collegeId !== 'c2').slice(0, 15)
];

export { pictHostels };

export const roommateProfiles = [
  {
    id: 'r1',
    name: 'Aaryan Salunkhe',
    age: 19,
    collegeId: 'c2', // PICT
    branch: 'Computer Engineering (PICT)',
    year: '2nd Year',
    preferredHostel: "Gurukul Boy's Hostel (Trimurti Chowk)",
    budget: 6500,
    moveInDate: '2026-09-01',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Early Bird',
      studyHabits: 'Quiet study / Coding',
      cleanliness: 'Very Clean',
      sharing: 'Double'
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
    branch: 'Information Technology (PICT)',
    year: '3rd Year',
    preferredHostel: 'Casa Living (Katraj)',
    budget: 9500,
    moveInDate: '2026-08-25',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Any',
      sleepSchedule: 'Night Owl',
      studyHabits: 'Hackathons / Web Dev',
      cleanliness: 'Clean',
      sharing: 'Double'
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
    branch: 'AI & Data Science (PICT)',
    year: '1st Year (Fresher)',
    preferredHostel: "Shri Swami Samartha Boy's PG",
    budget: 6000,
    moveInDate: '2026-09-01',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Early Bird',
      studyHabits: 'Quiet study',
      cleanliness: 'Very Clean',
      sharing: 'Triple'
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
    branch: 'Electronics & Telecom (PICT)',
    year: '4th Year',
    preferredHostel: "Ira Boy's Hostel (Back Gate)",
    budget: 5500,
    moveInDate: '2026-08-30',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Any',
      sleepSchedule: 'Night Owl',
      studyHabits: 'Placement Prep',
      cleanliness: 'Moderate',
      sharing: 'Double'
    },
    bio: 'Final year EnTC at PICT preparing for placements. Need a quiet room right next to the back gate with reliable Wi-Fi.',
    tags: ['PICT EnTC', 'Final Year', 'Placement Prep'],
    matchScore: 0,
  },
  {
    id: 'r5',
    name: 'Kabir Verma',
    age: 20,
    collegeId: 'c1', // COEP
    branch: 'Mechanical Engineering (COEP)',
    year: '3rd Year',
    preferredHostel: 'Near Shivajinagar',
    budget: 7000,
    moveInDate: '2026-08-20',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Any',
      sleepSchedule: 'Night Owl',
      studyHabits: 'Group study / Music',
      cleanliness: 'Moderate',
      sharing: 'Double'
    },
    bio: 'COEP student, into robotics and late night prototyping. Friendly and easy going.',
    tags: ['COEP', 'Robotics', 'Night Owl'],
    matchScore: 0,
  }
];
