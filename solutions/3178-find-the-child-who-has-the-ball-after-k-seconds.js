/**
 * Find The Child Who Has The Ball After K Seconds
 * Intuition: The ball travels 0 -> n-1 then back to 0 repeatedly. The period of a full round trip is 2*(n-1).
 * Approach: 1. Let cycleLength = 2 * (n - 1). 2. positionInCycle = k % cycleLength. 3. If positionInCycle <= n-1 return it, else return cycleLength - positionInCycle.
 * Dry Run:
 *   n = 3, k = 5. cycle = 4, 5 % 4 = 1, answer = 1.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numberOfChild = function (n, k) {
  const cycleLength = 2 * (n - 1);
  const positionInCycle = k % cycleLength;
  if (positionInCycle <= n - 1) {
    return positionInCycle;
  }
  return cycleLength - positionInCycle;
};
