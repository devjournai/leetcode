/**
 * Soup Servings
 * Intuition: Four equally likely pours of (100,0),(75,25),(50,50),(25,75) ml. Scale by 25; for large n A empties first with probability ~1.
 * Approach: 1. If `n >= 4800` return 1. 2. `scaledInput = ceil(n/25)`. 3. Memo `calculateServeProb(a,b)`: both empty 0.5, A empty 1, B empty 0; else 0.25 times four recursive calls with those unit pours.
 * Dry Run: n = 50 → scaled 2. Recursion over remaining units returns ~0.625.
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
