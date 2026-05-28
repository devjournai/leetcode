/**
 * Pour Water Between Buckets To Make Water Levels Equal
 * Intuition: The problem asks for the maximum possible equal water level that can be achieved. This characteristic (finding a maximum value satisfying a condition) is a strong indicator for binary search on the answer. The condition "can we achieve a target water level" is monotonic: if a level `X` is achievable, any level `Y < X` is also achievable. If `X` is not achievable, then any `Z > X` is also not achievable.
 * Approach: 1. Determine the search range for the binary search. The minimum possible equal level is 0, and the maximum possible equal level cannot exceed the highest initial water level in any bucket. 2. Implement a helper function `canTargetLevelBeReached(targetValue)` that checks if it's possible to make all buckets contain `targetValue` amount of water. This involves iterating through all buckets, calculating the total surplus water from buckets with `currentBucketWater > targetValue` and the total deficit water for buckets with `currentBucketWater < targetValue`. Considering the `loss` percentage, the effective surplus available for pouring is `totalSurplusWater * (100 - loss) / 100`. The condition is met if this effective surplus is greater than or equal to the total deficit. 3. Perform a binary search within the determined range. If `canTargetLevelBeReached` returns true for a `testLevel`, it means `testLevel` is achievable, so we try for a higher level by updating the `minimumLevel` to `testLevel`. Otherwise, `testLevel` is too high, and we must aim lower by updating the `maximumLevel` to `testLevel`. 4. Continue the binary search until the `maximumLevel` and `minimumLevel` are sufficiently close (e.g., their difference is less than `1e-7` for floating-point precision). The final `minimumLevel` will be the answer.
 * Dry Run: buckets = [1, 2, 3], loss = 50
 *    Initial values: totalBuckets = 3, pourEfficiency = 0.5. minimumLevel = 0, maximumLevel = 3.
 *    Iteration 1:
 *        testLevel = (0 + 3) / 2 = 1.5
 *        canTargetLevelBeReached(1.5):
 *            totalSurplusWater = 0, totalDeficitWater = 0
 *            For currentBucketWater = 1: 1 < 1.5, totalDeficitWater += (1.5 - 1) = 0.5
 *            For currentBucketWater = 2: 2 > 1.5, totalSurplusWater += (2 - 1.5) = 0.5
 *            For currentBucketWater = 3: 3 > 1.5, totalSurplusWater += (3 - 1.5) = 1.5
 *            Total: totalSurplusWater = 2.0, totalDeficitWater = 0.5
 *            Check: 2.0 * 0.5 >= 0.5 -> 1.0 >= 0.5 (True)
 *        minimumLevel = 1.5
 *    Iteration 2:
 *        minimumLevel = 1.5, maximumLevel = 3
 *        testLevel = (1.5 + 3) / 2 = 2.25
 *        canTargetLevelBeReached(2.25):
 *            totalSurplusWater = 0, totalDeficitWater = 0
 *            For currentBucketWater = 1: 1 < 2.25, totalDeficitWater += (2.25 - 1) = 1.25
 *            For currentBucketWater = 2: 2 < 2.25, totalDeficitWater += (2.25 - 2) = 0.25 (totalDeficitWater now 1.5)
 *            For currentBucketWater = 3: 3 > 2.25, totalSurplusWater += (3 - 2.25) = 0.75
 *            Total: totalSurplusWater = 0.75, totalDeficitWater = 1.5
 *            Check: 0.75 * 0.5 >= 1.5 -> 0.375 >= 1.5 (False)
 *        maximumLevel = 2.25
 *    Iteration 3:
 *        minimumLevel = 1.5, maximumLevel = 2.25
 *        testLevel = (1.5 + 2.25) / 2 = 1.875
 *        canTargetLevelBeReached(1.875):
 *            totalSurplusWater = 0, totalDeficitWater = 0
 *            For currentBucketWater = 1: 1 < 1.875, totalDeficitWater += (1.875 - 1) = 0.875
 *            For currentBucketWater = 2: 2 > 1.875, totalSurplusWater += (2 - 1.875) = 0.125
 *            For currentBucketWater = 3: 3 > 1.875, totalSurplusWater += (3 - 1.875) = 1.125 (totalSurplusWater now 1.25)
 *            Total: totalSurplusWater = 1.25, totalDeficitWater = 0.875
 *            Check: 1.25 * 0.5 >= 0.875 -> 0.625 >= 0.875 (False)
 *        maximumLevel = 1.875
 *    The process continues until `maximumLevel - minimumLevel` is small, converging to the maximum achievable equal level.
 * Time Complexity: O(N log(MAX_WATER / EPSILON))
 * Space Complexity: O(1)
 */
var equalizeWater = function (buckets, loss) {
  const totalBuckets = buckets.length;
  const pourEfficiency = (100 - loss) / 100;

  let minimumLevel = 0;
  let maximumLevel = Math.max(...buckets);

  while (maximumLevel - minimumLevel > 1e-7) {
    const testLevel = (minimumLevel + maximumLevel) / 2;

    if (canTargetLevelBeReached(testLevel)) {
      minimumLevel = testLevel;
    } else {
      maximumLevel = testLevel;
    }
  }

  return minimumLevel;

  function canTargetLevelBeReached(targetValue) {
    let totalSurplusWater = 0;
    let totalDeficitWater = 0;

    for (let idx = 0; idx < totalBuckets; ++idx) {
      const currentBucketWater = buckets[idx];
      if (currentBucketWater > targetValue) {
        totalSurplusWater += currentBucketWater - targetValue;
      } else {
        totalDeficitWater += targetValue - currentBucketWater;
      }
    }

    return totalSurplusWater * pourEfficiency >= totalDeficitWater;
  }
};
