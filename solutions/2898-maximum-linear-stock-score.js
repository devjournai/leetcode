/**
 * Maximum Linear Stock Score
 * Intuition: The condition for a linear selection, `prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] - indexes[j - 1]`, can be rearranged to `prices[indexes[j]] - indexes[j] == prices[indexes[j - 1]] - indexes[j - 1]`. This reveals that for any valid linear selection, the quantity `prices[day_index] - day_index` must be constant for all selected days. Therefore, all days sharing the same `prices[i] - i` value can form a single linear selection. To maximize the score for such a selection, we should include all days that yield this common difference.
 * Approach: 1. Initialize a hash map to aggregate scores. The keys will be the constant difference `prices[i] - i`, and the values will be the sum of `prices[i]` for all days `i` that produce this difference. 2. Iterate through the `prices` array using a 0-based index `i`. For each element `prices[i]`, calculate `currentDifference = prices[i] - i`. 3. Update the hash map: add `prices[i]` to the value associated with `currentDifference`. If `currentDifference` is not yet a key, initialize its sum with `prices[i]`. 4. After processing all elements, iterate through the values in the hash map to find the maximum sum. This maximum sum represents the highest possible score for any linear selection.
 * Dry Run: prices = [1, 2, 5, 4, 3]
 *   arrayLength = 5
 *   scoreMap = new Map()
 *
 *   iterationCount = 0 (prices[0] = 1):
 *     priceValue = 1
 *     calculatedDiff = 1 - 0 = 1
 *     existingTotal = scoreMap.get(1) || 0 = 0
 *     scoreMap.set(1, 0 + 1) = 1
 *     scoreMap = {1: 1}
 *
 *   iterationCount = 1 (prices[1] = 2):
 *     priceValue = 2
 *     calculatedDiff = 2 - 1 = 1
 *     existingTotal = scoreMap.get(1) || 0 = 1
 *     scoreMap.set(1, 1 + 2) = 3
 *     scoreMap = {1: 3}
 *
 *   iterationCount = 2 (prices[2] = 5):
 *     priceValue = 5
 *     calculatedDiff = 5 - 2 = 3
 *     existingTotal = scoreMap.get(3) || 0 = 0
 *     scoreMap.set(3, 0 + 5) = 5
 *     scoreMap = {1: 3, 3: 5}
 *
 *   iterationCount = 3 (prices[3] = 4):
 *     priceValue = 4
 *     calculatedDiff = 4 - 3 = 1
 *     existingTotal = scoreMap.get(1) || 0 = 3
 *     scoreMap.set(1, 3 + 4) = 7
 *     scoreMap = {1: 7, 3: 5}
 *
 *   iterationCount = 4 (prices[4] = 3):
 *     priceValue = 3
 *     calculatedDiff = 3 - 4 = -1
 *     existingTotal = scoreMap.get(-1) || 0 = 0
 *     scoreMap.set(-1, 0 + 3) = 3
 *     scoreMap = {1: 7, 3: 5, -1: 3}
 *
 *   End of loop.
 *   scoreMap.values() yields [7, 5, 3].
 *   maxOverallScore = Math.max(7, 5, 3) = 7.
 *   Return 7.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxScore = function (prices) {
  const scoreMap = new Map();
  const pricesLength = prices.length;

  for (
    let iterationCount = 0;
    iterationCount < pricesLength;
    iterationCount++
  ) {
    const priceValue = prices[iterationCount];
    const calculatedDiff = priceValue - iterationCount;
    const existingTotal = scoreMap.get(calculatedDiff) || 0;
    scoreMap.set(calculatedDiff, existingTotal + priceValue);
  }

  if (scoreMap.size === 0) {
    return 0;
  }

  let maxOverallScore = -Infinity;
  for (const currentSum of scoreMap.values()) {
    if (currentSum > maxOverallScore) {
      maxOverallScore = currentSum;
    }
  }

  return maxOverallScore;
};
