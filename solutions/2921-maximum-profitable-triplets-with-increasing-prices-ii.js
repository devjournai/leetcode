/**
 * Maximum Profitable Triplets With Increasing Prices Ii
 * Intuition: This problem can be solved by iterating through each item as a potential third element of a triplet (i, j, k) and using Fenwick Trees (BITs) to efficiently query for the maximum profits of the first (i) and second (j) elements that satisfy the price and index conditions. We need two BITs: one to track maximum single item profits for `profits[i]`, and another to track maximum two-item profits for `profits[i] + profits[j]`.
 * Approach: 1. Initialize two Fenwick trees, `firstPriceProfitTracker` and `secondPriceProfitTracker`, to store maximum profits for a single item and a pair of items, respectively, indexed by their prices. All values are initialized to 0. An overall `maximumProfitFound` is initialized to -1.
 * 2. Define `obtainMaxProfitPrefix` helper function for querying the maximum profit up to a given price in a Fenwick tree. This involves iterating downwards through the Fenwick tree's parent nodes.
 * 3. Define `updateMaxProfitPoint` helper function for updating a price point in a Fenwick tree with a new profit value, ensuring the maximum is maintained and propagated upwards. This involves iterating upwards through the Fenwick tree's parent nodes.
 * 4. Iterate `itemPrimaryIndex` from 0 to `prices.length - 1`. For each `currentItem`:
 *    a. Retrieve `currentPricePoint = prices[itemPrimaryIndex]` and `currentProfitAmount = profits[itemPrimaryIndex]`.
 *    b. Query `firstPriceProfitTracker` using `currentPricePoint - 1` to find the `maxSingleItemProfit` (representing `profits[i]`) for any item `i < itemPrimaryIndex` with `prices[i] < currentPricePoint`.
 *    c. Query `secondPriceProfitTracker` using `currentPricePoint - 1` to find the `maxTwoItemProfit` (representing `profits[i] + profits[j]`) for any pair `i < j < itemPrimaryIndex` with `prices[i] < prices[j] < currentPricePoint`.
 *    d. If `maxTwoItemProfit` is greater than 0, it means we found a valid prefix of two items. Update `maximumProfitFound = Math.max(maximumProfitFound, maxTwoItemProfit + currentProfitAmount)`.
 *    e. Update `firstPriceProfitTracker` at `currentPricePoint` with `currentProfitAmount` to consider the current item as a potential first item for future pairs/triplets.
 *    f. If `maxSingleItemProfit` is greater than 0, it means we found a valid first item. Update `secondPriceProfitTracker` at `currentPricePoint` with `currentProfitAmount + maxSingleItemProfit` to consider the current item and the best preceding item as a potential pair for future triplets.
 * 5. Return `maximumProfitFound`.
 * Dry Run: prices = [1, 5, 2, 8], profits = [10, 20, 30, 40]
 * maxPriceUpper = 5001
 * firstPriceProfitTracker = [0, ..., 0] (size 5001)
 * secondPriceProfitTracker = [0, ..., 0] (size 5001)
 * maximumProfitFound = -1
 *
 * itemPrimaryIndex = 0: currentPricePoint = 1, currentProfitAmount = 10
 *   maxSingleItemProfit = obtainMaxProfitPrefix(firstPriceProfitTracker, 0) -> 0
 *   maxTwoItemProfit = obtainMaxProfitPrefix(secondPriceProfitTracker, 0) -> 0
 *   maxTwoItemProfit <= 0.
 *   updateMaxProfitPoint(firstPriceProfitTracker, 1, 10) -> firstPriceProfitTracker updated at 1, 2, 4, 8... with 10.
 *   maxSingleItemProfit <= 0.
 *
 * itemPrimaryIndex = 1: currentPricePoint = 5, currentProfitAmount = 20
 *   maxSingleItemProfit = obtainMaxProfitPrefix(firstPriceProfitTracker, 4) -> (query 4 -> 0, finds firstPriceProfitTracker[4] which is 10) -> 10
 *   maxTwoItemProfit = obtainMaxProfitPrefix(secondPriceProfitTracker, 4) -> 0
 *   maxTwoItemProfit <= 0.
 *   updateMaxProfitPoint(firstPriceProfitTracker, 5, 20) -> firstPriceProfitTracker updated at 5, 6, 8... with 20 (e.g., firstPriceProfitTracker[6] = max(10, 20) = 20, firstPriceProfitTracker[8] = max(10, 20) = 20)
 *   maxSingleItemProfit (10) > 0. updateMaxProfitPoint(secondPriceProfitTracker, 5, 20 + 10 = 30) -> secondPriceProfitTracker updated at 5, 6, 8... with 30.
 *
 * itemPrimaryIndex = 2: currentPricePoint = 2, currentProfitAmount = 30
 *   maxSingleItemProfit = obtainMaxProfitPrefix(firstPriceProfitTracker, 1) -> (query 1 -> 0, finds firstPriceProfitTracker[1] which is 10) -> 10
 *   maxTwoItemProfit = obtainMaxProfitPrefix(secondPriceProfitTracker, 1) -> 0
 *   maxTwoItemProfit <= 0.
 *   updateMaxProfitPoint(firstPriceProfitTracker, 2, 30) -> firstPriceProfitTracker updated at 2, 4, 8... with 30 (e.g., firstPriceProfitTracker[2] = max(10, 30) = 30, firstPriceProfitTracker[4] = max(20, 30) = 30)
 *   maxSingleItemProfit (10) > 0. updateMaxProfitPoint(secondPriceProfitTracker, 2, 30 + 10 = 40) -> secondPriceProfitTracker updated at 2, 4, 8... with 40.
 *
 * itemPrimaryIndex = 3: currentPricePoint = 8, currentProfitAmount = 40
 *   maxSingleItemProfit = obtainMaxProfitPrefix(firstPriceProfitTracker, 7) -> (query 7 -> 6 -> 4 -> 0, finds max of firstPriceProfitTracker[7], [6]=max(20,30)=30, [4]=30) -> 30
 *   maxTwoItemProfit = obtainMaxProfitPrefix(secondPriceProfitTracker, 7) -> (query 7 -> 6 -> 4 -> 0, finds max of secondPriceProfitTracker[7], [6]=max(30,40)=40, [4]=40) -> 40
 *   maxTwoItemProfit (40) > 0. maximumProfitFound = Math.max(-1, 40 + 40) -> 80
 *   updateMaxProfitPoint(firstPriceProfitTracker, 8, 40) -> firstPriceProfitTracker updated at 8, 16... with 40.
 *   maxSingleItemProfit (30) > 0. updateMaxProfitPoint(secondPriceProfitTracker, 8, 40 + 30 = 70) -> secondPriceProfitTracker updated at 8, 16... with 70.
 *
 * Return 80.
 * Time Complexity: O(N log(MaxPrice))
 * Space Complexity: O(MaxPrice)
 */
var maxProfit = function (prices, profits) {
  const maxPriceUpper = 5001;
  const firstPriceProfitTracker = new Array(maxPriceUpper).fill(0);
  const secondPriceProfitTracker = new Array(maxPriceUpper).fill(0);
  let maximumProfitFound = -1;

  const obtainMaxProfitPrefix = (targetBitArray, queryPriceIndex) => {
    let currentMaximumPrefix = 0;
    let iterationPointer = queryPriceIndex;
    while (iterationPointer > 0) {
      currentMaximumPrefix = Math.max(
        currentMaximumPrefix,
        targetBitArray[iterationPointer],
      );
      iterationPointer &= iterationPointer - 1;
    }
    return currentMaximumPrefix;
  };

  const updateMaxProfitPoint = (
    updateBitArray,
    updatePriceIndex,
    newValueForUpdate,
  ) => {
    let updatePointer = updatePriceIndex;
    while (updatePointer < maxPriceUpper) {
      updateBitArray[updatePointer] = Math.max(
        updateBitArray[updatePointer],
        newValueForUpdate,
      );
      updatePointer += updatePointer & -updatePointer;
    }
  };

  let itemPrimaryIndex = 0;
  while (itemPrimaryIndex < prices.length) {
    const currentPricePoint = prices[itemPrimaryIndex];
    const currentProfitAmount = profits[itemPrimaryIndex];

    const maxSingleItemProfit = obtainMaxProfitPrefix(
      firstPriceProfitTracker,
      currentPricePoint - 1,
    );
    const maxTwoItemProfit = obtainMaxProfitPrefix(
      secondPriceProfitTracker,
      currentPricePoint - 1,
    );

    if (maxTwoItemProfit > 0) {
      maximumProfitFound = Math.max(
        maximumProfitFound,
        maxTwoItemProfit + currentProfitAmount,
      );
    }

    updateMaxProfitPoint(
      firstPriceProfitTracker,
      currentPricePoint,
      currentProfitAmount,
    );

    if (maxSingleItemProfit > 0) {
      updateMaxProfitPoint(
        secondPriceProfitTracker,
        currentPricePoint,
        currentProfitAmount + maxSingleItemProfit,
      );
    }
    itemPrimaryIndex++;
  }

  return maximumProfitFound;
};
