/**
 * Factorial Trailing Zeroes
 * Intuition: Trailing zeros in n! come from factors of 10 (2×5). There are always more 2s than 5s, so count how many times 5 divides numbers up to n: floor(n/5) + floor(n/25) + floor(n/125) + ...
 * Approach: 1. Initialize zeroes = 0 and current = n. 2. While current >= 5, set current = floor(current / 5) and add current to zeroes. 3. Return the total.
 * Dry Run: n = 25.
 *   - current = 25 → floor(25/5)=5, zeroes=5.
 *   - current = 5 → floor(5/5)=1, zeroes=6.
 *   - current = 1 < 5, stop. Answer 6.
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var trailingZeroes = function (n) {
  let accumulatedZeroes = 0;
  let currentNumberForCalculation = n;

  while (currentNumberForCalculation >= 5) {
    currentNumberForCalculation = Math.floor(currentNumberForCalculation / 5);
    accumulatedZeroes += currentNumberForCalculation;
  }

  return accumulatedZeroes;
};
