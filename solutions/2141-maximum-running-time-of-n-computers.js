/**
 * Maximum Running Time Of N Computers
 * Intuition: The problem asks for the maximum possible duration `T` such that `n` computers can run simultaneously. This monotonic property (if `T` minutes is possible, then any `T' < T` minutes is also possible) suggests binary search on the answer `T`.
 * Approach: 1. Define a search space for the maximum running time. The lower bound `lowPointer` is 1 (minimum possible run time). The upper bound `highPointer` is the total sum of all battery capacities divided by `n`, as this is the absolute maximum average time if power could be perfectly distributed. 2. Perform binary search within this range. In each iteration, calculate a `candidateDuration` (midpoint). 3. For this `candidateDuration`, determine if it's possible to run `n` computers for this duration. This involves calculating the `effectivePowerAccumulator`: for each battery, it can contribute at most `candidateDuration` minutes of power (if its own capacity is greater or equal) or its full capacity (if less). Sum these contributions. 4. If `effectivePowerAccumulator` is greater than or equal to `n * candidateDuration` (the total power needed), it means `candidateDuration` is achievable, so we try for a longer time by setting `lowPointer = candidateDuration`. 5. Otherwise, `candidateDuration` is too long, so we try a shorter time by setting `highPointer = candidateDuration - 1`. 6. The binary search continues until `lowPointer` meets `highPointer`, at which point `lowPointer` (or `highPointer`) holds the maximum achievable running time.
 * Dry Run: n = 2, batteries = [3, 3, 3]
 *   1. Initialize `lowPointer = 1`.
 *   2. Calculate `batteryCapacitiesSum = 3 + 3 + 3 = 9`.
 *   3. Initialize `highPointer = Math.floor(9 / 2) = 4`.
 *
 *   Iteration 1: `lowPointer = 1`, `highPointer = 4`. `1 < 4` is true.
 *     `candidateDuration = Math.floor((1 + 4 + 1) / 2) = 3`.
 *     `effectivePowerAccumulator` calculation:
 *       `currentBatteryEnergy = 3`: `effectivePowerAccumulator += Math.min(3, 3) = 3`.
 *       `currentBatteryEnergy = 3`: `effectivePowerAccumulator += Math.min(3, 3) = 6`.
 *       `currentBatteryEnergy = 3`: `effectivePowerAccumulator += Math.min(3, 3) = 9`.
 *     `requiredTotalEnergy = 2 * 3 = 6`.
 *     Since `9 >= 6`, set `lowPointer = 3`.
 *
 *   Iteration 2: `lowPointer = 3`, `highPointer = 4`. `3 < 4` is true.
 *     `candidateDuration = Math.floor((3 + 4 + 1) / 2) = 4`.
 *     `effectivePowerAccumulator` calculation:
 *       `currentBatteryEnergy = 3`: `effectivePowerAccumulator += Math.min(3, 4) = 3`.
 *       `currentBatteryEnergy = 3`: `effectivePowerAccumulator += Math.min(3, 4) = 6`.
 *       `currentBatteryEnergy = 3`: `effectivePowerAccumulator += Math.min(3, 4) = 9`.
 *     `requiredTotalEnergy = 2 * 4 = 8`.
 *     Since `9 >= 8`, set `lowPointer = 4`.
 *
 *   Iteration 3: `lowPointer = 4`, `highPointer = 4`. `4 < 4` is false. Loop terminates.
 *
 *   Return `lowPointer` which is `4`.
 * Time Complexity: O(M * log(S/N))
 * Space Complexity: O(1).
 */
var maxRunTime = function (n, batteries) {
  let lowPointer = 1;
  const batteryCapacitiesSum = batteries.reduce(
    (totalSum, singleBatteryValue) => totalSum + singleBatteryValue,
    0
  );
  let highPointer = Math.floor(batteryCapacitiesSum / n);

  while (lowPointer < highPointer) {
    const candidateDuration = Math.floor((lowPointer + highPointer + 1) / 2);
    let effectivePowerAccumulator = 0;

    for (const currentBatteryEnergy of batteries) {
      effectivePowerAccumulator += Math.min(
        currentBatteryEnergy,
        candidateDuration
      );
    }

    const requiredTotalEnergy = n * candidateDuration;

    if (effectivePowerAccumulator >= requiredTotalEnergy) {
      lowPointer = candidateDuration;
    } else {
      highPointer = candidateDuration - 1;
    }
  }

  return lowPointer;
};
