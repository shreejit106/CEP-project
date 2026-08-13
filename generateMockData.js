import fs from 'fs';

const colleges = [
  { id: 'c1', name: 'COEP Technological University', lat: 18.5284, lng: 73.8553 },
  { id: 'c2', name: 'Pune Institute of Computer Technology (PICT)', lat: 18.4575, lng: 73.8508 },
  { id: 'c3', name: 'Vishwakarma Institute of Technology (VIT)', lat: 18.4636, lng: 73.8681 },
  { id: 'c4', name: 'MIT World Peace University (MIT-WPU)', lat: 18.5182, lng: 73.8150 },
  { id: 'c5', name: 'Pimpri Chinchwad College of Engineering (PCCOE)', lat: 18.6517, lng: 73.7613 },
];

const pgNamesPart1 = ['Green', 'Sunrise', 'Elite', 'Royal', 'Comfort', 'Ira', 'Stanza', 'Dinanath', 'Shivaji', 'Student', 'Cozy', 'Premium'];
const pgNamesPart2 = ['Valley', 'Residency', 'Hostel', 'Boys PG', 'Nest', 'Living', 'Home', 'Villa', 'Hub', 'Stay'];

const facilitiesPool = ['Wi-Fi', 'Food', 'Washing machine', 'Parking', 'CCTV', 'Study table', 'Power backup', 'AC options', 'Gym', 'Attached washroom'];

const goodReviews = [
  "Excellent food quality, very clean.",
  "Highly recommended. The owner is very responsive.",
  "Great environment for studying, no disturbances.",
  "Best PG I've lived in so far. Fast Wi-Fi.",
  "Rooms are spacious and cleaning is done daily."
];

const averageReviews = [
  "Decent place, but internet could be better.",
  "Food is okay, but rooms are a bit small.",
  "Good for the price, but parking is an issue.",
  "Cleaning is sometimes skipped, otherwise fine.",
  "Average PG, good location though."
];

const badReviews = [
  "Very noisy, hard to study.",
  "Food quality is poor. I had to eat out often.",
  "Owner is rude, deposit issues.",
  "Too cramped, not worth the price.",
  "Wi-Fi never works when you need it."
];

const reviewers = ['Rahul S.', 'Amit K.', 'Vikram D.', 'Snehal P.', 'Karan J.', 'Rohan M.', 'Aniket V.', 'Saurabh B.', 'Prashant T.', 'Yash P.'];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getMultipleRandomItems = (arr, num) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, num);
};

const roomImages = [
  'photo-1522708323590-d24dbb6b0267',
  'photo-1555854877-bab0e564b8d5',
  'photo-1598928506311-c55dd1b31bb1',
  'photo-1540518614846-7eded433c457',
  'photo-1513694203232-719a280e022f',
  'photo-1505691938895-1758d7feb511',
  'photo-1522771739844-6a9f6d5f14af',
  'photo-1499955085172-a104c9463ece',
  'photo-1560448204-e02f11c3d0e2',
  'photo-1505693314120-0d443867891c',
  'photo-1595526114035-0d45ed16cfbf',
  'photo-1560185127-6ed189bf02f4'
];

const generatedPgs = [];
let globalId = 1;

colleges.forEach(college => {
  for (let i = 0; i < 10; i++) {
    const basePrice = getRandomInt(6, 12) * 1000;
    
    // Generate reviews based on an assigned quality level
    const quality = Math.random(); // 0 to 1
    let rating = 3.5;
    let reviewTexts = [];
    if (quality > 0.7) {
      rating = (4.0 + Math.random()).toFixed(1);
      reviewTexts = [getRandomItem(goodReviews), getRandomItem(goodReviews), getRandomItem(averageReviews)];
    } else if (quality > 0.3) {
      rating = (3.0 + Math.random()).toFixed(1);
      reviewTexts = [getRandomItem(goodReviews), getRandomItem(averageReviews), getRandomItem(badReviews)];
    } else {
      rating = (2.0 + Math.random()).toFixed(1);
      reviewTexts = [getRandomItem(averageReviews), getRandomItem(badReviews), getRandomItem(badReviews)];
    }
    
    // Clamp rating
    if (rating > 5) rating = 5.0;

    const reviews = getMultipleRandomItems(reviewers, 3).map((author, index) => ({
      author,
      rating: parseFloat(rating) >= 4 ? getRandomInt(4, 5) : (parseFloat(rating) <= 3 ? getRandomInt(1, 3) : getRandomInt(2, 4)),
      comment: reviewTexts[index],
      date: `${getRandomInt(1, 11)} months ago`
    }));

    const pg = {
      id: `pg_gen_${globalId++}`,
      name: `${getRandomItem(pgNamesPart1)} ${getRandomItem(pgNamesPart2)}`,
      collegeId: college.id,
      distance: (Math.random() * 3 + 0.1).toFixed(1), // 0.1 to 3.1 km
      basePrice,
      rooms: {
        single: { price: basePrice + 3000, vacancies: getRandomInt(0, 3) },
        double: { price: basePrice, vacancies: getRandomInt(0, 5) },
        triple: { price: basePrice - 1500, vacancies: getRandomInt(0, 8) },
      },
      facilities: getMultipleRandomItems(facilitiesPool, getRandomInt(4, 8)),
      verified: Math.random() > 0.3,
      lastVerified: new Date(Date.now() - getRandomInt(0, 30) * 86400000).toISOString(),
      rating: parseFloat(rating),
      reviews: reviews,
      image: `https://images.unsplash.com/${getRandomItem(roomImages)}?q=80&w=600&auto=format&fit=crop`, 
    };

    generatedPgs.push(pg);
  }
});

const fileContent = `export const generatedPgs = ${JSON.stringify(generatedPgs, null, 2)};`;

fs.writeFileSync('./src/data/generatedPgs.js', fileContent, 'utf-8');
console.log('Successfully generated 50 PGs in src/data/generatedPgs.js');
