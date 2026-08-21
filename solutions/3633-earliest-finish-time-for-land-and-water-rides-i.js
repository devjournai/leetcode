/**
 * Earliest Finish Time for Land and Water Rides I
 * Intuition: The problem requires us to find the earliest possible time to finish exactly one land ride and one water ride. Since the order of rides can be either land-then-water or water-then-land, and there are multiple choices for each ride type, we must evaluate every possible pair of rides and both possible orders for each pair.
 * Approach:
 * 1. Initialize a variable `minOverallFinishTime` to positive infinity to keep track of the minimum finish time found so far.
 * 2. Iterate through each land ride `i` from `0` to `n-1` (where `n` is the number of land rides).
 * 3. Inside this loop, iterate through each water ride `j` from `0` to `m-1` (where `m` is the number of water rides).
 * 4. For each pair of (land ride `i`, water ride `j`), calculate the total finish time for two scenarios:
 *    a. **Land ride `i` first, then Water ride `j`:**
 *       - Calculate the finish time of the land ride: `landFinishTime = landStartTime[i] + landDuration[i]`.
 *       - Calculate the start time of the water ride: `waterStartAfterLand = Math.max(landFinishTime, waterStartTime[j])`. The water ride cannot start before the land ride is finished, nor before it opens.
 *       - Calculate the finish time for this sequence: `totalFinishTimeLW = waterStartAfterLand + waterDuration[j]`.
 *       - Update `minOverallFinishTime = Math.min(minOverallFinishTime, totalFinishTimeLW)`.
 *    b. **Water ride `j` first, then Land ride `i`:**
 *       - Calculate the finish time of the water ride: `waterFinishTime = waterStartTime[j] + waterDuration[j]`.
 *       - Calculate the start time of the land ride: `landStartAfterWater = Math.max(waterFinishTime, landStartTime[i])`. The land ride cannot start before the water ride is finished, nor before it opens.
 *       - Calculate the finish time for this sequence: `totalFinishTimeWL = landStartAfterWater + landDuration[i]`.
 *       - Update `minOverallFinishTime = Math.min(minOverallFinishTime, totalFinishTimeWL)`.
 * 5. After checking all pairs and both orders, `minOverallFinishTime` will hold the earliest possible time. Return `minOverallFinishTime`.
 * Dry Run: Example 1: landStartTime = [2,8], landDuration = [4,1], waterStartTime = [6], waterDuration = [3]
 * `n=2`, `m=1`. `minOverallFinishTime = Infinity`.
 *
 * `i = 0` (Land ride L0: start=2, dur=4)
 *   `j = 0` (Water ride W0: start=6, dur=3)
 *     Scenario L0 -> W0:
 *       `landFinishTime = 2 + 4 = 6`
 *       `waterStartAfterLand = Math.max(6, 6) = 6`
 *       `totalFinishTimeLW = 6 + 3 = 9`
 *       `minOverallFinishTime = Math.min(Infinity, 9) = 9`
 *     Scenario W0 -> L0:
 *       `waterFinishTime = 6 + 3 = 9`
 *       `landStartAfterWater = Math.max(9, 2) = 9`
 *       `totalFinishTimeWL = 9 + 4 = 13`
 *       `minOverallFinishTime = Math.min(9, 13) = 9`
 *
 * `i = 1` (Land ride L1: start=8, dur=1)
 *   `j = 0` (Water ride W0: start=6, dur=3)
 *     Scenario L1 -> W0:
 *       `landFinishTime = 8 + 1 = 9`
 *       `waterStartAfterLand = Math.max(9, 6) = 9`
 *       `totalFinishTimeLW = 9 + 3 = 12`
 *       `minOverallFinishTime = Math.min(9, 12) = 9`
 *     Scenario W0 -> L1:
 *       `waterFinishTime = 6 + 3 = 9`
 *       `landStartAfterWater = Math.max(9, 8) = 9`
 *       `totalFinishTimeWL = 9 + 1 = 10`
 *       `minOverallFinishTime = Math.min(9, 10) = 9`
 *
 * Return `minOverallFinishTime = 9`.
 * Time Complexity: O(n * m)
 * Space Complexity: O(1)
 */
var earliestFinishTime = function (
  landStartTime,
  landDuration,
  waterStartTime,
  waterDuration
) {
  let minOverallFinishTime = Infinity;

  for (let i = 0; i < landStartTime.length; i++) {
    const currentLandStartTime = landStartTime[i];
    const currentLandDuration = landDuration[i];

    for (let j = 0; j < waterStartTime.length; j++) {
      const currentWaterStartTime = waterStartTime[j];
      const currentWaterDuration = waterDuration[j];

      const landFinishTime = currentLandStartTime + currentLandDuration;
      const waterStartAfterLand = Math.max(
        landFinishTime,
        currentWaterStartTime
      );
      const finishTimeLW = waterStartAfterLand + currentWaterDuration;
      minOverallFinishTime = Math.min(minOverallFinishTime, finishTimeLW);

      const waterFinishTime = currentWaterStartTime + currentWaterDuration;
      const landStartAfterWater = Math.max(
        waterFinishTime,
        currentLandStartTime
      );
      const finishTimeWL = landStartAfterWater + currentLandDuration;
      minOverallFinishTime = Math.min(minOverallFinishTime, finishTimeWL);
    }
  }

  return minOverallFinishTime;
};
