/**
 * Maximum Profitable Triplets With Increasing Prices I
 * Intuition: To find a triplet (i, j, k) with i < j < k and prices[i] < prices[j] < prices[k] that maximizes profits[i] + profits[j] + profits[k], we can iterate through each possible middle element 'j'. For a fixed 'j', we then need to find the maximum profit from an item 'i' to its left (i < j and prices[i] < prices[j]) and the maximum profit from an item 'k' to its right (k > j and prices[k] > prices[j]).
 * Approach: 1. Initialize a variable `maxTotalProfit` to -1 to store the overall maximum profit. 2. Iterate `middleItemIndex` from 1 to `itemCount - 2` (exclusive), representing the index of the middle item `j`. 3. For each `middleItemIndex`, initialize `bestLeftProfit` and `bestRightProfit` to 0, and `foundLeftItem`, `foundRightItem` flags to false. 4. Iterate `leftItemSearchIndex` from 0 to `middleItemIndex - 1`. If `itemPrices[leftItemSearchIndex]` is less than `itemPrices[middleItemIndex]`, update `bestLeftProfit` with the maximum of its current value and `itemProfits[leftItemSearchIndex]`, and set `foundLeftItem` to true. 5. Iterate `rightItemSearchIndex` from `middleItemIndex + 1` to `itemCount - 1`. If `itemPrices[middleItemIndex]` is less than `itemPrices[rightItemSearchIndex]`, update `bestRightProfit` with the maximum of its current value and `itemProfits[rightItemSearchIndex]`, and set `foundRightItem` to true. 6. If both `foundLeftItem` and `foundRightItem` are true, calculate `currentTripProfit = bestLeftProfit + itemProfits[middleItemIndex] + bestRightProfit`. Update `maxTotalProfit` with the maximum of its current value and `currentTripProfit`. 7. After iterating through all possible `middleItemIndex`, return `maxTotalProfit`.
 * Dry Run:
 * prices = [1, 5, 3, 4, 6], profits = [10, 20, 30, 40, 50]
 * itemCount = 5, maxTotalProfit = -1
 *
 * middleItemIndex = 1 (prices[1]=5, profits[1]=20):
 *   bestLeftProfit = 0, bestRightProfit = 0, foundLeftItem = false, foundRightItem = false
 *   leftItemSearchIndex = 0 (prices[0]=1, profits[0]=10): 1 < 5. bestLeftProfit = max(0, 10) = 10. foundLeftItem = true.
 *   rightItemSearchIndex = 2 (prices[2]=3, profits[2]=30): 5 < 3 is false.
 *   rightItemSearchIndex = 3 (prices[3]=4, profits[3]=40): 5 < 4 is false.
 *   rightItemSearchIndex = 4 (prices[4]=6, profits[4]=50): 5 < 6. bestRightProfit = max(0, 50) = 50. foundRightItem = true.
 *   foundLeftItem && foundRightItem is true. currentTripProfit = 10 + 20 + 50 = 80. maxTotalProfit = max(-1, 80) = 80.
 *
 * middleItemIndex = 2 (prices[2]=3, profits[2]=30):
 *   bestLeftProfit = 0, bestRightProfit = 0, foundLeftItem = false, foundRightItem = false
 *   leftItemSearchIndex = 0 (prices[0]=1, profits[0]=10): 1 < 3. bestLeftProfit = max(0, 10) = 10. foundLeftItem = true.
 *   leftItemSearchIndex = 1 (prices[1]=5, profits[1]=20): 5 < 3 is false.
 *   rightItemSearchIndex = 3 (prices[3]=4, profits[3]=40): 3 < 4. bestRightProfit = max(0, 40) = 40. foundRightItem = true.
 *   rightItemSearchIndex = 4 (prices[4]=6, profits[4]=50): 3 < 6. bestRightProfit = max(40, 50) = 50.
 *   foundLeftItem && foundRightItem is true. currentTripProfit = 10 + 30 + 50 = 90. maxTotalProfit = max(80, 90) = 90.
 *
 * middleItemIndex = 3 (prices[3]=4, profits[3]=40):
 *   bestLeftProfit = 0, bestRightProfit = 0, foundLeftItem = false, foundRightItem = false
 *   leftItemSearchIndex = 0 (prices[0]=1, profits[0]=10): 1 < 4. bestLeftProfit = max(0, 10) = 10. foundLeftItem = true.
 *   leftItemSearchIndex = 1 (prices[1]=5, profits[1]=20): 5 < 4 is false.
 *   leftItemSearchIndex = 2 (prices[2]=3, profits[2]=30): 3 < 4. bestLeftProfit = max(10, 30) = 30.
 *   rightItemSearchIndex = 4 (prices[4]=6, profits[4]=50): 4 < 6. bestRightProfit = max(0, 50) = 50. foundRightItem = true.
 *   foundLeftItem && foundRightItem is true. currentTripProfit = 30 + 40 + 50 = 120. maxTotalProfit = max(90, 120) = 120.
 *
 * Loop finishes. Return maxTotalProfit = 120.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var maxProfit = function (itemPrices, itemProfits) {
  const itemCount = itemPrices.length;
  let maxTotalProfit = -1;

  for (
    let middleItemIndex = 1;
    middleItemIndex < itemCount - 1;
    middleItemIndex++
  ) {
    let bestLeftProfit = 0;
    let bestRightProfit = 0;
    let foundLeftItem = false;
    let foundRightItem = false;

    for (
      let leftItemSearchIndex = 0;
      leftItemSearchIndex < middleItemIndex;
      leftItemSearchIndex++
    ) {
      if (itemPrices[leftItemSearchIndex] < itemPrices[middleItemIndex]) {
        bestLeftProfit = Math.max(
          bestLeftProfit,
          itemProfits[leftItemSearchIndex],
        );
        foundLeftItem = true;
      }
    }

    for (
      let rightItemSearchIndex = middleItemIndex + 1;
      rightItemSearchIndex < itemCount;
      rightItemSearchIndex++
    ) {
      if (itemPrices[middleItemIndex] < itemPrices[rightItemSearchIndex]) {
        bestRightProfit = Math.max(
          bestRightProfit,
          itemProfits[rightItemSearchIndex],
        );
        foundRightItem = true;
      }
    }

    if (foundLeftItem && foundRightItem) {
      const currentTripProfit =
        bestLeftProfit + itemProfits[middleItemIndex] + bestRightProfit;
      maxTotalProfit = Math.max(maxTotalProfit, currentTripProfit);
    }
  }

  return maxTotalProfit;
};
