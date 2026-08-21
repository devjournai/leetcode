/**
 * Smallest Rotation With Highest Score
 * Intuition: After k left rotations, index i contributes 1 iff `nums[i] <= newIndex`. Score as a function of k is piecewise; difference array records where each value starts/stops scoring.
 * Approach: 1. For each i, `kValueToStopScoring = (i - nums[i] + 1 + n) % n` and start after wrap `(i+1)%n`. 2. `scoreChanges[start]++`, `scoreChanges[stop]--`; if start > stop also `scoreChanges[0]++`. 3. Prefix-sum changes; return smallest k with max prefix.
 * Dry Run: nums = [2,3,1,4,0]. Difference walk yields best k = 3.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var bestRotation = function (nums) {
  const arrayLength = nums.length;
  const scoreChanges = new Array(arrayLength).fill(0);

  for (
    let currentElementIndex = 0;
    currentElementIndex < arrayLength;
    currentElementIndex++
  ) {
    const elementValue = nums[currentElementIndex];
    const kValueToStopScoring =
      (currentElementIndex - elementValue + 1 + arrayLength) % arrayLength;
    const kValueToStartScoringAfterWrap =
      (currentElementIndex + 1) % arrayLength;

    scoreChanges[kValueToStartScoringAfterWrap]++;
    scoreChanges[kValueToStopScoring]--;
    if (kValueToStartScoringAfterWrap > kValueToStopScoring) {
      scoreChanges[0]++;
    }
  }

  let maximumScore = 0;
  let maximumRotationIndex = 0;
  let currentScoreAccumulator = 0;

  for (
    let rotationIteration = 0;
    rotationIteration < arrayLength;
    rotationIteration++
  ) {
    currentScoreAccumulator += scoreChanges[rotationIteration];

    if (currentScoreAccumulator > maximumScore) {
      maximumScore = currentScoreAccumulator;
      maximumRotationIndex = rotationIteration;
    }
  }

  return maximumRotationIndex;
};
