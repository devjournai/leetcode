/**
 * Maximum Weight in Two Bags
 * Intuition: 0/1 knapsack in two capacities: each item goes in bag1, bag2, or neither.
 * Approach: 1. dp[j][k] = max weight using capacities j and k. 2. Iterate items backward over both capacities. 3. Try placing the item in either bag.
 * Dry Run: weights=[1,2,3], w1=3, w2=3 → 1+2 in one bag and 3 in the other = 6.
 * Time Complexity: O(n * w1 * w2)
 * Space Complexity: O(w1 * w2)
 */
var maxWeight = function (weights, w1, w2) {
  const dp = Array.from({ length: w1 + 1 }, () => Array(w2 + 1).fill(0));

  for (const weight of weights) {
    for (let bag1 = w1; bag1 >= 0; bag1--) {
      for (let bag2 = w2; bag2 >= 0; bag2--) {
        if (weight <= bag1) {
          dp[bag1][bag2] = Math.max(
            dp[bag1][bag2],
            dp[bag1 - weight][bag2] + weight
          );
        }
        if (weight <= bag2) {
          dp[bag1][bag2] = Math.max(
            dp[bag1][bag2],
            dp[bag1][bag2 - weight] + weight
          );
        }
      }
    }
  }

  return dp[w1][w2];
};
