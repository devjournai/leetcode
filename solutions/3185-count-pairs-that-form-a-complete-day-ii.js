/**
 * Count Pairs That Form A Complete Day II
 * Intuition: Same complementary-remainder pairing as I, but n can be large so a linear pass with a 24-bucket frequency array is required.
 * Approach: 1. Count remainder frequencies while scanning. 2. Add complementary counts. 3. Return the 64-bit pair total.
 * Dry Run:
 *   hours = [72,48,24,3] remainders 0,0,0,3. Pairs of zeros: C(3,2)=3.
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
