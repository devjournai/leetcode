/**
 * Longest Well Performing Interval
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestWPI = function (employeeHours) {
  let maximumAchievedLength = 0;
  let runningTirednessScore = 0;
  const scoreToEntryIndex = new Map();

  for (
    let currentDayPosition = 0;
    currentDayPosition < employeeHours.length;
    currentDayPosition++
  ) {
    let recordedHours = employeeHours[currentDayPosition];
    runningTirednessScore += recordedHours > 8 ? 1 : -1;

    if (runningTirednessScore > 0) {
      maximumAchievedLength = Math.max(
        maximumAchievedLength,
        currentDayPosition + 1,
      );
    }

    let isScoreUnseen = !scoreToEntryIndex.has(runningTirednessScore);
    if (isScoreUnseen) {
      scoreToEntryIndex.set(runningTirednessScore, currentDayPosition);
    }

    let targetScoreValue = runningTirednessScore - 1;
    let hasTargetScorePreceded = scoreToEntryIndex.has(targetScoreValue);
    if (hasTargetScorePreceded) {
      let priorScoreIndex = scoreToEntryIndex.get(targetScoreValue);
      let computedIntervalLength = currentDayPosition - priorScoreIndex;
      maximumAchievedLength = Math.max(
        maximumAchievedLength,
        computedIntervalLength,
      );
    }
  }

  return maximumAchievedLength;
};
