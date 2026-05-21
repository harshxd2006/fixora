// Simple seeded random number generator (LCG)
const seededRandom = (seedStr) => {
  let h = 0xdeadbeef;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 2654435761);
  }
  let seed = (h ^ (h >>> 16)) >>> 0;
  
  return function() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
};

export const getLivePrices = (productId, basePrice) => {
  const dateStr = new Date().toDateString();
  const seedString = dateStr + productId;
  const random = seededRandom(seedString);

  // Helper to get variance between ±5% to ±15%
  // We want to generate a random sign (-1 or 1), and a random percentage between 5 and 15
  const generatePrice = () => {
    const isNegative = random() > 0.5;
    const percentage = 5 + (random() * 10); // 5 to 15
    const variance = (basePrice * percentage) / 100;
    const finalPrice = isNegative ? basePrice - variance : basePrice + variance;
    return Math.round(finalPrice);
  };

  return {
    amazon: generatePrice(),
    flipkart: generatePrice(),
    croma: generatePrice(),
    lastUpdated: "Today, 9:00 AM"
  };
};
