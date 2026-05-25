/**
 * Maximum Fruits Harvested After At Most K Steps
 * Intuition: The problem asks for the maximum fruits harvested from a continuous segment of the x-axis, given a starting position and maximum steps. Since the fruits array is sorted by position, we can efficiently find such segments using a sliding window. For each potential window, we calculate the minimum steps required to traverse it from the start position and check if it's within the given `k` steps.
 * Approach: 1. Initialize `maximumHarvest` to 0, `currentWindowValue` to 0, and `windowLeftBoundary` to 0. 2. Iterate `windowRightBoundary` from `0` to `fruits.length - 1` to expand the sliding window. 3. For each `windowRightBoundary`, add `fruits[windowRightBoundary][1]` to `currentWindowValue`. 4. Use a nested `while` loop to ensure the current window (defined by `fruits[windowLeftBoundary][0]` and `fruits[windowRightBoundary][0]`) is valid within `k` steps. To do this, calculate `totalStepsRequired`: the minimum of two paths – (a) going to `fruits[windowLeftBoundary][0]` first then to `fruits[windowRightBoundary][0]`, or (b) going to `fruits[windowRightBoundary][0]` first then to `fruits[windowLeftBoundary][0]`. 5. If `totalStepsRequired` exceeds `k`, shrink the window by incrementing `windowLeftBoundary` and subtracting `fruits[windowLeftBoundary][1]` from `currentWindowValue`. This continues until the window becomes valid or empty. 6. If `windowLeftBoundary` is still less than or equal to `windowRightBoundary` (indicating a valid, non-empty window), update `maximumHarvest` with the maximum of its current value and `currentWindowValue`. 7. After iterating through all possible `windowRightBoundary` positions, return `maximumHarvest`.
 * Dry Run: fruits = [[2,8],[6,3],[8,6]], startPos = 5, k = 4
 * Initial: maximumHarvest = 0, currentWindowValue = 0, windowLeftBoundary = 0
 *
 * windowRightBoundary = 0 (fruit = [2,8]):
 *   currentWindowValue = 8
 *   Window [2,2] (indices [0,0]): firstFruitPosition = 2, lastFruitPosition = 2
 *   distanceToGoLeftFirst = abs(5-2) + (2-2) = 3 + 0 = 3
 *   distanceToGoRightFirst = abs(5-2) + (2-2) = 3 + 0 = 3
 *   totalStepsRequired = min(3,3) = 3. Since 3 <= k (4), break inner loop.
 *   Condition (windowLeftBoundary=0 <= windowRightBoundary=0) is true.
 *   maximumHarvest = max(0, 8) = 8
 *
 * windowRightBoundary = 1 (fruit = [6,3]):
 *   currentWindowValue = 8 + 3 = 11
 *   Window [2,6] (indices [0,1]): firstFruitPosition = 2, lastFruitPosition = 6
 *   distanceToGoLeftFirst = abs(5-2) + (6-2) = 3 + 4 = 7
 *   distanceToGoRightFirst = abs(5-6) + (6-2) = 1 + 4 = 5
 *   totalStepsRequired = min(7,5) = 5. Since 5 > k (4), shrink window:
 *     currentWindowValue = 11 - fruits[0][1] (8) = 3
 *     windowLeftBoundary = 1
 *   Window [6,6] (indices [1,1]): firstFruitPosition = 6, lastFruitPosition = 6
 *   distanceToGoLeftFirst = abs(5-6) + (6-6) = 1 + 0 = 1
 *   distanceToGoRightFirst = abs(5-6) + (6-6) = 1 + 0 = 1
 *   totalStepsRequired = min(1,1) = 1. Since 1 <= k (4), break inner loop.
 *   Condition (windowLeftBoundary=1 <= windowRightBoundary=1) is true.
 *   maximumHarvest = max(8, 3) = 8
 *
 * windowRightBoundary = 2 (fruit = [8,6]):
 *   currentWindowValue = 3 + 6 = 9
 *   Window [6,8] (indices [1,2]): firstFruitPosition = 6, lastFruitPosition = 8
 *   distanceToGoLeftFirst = abs(5-6) + (8-6) = 1 + 2 = 3
 *   distanceToGoRightFirst = abs(5-8) + (8-6) = 3 + 2 = 5
 *   totalStepsRequired = min(3,5) = 3. Since 3 <= k (4), break inner loop.
 *   Condition (windowLeftBoundary=1 <= windowRightBoundary=2) is true.
 *   maximumHarvest = max(8, 9) = 9
 *
 * End of loop for windowRightBoundary.
 * Return 9.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxTotalFruits = function (fruits, startPos, k) {
  let maximumHarvest = 0;
  let windowLeftBoundary = 0;
  let currentWindowValue = 0;

  for (
    let windowRightBoundary = 0;
    windowRightBoundary < fruits.length;
    windowRightBoundary++
  ) {
    currentWindowValue += fruits[windowRightBoundary][1];

    while (windowLeftBoundary <= windowRightBoundary) {
      const firstFruitPosition = fruits[windowLeftBoundary][0];
      const lastFruitPosition = fruits[windowRightBoundary][0];

      const distanceToGoLeftFirst =
        Math.abs(startPos - firstFruitPosition) +
        (lastFruitPosition - firstFruitPosition);
      const distanceToGoRightFirst =
        Math.abs(startPos - lastFruitPosition) +
        (lastFruitPosition - firstFruitPosition);

      const totalStepsRequired = Math.min(
        distanceToGoLeftFirst,
        distanceToGoRightFirst,
      );

      if (totalStepsRequired <= k) {
        break;
      }

      currentWindowValue -= fruits[windowLeftBoundary][1];
      windowLeftBoundary++;
    }

    if (windowLeftBoundary <= windowRightBoundary) {
      maximumHarvest = Math.max(maximumHarvest, currentWindowValue);
    }
  }

  return maximumHarvest;
};
