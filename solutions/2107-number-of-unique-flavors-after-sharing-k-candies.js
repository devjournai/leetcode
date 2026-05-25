/**
 * Number Of Unique Flavors After Sharing K Candies
 * Intuition: To maximize unique flavors kept, we want to choose a window of k candies to give away such that the flavors in that window are already abundant in the remaining candies. This can be tracked by a sliding window approach.
 * Approach: 1. First, count the total occurrences of each flavor across all candies. 2. Initialize a sliding window of size k (the first k candies) and count flavors within this window. 3. Track `currentKeptFlavorCount`, representing unique flavors whose total global count is NOT entirely within the current window. This count is initially the total number of distinct flavors. When a flavor's count within the window reaches its global total, `currentKeptFlavorCount` decrements. When its count drops below its global total (after previously being equal), `currentKeptFlavorCount` increments. 4. Slide the window one position at a time, updating flavor counts for the candy leaving and the candy entering, and consequently updating `currentKeptFlavorCount`. 5. Keep track of the maximum `currentKeptFlavorCount` encountered throughout the process.
 * Dry Run: candies = [1,2,3,2,1], k = 2
 *   1. Edge cases: k=2, length=5. Not applicable.
 *   2. Global counts (`allCandyFlavorAmounts`): {1: 2, 2: 2, 3: 1}. `totalDistinctFlavors` = 3.
 *   3. `currentKeptFlavorCount` initialized to `totalDistinctFlavors` (3).
 *   4. Initialize first window (indices 0,1), candies `[1,2]`:
 *      - `initialWindowTraversal = 0` (candy 1): `windowContentsAmount.set(1, 1)`. `windowContentsAmount.get(1)` (1) !== `allCandyFlavorAmounts.get(1)` (2). `currentKeptFlavorCount` remains 3.
 *      - `initialWindowTraversal = 1` (candy 2): `windowContentsAmount.set(2, 1)`. `windowContentsAmount.get(2)` (1) !== `allCandyFlavorAmounts.get(2)` (2). `currentKeptFlavorCount` remains 3.
 *      - After initial window: `windowContentsAmount = {1: 1, 2: 1}`. `currentKeptFlavorCount = 3`.
 *   5. `maximumFlavorResult` = `currentKeptFlavorCount` (3).
 *   6. Slide window: `rightHandIndex` from 2 to 4.
 *      - `rightHandIndex = 2` (Window `[1,2]` -> `[2,3]`)
 *        - `outgoingCandy = candies[0] = 1`. `previousWindowQuantity = windowContentsAmount.get(1)` (1). `windowContentsAmount.set(1, 0)`. `previousWindowQuantity` (1) !== `allCandyFlavorAmounts.get(1)` (2). `currentKeptFlavorCount` remains 3.
 *        - `incomingCandy = candies[2] = 3`. `windowContentsAmount.set(3, 1)`. `windowContentsAmount.get(3)` (1) === `allCandyFlavorAmounts.get(3)` (1). `currentKeptFlavorCount` decrements to 2.
 *        - `maximumFlavorResult = Math.max(3, 2) = 3`.
 *      - `rightHandIndex = 3` (Window `[2,3]` -> `[3,2]`)
 *        - `outgoingCandy = candies[1] = 2`. `previousWindowQuantity = windowContentsAmount.get(2)` (1). `windowContentsAmount.set(2, 0)`. `previousWindowQuantity` (1) !== `allCandyFlavorAmounts.get(2)` (2). `currentKeptFlavorCount` remains 2.
 *        - `incomingCandy = candies[3] = 2`. `windowContentsAmount.set(2, 1)`. `windowContentsAmount.get(2)` (1) !== `allCandyFlavorAmounts.get(2)` (2). `currentKeptFlavorCount` remains 2.
 *        - `maximumFlavorResult = Math.max(3, 2) = 3`.
 *      - `rightHandIndex = 4` (Window `[3,2]` -> `[2,1]`)
 *        - `outgoingCandy = candies[2] = 3`. `previousWindowQuantity = windowContentsAmount.get(3)` (1). `windowContentsAmount.set(3, 0)`. `previousWindowQuantity` (1) === `allCandyFlavorAmounts.get(3)` (1). `currentKeptFlavorCount` increments to 3.
 *        - `incomingCandy = candies[4] = 1`. `windowContentsAmount.set(1, 1)`. `windowContentsAmount.get(1)` (1) !== `allCandyFlavorAmounts.get(1)` (2). `currentKeptFlavorCount` remains 3.
 *        - `maximumFlavorResult = Math.max(3, 3) = 3`.
 *   7. Return `maximumFlavorResult` (3).
 * Time Complexity: O(N)
 * Space Complexity: O(U)
 */
var shareCandies = function (candies, k) {
  const totalCandyLength = candies.length;

  if (k === 0) {
    return new Set(candies).size;
  }
  if (k === totalCandyLength) {
    return 0;
  }

  const allCandyFlavorAmounts = new Map();
  for (
    let currentCandyIndex = 0;
    currentCandyIndex < totalCandyLength;
    currentCandyIndex++
  ) {
    const currentCandyFlavor = candies[currentCandyIndex];
    allCandyFlavorAmounts.set(
      currentCandyFlavor,
      (allCandyFlavorAmounts.get(currentCandyFlavor) || 0) + 1,
    );
  }

  const windowContentsAmount = new Map();
  let currentKeptFlavorCount = allCandyFlavorAmounts.size;

  for (
    let initialWindowTraversal = 0;
    initialWindowTraversal < k;
    initialWindowTraversal++
  ) {
    const presentCandyInWindow = candies[initialWindowTraversal];
    const initialWindowFlavorCount =
      windowContentsAmount.get(presentCandyInWindow) || 0;
    windowContentsAmount.set(
      presentCandyInWindow,
      initialWindowFlavorCount + 1,
    );

    if (
      initialWindowFlavorCount + 1 ===
      allCandyFlavorAmounts.get(presentCandyInWindow)
    ) {
      currentKeptFlavorCount--;
    }
  }

  let maximumFlavorResult = currentKeptFlavorCount;

  for (
    let rightHandIndex = k;
    rightHandIndex < totalCandyLength;
    rightHandIndex++
  ) {
    const incomingCandy = candies[rightHandIndex];
    const outgoingCandy = candies[rightHandIndex - k];

    const prevIncomingCount = windowContentsAmount.get(incomingCandy) || 0;
    windowContentsAmount.set(incomingCandy, prevIncomingCount + 1);
    if (prevIncomingCount + 1 === allCandyFlavorAmounts.get(incomingCandy)) {
      currentKeptFlavorCount--;
    }

    const prevOutgoingCount = windowContentsAmount.get(outgoingCandy);
    windowContentsAmount.set(outgoingCandy, prevOutgoingCount - 1);
    if (prevOutgoingCount === allCandyFlavorAmounts.get(outgoingCandy)) {
      currentKeptFlavorCount++;
    }

    maximumFlavorResult = Math.max(maximumFlavorResult, currentKeptFlavorCount);
  }

  return maximumFlavorResult;
};
