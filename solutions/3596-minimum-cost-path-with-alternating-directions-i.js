/**
 * Minimum Cost Path with Alternating Directions I
 * Intuition: Moves must alternate horizontal and vertical from (1,1) to (m,n) with cost i*j on entry. Only the tiniest grids admit an alternating path of the required length; larger ones are impossible in this version.
 * Approach: 1. (1,1) costs 1. 2. 1x2 and 2x1 take two steps totaling 3. 3. Otherwise return -1.
 * Dry Run: m = 1, n = 2. Path (1,1)→(1,2), cost 1 + 2 = 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minCost = function (m, n) {
  if (m === 1 && n === 1) {
    return 1;
  }
  if ((m === 1 && n === 2) || (m === 2 && n === 1)) {
    return 3;
  }
  return -1;
};
