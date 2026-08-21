/**
 * Minimum Cost to Reach Every Position
 * Intuition: To stand at index i you must "buy" some cost[j] with j <= i, so the cheapest way is the prefix minimum of cost.
 * Approach: 1. Track the running minimum as you scan left to right. 2. At each index append that minimum to the answer. 3. Return the array of prefix minima.
 * Dry Run: cost = [5, 3, 4, 1, 2]. Prefix mins: 5, min(5,3)=3, min(3,4)=3, min(3,1)=1, min(1,2)=1 → [5, 3, 3, 1, 1].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minCosts = function (cost) {
  const answer = [];
  let minCost = Infinity;

  for (const currentCost of cost) {
    minCost = Math.min(minCost, currentCost);
    answer.push(minCost);
  }

  return answer;
};
