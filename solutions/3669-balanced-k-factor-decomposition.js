/**
 * Balanced K-Factor Decomposition
 * Intuition: Split n into exactly k positive factors. The most balanced split minimizes max - min, so DFS over divisors and keep the factor tuple with the smallest range.
 * Approach: 1. Recurse with remaining product and remaining slots. 2. At each step try every divisor of the remaining product. 3. When one slot is left, that value must be the remaining product; record the tuple if its range is the best so far. 4. Return any best tuple.
 * Dry Run: n = 44, k = 3. Trying divisors yields [2, 2, 11] with range 9, better than [1, 4, 11] (range 10) or [1, 1, 44] (range 43).
 * Time Complexity: O(D^(K-1)) where D is the number of divisors of n
 * Space Complexity: O(K)
 */
var minDifference = function (n, k) {
  let bestRange = Number.MAX_SAFE_INTEGER;
  let bestSplit = [];
  const current = new Array(k).fill(0);

  function divisorsOf(value) {
    const divisors = [];
    for (let d = 1; d * d <= value; d++) {
      if (value % d === 0) {
        divisors.push(d);
        if (d * d !== value) {
          divisors.push(value / d);
        }
      }
    }
    return divisors;
  }

  function dfs(slotsLeft, remaining, currentMin, currentMax) {
    if (slotsLeft === 1) {
      const range =
        Math.max(currentMax, remaining) - Math.min(currentMin, remaining);
      if (range < bestRange) {
        bestRange = range;
        current[0] = remaining;
        bestSplit = current.slice();
      }
      return;
    }

    for (const divisor of divisorsOf(remaining)) {
      current[slotsLeft - 1] = divisor;
      dfs(
        slotsLeft - 1,
        remaining / divisor,
        Math.min(currentMin, divisor),
        Math.max(currentMax, divisor)
      );
    }
  }

  dfs(k, n, Number.MAX_SAFE_INTEGER, 0);
  return bestSplit;
};
