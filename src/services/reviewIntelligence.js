/**
 * PG Scout — Review Intelligence Engine
 * 
 * Performs aspect-based sentiment analysis across 10 critical student accommodation dimensions:
 * 1. Food & Mess
 * 2. Cleanliness & Hygiene
 * 3. Wi-Fi & Internet Connectivity
 * 4. Room Quality & Ventilation
 * 5. Staff & Caretaker Attitude
 * 6. Maintenance & Repairs
 * 7. Security & CCTV
 * 8. Noise & Study Environment
 * 9. Value for Money
 * 10. Water & Electricity (Solar, RO, Power Backup)
 * 
 * Supports English, Hindi, and Marathi transliterated and script keywords.
 */

export const ASPECT_CATEGORIES = {
  food: { label: 'Food & Mess', icon: 'Utensils', weight: 1.2 },
  cleanliness: { label: 'Cleanliness & Hygiene', icon: 'Sparkles', weight: 1.3 },
  wifi: { label: 'Wi-Fi & Internet', icon: 'Wifi', weight: 1.4 },
  room_quality: { label: 'Room Quality & Space', icon: 'Bed', weight: 1.1 },
  staff: { label: 'Staff & Caretaker', icon: 'Users', weight: 1.0 },
  maintenance: { label: 'Maintenance & Repairs', icon: 'Wrench', weight: 1.0 },
  security: { label: 'Safety & Security', icon: 'ShieldCheck', weight: 1.5 },
  noise: { label: 'Noise & Study Environment', icon: 'VolumeX', weight: 1.3 },
  value: { label: 'Value for Money', icon: 'IndianRupee', weight: 1.2 },
  water_electricity: { label: 'Water & Electricity', icon: 'Zap', weight: 1.4 }
};

// Multilingual keyword dictionary for aspect extraction
const ASPECT_KEYWORDS = {
  food: {
    terms: ['food', 'mess', 'tiffin', 'breakfast', 'dinner', 'lunch', 'meal', 'roti', 'dal', 'sabzi', 'jevan', 'khana', 'jevayla', 'diet', 'taste'],
    positive: ['good', 'tasty', 'hygienic', 'healthy', 'fresh', 'unlimited', 'delicious', 'changla', 'swadisht', 'badhiya'],
    negative: ['bad', 'tasteless', 'unhealthy', 'oily', 'cold', 'poor', 'bekar', 'kharab', 'ghatiya']
  },
  cleanliness: {
    terms: ['clean', 'cleaning', 'hygiene', 'washroom', 'toilet', 'bathroom', 'dust', 'tidy', 'kachra', 'swachhata', 'safai', 'jhaadu', 'mop'],
    positive: ['clean', 'regular', 'daily', 'spotless', 'hygienic', 'shining', 'swachha', 'safai'],
    negative: ['dirty', 'smelly', 'stinky', 'unclean', 'mosquitoes', 'insects', 'kachra', 'ghaan', 'kharab']
  },
  wifi: {
    terms: ['wifi', 'wi-fi', 'internet', 'speed', 'network', 'router', 'bandwidth', 'ping', 'connection', 'fiber', 'broadband'],
    positive: ['fast', 'high speed', 'smooth', 'stable', 'reliable', 'quick', 'good speed', 'fiber'],
    negative: ['slow', 'disconnect', 'lag', 'buffering', 'drops', 'weak', 'pathetic', 'poor']
  },
  room_quality: {
    terms: ['room', 'spacious', 'ventilation', 'window', 'balcony', 'bed', 'mattress', 'desk', 'cupboard', 'kholi', 'hawa', 'space', 'light'],
    positive: ['spacious', 'airy', 'sunlight', 'ventilated', 'comfortable', 'big', 'hava', 'chaan'],
    negative: ['cramped', 'small', 'suffocating', 'dark', 'damp', 'chhota', 'tight']
  },
  staff: {
    terms: ['owner', 'caretaker', 'warden', 'manager', 'staff', 'kakaji', 'uncle', 'aunty', 'malak', 'reception'],
    positive: ['helpful', 'cooperative', 'kind', 'friendly', 'polite', 'caring', 'madatgar', 'namra', 'bhala'],
    negative: ['rude', 'arrogant', 'strict', 'harsh', 'unhelpful', 'khadoos', 'gussewala']
  },
  maintenance: {
    terms: ['maintenance', 'repair', 'plumber', 'electrician', 'geyser repair', 'lift', 'fan repair', 'service'],
    positive: ['quick', 'prompt', 'same day', 'fixed', 'responsive'],
    negative: ['delayed', 'unresponsive', 'broken', 'never fixed', 'ignored']
  },
  security: {
    terms: ['security', 'cctv', 'guard', 'gate', 'safe', 'safety', 'curfew', 'suraksha', 'chaukidar'],
    positive: ['safe', 'secure', 'strict', 'gated', '24/7 cctv', 'safe for students'],
    negative: ['unsafe', 'no guard', 'broken cctv', 'theft', 'unlocked']
  },
  noise: {
    terms: ['noise', 'peaceful', 'quiet', 'sound', 'study', 'disturbance', 'traffic', 'shantata', 'aawaz', 'dsa', 'coding'],
    positive: ['quiet', 'peaceful', 'calm', 'serene', 'studious', 'shant', 'focus'],
    negative: ['noisy', 'loud', 'traffic sound', 'shouting', 'disturbance', 'gongat']
  },
  value: {
    terms: ['price', 'rent', 'deposit', 'value', 'money', 'expensive', 'cheap', 'budget', 'affordable', 'worth', 'paisa'],
    positive: ['worth', 'affordable', 'reasonable', 'economical', 'best price', 'worth it', 'paisa vasool'],
    negative: ['expensive', 'overpriced', 'costly', 'rip off', 'not worth']
  },
  water_electricity: {
    terms: ['water', 'solar', 'hot water', 'electricity', 'power', 'geyser', 'ro', 'drinking water', 'paani', 'bijli', 'powercut'],
    positive: ['24/7', 'continuous', 'hot', 'pure', 'solar works', 'backup'],
    negative: ['water cut', 'cold water', 'no hot water', 'power failure', 'shortage']
  }
};

/**
 * Extract structured aspects and sentiment from raw review text
 */
export function analyzeReviewAspects(reviewText, author = '', date = '') {
  if (!reviewText || typeof reviewText !== 'string') return [];

  const lower = reviewText.toLowerCase();
  const sentences = reviewText.split(/[.!?\n]+/).map(s => s.trim()).filter(Boolean);
  const detectedAspects = [];

  for (const [aspectKey, dictionary] of Object.entries(ASPECT_KEYWORDS)) {
    // Check if any aspect terms exist in review
    const matchingTerm = dictionary.terms.find(term => lower.includes(term));
    if (!matchingTerm) continue;

    // Find sentences discussing this aspect
    const relevantSentence = sentences.find(s => s.toLowerCase().includes(matchingTerm)) || reviewText;

    // Check positive and negative signals in the context
    let posScore = 0;
    let negScore = 0;

    dictionary.positive.forEach(pos => {
      if (relevantSentence.toLowerCase().includes(pos)) posScore++;
    });
    dictionary.negative.forEach(neg => {
      if (relevantSentence.toLowerCase().includes(neg)) negScore++;
    });

    // Determine polarity
    let sentiment = 'neutral';
    let confidence = 0.70;
    let severity = 'moderate';

    if (posScore > negScore) {
      sentiment = 'positive';
      confidence = Math.min(0.95, 0.75 + posScore * 0.1);
      severity = 'mild';
    } else if (negScore > posScore) {
      sentiment = 'negative';
      confidence = Math.min(0.95, 0.75 + negScore * 0.1);
      severity = negScore >= 2 ? 'critical' : 'moderate';
    }

    detectedAspects.push({
      aspect: aspectKey,
      label: ASPECT_CATEGORIES[aspectKey].label,
      sentiment,
      severity,
      confidence: parseFloat(confidence.toFixed(2)),
      evidenceQuote: relevantSentence.length > 120 ? relevantSentence.slice(0, 117) + '...' : relevantSentence,
      author,
      date
    });
  }

  return detectedAspects;
}

/**
 * Computes an aggregated score for each aspect across multiple reviews (scale 1.0 to 5.0)
 */
export function aggregateAspectScores(reviews = []) {
  const aspectTotals = {};

  // Initialize
  Object.keys(ASPECT_CATEGORIES).forEach(key => {
    aspectTotals[key] = {
      positiveCount: 0,
      neutralCount: 0,
      negativeCount: 0,
      totalCount: 0,
      evidenceQuotes: []
    };
  });

  reviews.forEach(rev => {
    const text = rev.comment || rev.review_text || rev.text || '';
    const aspects = analyzeReviewAspects(text, rev.author || 'Student', rev.date || '');
    
    aspects.forEach(asp => {
      const target = aspectTotals[asp.aspect];
      if (!target) return;
      target.totalCount++;
      if (asp.sentiment === 'positive') target.positiveCount++;
      else if (asp.sentiment === 'negative') target.negativeCount++;
      else target.neutralCount++;

      if (target.evidenceQuotes.length < 2 && asp.evidenceQuote) {
        target.evidenceQuotes.push({
          quote: asp.evidenceQuote,
          sentiment: asp.sentiment,
          author: asp.author
        });
      }
    });
  });

  // Calculate normalized score (1.0 - 5.0) for each aspect
  const finalAspects = {};
  Object.keys(ASPECT_CATEGORIES).forEach(key => {
    const data = aspectTotals[key];
    let score = 4.0; // default baseline when unmentioned
    let reliability = 'Medium Confidence';

    if (data.totalCount > 0) {
      const netRatio = (data.positiveCount - data.negativeCount) / data.totalCount;
      score = 3.5 + (netRatio * 1.5); // scale between 2.0 and 5.0
      score = Math.max(1.5, Math.min(5.0, score));
      reliability = data.totalCount >= 3 ? 'High Confidence (Multiple Reviews)' : 'Indicative (Single Mention)';
    }

    finalAspects[key] = {
      label: ASPECT_CATEGORIES[key].label,
      score: parseFloat(score.toFixed(1)),
      positiveCount: data.positiveCount,
      negativeCount: data.negativeCount,
      mentionCount: data.totalCount,
      reliability,
      evidence: data.evidenceQuotes
    };
  });

  return finalAspects;
}

