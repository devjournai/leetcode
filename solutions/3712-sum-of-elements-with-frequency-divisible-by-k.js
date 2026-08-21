/**
 * Sum Of Elements With Frequency Divisible By K
 * Intuition: Count frequencies; if a value appears a multiple of k times, add value * frequency.
 * Approach: 1. Frequency map. 2. Sum value * count when count % k == 0.
 * Dry Run: [1, 2, 2, 3, 3, 3, 3, 4], k = 2 → 2 appears twice and 3 appears four times → 2*2 + 3*4 = 16.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var sumDivisibleByK = function (nums, k) {
  const frequency = new Map();
  for (const value of nums) {
    frequency.set(value, (frequency.get(value) || 0) + 1);
  }
  let total = 0;
  for (const [value, count] of frequency) {
    if (count % k === 0) {
      total += value * count;
    }
  }
  return total;
};
