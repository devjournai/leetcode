/**
 * Minimum Cost to Split into Ones II
 * Intuition: To minimize the cost, we should first split n into 1 and n - 1, which costs n - 1; then split n - 1 into 1 and n - 2, which costs n - 2. Following this pattern, the total cost is accumulated as 1 + 2 + dots + (n - 1) = frac{n  *  (n - 1)}{2}.
 * Approach: 1. Follow Mathematics. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: n = 3. Output: 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minCost = function (n) {
  return (n * (n - 1)) / 2;
};
