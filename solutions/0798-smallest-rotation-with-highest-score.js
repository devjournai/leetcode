/**
 * Smallest Rotation With Highest Score
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
