/**
 * Stamping The Sequence
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
