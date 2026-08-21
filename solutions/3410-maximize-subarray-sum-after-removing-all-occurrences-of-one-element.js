/**
 * Maximize Subarray Sum After Removing All Occurrences of One Element
 * Intuition: Kadane is prefix[j] - min prefix[i]. Removing every copy of one value x is like subtracting those x's from the prefix. Track the cheapest prefix after optionally stripping one negative value's occurrences.
 * Approach: 1. Seed the answer with max(nums) so a single-element subarray is allowed. 2. Scan prefix sums. 3. For negatives, maintain count and minPrefixPlusRemoval[x]. 4. modifiedMinPrefix is the lowest prefix we can reach after a legal removal; ans = max(prefix - modifiedMinPrefix).
 * Dry Run: nums = [-3,2,x wait] [1,-2,3]. Removing -2 yields [1,3] subarray sum 4 vs Kadane 3.
 * Time Complexity: O(N)
 * Space Complexity: O(U) unique negatives
 */

var maxSubarraySum = function (nums) {
  let bestSum = Math.max(...nums);
  let prefixSum = 0;
  let minimumPrefix = 0;
  let modifiedMinimumPrefix = 0;
  const negativeCount = new Map();
  const minPrefixPlusRemoval = new Map();

  for (const value of nums) {
    prefixSum += value;
    bestSum = Math.max(bestSum, prefixSum - modifiedMinimumPrefix);

    if (value < 0) {
      negativeCount.set(value, (negativeCount.get(value) || 0) + 1);
      const previousBest = minPrefixPlusRemoval.get(value) || 0;
      minPrefixPlusRemoval.set(
        value,
        Math.min(previousBest, minimumPrefix) + value
      );
      modifiedMinimumPrefix = Math.min(
        modifiedMinimumPrefix,
        negativeCount.get(value) * value,
        minPrefixPlusRemoval.get(value)
      );
    }

    minimumPrefix = Math.min(minimumPrefix, prefixSum);
    modifiedMinimumPrefix = Math.min(modifiedMinimumPrefix, minimumPrefix);
  }

  return bestSum;
};
