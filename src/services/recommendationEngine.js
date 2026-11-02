/**
 * PG Scout — Recommendation Engine & Statistical Ranking
 * 
 * Implements:
 * 1. Bayesian Rating Smoother (damps small-sample volatility)
 * 2. Multi-Criteria Utility Ranking with configurable student weights
 * 3. Transparent Trade-off Generator
 * 4. Hard constraint filter evaluation
 */

const CAMPUS_PRIOR_RATING = 4.25; // C: Average student accommodation rating across Pune
const MIN_CONFIDENCE_REVIEWS = 15; // m: Weight threshold for Bayesian smoothing

/**
 * Calculates statistically justified Bayesian rating
 * Formula: (v * R + m * C) / (v + m)
 */
export function calculateBayesianRating(rawRating, reviewCount) {
  const v = Math.max(1, reviewCount || 0);
  const R = parseFloat(rawRating) || CAMPUS_PRIOR_RATING;
  const m = MIN_CONFIDENCE_REVIEWS;
  const C = CAMPUS_PRIOR_RATING;

  const bayesian = ((v * R) + (m * C)) / (v + m);
  return parseFloat(bayesian.toFixed(2));
}

/**
 * Calculates a confidence index (0% to 100%) based on sample size and physical inspection
 */
export function calculateConfidenceScore(reviewCount, isScoutInspected) {
  const baseFromReviews = Math.min(85, (reviewCount / 50) * 85);
  const inspectionBonus = isScoutInspected ? 15 : 0;
  return Math.min(99, Math.round(baseFromReviews + inspectionBonus));
}

/**
 * Generates transparent recommendation scores and trade-off explanations
 * 
 * @param {Array} properties - List of candidate residences
 * @param {Object} studentPreferences - Student criteria { budget, targetSharing, maxWalkMins, priorityAspects: ['wifi', 'food', 'noise'] }
 */
export function rankAccommodations(properties = [], studentPreferences = {}) {
  const {
    targetBudget = 8000,
    maxWalkMins = 15,
    sharingPreference = 'any', // 'single', 'double', 'triple', 'any'
    gender = 'Boys',
    priorityAspects = ['wifi', 'cleanliness'], // student dealbreakers
    weights = {
      budget: 0.30,
      commute: 0.25,
      aspects: 0.25,
      trust: 0.20
    }
  } = studentPreferences;

  return properties.map(property => {
    // 1. HARD CONSTRAINTS
    const genderMatch = !property.gender || property.gender === gender || property.gender === 'Co-Ed';
    const walkMins = parseInt(property.walkingTime) || Math.round(property.distance * 12);
    const passesWalkConstraint = walkMins <= (maxWalkMins + 5);

    // Get price for preferred sharing tier
    let effectiveRent = property.basePrice;
    if (sharingPreference === 'single' && property.rooms?.single?.price) {
      effectiveRent = property.rooms.single.price;
    } else if (sharingPreference === 'double' && property.rooms?.double?.price) {
      effectiveRent = property.rooms.double.price;
    } else if (sharingPreference === 'triple' && property.rooms?.triple?.price) {
      effectiveRent = property.rooms.triple.price;
    } else if (property.rooms) {
      const availablePrices = [property.rooms.triple?.price, property.rooms.double?.price, property.rooms.single?.price].filter(p => typeof p === 'number');
      const withinTarget = availablePrices.filter(p => p <= targetBudget);
      effectiveRent = withinTarget.length > 0 ? Math.min(...withinTarget) : (availablePrices[0] || property.basePrice);
    }

    const budgetDifference = effectiveRent - targetBudget;
    const passesHardBudget = effectiveRent <= (targetBudget + 2500);

    const isEligible = genderMatch && passesWalkConstraint && passesHardBudget;

    // 2. MULTI-CRITERIA SCORING COMPONENTS (Normalized 0.0 - 1.0)
    
    // S_budget: Full score if within or below target, degrades if higher
    let sBudget = 1.0;
    if (effectiveRent > targetBudget) {
      sBudget = Math.max(0.2, 1 - ((effectiveRent - targetBudget) / 4000));
    } else {
      // Slight reward for being economically favorable
      sBudget = Math.min(1.0, 0.9 + ((targetBudget - effectiveRent) / 10000));
    }

    // S_commute: Proximity to PICT
    const sCommute = Math.max(0.2, Math.min(1.0, 1 - (walkMins / 20)));

    // S_aspects: Evaluation against student priority aspects
    let sAspects = 0.85;
    const reasons = [];
    const tradeOffs = [];

    if (priorityAspects.length > 0 && property.aspectScores) {
      let aspectScoreSum = 0;
      priorityAspects.forEach(aspectKey => {
        const aspectData = property.aspectScores[aspectKey];
        const val = aspectData ? aspectData.score : 4.0;
        aspectScoreSum += (val / 5.0);

        if (val >= 4.4) {
          reasons.push(`Top-tier ${aspectData?.label || aspectKey} (${val}/5.0)`);
        } else if (val < 3.8) {
          tradeOffs.push(`Average ${aspectData?.label || aspectKey} score (${val}/5.0)`);
        }
      });
      sAspects = aspectScoreSum / priorityAspects.length;
    }

    // S_trust: Bayesian smoothed rating + Scout Verification
    const bayesian = calculateBayesianRating(property.rating, property.reviewCount);
    const sTrust = (bayesian / 5.0) * (property.verified ? 1.0 : 0.92);

    // 3. FINAL COMPOSITE MATCH SCORE (0 to 100%)
    let matchScore = (
      (sBudget * weights.budget) +
      (sCommute * weights.commute) +
      (sAspects * weights.aspects) +
      (sTrust * weights.trust)
    ) * 100;

    matchScore = Math.min(98, Math.max(48, Math.round(matchScore)));

    // Generate Explanations
    if (walkMins <= 7) {
      reasons.push(`Ultra-short walk to PICT (${walkMins} mins via Trimurti Chowk)`);
    } else {
      tradeOffs.push(`${walkMins} mins walk to campus`);
    }

    if (budgetDifference <= 0) {
      reasons.push(`Within monthly budget (₹${effectiveRent.toLocaleString('en-IN')}/mo)`);
    } else {
      tradeOffs.push(`₹${budgetDifference.toLocaleString('en-IN')}/mo above baseline target`);
    }

    if (property.verified) {
      reasons.push('Physically inspected & verified by PICT Scout team');
    }

    return {
      ...property,
      effectiveRent,
      walkMins,
      bayesianRating: bayesian,
      confidenceScore: calculateConfidenceScore(property.reviewCount, property.verified),
      recommendationScore: matchScore,
      isEligible,
      recommendationReasons: reasons.slice(0, 3),
      tradeOffs: tradeOffs.slice(0, 2)
    };
  }).sort((a, b) => b.recommendationScore - a.recommendationScore);
}

