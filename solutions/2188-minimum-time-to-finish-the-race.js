/**
 * Minimum Time To Finish The Race
 * Intuition: This problem can be solved using dynamic programming. The key observation is that using a single tire for too many consecutive laps becomes less efficient than changing tires due to exponential time increase. We can pre-calculate the minimum time for a small, fixed number of consecutive laps for any single tire. Then, a DP approach determines the minimum total time for `numLaps` by combining these pre-calculated consecutive lap times with the change time.
 * Approach: 1. Determine a maximum number of consecutive laps (MAX_CONSECUTIVE) for which it's ever optimal to use the same tire without changing. This is typically around 17-18 laps due to the exponential growth of lap times `fi * ri^(x-1)` vs. a fixed `changeTime + fi`.
 * 2. Initialize an array `minConsecutiveLapDurations` of size `MAX_CONSECUTIVE` to store the minimum time to complete `k` consecutive laps using *any* single tire type, starting fresh (no `changeTime` before the first lap of this segment). Populate this array by iterating through all given `tires`, calculating successive lap times and accumulated times, breaking early if the current lap's duration exceeds `changeTime + firstLapTime` (indicating it's better to change tires).
 * 3. Initialize a DP array `optimalTotalDurations` of size `numLaps + 1`, where `optimalTotalDurations[k]` will store the minimum time to complete `k` laps. Set `optimalTotalDurations[0] = 0`.
 * 4. Iterate `currentLapsTarget` from 1 to `numLaps`. For each `currentLapsTarget`, iterate `segmentLength` from 1 up to `min(currentLapsTarget, MAX_CONSECUTIVE - 1)`.
 * 5. If `minConsecutiveLapDurations[segmentLength]` is valid (not Infinity), calculate the potential time for `currentLapsTarget` as `optimalTotalDurations[currentLapsTarget - segmentLength] + minConsecutiveLapDurations[segmentLength]` plus `changeTime` if `currentLapsTarget` is not equal to `segmentLength` (meaning a tire change occurred before this segment). Update `optimalTotalDurations[currentLapsTarget]` with the minimum found.
 * 6. The final answer is `optimalTotalDurations[numLaps]`.
 * Dry Run: For `tires = [[1, 2]]`, `changeTime = 10`, `numLaps = 5`:
 * MAX_CONSECUTIVE = 18.
 * `minConsecutiveLapDurations` (size 18, filled with Infinity):
 * For tire [1, 2]:
 * Lap 1: running=1, accumulated=1. `minConsecutiveLapDurations[1] = 1`. (1 <= 10+1)
 * Lap 2: running=2, accumulated=1+2=3. `minConsecutiveLapDurations[2] = 3`. (2 <= 10+1)
 * Lap 3: running=4, accumulated=3+4=7. `minConsecutiveLapDurations[3] = 7`. (4 <= 10+1)
 * Lap 4: running=8, accumulated=7+8=15. `minConsecutiveLapDurations[4] = 15`. (8 <= 10+1)
 * Lap 5: running=16. (16 > 10+1) -> Break.
 * Result: `minConsecutiveLapDurations = [_, 1, 3, 7, 15, Infinity, ...]`.
 * `optimalTotalDurations` (size 6, filled with Infinity): `optimalTotalDurations[0] = 0`.
 * `currentLapsTarget = 1`:
 * `segmentLength = 1`: `optimalTotalDurations[0] + minConsecutiveLapDurations[1] + 0 = 0 + 1 + 0 = 1`. `optimalTotalDurations[1] = 1`.
 * `currentLapsTarget = 2`:
 * `segmentLength = 1`: `optimalTotalDurations[1] + minConsecutiveLapDurations[1] + changeTime = 1 + 1 + 10 = 12`.
 * `segmentLength = 2`: `optimalTotalDurations[0] + minConsecutiveLapDurations[2] + 0 = 0 + 3 + 0 = 3`.
 * `optimalTotalDurations[2] = min(12, 3) = 3`.
 * `currentLapsTarget = 3`:
 * `segmentLength = 1`: `optimalTotalDurations[2] + minConsecutiveLapDurations[1] + changeTime = 3 + 1 + 10 = 14`.
 * `segmentLength = 2`: `optimalTotalDurations[1] + minConsecutiveLapDurations[2] + changeTime = 1 + 3 + 10 = 14`.
 * `segmentLength = 3`: `optimalTotalDurations[0] + minConsecutiveLapDurations[3] + 0 = 0 + 7 + 0 = 7`.
 * `optimalTotalDurations[3] = min(14, 14, 7) = 7`.
 * `currentLapsTarget = 4`:
 * `segmentLength = 1`: `optimalTotalDurations[3] + minConsecutiveLapDurations[1] + changeTime = 7 + 1 + 10 = 18`.
 * `segmentLength = 2`: `optimalTotalDurations[2] + minConsecutiveLapDurations[2] + changeTime = 3 + 3 + 10 = 16`.
 * `segmentLength = 3`: `optimalTotalDurations[1] + minConsecutiveLapDurations[3] + changeTime = 1 + 7 + 10 = 18`.
 * `segmentLength = 4`: `optimalTotalDurations[0] + minConsecutiveLapDurations[4] + 0 = 0 + 15 + 0 = 15`.
 * `optimalTotalDurations[4] = min(18, 16, 18, 15) = 15`.
 * `currentLapsTarget = 5`:
 * `segmentLength = 1`: `optimalTotalDurations[4] + minConsecutiveLapDurations[1] + changeTime = 15 + 1 + 10 = 26`.
 * `segmentLength = 2`: `optimalTotalDurations[3] + minConsecutiveLapDurations[2] + changeTime = 7 + 3 + 10 = 20`.
 * `segmentLength = 3`: `optimalTotalDurations[2] + minConsecutiveLapDurations[3] + changeTime = 3 + 7 + 10 = 20`.
 * `segmentLength = 4`: `optimalTotalDurations[1] + minConsecutiveLapDurations[4] + changeTime = 1 + 15 + 10 = 26`.
 * `segmentLength = 5`: `minConsecutiveLapDurations[5]` is Infinity, skipped.
 * `optimalTotalDurations[5] = min(26, 20, 20, 26) = 20`.
 * Return `optimalTotalDurations[5] = 20`.
 * Time Complexity: O(T * L_MAX + N * L_MAX)
 * Space Complexity: O(L_MAX + N)
 */
var minimumFinishTime = function (tires, changeTime, numLaps) {
  const MAX_CONSECUTIVE_LAP_CONSIDERATION = 18;

  const minConsecutiveLapDurations = new Array(
    MAX_CONSECUTIVE_LAP_CONSIDERATION,
  ).fill(Infinity);

  for (let tireIndex = 0; tireIndex < tires.length; tireIndex++) {
    const currentTireSpecification = tires[tireIndex];
    const firstLapDuration = currentTireSpecification[0];
    const durationMultiplier = currentTireSpecification[1];

    let singleLapCalculatedTime = firstLapDuration;
    let cumulativeLapTime = firstLapDuration;

    let sequentialLapCounter = 1;
    while (
      sequentialLapCounter < MAX_CONSECUTIVE_LAP_CONSIDERATION &&
      sequentialLapCounter <= numLaps
    ) {
      if (
        singleLapCalculatedTime > changeTime + firstLapDuration &&
        durationMultiplier > 1
      ) {
        break;
      }
      minConsecutiveLapDurations[sequentialLapCounter] = Math.min(
        minConsecutiveLapDurations[sequentialLapCounter],
        cumulativeLapTime,
      );

      singleLapCalculatedTime *= durationMultiplier;
      cumulativeLapTime += singleLapCalculatedTime;
      sequentialLapCounter++;
    }
  }

  const optimalTotalDurations = new Array(numLaps + 1).fill(Infinity);
  optimalTotalDurations[0] = 0;

  for (
    let currentLapsTarget = 1;
    currentLapsTarget <= numLaps;
    currentLapsTarget++
  ) {
    for (
      let segmentLength = 1;
      segmentLength < MAX_CONSECUTIVE_LAP_CONSIDERATION &&
      segmentLength <= currentLapsTarget;
      segmentLength++
    ) {
      if (minConsecutiveLapDurations[segmentLength] !== Infinity) {
        const previousLapsTime =
          optimalTotalDurations[currentLapsTarget - segmentLength];
        const currentSegmentDuration =
          minConsecutiveLapDurations[segmentLength];
        const transitionPenalty =
          currentLapsTarget === segmentLength ? 0 : changeTime;

        optimalTotalDurations[currentLapsTarget] = Math.min(
          optimalTotalDurations[currentLapsTarget],
          previousLapsTime + currentSegmentDuration + transitionPenalty,
        );
      }
    }
  }

  return optimalTotalDurations[numLaps];
};
