/**
 * Minimum Relative Loss After Buying Chocolates
 * Intuition: To minimize Bob's relative loss (Bob's total payment - Alice's total payment), we need to select `m` chocolates such that the sum of individual chocolate's `(Bob's payment - Alice's payment)` is minimized. The payment rules define two categories for chocolate prices `p`: if `p <= k`, the contribution is `p`; if `p > k`, the contribution is `2k - p`. The function `f(p)` representing this contribution (`p` for `p <= k` and `2k - p` for `p > k`) is convex. To minimize the sum of `m` such contributions, we sort prices and apply a two-pointer-like selection strategy, which can be optimized using binary search on the derivative of the total loss function.
 * Approach: 1. Sort the `chocolatePrices` array in ascending order. 2. Precompute `cumulativeSums` (prefix sums) for `chocolatePrices` to efficiently calculate sums over ranges. 3. For each query `[currentK, selectionCount]`: a. Determine `numPricesBelowK`, the count of chocolates with price strictly less than `currentK`, using binary search (`findSplitIndex`). This effectively splits the array into two parts: `p < currentK` and `p >= currentK`. b. Define the valid range for `optimalC1`, which is the number of chocolates chosen from the `p < currentK` category. This range is bounded by `minC1Available` and `maxC1Available`, derived from `selectionCount`, `numPricesBelowK`, and `totalChocolates`. c. The total relative loss, when `optimalC1` chocolates are picked from the left (smallest prices) and `selectionCount - optimalC1` from the right (largest prices in the `p >= currentK` category), is a convex function of `optimalC1`. We find the `optimalC1` that minimizes this function by performing another binary search (`findOptimalC1`) on its derivative (`prices[c1] + prices[N - m + c1] - 2*k`). This search finds a `c1_raw` where the derivative becomes non-negative. d. Clamp `c1_raw` within the determined valid range `[minC1Available, maxC1Available]` to get the final `optimalC1`. e. Calculate the `calculatedRelativeLoss` using `optimalC1`, `selectionCount`, `currentK`, and `cumulativeSums`. f. Store `calculatedRelativeLoss` in `finalLosses`. 4. Return `finalLosses`.
 * Dry Run: For `chocolatePrices = [1, 2, 100, 200]`, `totalChocolates = 4`, `cumulativeSums = [0, 1, 3, 103, 303]`. Query: `currentK = 5`, `selectionCount = 3`.
 * 1. `numPricesBelowK = findSplitIndex(chocolatePrices, 5)` returns `2` (indices for `1`, `2` are `< 5`).
 * 2. `maxC1Available = Math.min(3, 2) = 2`. `minC1Available = Math.max(0, 3 - (4 - 2)) = 1`. Valid `optimalC1` range: `[1, 2]`.
 * 3. `optimalC1Unclamped = findOptimalC1(maxC1Available=2, targetValue=2*5=10, keyFunction)`:
 *    `keyFunction(x) = chocolatePrices[x] + chocolatePrices[4 - 3 + x] = chocolatePrices[x] + chocolatePrices[1 + x]`.
 *    - `x=0`: `keyFunction(0) = 1 + 2 = 3`.
 *    - `x=1`: `keyFunction(1) = 2 + 100 = 102`.
 *    Binary search for `keyFunction(x) >= 10`: `findOptimalC1` returns `1`. So `optimalC1Unclamped = 1`.
 * 4. Clamp `optimalC1`: `optimalC1 = Math.min(2, Math.max(1, 1)) = 1`.
 * 5. Calculate `calculatedRelativeLoss` with `optimalC1 = 1`:
 *    - `numC2 = 3 - 1 = 2`.
 *    - `lossFromC1 = cumulativeSums[1] = 1`.
 *    - `lossFromC2 = 2 * 2 * 5 - (cumulativeSums[4] - cumulativeSums[2]) = 20 - (303 - 3) = 20 - 300 = -280`.
 *    - `calculatedRelativeLoss = 1 + (-280) = -279`.
 * 6. `finalLosses = [-279]`.
 * Time Complexity: O(N log N + Q log N)
 * Space Complexity: O(N + Q)
 */
var minimumRelativeLosses = function (prices, queries) {
  prices.sort((firstPrice, secondPrice) => firstPrice - secondPrice);
  const totalChocolates = prices.length;
  const finalLosses = [];

  const cumulativeSums = [0];
  for (
    let currentPriceIndex = 0;
    currentPriceIndex < totalChocolates;
    currentPriceIndex++
  ) {
    cumulativeSums[currentPriceIndex + 1] =
      cumulativeSums[currentPriceIndex] + prices[currentPriceIndex];
  }

  function findSplitIndex(priceArray, targetValue) {
    let leftPointer = 0;
    let rightPointer = priceArray.length;

    while (leftPointer < rightPointer) {
      const midPoint = Math.floor((leftPointer + rightPointer) / 2);
      if (priceArray[midPoint] < targetValue) {
        leftPointer = midPoint + 1;
      } else {
        rightPointer = midPoint;
      }
    }
    return leftPointer;
  }

  function findOptimalC1(searchLength, targetThreshold, keyEvaluationFunction) {
    let leftBoundary = 0;
    let rightBoundary = searchLength;

    while (leftBoundary < rightBoundary) {
      const middlePoint = Math.floor((leftBoundary + rightBoundary) / 2);
      if (keyEvaluationFunction(middlePoint) < targetThreshold) {
        leftBoundary = middlePoint + 1;
      } else {
        rightBoundary = middlePoint;
      }
    }
    return leftBoundary;
  }

  for (const currentQuery of queries) {
    const currentK = currentQuery[0];
    const selectionCount = currentQuery[1];

    const numPricesBelowK = findSplitIndex(prices, currentK);

    const maxC1Available = Math.min(selectionCount, numPricesBelowK);
    const minC1Available = Math.max(
      0,
      selectionCount - (totalChocolates - numPricesBelowK),
    );

    const optimalC1Unclamped = findOptimalC1(
      maxC1Available,
      2 * currentK,
      (indexInPrices) => {
        return (
          prices[indexInPrices] +
          prices[totalChocolates - selectionCount + indexInPrices]
        );
      },
    );

    const optimalC1 = Math.min(
      maxC1Available,
      Math.max(minC1Available, optimalC1Unclamped),
    );

    const numC2 = selectionCount - optimalC1;

    const lossFromC1 = cumulativeSums[optimalC1];
    const sumPricesC2 =
      cumulativeSums[totalChocolates] - cumulativeSums[totalChocolates - numC2];
    const lossFromC2 = numC2 * 2 * currentK - sumPricesC2;

    const calculatedRelativeLoss = lossFromC1 + lossFromC2;
    finalLosses.push(calculatedRelativeLoss);
  }

  return finalLosses;
};
