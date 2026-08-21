/**
 * Longest Well Performing Interval
 * Intuition: Map tiring days (>8 hours) to +1 and others to -1. A well-performing interval has positive prefix-sum difference. If the running score is already > 0, the prefix [0..i] works; otherwise the longest earlier prefix with score-1 is the leftmost start that still yields a positive interval.
 * Approach: 1. Walk days, adding +1 or -1 to a running score. 2. If score > 0, length is i+1. 3. Record the first index of each score. 4. If score-1 was seen, update the answer with i minus that index.
 * Dry Run: hours = [9,9,6,0,6,8,9].
 *   - Running scores: +1, +2, +1, 0, -1, -2, -1.
 *   - Score > 0 at i=0,1,2 so prefix lengths 1, 2, 3; later score-1 lookups do not beat 3.
 *   - Answer 3 ([9,9,6]).
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
        currentDayPosition + 1
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
        computedIntervalLength
      );
    }
  }

  return maximumAchievedLength;
};
