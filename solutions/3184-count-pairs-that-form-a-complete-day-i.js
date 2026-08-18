/**
 * Count Pairs That Form A Complete Day I
 * Intuition: Two hours form a complete day when their sum is divisible by 24, so we pair remainders r and (24-r)%24.
 * Approach: 1. Count remainder frequencies. 2. For each hour, add the count of the complementary remainder seen so far, then increment this remainder.
 * Dry Run:
 *   hours = [12,12,30,24,24] pairs: (12,12), (24,24) = 2
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countCompleteDayPairs = function (hours) {
  const remainderFrequency = new Array(24).fill(0);
  let pairCount = 0;
  for (const hourValue of hours) {
    const remainder = hourValue % 24;
    const complement = (24 - remainder) % 24;
    pairCount += remainderFrequency[complement];
    remainderFrequency[remainder]++;
  }
  return pairCount;
};
