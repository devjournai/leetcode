/**
 * Expressive Words
 * Time Complexity: O(W * (N + K_max))
 * Space Complexity: O(1)
 */
var expressiveWords = function (sourceInputString, wordsToExamine) {
  let totalStretchyCount = 0;

  for (const currentWordConsidered of wordsToExamine) {
    if (checkStretchy(sourceInputString, currentWordConsidered)) {
      totalStretchyCount++;
    }
  }

  return totalStretchyCount;
};

function checkStretchy(mainSource, mainQuery) {
  let sourceStringPointer = 0;
  let queryWordPointer = 0;

  while (
    sourceStringPointer < mainSource.length &&
    queryWordPointer < mainQuery.length
  ) {
    if (mainSource[sourceStringPointer] !== mainQuery[queryWordPointer]) {
      return false;
    }

    const currentGroupCharacter = mainSource[sourceStringPointer];

    let nextSourcePosition = sourceStringPointer;
    while (
      nextSourcePosition < mainSource.length &&
      mainSource[nextSourcePosition] === currentGroupCharacter
    ) {
      nextSourcePosition++;
    }
    const sourceGroupLength = nextSourcePosition - sourceStringPointer;
    sourceStringPointer = nextSourcePosition;

    let nextQueryPosition = queryWordPointer;
    while (
      nextQueryPosition < mainQuery.length &&
      mainQuery[nextQueryPosition] === currentGroupCharacter
    ) {
      nextQueryPosition++;
    }
    const queryGroupLength = nextQueryPosition - queryWordPointer;
    queryWordPointer = nextQueryPosition;

    if (queryGroupLength > sourceGroupLength) {
      return false;
    }
    if (sourceGroupLength > queryGroupLength && sourceGroupLength < 3) {
      return false;
    }
  }

  return (
    sourceStringPointer === mainSource.length &&
    queryWordPointer === mainQuery.length
  );
}
