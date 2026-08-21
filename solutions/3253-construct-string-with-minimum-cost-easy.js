/**
 * Construct String with Minimum Cost (Easy)
 * Intuition: target is built left to right. If a word matches the suffix ending at i, we can extend the cheapest prefix that ends just before that word.
 * Approach: 1. dp[i] is the min cost to build target[0..i). dp[0] = 0, others infinity. 2. For each end index i and each word, if target ends with that word and the previous dp is finite, relax dp[i]. 3. Return dp[n] or -1.
 * Dry Run: target = "abcdef", words = ["abdef", "abc", "d", "def", "ef"], costs = [100, 1, 1, 10, 5]. dp[3]=1 via "abc", dp[4]=2 via "d", dp[6]=7 via "ef". Answer 7.
 * Time Complexity: O(|target| * |words| * |word|)
 * Space Complexity: O(|target|)
 */
var minimumCost = function (target, words, costs) {
  const targetLength = target.length;
  const INFINITY_COST = Number.MAX_SAFE_INTEGER;
  const minCostToBuildPrefix = Array(targetLength + 1).fill(INFINITY_COST);
  minCostToBuildPrefix[0] = 0;

  for (let endIndex = 1; endIndex <= targetLength; endIndex++) {
    for (let wordIndex = 0; wordIndex < words.length; wordIndex++) {
      const word = words[wordIndex];
      const wordLength = word.length;
      if (
        endIndex >= wordLength &&
        target.slice(endIndex - wordLength, endIndex) === word &&
        minCostToBuildPrefix[endIndex - wordLength] !== INFINITY_COST
      ) {
        minCostToBuildPrefix[endIndex] = Math.min(
          minCostToBuildPrefix[endIndex],
          minCostToBuildPrefix[endIndex - wordLength] + costs[wordIndex]
        );
      }
    }
  }

  return minCostToBuildPrefix[targetLength] === INFINITY_COST
    ? -1
    : minCostToBuildPrefix[targetLength];
};
