export const colleges = [
  { id: 'c1', name: 'COEP Technological University', lat: 18.5284, lng: 73.8553 },
  { id: 'c2', name: 'Pune Institute of Computer Technology (PICT)', lat: 18.4575, lng: 73.8508 },
  { id: 'c3', name: 'Vishwakarma Institute of Technology (VIT)', lat: 18.4636, lng: 73.8681 },
  { id: 'c4', name: 'MIT World Peace University (MIT-WPU)', lat: 18.5182, lng: 73.8150 },
  { id: 'c5', name: 'Pimpri Chinchwad College of Engineering (PCCOE)', lat: 18.6517, lng: 73.7613 },
];

import { generatedPgs } from './generatedPgs';
export const pgs = generatedPgs;

export const roommateProfiles = [
  {
    id: 'r1',
    name: 'Aaryan S.',
    age: 19,
    collegeId: 'c2', // PICT
    budget: 8000,
    moveInDate: '2026-09-01',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Early Bird',
      studyHabits: 'Quiet study',
      cleanliness: 'Very Clean',
      sharing: 'Double'
    },
    bio: 'Looking for a chill vegetarian roommate near PICT. I sleep early and keep things clean.',
    matchScore: 0, // Calculated dynamically
  },
  {
    id: 'r2',
    name: 'Kabir V.',
    age: 20,
    collegeId: 'c1', // COEP
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
    bio: 'Engineering student, I study late at night with some music. Easy going.',
    matchScore: 0,
  },
  {
    id: 'r3',
    name: 'Vedant K.',
    age: 18,
    collegeId: 'c2', // PICT
    budget: 8500,
    moveInDate: '2026-09-01',
    preferences: {
      smoking: 'Non-smoking',
      food: 'Vegetarian',
      sleepSchedule: 'Early Bird',
      studyHabits: 'Quiet study',
      cleanliness: 'Very Clean',
      sharing: 'Double'
    },
    bio: 'Fresher at PICT. Need a quiet environment to focus on studies.',
    matchScore: 0,
  }
];
