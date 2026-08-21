/**
 * Find Minimum Log Transportation Cost
 * Intuition: A log longer than k must be cut; one cut into pieces k and (length - k) costs k * (length - k). At most one of n or m can exceed k under the constraints, so we only pay for the longer one if needed.
 * Approach: 1. Let x = max(n, m). 2. If x <= k, cost is 0. 3. Else return k * (x - k).
 * Dry Run: n = 6, m = 5, k = 5. max is 6 > 5, cost = 5 * 1 = 5. The other log already fits.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minCuttingCost = function (n, m, k) {
  const longest = Math.max(n, m);
  return longest <= k ? 0 : k * (longest - k);
};
