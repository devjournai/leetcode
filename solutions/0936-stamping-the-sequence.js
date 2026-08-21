/**
 * Stamping The Sequence
 * Intuition: Work backward: any window that already matches `stamp` except for `?` (and still has a real character) can be the last stamp covering that window. Replace it with `?` and record the index; reverse the list for chronological order.
 * Approach: 1. Copy target to `modifiedTargetChars`. 2. `evaluateAndPerformStamp(pos)`: window must match stamp or `?`, and not be all `?`; then overwrite with `?`. 3. Repeatedly scan all starts until no progress or all `?`, cap at 10*n stamps. 4. If fully `?`, reverse `resultIndices`, else [].
 * Dry Run: stamp="ab", target="abab". Stamp at 2 then 0 (or similar), reverse → [0,2] covering "abab".
 * Time Complexity: O(T^2 * S)
 * Space Complexity: O(T)
 */
var movesToStamp = function (stamp, target) {
  const stampPatternLength = stamp.length;
  const sequenceGoalLength = target.length;
  const resultIndices = [];
  const modifiedTargetChars = target.split("");
  let currentQuestionMarkCount = 0;
  const maximumAllowedTurns = 10 * sequenceGoalLength;

  const evaluateAndPerformStamp = (startingPosition) => {
    let segmentHasActualCharacters = false;
    let isMatchPossible = true;

    let examinationIndex = 0;
    while (examinationIndex < stampPatternLength) {
      const currentTargetCharacter =
        modifiedTargetChars[startingPosition + examinationIndex];
      const currentStampCharacter = stamp[examinationIndex];

      if (currentTargetCharacter === "?") {
      } else if (currentTargetCharacter === currentStampCharacter) {
        segmentHasActualCharacters = true;
      } else {
        isMatchPossible = false;
        break;
      }
      examinationIndex++;
    }

    if (!isMatchPossible || !segmentHasActualCharacters) {
      return false;
    }

    let replacementIndex = 0;
    while (replacementIndex < stampPatternLength) {
      if (modifiedTargetChars[startingPosition + replacementIndex] !== "?") {
        modifiedTargetChars[startingPosition + replacementIndex] = "?";
        currentQuestionMarkCount++;
      }
      replacementIndex++;
    }
    return true;
  };

  let didMakeAnyProgress = true;
  while (
    currentQuestionMarkCount < sequenceGoalLength &&
    didMakeAnyProgress &&
    resultIndices.length <= maximumAllowedTurns
  ) {
    didMakeAnyProgress = false;
    let currentScanPosition = 0;
    const maxScanPosition = sequenceGoalLength - stampPatternLength;

    while (currentScanPosition <= maxScanPosition) {
      if (evaluateAndPerformStamp(currentScanPosition)) {
        resultIndices.push(currentScanPosition);
        didMakeAnyProgress = true;
        currentScanPosition = -1;
      }
      currentScanPosition++;
    }
  }

  if (currentQuestionMarkCount === sequenceGoalLength) {
    return resultIndices.reverse();
  } else {
    return [];
  }
};
