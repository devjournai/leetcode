/**
 * Soup Servings
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var soupServings = function (n) {
  if (n >= 4800) {
    return 1.0;
  }

  const scaledInput = Math.ceil(n / 25);
  const probCache = new Map();

  function calculateServeProb(soupA, soupB) {
    if (soupA <= 0 && soupB <= 0) {
      return 0.5;
    }
    if (soupA <= 0) {
      return 1.0;
    }
    if (soupB <= 0) {
      return 0.0;
    }

    const currentKey = soupA * 10000 + soupB;
    if (probCache.has(currentKey)) {
      return probCache.get(currentKey);
    }

    const computedProb =
      0.25 *
      (calculateServeProb(soupA - 4, soupB) +
        calculateServeProb(soupA - 3, soupB - 1) +
        calculateServeProb(soupA - 2, soupB - 2) +
        calculateServeProb(soupA - 1, soupB - 3));

    probCache.set(currentKey, computedProb);
    return computedProb;
  }

  return calculateServeProb(scaledInput, scaledInput);
};
